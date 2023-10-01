<template>
    <Form
        @submit="submitPassword"
        :validation-schema="passwordFormSchema"
    > 
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="password">Mật khẩu hiện tại
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <Field 
                            name="password"
                            :type="showPassword ? 'text' : 'password'"
                            class="form-control"
                            v-model="passwordLocal.password"
                        />
                        <button @mousedown="showPassword = !showPassword" @mouseup="showPassword = !showPassword">
                            <i class="bi bi-eye-fill"></i>
                        </button>     
                    </div>
                    <ErrorMessage name="password" class="error-feedback" />       
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="new_password">Mật khẩu mới
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <Field 
                            name="new_password"
                            type="password"
                            class="form-control"
                            v-model="passwordLocal.new_password"
                        />
                        <button @mousedown="showPasswordNew = !showPasswordNew" @mouseup="showPasswordNew = !showPasswordNew">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                    </div>
                    <ErrorMessage name="new_password" class="error-feedback" />    
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="confirm_password">Nhập lại mật khẩu
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <Field 
                            name="confirm_password"
                            type="password"
                            class="form-control"
                            v-model="passwordLocal.confirm_password"
                        />
                        <button @mousedown="showPasswordConfirm = !showPasswordConfirm" @mouseup="showPasswordConfirm = !showPasswordConfirm">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                    </div>
                    <ErrorMessage name="confirm_password" class="error-feedback" />    
                </div>
            </div>
        </div>
        <div class="form-group mt-5 text-center">
            <button type="button" class="btnAdd" @click="submitPassword">
                <i class="fa fa-plus"></i>Thực hiện
            </button>
            <button type="button" class="btnBack ms-2" @click="reset">
                <i class="fa fa-refresh"></i>Hủy
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
        emits: ["submit:accountPassword"],
        props: {
            accountPassword: { type: Object, required: true },
        },
        data() {
            const passwordFormSchema = yup.object().shape({
                password: yup
                .string()
                .required("Vui lòng nhập mật khẩu.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(30, "Mật khẩu có nhiều nhất 12 ký tự."),
                new_password: yup
                .string()
                .required("Vui lòng nhập mật khẩu mới.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(30, "Mật khẩu có nhiều nhất 12 ký tự."),
                confirm_password: yup
                .string()
                .required("Vui lòng nhập lại mật khẩu.")
                .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
                .max(30, "Mật khẩu có nhiều nhất 30 ký tự.")
                .oneOf([yup.ref('new_password'), null], 'Mật khẩu phải khớp.'),
            });
            return {
                passwordFormSchema,
                passwordLocal: this.accountPassword,
                showPassword: false,
                showPasswordNew: false,
                showPasswordConfirm: false,
            };
        },
        methods: {
            submitPassword() {
                this.$emit("submit:accountPassword", this.passwordLocal);
            },
            reset () {
                this.passwordLocal.password = "";
                this.passwordLocal.new_password = "";
                this.passwordLocal.confirm_password = "";
            },
        },
    };
</script>
