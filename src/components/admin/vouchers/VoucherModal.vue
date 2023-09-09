<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="voucherID">Cập nhật phiếu khuyến mãi</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới phiếu khuyến mãi</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="voucher" class="box box-info">
                        <div class="box-body">
                            <VoucherForm :voucher="voucher" @submit:voucher="submitVoucher" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VoucherForm from "./VoucherForm.vue";
import VoucherService from "@/services/admin/voucher.service";

export default {
    props: {
        voucherID: { type: Number, required: true },
    },
    components: {
        VoucherForm,
    },
    data() {
        return {
            voucher: {
                'name': "",
                'date_start': new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                'date_end': new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                'condition': "",
                'level': 0,
                'quantity_initial': 0,
                'discount': 0,
                'image': "",
            },
        };
    },
    methods: {
        async getVoucher() {
            if (this.voucherID) {
               this.voucher = await VoucherService.get(this.voucherID);
            }
        },
        async submitVoucher(data) {
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
            if (this.voucherID) {
                try {
                    await VoucherService.update(this.voucherID, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Phiếu khuyến mãi được cập nhật thành công.'
                    })
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await VoucherService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Phiếu khuyến mãi được thêm thành công.'
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
           this.voucher.name = "";
           this.voucher.date_start = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
           this.voucher.date_end = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
           this.voucher.condition = "";
           this.voucher.level = 0;
           this.voucher.quantity_initial = 0;
           this.voucher.discount = 0;
           this.voucher.image = "";
        },
    },
    mounted() {
        this.getVoucher();
    },
};
</script>
