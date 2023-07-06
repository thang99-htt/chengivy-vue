<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="category" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/categories">
                            <input type="button" name="btnBack" value="Trở về">
                        </router-link>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <CategoryForm
                            :category="category"
                            @submit:category="createCategory"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import CategoryForm from "@/components/admin/categories/CategoryForm.vue";
    import CategoryService from "@/services/admin/category.service";

    export default {
        components: {
            CategoryForm,
        },
        props: {
            id: { type: String, required: true },
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
            async createCategory(data) {
                try {
                    await CategoryService.create(data);
                    
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

                    Toast.fire({
                        icon: 'success',
                        title: 'Danh mục được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
