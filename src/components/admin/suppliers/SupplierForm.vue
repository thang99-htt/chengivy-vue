<template>
    <Form
        @submit="submitSupplier"
        :validation-schema="supplierFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="supplierLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="supplierLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="supplierLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="supplierLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <input type="submit" name="btnSave" value="Thực hiện">
            <input type="button" name="btnDelete" value="Xóa" v-if="supplierLocal.id">
            <input type="button" name="btnBack" value="Hủy" v-else @click="reset">
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
        emits: ["submit:supplier", "delete:supplier"],
        props: {
            supplier: { type: Object, required: true }
        },
        data() {
            const supplierFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                address: yup
                .string()
                .required("Địa chỉ phải có giá trị."),
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Địa chỉ email không hợp lệ."),
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
            });
            return {
                supplierLocal: this.supplier,
                supplierFormSchema,
            };
        },
        methods: {
            submitSupplier() {
                this.$emit("submit:supplier", this.supplierLocal);
            },
            deleteSupplier() {
                this.$emit("delete:supplier", this.supplierLocal.id);
            },
            reset () {
                this.supplierLocal.name = "";
                this.supplierLocal.description = "";
            },
        },
    };
</script>
<style scoped>
    
</style>
