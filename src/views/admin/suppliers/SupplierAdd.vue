<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="supplier" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/suppliers">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Thêm mới Nhà cung cấp</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <SupplierForm
                            :supplier="supplier"
                            @submit:supplier="createSupplier"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import SupplierForm from "@/components/admin/suppliers/SupplierForm.vue";
    import RoleService from "@/services/admin/supplier.service";
    export default {
        components: {
            SupplierForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                supplier: {
                    'name': "",
                    'address': "",
                    'phone': "",
                    'email': "",
                },
            };
        },
        methods: {
            async createSupplier(data) {
                try {
                    await RoleService.create(data);
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
                        title: 'Nhà cung cấp được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
