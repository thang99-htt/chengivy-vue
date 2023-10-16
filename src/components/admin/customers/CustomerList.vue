<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="2%">#</th>
                <th width="4%">ID</th>
                <th width="14%">Họ tên</th>
                <th width="4%">Email</th>
                <th width="8%">Số điện thoại</th>
                <th width="6%">Giới tính</th>
                <th width="16%">Địa chỉ</th>
                <th width="10%">Tài khoản</th>
                <th width="8%">Trạng thái</th>
                <th width="4%">Sửa</th>
                <th width="4%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(customer, index) in customersList" :key="customer">
                <td>{{ index+1 }}</td>
                <td>{{ customer.user?.id }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.user?.email }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.gender }}</td>
                <td>{{ customer.address?.address }}</td>
                <td>{{ customer.bank_account }}</td>
                <td>
                    <button v-if="customer.user" class="btn-sm" :class="[customer.user.actived == 1 ? 'btn-show' : 'btn-hide']"
                        @click="statusUpdate(customer)">
                        {{ customer.user.actived == 1 ? 'Kích hoạt' : 'Tạm khóa' }}
                    </button>
                    <button v-else class="btn-sm btn-hide">
                        Chưa có TK
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(customer.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(customer.id)" :checked="selectedIds.includes(customer.id)">
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
import CustomerService from "@/services/admin/customer.service";

export default {
    name: 'CustomerList',
    props: {
        customers: { type: Array, required: true },
        customerID: { type: Number, required: true },
        selectedIds: { type: Array, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        customersList() {
            return this.customers;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        statusUpdate(customer) {
            try {
                CustomerService.updateStatus(customer.id, customer.status).then(() => {
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
            if(this.selectedIds.length == this.customersList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.customers.forEach(customer => {
                    this.selectedIds.push(customer.id);
                });
            } else {
                this.customers.forEach(customer => {
                    this.selectedIds.push(customer.id);
                });
            }
        },
        showModalEdit(customerID) {
            this.$emit('update-modal', true);
            this.$emit('update-customerID', customerID);
        }
    },

};
</script>

<style>
.btn-staff {
    color: #363636;
    color: #dc5400;
    font-weight: bold;
    background-color: #ffeed5;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>