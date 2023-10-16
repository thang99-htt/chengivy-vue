<template>
    <Form
        @submit="submitCustomer"
        :validation-schema="customerFormSchema"
    >
        <div class="form-group">
            <label for="name">Họ tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="customerLocal.name"
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
                v-model="customerLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="py-2">
                        <Field name="gender" v-model="customerLocal.gender" type="radio" value="Nam"/> Nam
                        <Field name="gender" v-model="customerLocal.gender" type="radio" value="Nữ" class="ms-4" /> Nữ
                    </div>
                    <ErrorMessage name="gender" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group mt-5">
            <button type="button" class="btnAdd" @click="submitCustomer">
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

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:customer", "delete:customer"],
        props: {
            customer: { type: Object, required: true },
            reset: { type: Function, required: true },
        },
        watch: {
            'customer'(newValue) {
                this.customerLocal = newValue;
            },
        },
        data() {
            const customerFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Vui lòng nhập họ tên.")
                .min(2, "Họ tên phải ít nhất 2 ký tự.")
                .max(50, "Họ tên có nhiều nhất 50 ký tự."),
                phone: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
            });
            return {
                customerLocal: this.customer,
                customerFormSchema,
            };
        },
        methods: {
            submitCustomer() {
                this.$emit("submit:customer", this.customerLocal);
            },
            emitReset() {
                this.reset();
                console.log('a')
            }
        },
    };
</script>
