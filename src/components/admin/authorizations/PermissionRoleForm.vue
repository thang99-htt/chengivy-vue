<template>{{ permissionRoleLocal }}
    <Form
        @submit="submitPermissionRole"
    > 
        <div class="form-group">
            <label for="name">Vai trò</label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                readonly=""
                v-model="roleLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="staff">Nhân viên</label>
            <div
                v-for="staff in roleLocal.staffs"
                :key="staff" class="d-block btn-permission"
            >
                {{  staff.name  }}
            </div>
        </div>
        <div class="form-group" v-if="role.staffs.length != 0">
            <label>Quyền đã có: </label>
            <div v-for="role1 in role.roles" class="btn-role d-block">
                {{ role1.name }}
            </div>
        </div>
        <div class="form-group">
            <label for="permisison_id">Quyền
                <span class="error-feedback">*</span>
            </label>     
            <div>
                <div
                    v-for="permission in permissions"
                    :key="permission" class="d-inline-flex w-50 align-items-baseline"
                >
                    <input 
                        v-model="permissionRoleLocal.permission_id" 
                        :id="permission.id" name="permisison_id" 
                        type="checkbox" :value="permission.id"
                        class="me-2"
                    /> 
                    <label for="permisison_id">{{ permission.description }}</label>
                </div>
            </div>
            <ErrorMessage name="permisison_id" class="error-feedback" />
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
    import $ from 'jquery'
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import PermissionService from "@/services/admin/permission.service";
    import AuthorizationService from "@/services/admin/authorization.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:permissionRole"],
        props: {
            permissionRole: { type: Object, required: true },
            role: { type: Object, required: true },
        },
        data() {
            return {
                permissionRoleLocal: this.permissionRole,
                roleLocal: this.role,
                permissions: [],
            };
        },
        mounted() {
            PermissionService.getAll().then((response) => {
                this.permissions = response;
            });
        },
        methods: {
            submitPermissionRole() {
                this.$emit("submit:permissionRole", this.permissionRoleLocal);
            },
            reset () {
                this.permissionRoleLocal.permisison_id = [];
            },
        },
    };
</script>

