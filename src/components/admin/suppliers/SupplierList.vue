<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">ID</th>
                <th width="20%">Tên nhà cung cấp</th>
                <th width="22%">Địa chỉ</th>
                <th width="6%">Số điện thoại</th>
                <th width="10%">Email</th>
                <th width="10%">Số tài khoản</th>
                <th width="6%">Mã số thuế</th>
                <th width="8%">Ngày hợp tác</th>
                <th width="8%">Sửa</th>
                <th width="4%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(supplier, index) in suppliersList" :key="supplier">
                <td>{{ supplier.id }}</td>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.address }}</td>
                <td>{{ supplier.phone }}</td>
                <td>{{ supplier.email }}</td>
                <td>{{ supplier.bank_account }}</td>
                <td>{{ supplier.tax_code }}</td>
                <td>{{ supplier.date_cooperate }}</td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(supplier.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(supplier.id)" :checked="selectedIds.includes(supplier.id)">
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
export default {
    name: 'SupplierList',
    props: {
        suppliers: { type: Array, required: true },
        supplierID: { type: Number, required: true },
        selectedIds: { type: Array, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        suppliersList() {
            return this.suppliers;
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
            if(this.selectedIds.length == this.suppliersList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.suppliers.forEach(supplier => {
                    this.selectedIds.push(supplier.id);
                });
            } else {
                this.suppliers.forEach(supplier => {
                    this.selectedIds.push(supplier.id);
                });
            }
        },
        showModalEdit(supplierID) {
            this.$emit('update-modal', true);
            this.$emit('update-supplierID', supplierID);
        }
    },

};
</script>

<style>
.btn-supplier {
    color: #000;
    background-color: #f2a900;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>