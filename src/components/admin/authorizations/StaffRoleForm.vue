<template>
    <Form
        @submit="submitRoleStaff"
    > 
        <div class="form-group">
            <label for="name">Nhân viên</label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                readonly=""
                v-model="staffLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group" v-if="staff.roles.length != 0">
            <label>Vai trò đã có: </label>
            <div v-for="role1 in staff.roles" class="btn-staff d-block">
                {{ role1.name }}
            </div>
        </div>
        <div class="form-group">
            <label for="role_id">Vai trò
                <span class="error-feedback">*</span>
            </label>     
            <div
                v-for="role in roles"
                :key="role" 
            >
                <input 
                    v-model="roleStaffLocal.role_id" 
                    :id="role.id" name="role_id" 
                    type="checkbox" :value="role.id"
                    class="me-2"
                /> 
                <label for="role_id">{{ role.description }}</label>
            </div>
            <ErrorMessage name="role_id" class="error-feedback" />
        </div>
        <div class="form-group mt-5">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                class="btn btn-primary"
                @click="reset"
            >
                <i class="fas fa-redo"></i> Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import RoleService from "@/services/admin/role.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:roleStaff"],
        props: {
            roleStaff: { type: Object, required: true },
            staff: { type: Object, required: true },
        },
        data() {
            return {
                roleStaffLocal: this.roleStaff,
                staffLocal: this.staff,
                roles: [],
            };
        },
        mounted() {
            RoleService.getAll().then((response) => {
                this.roles = response;
            });
        },
        methods: {
            submitRoleStaff() {
                this.$emit("submit:roleStaff", this.roleStaffLocal);
            },
            reset () {
                this.roleStaffLocal.role_id = [];
            },
        },
    };
</script>

