<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="20%">Ngày chi</th>
                <th width="16%">Tổng tiền</th>
                <th width="30%">Nhà cung cấp</th>
                <th width="18%">Người thực hiện</th>
                <th width="6%">Sửa</th>
                <th width="4%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(payment, index) in paymentsList" :key="payment">
                <td>{{ payment.id }}</td>
                <td>{{ payment.date }}</td>
                <td>{{ formatPrice(payment.total_price) }}</td>
                <td>{{ payment.supplier.name }}</td>
                <td>{{ payment.staff.name }}</td>
                <td>
                    <button type="button" class="btn" @click="showModalEdit(payment.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(payment.id)" :checked="selectedIds.includes(payment.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="6" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import { formatPrice } from '../../../utils';
export default {
    name: 'SupplierList',
    props: {
        payments: { type: Array, required: true },
        paymentID: { type: Number, required: true },
        selectedIds: { type: Array, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        paymentsList() {
            return this.payments;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        formatPrice,
        idSelected(id) {
            const index = this.selectedIds.indexOf(id);
            if (index === -1) {
                // Nếu id chưa tồn tại trong mảng, thêm nó vào
                this.selectedIds.push(id);
            } else {
                // Ngược lại, loại bỏ id khỏi mảng
                this.selectedIds.splice(index, 1);
            }
        },
        idAllSelected() {
            if(this.selectedIds.length == this.paymentsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.payments.forEach(payment => {
                    this.selectedIds.push(payment.id);
                });
            } else {
                this.payments.forEach(payment => {
                    this.selectedIds.push(payment.id);
                });
            }
        },
        showModalEdit(paymentID) {
            this.$emit('update-modal', true);
            this.$emit('update-paymentID', paymentID);
        }
    },

};
</script>

<style>
.btn-payment {
    color: #000;
    background-color: #f2a900;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>