<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="8%">Khách hàng</th>
                <th width="12%">Ngày đặt</th>
                <th width="10%">Tổng giá trị</th>
                <th width="21%">Địa chỉ</th>
                <th width="10%">Trạng thái</th>
                <th width="8%">Nhân viên</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(order, index) in ordersList" :key="order">
                <td class="sorting_1">
                    {{ order.id }}
                </td>
                <td>{{ order.name_receiver }}</td>
                <td>{{ order.ordered_at }}</td>
                <td>{{ formatPrice(order.total_value) }}</td>
                <td>{{ order.user_address_detail }}, {{ order.user_address }}</td>
                <td>
                    <button
                        v-if="order.status.id == 1" class="btn-order-status order-status1"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button>
                    <button
                        v-if="order.status.id == 2" class="btn-order-status order-status2"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 3" class="btn-order-status order-status3"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 4" class="btn-order-status order-status4"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 5" class="btn-order-status order-status5"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 6" class="btn-order-status order-status6"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 7" class="btn-order-status order-status7"
                        @click="waitReceiptOrder()"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 8" class="btn-order-status order-status8"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button> 
                    <button
                        v-if="order.status.id == 9" class="btn-order-status order-status9"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button>  
                    <button
                        v-if="order.status.id == 10" class="btn-order-status order-status10"
                        @click="statusUpdate(order)"
                    >
                        {{ order.status.name }}
                    </button>
                </td>
                <td>{{ order.staff.name }}</td>
                <td class="text-center">
                    <button type="button" class="btn"  @click="showModalEdit(order.id)">                        
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                    <button type="button" class="btn">                        
                        <router-link
                            :to="{
                                name: 'order.view',
                                params: { id: order.id },
                            }" 
                        >
                            <img src="/images/icon/icondetail.png" alt="">
                        </router-link>
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(order.id)" :checked="selectedIds.includes(order.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="8" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import OrderService from "@/services/admin/order.service";
import { formatPrice } from "../../../utils";
import {mapGetters} from 'vuex';

export default {
    name: 'OrderList',
    props: {
        orders: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        orderID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        ordersList() {
            return this.orders;
        },
        ...mapGetters(['getAdmin'])
    },
    data() {
        return {
            
        };
    },
    methods: {
        formatPrice,
        statusUpdate(order) {
            try {
                OrderService.updateStatus(this.getAdmin.id, order.id, order.status.id).then(() => {
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
            if(this.selectedIds.length == this.ordersList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.orders.forEach(order => {
                    this.selectedIds.push(order.id);
                });
            } else {
                this.orders.forEach(order => {
                    this.selectedIds.push(order.id);
                });
            }
        },
    },

};
</script>

<style>
    .btn-order-status {
        width: 115px;
        height: 30px;
        padding: 0 !important;
        font-size: 13px !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-weight: bold;
    }
    
    .order-status1 {
        color: #c20000;
        background-color: #ffdddd;
    }

    .order-status2 {
        color: #e96900;
        background-color: #ffead8;
    }

    .order-status3 {
        color: #4f2d9e;
        background-color: #ece4ff;
    }

    .order-status4 {
        color: #c1005d;
        background-color: #ffe3ea;
    }

    .order-status5 {
        color: #006a87;
        background-color: #ddf8ff;
    }

    .order-status6 {
        color: #f000a4;
        background-color: #ffe2f6;
    }

    .order-status7 {
        color: #caa500;
        background-color: #fff9dc;
    }

    .order-status8 {
        color: #868b00;
        background-color: #fbfcda;
    }

    .order-status9 {
        color: #006b07;
        background-color: #e0ffe2;
    }

    .order-status10 {
        color: #565656e7;
        background-color: #e8e8e8e7;
    }
</style>