<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="categoryID">Cập nhật danh mục</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm danh mục</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="category" class="box box-info">
                        <div class="box-body">
                            <CategoryForm :category="category" @submit:category="submitCategory" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryForm from "./CategoryForm.vue";
import CategoryService from "@/services/admin/category.service";

export default {
    props: {
        modalCategory: { type: Boolean, required: true },
        categoryID: { type: Number, required: true },
    },
    components: {
        CategoryForm,
    },
    data() {
        return {
            category: {
                'parent_id': 0,
                'name': "",
                'image': "",
                'description': "",
                'url': "",
            },
        };
    },
    methods: {
        async getCategory() {
            if (this.categoryID) {
                this.category = await CategoryService.get(this.categoryID);
            }
        },
        async submitCategory(data) {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
            if (this.categoryID) {
                try {
                    await CategoryService.update(this.category.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Danh mục được cập nhật thành công.'
                    })
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await CategoryService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Danh mục được thêm thành công.'
                    })
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        closeModal() {
            this.reset();
            this.$emit('closeModal');
        },
        reset () {
            this.category.parent_id = 0;
            this.category.name = "";
            this.category.image = "";
            this.category.description = "";
            this.category.url = "";
        },
    },
    mounted() {
        this.getCategory();
    },
};
</script>
