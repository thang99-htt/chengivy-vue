<template>
    <Form
        @submit="submitPermission"
        :validation-schema="permissionFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="permissionLocal.name"
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
                v-model="permissionLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="permissionLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deletePermission"
            >
                <i class="fas fa-trash"></i> Xóa
            </button>
            <button
                v-else
                class="btn btn-primary"
                @click="reset"
            >
                <i class="fas fa-redo"></i> Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        emits: ["submit:permission", "delete:permission"],
        props: {
            permission: { type: Object, required: true }
        },
        data() {
            const permissionFormSchema = yup.object().shape({
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
                permissionLocal: this.permission,
                permissionFormSchema,
                searchText: "",
            };
        },
        methods: {
            submitPermission() {
                this.$emit("submit:permission", this.permissionLocal);
            },
            deletePermission() {
                this.$emit("delete:permission", this.permissionLocal.id);
            },
            reset () {
                this.permissionLocal.name = "";
                this.permissionLocal.description = "";
            },
        },
        computed: {
            datetime () {
                return new Date()
            }
        },
    };
</script>
<style scoped>
    
</style>
