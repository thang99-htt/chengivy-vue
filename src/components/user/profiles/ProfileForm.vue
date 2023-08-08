<template>
    <Form
        @submit="submitProfile"
        :validation-schema="profileFormSchema"
    >
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="name">Họ Tên
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <Field 
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.name"
                    />
                    <ErrorMessage name="name" class="error-feedback" />     
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="phone">Số điện thoại
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
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
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <ErrorMessage name="new_password" class="error-feedback" />    
                    <Field name="gender" type="radio" value="Nam" v-model="profileLocal.gender" :checked="profileLocal.gender === 'Nam'"/>
                    <span class="text-dark ms-2">Nam</span>
                    <Field name="gender" type="radio" value="Nữ" v-model="profileLocal.gender" :checked="profileLocal.gender === 'Nữ'" class="ms-4"/>
                    <span class="text-dark ms-2">Nữ</span>           
                </div>
            </div>
            <div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="birth_date">Ngày sinh
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <input type="date" v-model="profileLocal.birth_date" class="p-1">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="bank_account">Số tài khoản
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">  
                    <Field 
                        name="bank_account"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.bank_account"
                    />
                    <ErrorMessage name="bank_account" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group text-center">
            <input type="button" name="btnBack" value="Hủy" @click="reset">
            <input type="submit" name="btnSave" value="Thực hiện">
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
        emits: ["submit:accountProfile"],
        props: {
            accountProfile: { type: Object, required: true },
        },
        data() {
            const profileFormSchema = yup.object().shape({
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
                profileFormSchema,
                profileLocal: this.accountProfile,
            };
        },
        methods: {
            submitProfile() {
                this.$emit("submit:accountProfile", this.profileLocal);
            },
            reset () {
                this.profileLocal.phone = "";
                this.profileLocal.name = "";
            },
        },
    };
</script>