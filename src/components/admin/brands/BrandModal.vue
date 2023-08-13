<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="brandID">Cập nhật thương hiệu</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới thương hiệu</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="brand" class="box box-info">
                        <div class="box-body">
                            <BrandForm :brand="brand" @submit:brand="submitBrand" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BrandForm from "./BrandForm.vue";
import BrandService from "@/services/admin/brand.service";

export default {
    props: {
        modalBrand: { type: Boolean, required: true },
        brandID: { type: Number, required: true },
    },
    components: {
        BrandForm,
    },
    data() {
        return {
            brand: {
                'parent_id': 0,
                'name': "",
                'image': "",
                'description': "",
                'url': "",
            },
        };
    },
    methods: {
        async getBrand() {
            if (this.brandID) {
                this.brand = await BrandService.get(this.brandID);
            }
        },
        async submitBrand(data) {
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
            if (this.brandID) {
                try {
                    await BrandService.update(this.brand.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Thương hiệu được cập nhật thành công.'
                    })
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await BrandService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Thương hiệu được thêm thành công.'
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
            this.brand.name = "";
            this.brand.description = "";
            this.brand.image = "";
        },
    },
    mounted() {
        this.getBrand();
    },
};
</script>
