<template>
    <Form
        @submit="submitStaff"
        :validation-schema="staffFormSchema"
    >
        <div class="form-group">
            <label for="name">Họ tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="staffLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="staffLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="staffLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="indentity_card">CCCD/CMT
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="indentity_card"
                type="text"
                class="form-control"
                v-model="staffLocal.identity_card"
            />
            <ErrorMessage name="indentity_card" class="error-feedback" />
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="py-2">
                        <Field name="gender" v-model="staffLocal.gender" type="radio" value="Male"/> Nam
                        <Field name="gender" v-model="staffLocal.gender" type="radio" value="Female" class="ms-4" /> Nữ
                    </div>
                    <ErrorMessage name="gender" class="error-feedback" />
                </div>
                <div class="col-6">
                    <label for="birth_date">Ngày sinh
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="py-1">
                        <input type="date" v-model="staffLocal.birth_date" class="p-1">
                    </div>
                    <ErrorMessage name="birth_date" class="error-feedback" />
                </div>
                
            </div>
        </div>
        <div class="form-group">
            <div>
                <label for="address">Địa chỉ
                    <span class="error-feedback">*</span>
                </label>
                <Field
                    name="address"
                    type="text"
                    class="form-control"
                    v-model="staffLocal.address"
                />
                <ErrorMessage name="address" class="error-feedback" />
            </div>
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="staffLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deleteStaff"
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
    import DatePicker from 'vue3-datepicker';

    export default {
        components: {
            DatePicker,
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:staff", "delete:staff"],
        props: {
            staff: { type: Object, required: true }
        },
        data() {
            const staffFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Địa chỉ email không hợp lệ."),
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
                gender: yup
                .string()
                .required("Giới tính phải có giá trị."),
                address: yup
                .string()
                .required("Địa chỉ phải có giá trị."),
                indentity_card: yup
                .string()
                .required("CCCD/CMT phải có giá trị."),

            });
            return {
                staffLocal: this.staff,
                staffFormSchema,
                searchText: "",
                birth_date: new Date("1990-01-01"),
            };
        },
        methods: {
            submitStaff() {
                this.$emit("submit:staff", this.staffLocal);
            },
            deleteStaff() {
                this.$emit("delete:staff", this.staffLocal.id);
            },
            reset () {
                this.staffLocal.name = "";
                this.staffLocal.description = "";
            },
        },
    };
</script>
<style scoped>
    
</style>
