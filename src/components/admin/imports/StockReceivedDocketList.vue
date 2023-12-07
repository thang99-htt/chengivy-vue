<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="15%">Ngày nhập</th>
                <th width="32%">Phiếu chi</th>
                <th width="15%">Tổng giá trị</th>
                <th width="14%">Nhân viên</th>
                <th width="8%">Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(stockReceivedDocket, index) in stockReceivedDocketsList" :key="stockReceivedDocket">
                <td>{{ stockReceivedDocket.id }}</td>
                <td>{{ stockReceivedDocket.date }}</td>
                <td>
                    Phiếu chi {{ stockReceivedDocket.payment_voucher.id }},
                    {{ stockReceivedDocket.payment_voucher.date }},
                    {{ formatPrice(stockReceivedDocket.payment_voucher.total_price) }}
                </td>
                <td>{{ formatPrice(stockReceivedDocket.total_value) }}</td>
                <td>{{ stockReceivedDocket.staff.name }}</td>
                <td class="text-center">
                    <button type="button" class="btn">
                        <router-link
                            :to="{
                                name: 'stock-received-docket.edit',
                                params: { id: stockReceivedDocket.id },
                            }" 
                        >
                            <img v-if="isEditable(stockReceivedDocket.date)" src="/images/icon/iconedit.png" alt="">
                        </router-link>
                    </button>
                    <button type="button" class="btn">
                        <router-link
                            :to="{
                                name: 'stock-received-docket.view',
                                params: { id: stockReceivedDocket.id },
                            }" 
                        >
                            <img src="/images/icon/icondetail.png" alt="">
                        </router-link>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";
import { formatPrice } from '@/utils';

export default {
    name: 'StockReceivedDocketList',
    props: {
        stockReceivedDockets: { type: Array, required: true },
        stockReceivedDocketID: { type: Number, required: true },
        selectedIds: { type: Array, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        stockReceivedDocketsList() {
            return this.stockReceivedDockets;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        formatPrice,
        isEditable(date) {
            // Chuyển đổi ngày thành đối tượng Date
            const docketDate = new Date(date);
            
            // Lấy ngày hiện tại
            const currentDate = new Date();
            
            // Trừ đi 3 ngày
            currentDate.setDate(currentDate.getDate() - 3);

            // So sánh ngày trong docketDate với currentDate
            return docketDate > currentDate;
        },
        statusUpdate(stockReceivedDocket) {
            try {
                StockReceivedDocketService.updateStatus(stockReceivedDocket.id, stockReceivedDocket.status).then(() => {
                    this.$parent.refreshList();
                })

            } catch (error) {
                console.log(error);
            }
        },
    },

};
</script>

<style>
.btn-stockReceivedDocket {
    color: #000;
    background-color: #f2a900;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>