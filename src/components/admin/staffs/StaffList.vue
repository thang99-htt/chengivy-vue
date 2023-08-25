<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="2%">ID</th>
                <th width="12%">Họ tên</th>
                <th width="4%">Email</th>
                <th width="8%">Số điện thoại</th>
                <th width="6%">Giới tính</th>
                <th width="14%">Địa chỉ</th>
                <th width="16%">Vai trò</th>
                <th width="8%">Trạng thái</th>
                <th width="6%">Tùy chọn</th>
                <th width="4%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(staff, index) in staffsList" :key="staff">
                <td>{{ staff.id }}</td>
                <td>{{ staff.name }}</td>
                <td>{{ staff.email }}</td>
                <td>{{ staff.phone }}</td>
                <td>{{ staff.gender }}</td>
                <td>{{ staff.address }}</td>
                <td>
                    <div v-for="role in staff.roles" class="btn-staff">
                        {{ role.name }}
                    </div>    
                </td>
                <td>
                    <button class="btn-sm" :class="[staff.actived == 1 ? 'btn-show' : 'btn-hide']"
                        @click="statusUpdate(staff)">
                        {{ staff.actived == 1 ? 'Kích hoạt' : 'Tạm khóa' }}
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn" @click="showModalEdit(staff.id)">
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(staff.id)" :checked="selectedIds.includes(staff.id)">
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
import StaffService from "@/services/admin/staff.service";

export default {
    name: 'StaffList',
    props: {
        staffs: { type: Array, required: true },
        staffID: { type: Number, required: true },
        selectedIds: { type: Array, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        staffsList() {
            return this.staffs;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        statusUpdate(staff) {
            try {
                StaffService.updateStatus(staff.id, staff.status).then(() => {
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
            if(this.selectedIds.length == this.staffsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.staffs.forEach(staff => {
                    this.selectedIds.push(staff.id);
                });
            } else {
                this.staffs.forEach(staff => {
                    this.selectedIds.push(staff.id);
                });
            }
        },
        showModalEdit(staffID) {
            this.$emit('update-modal', true);
            this.$emit('update-staffID', staffID);
        }
    },

};
</script>

<style>
.btn-staff {
    color: #000;
    background-color: #f2a900;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>