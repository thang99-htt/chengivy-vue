<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="11%">Ngày yêu cầu</th>
                <th width="11%">Ngày hoàn trả</th>
                <th width="7%">Đơn hàng</th>
                <th width="14%">Lý do</th>
                <th width="8%">Tổng tiền</th>
                <th width="12%">Phương thức</th>
                <th width="8%">Trạng thái</th>
                <th width="7%">Nhân viên</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="ret in returnsList" :key="ret" >
                <td>{{ ret.requested_at }}</td>
                <td>{{ ret.returned_at }}</td>
                <td>{{ ret.order_id }}</td>
                <td>{{ ret.reason }}</td>
                <td>{{ formatPrice(ret.total_price) }}</td>
                <td>{{ ret.method }}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary" v-if="ret.status === 'Đã hủy yêu cầu'">
                            {{ ret.status }}
                        </button>
                        <button 
                            class="btn dropdown-toggle" type="button" 
                            id="dropdownMenuButton1" data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            v-else
                        >
                            {{ ret.status }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="status in statuses" :key="status">
                                <a @click="statusUpdate(ret, status)" class="dropdown-item" href="#">
                                    {{ status }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td>{{ ret.staff.name }}</td>
                <td class="text-center">
                    <button type="button" class="btn"  @click="showModalEdit(ret.id)">                        
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(ret.id)" :checked="selectedIds.includes(ret.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="9" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import ReturnService from "@/services/admin/return.service";
import { formatPrice } from "../../../utils";
import {mapGetters} from 'vuex';

export default {
    name: 'ReviewList',
    props: {
        returns: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        returnID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        returnsList() {
            return this.returns;
        },
        ...mapGetters(['getAdmin'])
    },
    data() {
        return {
            statuses: [
                'Đã ghi nhận', 
                'Đã duyệt',
                'Đã gửi hướng dẫn hoàn trả',
                'Đã nhận hàng trả lại',
                'Đã xử lý hoàn trả',
                'Đã từ chối hoàn trả'
            ],
        };
    },
    methods: {
        formatPrice,
        statusUpdate(ret, status) {
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

            ret.status = status;
            let data = {
                returnId: ret.id,
                status: status,
                staffId: this.getAdmin.id
            };
            try {
                ReturnService.updateStatus(data);
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
            if(this.selectedIds.length == this.returnsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.returns.forEach(review => {
                    this.selectedIds.push(review.id);
                });
            } else {
                this.returns.forEach(review => {
                    this.selectedIds.push(review.id);
                });
            }
        },
        showModalEdit(returnID) {
            this.$emit('update-modal', true);
            this.$emit('update-returnID', returnID);
        }
    },

};
</script>
<style scoped>
    .review i {
        color: #fecb00;
        font-size: 15px;
        margin-right: 2px;
    }
    .review li {
        display: inline-block;
        margin: 0;
    }
    .bg-neg {
        background-color: rgb(255, 197, 197) !important;
    }
    
    .btn.dropdown-toggle {
        background-color: #32ab73;
        color: #fff;
    }

    .dropdown-menu>li>a:hover {
        background-color: #ceffce;
    }
</style>
