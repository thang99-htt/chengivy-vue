<template>
    <Form
        @submit="submitPaymentVoucher"
        :validation-schema="paymentVoucherFormSchema"
    >
        <div class="form-group">
            <label for="date">Ngày lập
                <span class="error-feedback">*</span>
                <span v-if="payment_voucherLocal.id" class="ms-3">{{ payment_voucherLocal.date }}</span>
            </label>
            <input 
                name="date"
                type="date"
                class="datepicker d-block"
                v-model="payment_voucherLocal.date">
            <ErrorMessage name="date" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="total_price">Số tiền thanh toán
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="total_price"
                type="number"
                class="form-control"
                v-model="payment_voucherLocal.total_price"
            />
            <ErrorMessage name="total_price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Diễn giải
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="payment_voucherLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="payment_voucherLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deletePaymentVoucher"
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
        emits: ["submit:payment_voucher", "delete:payment_voucher"],
        props: {
            payment_voucher: { type: Object, required: true }
        },
        data() {
            const paymentVoucherFormSchema = yup.object().shape({
                total_price: yup
                .string()
                .required("Số tiền thanh toán phải có giá trị."),
                description: yup
                .string()
                .required("Diễn giải phải có giá trị."),
            });
            return {
                payment_voucherLocal: this.payment_voucher,
                paymentVoucherFormSchema,
            };
        },
        methods: {
            submitPaymentVoucher() {
                this.$emit("submit:payment_voucher", this.payment_voucherLocal);
            },
            deletePaymentVoucher() {
                this.$emit("delete:payment_voucher", this.payment_voucherLocal.id);
            },
            reset () {
                this.payment_voucherLocal.name = "";
                this.payment_voucherLocal.description = "";
            },
        },
    };
</script>
<style scoped>
    
</style>
