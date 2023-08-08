<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="4%">#</th>
                <th width="20%">Tên</th>
                <th width="24%">Địa chỉ</th>
                <th width="20%">Điện thoại</th>
                <th width="20%">Email</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(supplier, index) in suppliersList" :key="supplier">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.address }}</td>
                <td>{{ supplier.phone }}</td>
                <td>{{ supplier.email }}</td>
                <td class="text-center">
                    <button type="button" class="btn">
                        <router-link :to="{
                            name: 'supplier.edit',
                            params: { id: supplier.id },
                        }">
                            <img src="/images/icon/iconedit.png" alt="">
                        </router-link>
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(supplier.id)" :checked="selectedIds.includes(supplier.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="6" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'SupplierList',
    props: {
        suppliers: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        suppliersList() {
            return this.suppliers;
        },
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
        }
    },

};
</script>