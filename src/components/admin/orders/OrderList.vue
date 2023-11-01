<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="10%">Khách hàng</th>
                <th width="12%">Ngày đặt</th>
                <th width="10%">Tổng giá trị</th>
                <th width="15%">Nhân viên giao hàng</th>
                <th width="12%" v-if="!hasRole6">Nhân viên duyệt đơn</th>
                <th width="12%" v-else></th>
                <th width="10%">Trạng thái</th>
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
                <td>
                    <span v-if="order.staff_delivery">{{ order.staff_delivery.name }} - {{ order.staff_delivery.phone }}</span>
                </td>
                <td class="text-center">
                    <span v-if="order.staff && !hasRole6">{{ order.staff.name }}</span>
                    <button v-if="hasRole6 && !order.staff_delivery" type="button" class="btnAdd btn-receipt" @click="deliveryOrder(order.id)">
                        Nhận đơn
                    </button>
                    <button v-if="hasRole6 && order.status.id==3" type="button" class="btnAdd btn-receipt" @click="deliveryOrder(order.id)">
                        Đã lấy hàng
                    </button>
                    <button v-if="hasRole6 && order.status.id==4" type="button" class="btnAdd btn-receipt" @click="deliveryOrder(order.id)">
                        Đang giao hàng
                    </button>
                    <button v-if="hasRole6 && order.status.id==6" type="button" class="btnAdd btn-receipt" @click="deliveryOrder(order.id)">
                        Đã giao
                    </button>
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
                                'order-status6': order.status.id==6,
                                'order-status7': order.status.id==7,
                                'order-status8': order.status.id==8,
                                'order-status9': order.status.id==9,
                                'order-status10': order.status.id==10,
                                'order-status11': order.status.id==11,
                            }"
                            id="dropdownMenuButton1" 
                            :data-bs-toggle="!hasRole6 ? 'dropdown' : ''"
                            :aria-expanded="!hasRole6 ? 'false' : ''"
                        >
                            {{ order.status.name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="status in statuses" :key="status">
                                <a @click="statusUpdate(order, status)" :class="`dropdown-item-${status.id}`" href="#">
                                    {{ status.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(order.id)">                        
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

export default {
    name: 'OrderList',
    props: {
        orders: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        orderID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
        getAdmin: { type: Object, required: true },
    },
    computed: {
        hasRole6() {
            return this.getAdmin.roleIDs && this.getAdmin.roleIDs.some(id => id === 6);
        },
        ordersList() {
            if(this.hasRole6) {
                return this.orders.filter(order => {
                    return (order.status.id >= 2 && order.status.id<=8);
                });
            } else {
                return this.orders;
            }
        },
    },
    data() {
        return {
            statuses: [
                {'id': 1, 'name': 'Chờ xử lý'},
                {'id': 2, 'name': 'Đã được xử lý'},
                {'id': 3, 'name': 'Đang chuẩn bị'},
                {'id': 9, 'name': 'Hoàn thành'},
                {'id': 12, 'name': 'Không nhận hàng'},
            ]
        };
    },
    methods: {
        formatPrice,
        statusUpdate(order, status) {
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
            order.status.name = status.name;
            let data = {
                orderId: order.id,
                status: status.id,
                staffId: this.getAdmin.id
            };
            try {
                OrderService.updateStatus(data);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật trạng thái thành công.'
                });
                this.$parent.refreshList();
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
        deliveryOrder(orderID) {
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
            const data = {
                staff_delivery_id: this.getAdmin.id,
                orderId: orderID
            }
            try {
                OrderService.deliveryOrder(data);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật trạng thái thành công.'
                });
                this.$parent.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        
    }

};
</script>

<style>
    .btn-order-status {
        width: 145px;
        height: 30px;
        padding: 0 !important;
        font-size: 13px !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-weight: bold;
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
    .btn-receipt {
        height: 30px;
        font-size: 14px;
        min-width: 100px;
        text-transform: none;
    }
</style>