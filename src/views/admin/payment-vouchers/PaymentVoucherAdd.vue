<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="payment_voucher" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/payment-vouchers">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Thêm mới Phiếu chi</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <PaymentVoucherForm
                            :payment_voucher="payment_voucher"
                            @submit:payment_voucher="createPaymentVoucher"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import PaymentVoucherForm from "@/components/admin/payment-vouchers/PaymentVoucherForm.vue";
    import PaymentVoucherService from "@/services/admin/payment-voucher.service";
    export default {
        components: {
            PaymentVoucherForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                payment_voucher: {
                    'date': new Date().toISOString().slice(0, 10),
                    'total_price': "",
                    'description': "",
                },
            };
        },
        methods: {
            async createPaymentVoucher(data) {
                try {
                    this.payment_voucher.date = new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

                    await PaymentVoucherService.create(data);
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
                        title: 'Phiếu chi được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
