<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="2%">#</th>
                <th width="6%">ID</th>
                <th width="14%">Họ tên</th>
                <th width="12%">Email</th>
                <th width="12%">Số điện thoại</th>
                <th width="14%">Hạng mức</th>
                <th width="16%">Điểm tích lũy</th>
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
                <td>
                    <span
                        :class="{'level1': customer.user?.level == 'MEMBER',
                    'level2': customer.user?.level == 'SILVER', 'level3': customer.user?.level == 'GOLD',
                    'level4': customer.user?.level == 'PLATINUM', 'level5': customer.user?.level == 'DIAMOND' }"
                    >
                        {{ customer.user?.level }}
                    </span>
                </td>
                <td>{{ (customer.user?.point).toLocaleString() }}</td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(customer.id)" :checked="selectedIds.includes(customer.id)">
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
import CustomerService from "@/services/admin/customer.service";

export default {
    name: 'CustomerList',
    props: {
        customers: { type: Array, required: true },
        selectedIds: { type: Array, required: true },
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

.level1,
.level12,
.level3,
.level4,
.level5 {
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 4px;
}
.level1 {
    background-color: #16ad02;
}
.level2 {
    background-color: #fc46cc;
}
.level3 {
    background-color: #005eff;
}
.level4 {
    background-color: #da0101;
}
.level5 {
    background-color: #e0be00;
}
</style>