<template>
    <Form
        @submit="submitLogin"
        :validation-schema="loginFormSchema"
    >
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
            <Field v-slot="{ field }" name="remember" type="checkbox" :value="false">
            <label>
                <input type="checkbox" name="remember" v-bind="field" :value="false" />
                Ghi nhớ tôi
            </label>
            </Field>
        </div>
        <div class="form-group d-flex align-items-center justify-content-end">
            <a class="text-decoration-underline text-sm text-gray-600 hover:text-gray-900" href="">
                Quên mật khẩu?
            </a>
            <div class="button">
                <button class="ms-2 btn">
                    Đăng nhập
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
            email: '',
            password: '',
            device_name: 'browser'
          });
          return {
            form
          }
        },
        emits: ["submit:login"],
        data() {
            const loginFormSchema = yup.object().shape({
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Địa chỉ email không hợp lệ."),
                password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(15, "Mật khẩu có nhiều nhất 15 ký tự."),
            });
            return {
                loginFormSchema,
            };
        },
        methods: {
            submitLogin() {
                this.$emit("submit:login", this.form);
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