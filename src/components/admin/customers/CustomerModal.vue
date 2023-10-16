<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="customerID">Cập nhật khách hàng</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới khách hàng</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="customer" class="box box-info">
                        <div class="box-body">
                            <CustomerForm :customer="customer" @submit:customer="submitCustomer" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CustomerForm from "./CustomerForm.vue";
import CustomerService from "@/services/admin/customer.service";

export default {
    props: {
        customerID: { type: Number, required: true },
    },
    components: {
        CustomerForm,
    },
    data() {
        return {
            customer: {
                'name': "",
                'gender': "Nam",
                'phone': "",
            },
        };
    },
    methods: {
        async getCustomer() {
            if (this.customerID) {
                this.customer = await CustomerService.get(this.customerID);
            }
        },
        async submitCustomer(data) {
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
            if (this.customerID) {
                try {
                    await CustomerService.update(this.customer.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Khách hàng được cập nhật thành công.'
                    });
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await CustomerService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Khách hàng được thêm thành công.'
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
            this.customer.name = "";
            this.customer.phone = "";
            this.customer.gender = "Nam";
        },
    },
    mounted() {
        this.getCustomer();
    },
};
</script>
