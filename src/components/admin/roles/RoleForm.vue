<template>
    <Form
        @submit="submitRole"
        :validation-schema="roleFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="roleLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="roleLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="role_id">Quyền
                <span class="error-feedback">*</span>
            </label>     
            <div
                v-for="permission in permissions"
                :key="permission" 
            >
                <p class="fs-5 m-2">{{ permission.name }}</p>
                <div 
                    v-if="permission.childs.length > 0" 
                    v-for="child in permission.childs" :key="child"
                    class="d-inline-flex w-50 align-items-baseline px-4"
                >
                    <input 
                        v-model="roleLocal.permission_id" 
                        :id="child.id" name="permission_id" 
                        type="checkbox" :value="child.id"
                        class="me-2"
                    /> 
                    <label for="permission_id">{{ child.name }}</label>
                </div>
            </div>
            <ErrorMessage name="permission_id" class="error-feedback" />
        </div>
        <div class="form-group mt-5">
            <button type="button" class="btnAdd" @click="submitRole">
                <i class="fa fa-plus"></i>Thực hiện
            </button>
            <button type="button" class="btnBack ms-2" @click="reset">
                <i class="fa fa-refresh"></i>Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import PermissionService from "@/services/admin/permission.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        emits: ["submit:role", "delete:role"],
        props: {
            role: { type: Object, required: true }
        },
        data() {
            const roleFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(1000, "Mô tả có nhiều nhất 1000 ký tự."),
            });
            return {
                roleLocal: this.role,
                roleFormSchema,
                permissions: []
            };
        },
        watch: {
            'role'(newValue) {
                this.roleLocal = newValue;
            },
        },
        methods: {
            submitRole() {
                this.$emit("submit:role", this.roleLocal);
            },
            deleteRole() {
                this.$emit("delete:role", this.roleLocal.id);
            },
            reset () {
                this.roleLocal.name = "";
                this.roleLocal.description = "";
            },
        },
        mounted() {
            PermissionService.getAll().then((response) => {
                this.permissions = response;
            });
        }
    };
</script>
<style scoped>
    
</style>
