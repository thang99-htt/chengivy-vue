<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="paymentID">Cập nhật phiếu chi</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới phiếu chi</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="payment" class="box box-info">
                        <div class="box-body">
                            <PaymentVoucherForm :payment="payment" @submit:payment="submitPayment" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PaymentVoucherForm from "./PaymentVoucherForm.vue";
import PaymentService from "@/services/admin/payment.service";
import {mapGetters} from 'vuex';

export default {
    props: {
        modalPayment: { type: Boolean, required: true },
        paymentID: { type: Number, required: true },
    },
    components: {
        PaymentVoucherForm,
    },
    data() {
        return {
            payment: {
                'staff_id': "",
                'supplier_id': "",
                'date': new Date().toISOString().substr(0, 10),
                'total_price': "",
                'description': ""
            },
        };
    },
    methods: {
        async getPayment() {
            if (this.paymentID) {
                await PaymentService.get(this.paymentID).then((response) => {
                    this.payment = response;
                    this.payment.date =  new Date(response.date).toISOString().substr(0, 10);
                });
            }
        },
        async submitPayment(data) {
            this.payment.staff_id = this.getAdmin.id;
            
            // Lấy giờ hiện tại theo múi giờ Việt Nam
            const currentTime = new Date();
            const vnTime = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ

            const hours = String(vnTime.getHours()).padStart(2, "0");
            const minutes = String(vnTime.getMinutes()).padStart(2, "0");
            const seconds = String(vnTime.getSeconds()).padStart(2, "0");

            // Gộp ngày, giờ, phút, giây để tạo thành một đối tượng Date
            const dateTimeString = `${this.payment.date} ${hours}:${minutes}:${seconds}`;
            const newDate = new Date(dateTimeString);

            // Định dạng lại ngày thành "YYYY-MM-DD HH:mm:ss"
            this.payment.date = newDate.toISOString().substr(0, 19).replace("T", " ");

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
            if (this.paymentID) {
                try {
                    await PaymentService.update(this.payment.id, data).then(res => {
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
                    await PaymentService.create(data).then(res => {
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
            this.payment.staff_id = "";
            this.payment.supplier_id = "";
            this.payment.date = new Date().toISOString().substr(0, 10);
            this.payment.total_price = "";
        },
    },
    mounted() {
        this.getPayment();
    },
    computed: {
        ...mapGetters(['getAdmin']),
    }
};
</script>
