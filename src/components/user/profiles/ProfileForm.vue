<template>
    <Form
        @submit="submitProfile"
        :validation-schema="pấFormSchema"
    > 
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="name">Họ Tên
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.name"
                    />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="col-6">
                    <label for="phone">Số điện thoại
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="phone"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.phone"
                    />
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="birth_date">Ngày sinh
                        <span class="error-feedback">*</span>
                    </label>
                    <div>
                        <input 
                            type="text" onfocus="(this.type='date')" 
                            class="datepicker booking_input booking_input_a booking_in" 
                            placeholder="Ngày sinh"
                            v-model="profileLocal.birth_date">
                    </div>
                </div>
                <div class="col-6">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="mt-1">
                        <Field name="gender" type="radio" value="Male" v-model="profileLocal.gender"/>
                        <span class="text-dark ms-2">Nam</span>
                        <Field name="gender" type="radio" value="Female" v-model="profileLocal.gender" class="ms-4"/>
                        <span class="text-dark ms-2">Nữ</span>           
                    </div>

                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="account_number">Số tài khoản
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="account_number"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.account_number"
                    />
                    <ErrorMessage name="account_number" class="error-feedback" />
                </div>
            </div>
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
        emits: ["submit:profile"],
        props: {
            profile: { type: Object, required: true },
        },
        data() {
            const pấFormSchema = yup.object().shape({
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
                name: yup
                .string()
                .required("Họ tên phải có giá trị."),
            });
            return {
                pấFormSchema,
                profileLocal: this.profile,
            };
        },
        methods: {
            submitProfile() {
                this.$emit("submit:profile", this.profileLocal);
            },
            reset () {
                this.profileLocal.phone = "";
                this.profileLocal.name = "";
            },
        },
    };
</script>

