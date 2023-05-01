<template>
    <Form
        @submit="submitCoupon"
        :validation-schema="couponFormSchema"
    >
        <div class="form-group">
            <label for="date">Ngày lập
                <span class="error-feedback">*</span>
                <span v-if="couponLocal.id" class="ms-3">{{ couponLocal.date }}</span>
            </label>
            <input 
                name="date"
                type="date"
                class="datepicker d-block"
                v-model="couponLocal.date">
            <ErrorMessage name="date" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="supplier_id">Nhà cung cấp
                <span class="error-feedback">*</span>
            </label>       
            <Field 
                name="supplier_id" as="select"
                 class="form-control select"
                 v-model="couponLocal.supplier_id"
            >
                <option disabled value="">Chọn nhà cung cấp</option>
                <option v-for="supplier in suppliers"
                    :key="supplier" 
                    :value="supplier.id"
                >
                    {{ supplier.name }}
                </option>
            </Field>  
            <ErrorMessage name="supplier_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="payment_voucher_id">Phiếu chi
                <span class="error-feedback">*</span>
            </label>       
            <Field 
                name="payment_voucher_id" as="select"
                 class="form-control select"
                 v-model="couponLocal.payment_voucher_id"
            >
                <option disabled value="">Chọn phiếu chi</option>
                <option v-for="payment in payment_vouchers"
                    :key="payment" 
                    :value="payment.id"
                >
                    {{ payment.id }}
                </option>
            </Field>  
            <ErrorMessage name="payment_voucher_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="total_price">Tổng tiền
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="total_price"
                type="number"
                class="form-control"
                v-model="couponLocal.total_price"
            />
            <ErrorMessage name="total_price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="value_added">Thuế GTGT
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="value_added"
                type="number"
                class="form-control"
                v-model="couponLocal.value_added"
            />
            <ErrorMessage name="value_added" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="total_value">Tổng giá trị
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="total_value"
                type="number"
                class="form-control"
                v-model="couponLocal.total_value"
            />
            <ErrorMessage name="total_value" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Chứng từ gốc</label>
            <Field 
                name="image"
                type="file"
                class="form-control frm-file"
                accept="image/*"
                @change="onFileChange"
                v-model="couponLocal.image"
            />
            <img v-if="image" :src="getImage(image)"
                 alt="Image" class="img-edit img-responsive center-block">
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="couponLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deleteCoupon"
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
    import SupplierService from "@/services/admin/supplier.service";
    import PaymentVoucherService from "@/services/admin/payment-voucher.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        emits: ["submit:coupon", "delete:coupon"],
        props: {
            coupon: { type: Object, required: true }
        },
        data() {
            const couponFormSchema = yup.object().shape({
                supplier_id: yup
                .string()
                .required("Nhà cung cấp phải được chọn."),
                payment_voucher_id: yup
                .string()
                .required("Phiếu chi phải được chọn."),
                total_price: yup
                .string()
                .required("Tổng tiền phải có giá trị."),
                value_added: yup
                .string()
                .required("Thuế GTGT phải có giá trị."),
                total_value: yup
                .string()
                .required("Tổng giá trị phải có giá trị."),
            });
            return {
                couponLocal: this.coupon,
                couponFormSchema,
                suppliers: [],
                payment_vouchers: [],
            };
        },
        methods: {
            submitCoupon() {
                this.$emit("submit:coupon", this.couponLocal);
            },
            deleteCoupon() {
                this.$emit("delete:coupon", this.couponLocal.id);
            },
            onFileChange(event){
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.productLocal.image = reader.result;
                }
                console.log(file);
                reader.readAsDataURL(file);
            },
            async retrieveSuppliers() {
                try {
                    this.suppliers = await SupplierService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            async retrievePaymentVouchers() {
                try {
                    this.payment_vouchers = await PaymentVoucherService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.retrieveSuppliers();
            this.retrievePaymentVouchers();
        },
    };
</script>
<style scoped>
    
</style>
