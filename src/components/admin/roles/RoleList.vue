<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="8%">#</th>
                <th width="30%">Vai Trò</th>
                <th width="40%">Mô Tả</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(role, index) in rolesList" :key="role">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(role.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                    <button type="button" class="btn" @click="showModalEdit(role.id)">
                        <img src="/images/icon/icondetail.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(role.id)" :checked="selectedIds.includes(role.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="4" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'RoleList',
    props: {
        roles: { type: Array, default: [] },
        roleID: { type: Number, required: true },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        rolesList() {
            return this.roles;
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
            if(this.selectedIds.length == this.rolesList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.roles.forEach(role => {
                    this.selectedIds.push(role.id);
                });
            } else {
                this.roles.forEach(role => {
                    this.selectedIds.push(role.id);
                });
            }
        },
        showModalEdit(roleID) {
            this.$emit('update-modal', true);
            this.$emit('update-roleID', roleID);
        },
        showModalAuthorization(roleID) {
            this.$emit('update-modal', true);
            this.$emit('update-roleID', roleID);
        }
    },
};
</script>