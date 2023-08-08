<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="supplier" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/suppliers">
                            <input type="button" name="btnBack" value="Trở về">
                        </router-link>
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
    import SuppllierService from "@/services/admin/supplier.service";

    export default {
        components: {
            SupplierForm,
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
                    await SuppllierService.create(data);
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
