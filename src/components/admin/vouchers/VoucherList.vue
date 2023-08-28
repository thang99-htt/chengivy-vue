<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="17%">Tên</th>
                <th width="22%">Thời gian</th>
                <th width="15%">Điều kiện</th>
                <th width="8%">Tỷ lệ giảm</th>
                <th width="8%">Số lượng</th>
                <th width="8%">Hình ảnh</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(voucher, index) in vouchersList" :key="voucher">
                <td>{{ voucher.name }}</td>
                <td>
                    <span v-if="voucher.date_start" :class="{'text-decoration-line-through': new Date(voucher.date_end) > currentDate}">
                        {{ voucher.date_start }} đến {{ voucher.date_end }}
                    </span>
                    <br>
                    <span v-if="new Date(voucher.date_end) > currentDate" class="text-danger">
                        Hết hạn
                    </span>
                </td>
                <td>{{ voucher.condition }}</td>
                <td>{{ voucher.discount }}%</td>
                <td>
                    <span v-if="voucher.quantity_initial">{{ voucher.quantity_remain }} / {{ voucher.quantity_initial }}</span>
                </td>
                <td>
                    <img v-if="voucher.image" :src="voucher.image" alt="">
                </td>
                <td class="text-center">
                    <button type="button" class="btn"  @click="showModalEdit(voucher.id)">                        
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(voucher.id)" :checked="selectedIds.includes(voucher.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="7" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import { formatPrice } from "../../../utils";

export default {
    name: 'VoucherList',
    props: {
        vouchers: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        voucherID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        vouchersList() {
            return this.vouchers;
        },
    },
    data() {
        return {
            currentDate: new Date()
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
            if(this.selectedIds.length == this.vouchersList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.vouchers.forEach(voucher => {
                    this.selectedIds.push(voucher.id);
                });
            } else {
                this.vouchers.forEach(voucher => {
                    this.selectedIds.push(voucher.id);
                });
            }
        },
        showModalEdit(voucherID) {
            this.$emit('update-modal', true);
            this.$emit('update-voucherID', voucherID);
        }
    },

};
</script>
<style>
    .voucher i {
        color: #fecb00;
        font-size: 15px;
        margin-right: 2px;
    }
    .voucher li {
        display: inline-block;
        margin: 0;
    }
</style>
