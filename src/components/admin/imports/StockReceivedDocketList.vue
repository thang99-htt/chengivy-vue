<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="2%">ID</th>
                <th width="8%">Nhân viên</th>
                <th width="4%">Nhà cung cấp</th>
                <th width="8%">Phiếu chi</th>
                <th width="6%">Hình thức</th>
                <th width="7%">Ngày nhập</th>
                <th width="8%">Tổng giá trị</th>
                <th width="8%">GTGT</th>
                <th width="8%">Thành tiền</th>
                <th width="6%">Chứng từ</th>
                <th width="7%">Diễn giải</th>
                <th width="4%">Tùy chọn</th>
                <th width="4%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(stockReceivedDocket, index) in stockReceivedDocketsList" :key="stockReceivedDocket">
                <td>{{ stockReceivedDocket.id }}</td>
                <td>{{ stockReceivedDocket.staff.name }}</td>
                <td>{{ stockReceivedDocket.supplier.name }}</td>
                <td>{{ stockReceivedDocket.payment_voucher.id }}</td>
                <td>{{ stockReceivedDocket.form }}</td>
                <td>{{ stockReceivedDocket.date }}</td>
                <td>{{ stockReceivedDocket.total_value }}</td>
                <td>{{ stockReceivedDocket.value_added }}</td>
                <td>{{ stockReceivedDocket.total_price }}</td>
                <td>{{ stockReceivedDocket.image }}</td>
                <td>{{ stockReceivedDocket.description }}</td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(stockReceivedDocket.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(stockReceivedDocket.id)" :checked="selectedIds.includes(stockReceivedDocket.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="12" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";

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
        statusUpdate(stockReceivedDocket) {
            try {
                StockReceivedDocketService.updateStatus(stockReceivedDocket.id, stockReceivedDocket.status).then(() => {
                    this.$parent.refreshList();
                })

            } catch (error) {
                console.log(error);
            }
        },
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
            if(this.selectedIds.length == this.stockReceivedDocketsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.stockReceivedDockets.forEach(stockReceivedDocket => {
                    this.selectedIds.push(stockReceivedDocket.id);
                });
            } else {
                this.stockReceivedDockets.forEach(stockReceivedDocket => {
                    this.selectedIds.push(stockReceivedDocket.id);
                });
            }
        },
        showModalEdit(stockReceivedDocketID) {
            this.$emit('update-modal', true);
            this.$emit('update-stockReceivedDocketID', stockReceivedDocketID);
        }
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