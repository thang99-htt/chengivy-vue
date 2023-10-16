<template>
    <Form
        @submit="submitRegister"
        :validation-schema="registerFormSchema"
    >
        <div class="form-group">
            <label for="name">Họ Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="form.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="phone"
                type="text"
                class="form-control"
                v-model="form.phone"
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
                v-model="form.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="form.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password_confirmation">Nhập lại mật khẩu
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="password_confirmation"
                type="password"
                class="form-control"
                v-model="form.password_confirmation"
            />
            <ErrorMessage name="password_confirmation" class="error-feedback" />
        </div>
        <div class="form-group d-flex align-items-center justify-content-end">
            <a class="text-decoration-underline text-sm text-gray-600 hover:text-gray-900" href="/login">
                Bạn đã có tài khoản?
            </a>
            <div class="button">
                <button class="ms-2 btn">
                    Đăng ký
                </button>
            </div>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { reactive } from "vue";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        setup() {
          let form = reactive({
            name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: ''
          });
          return {
            form
          }
        },
        emits: ["submit:register"],
        data() {
            const registerFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Họ tên phải có giá trị.")
                .min(6, "Họ tên phải ít nhất 6 ký tự.")
                .max(30, "Họ tên có nhiều nhất 30 ký tự."),
                phone: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Địa chỉ email không hợp lệ."),
                password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự."),
                password_confirmation: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự.")
                .oneOf([yup.ref('password'), null], 'Mật khẩu phải khớp'),
            });
            return {
                registerFormSchema,
            };
        },
        methods: {
            submitRegister() {
                this.$emit("submit:register", this.form);
            },
        },
    };
</script>

<style scoped>
.form-group {
    margin-top: 20px;
}
.form-group label {
    margin-bottom: 10px;
}

.form-control {
    padding: 10px;
}
</style>