<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="4%">#</th>
                <th width="28%">Quyền</th>
                <th width="28%">Mô Tả</th>
                <th width="28%">Ngày</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(permission, index) in permissionsList" :key="permission">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>{{ permission.name }}</td>
                <td>{{ permission.description }}</td>
                <td>{{ new Date(permission.created_at).toLocaleString() }}</td>
                <td class="text-center">
                    <button type="button" class="btn">
                        <router-link :to="{
                            name: 'permission.edit',
                            params: { id: permission.id },
                        }">
                            <img src="/images/icon/iconedit.png" alt="">
                        </router-link>
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(permission.id)" :checked="selectedIds.includes(permission.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="5" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'PermissionList',
    props: {
        permissions: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        permissionsList() {
            return this.permissions;
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
            if(this.selectedIds.length == this.permissionsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.permissions.forEach(permission => {
                    this.selectedIds.push(permission.id);
                });
            } else {
                this.permissions.forEach(permission => {
                    this.selectedIds.push(permission.id);
                });
            }
        }
    },

};
</script>
