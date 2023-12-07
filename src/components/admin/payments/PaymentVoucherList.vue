<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="22%">Ngày chi</th>
                <th width="16%">Tổng tiền</th>
                <th width="30%">Nhà cung cấp</th>
                <th width="18%">Người thực hiện</th>
                <th width="8%">Sửa</th>
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
            </tr>
        </tbody>
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