<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="8%">Khách hàng</th>
                <th width="12%">Ngày đặt</th>
                <th width="10%">Tổng giá trị</th>
                <th width="15%">Nhân viên giao hàng</th>
                <th width="10%">Trạng thái</th>
                <th width="7%">Tùy chọn</th>
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
                <td>
                    <span v-if="order.staff_delivery">
                        <span>{{ order.staff_delivery.name }} <br> {{ order.staff_delivery.phone }}</span>
                    </span>
                </td>
                <td>
                    <div class="dropdown">
                        <button 
                            class="dropdown-toggle btn-order-status" type="button" 
                            :class="{
                                'order-status1': order.status.id==1,
                                'order-status2': order.status.id==2,
                                'order-status3': order.status.id==3,
                                'order-status4': order.status.id==4,
                                'order-status5': order.status.id==5,
                                'order-status6': order.status.id==6,
                                'order-status7': order.status.id==7,
                                'order-status8': order.status.id==8,
                                'order-status9': order.status.id==9,
                                'order-status10': order.status.id==10,
                                'order-status11': order.status.id==11,
                                'order-status12': order.status.id==12,
                            }"
                        >
                            {{ order.status.name }}
                        </button>
                    </div>
                </td>
                <td class="text-center">
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
            </tr>
        </tbody>
    </table>
</template>

<script>
import { formatPrice } from "../../../utils";

export default {
    name: 'OrderList',
    props: {
        orders: { type: Array, default: [] },
    },
    computed: {
        ordersList() {
            return this.orders;
        },
    },
    data() {
        return {
            shippers: []
        };
    },
    methods: {
        formatPrice,
    },
    mounted() {
        
    }

};
</script>

<style>
    .btn-order-status,
    .btn-order-shipper {
        width: 145px;
        height: 30px;
        padding: 0 !important;
        font-size: 13px !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-weight: bold;
    }

    .btn-order-shipper {
        background: #3d859e;
    }
    
    .order-status1,
    .dropdown-menu>li>.dropdown-item-1:hover {
        color: #c20000;
        background-color: #ffdddd;
    }

    .order-status2,
    .dropdown-menu>li>.dropdown-item-2:hover {
        color: #e96900;
        background-color: #ffead8;
    }

    .order-status3,
    .dropdown-menu>li>.dropdown-item-3:hover {
        color: #4f2d9e;
        background-color: #ece4ff;
    }

    .order-status4,
    .dropdown-menu>li>.dropdown-item-4:hover {
        color: #c1005d;
        background-color: #ffe3ea;
    }

    .order-status5,
    .dropdown-menu>li>.dropdown-item-5:hover {
        color: #c13a00;
        background-color: #ffebdd;
    }
    .order-status6,
    .dropdown-menu>li>.dropdown-item-6:hover {
        color: #006a87;
        background-color: #ddf8ff;
    }

    .order-status7,
    .dropdown-menu>li>.dropdown-item-7:hover {
        color: #f5c800;
        background-color: #fff9dc;
    }

    .order-status8,
    .dropdown-menu>li>.dropdown-item-8:hover {
        color: #868b00;
        background-color: #fbfcda;
    }

    .order-status9,
    .dropdown-menu>li>.dropdown-item-9:hover {
        color: #006b07;
        background-color: #e0ffe2;
    }

    .order-status10,
    .dropdown-menu>li>.dropdown-item-10:hover {
        color: #565656e7;
        background-color: #e8e8e8e7;
    }
    .order-status11,
    .dropdown-menu>li>.dropdown-item-11:hover {
        color: #840000e7;
        background-color: #f7ffe0e7;
    }
    .order-status12,
    .dropdown-menu>li>.dropdown-item-12:hover {
        color: #842100e7;
        background-color: #ffe6e2e7;
    }
    .btn-receipt {
        height: 30px;
        font-size: 14px;
        min-width: 100px;
        text-transform: none;
    }
    .btn-danger {
        background-color: #bd0101;
        border: 1px solid red !important;
    }
    .shipper {
        color: #ff0000;
        font-weight: bold;
        display: block;
    }
    .current_order {
        color: #ff0000;
        font-weight: bold;
    }
    .dropdown-menu>li>a:hover {
        background-color: #fffee5;
    }
</style>