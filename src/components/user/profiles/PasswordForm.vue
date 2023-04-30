<template>
    <Form
        @submit="submitPassword"
        :validation-schema="passwordFormSchema"
    > 
        <div class="form-group">
            <label for="password">Mật khẩu hiện tại
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="password"
                type="password"
                class="form-control"
                v-model="passwordLocal.password"
            />
            <ErrorMessage name="password" class="error-feedback" />            
        </div>
        <div class="form-group">
            <label for="new_password">Mật khẩu mới
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="new_password"
                type="password"
                class="form-control"
                v-model="passwordLocal.new_password"
            />
            <ErrorMessage name="new_password" class="error-feedback" />            
        </div>
        <div class="form-group">
            <label for="confirm_password">Nhập lại mật khẩu
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="confirm_password"
                type="password"
                class="form-control"
                v-model="passwordLocal.confirm_password"
            />
            <ErrorMessage name="confirm_password" class="error-feedback" />            
        </div>
        <div class="form-group">
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

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:password"],
        props: {
            accountPassword: { type: Object, required: true },
        },
        data() {
            const passwordFormSchema = yup.object().shape({
                // phone: yup
                // .string()
                // .required("Số điện thoại phải có giá trị.")
                // .matches(
                //     /((09|03|07|08|05)+([0-9]{8})\b)/g,
                //     "Số điện thoại không hợp lệ."
                // ),
                // name: yup
                // .string()
                // .required("Họ tên phải có giá trị."),
            });
            return {
                passwordFormSchema,
                passwordLocal: this.accountPassword,
            };
        },
        methods: {
            submitPassword() {
                this.$emit("submit:password", this.passwordLocal);
            },
            reset () {
                this.passwordLocal.password = "";
                this.passwordLocal.new_password = "";
                this.passwordLocal.confirm_password = "";
            },
        },
    };
</script>

