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
                        <h3 class="box-title">Hiệu chỉnh Phiếu chi</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <PaymentVoucherForm
                            :payment_voucher="payment_voucher"
                            @submit:payment_voucher="updatePaymentVoucher"
                            @delete:payment_voucher="deletePaymentVoucher"
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
                payment_voucher: null,
            };
        },
        methods: {
            async getRole(id) {
                try {
                    this.payment_voucher = await PaymentVoucherService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updatePaymentVoucher(data) {
                try {
                    this.payment_voucher.date = new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
                    
                    await PaymentVoucherService.update(this.payment_voucher.id, data);
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
                        title: 'Vai trò được cập nhật thành công.'
                    })

                    this.$router.push({ name: "payment_voucher" });

                } catch (error) {
                    console.log(error);
                }
            },
            async deletePaymentVoucher() {
                if (confirm("Bạn muốn xóa Vai trò này?")) {
                    try {
                        await PaymentVoucherService.delete(this.payment_voucher.id);
                        this.$router.push({ name: "payment_voucher" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getRole(this.id);
        },
    };
</script>
