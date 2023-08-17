<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="supplierID">Cập nhật nhà cung cấp</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới nhà cung cấp</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="supplier" class="box box-info">
                        <div class="box-body">
                            <SupplierForm :supplier="supplier" @submit:supplier="submitSupplier" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SupplierForm from "./SupplierForm.vue";
import SupplierService from "@/services/admin/supplier.service";

export default {
    props: {
        modalSupplier: { type: Boolean, required: true },
        supplierID: { type: Number, required: true },
    },
    components: {
        SupplierForm,
    },
    data() {
        return {
            supplier: {
                'name': "",
                'address_detail': "",
                'address': "",
                'phone': "",
                'email': "",
                'bank_account': "",
                'tax_code': "",
                'date_cooperate': new Date().toISOString().substr(0, 10),
            },
        };
    },
    methods: {
        async getSupplier() {
            if (this.supplierID) {
                await SupplierService.get(this.supplierID).then((response) => {
                    this.supplier = response;
                });
            }
        },
        async submitSupplier(data) {
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
            if (this.supplierID) {
                try {
                    await SupplierService.update(this.supplier.id, data).then(res => {
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await SupplierService.create(data).then(res => {
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });
                    this.reset();
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
        reset () {
            this.supplier.name = "";
            this.supplier.address = "";
            this.supplier.phone = "";
            this.supplier.email = "";
            this.supplier.bank_account = "";
            this.supplier.tax_code = "";
            this.supplier.date_cooperate = new Date().toISOString().substr(0, 10);
        },
    },
    mounted() {
        this.getSupplier();
    },
};
</script>
