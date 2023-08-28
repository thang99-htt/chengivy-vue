<template>
    <Form 
        @submit="submitVoucher" 
        :validation-schema="voucherFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field name="name" type="text" class="form-control" v-model="voucherLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="condition">Điều kiện
                <span class="error-feedback">*</span>
            </label>
            <Field class="form-control" type="text" name="condition" v-model="voucherLocal.condition" />
            <ErrorMessage name="condition" class="error-feedback" />
        </div>
        <div class="form-group">
            <div class="d-flex justify-content-between">
                <div>
                    <label for="level">Ngưỡng
                        <span class="error-feedback">*</span>
                    </label>
                    <Field class="form-control" type="number" name="level" v-model="voucherLocal.level" rows="8" />
                    <ErrorMessage name="level" class="error-feedback" />
                </div>
                <div>
                    <label for="discount">Tỷ lệ giảm
                        <span class="error-feedback">*</span>
                    </label>
                    <Field class="form-control" type="number" name="discount" v-model="voucherLocal.discount" rows="8" />
                    <ErrorMessage name="discount" class="error-feedback" />
                </div>
                <div>
                    <label for="quantity_initial">Số lượng ban đầu
                        <span class="error-feedback">*</span>
                    </label>
                    <Field class="form-control" type="number" name="quantity_initial" v-model="voucherLocal.quantity_initial" rows="8" />
                    <ErrorMessage name="quantity_initial" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="d-flex justify-content-between">
                <div>
                    <label for="date_start">Ngày bắt đầu
                        <span class="error-feedback">*</span>
                    </label>
                    <input name="date_start" type="datetime-local" class="datepicker d-block"
                        v-model="voucherLocal.date_start">
                    <ErrorMessage name="date_start" class="error-feedback" />
                </div>
                <div>
                    <label for="date_end">Ngày kết thúc
                        <span class="error-feedback">*</span>
                    </label>
                    <input name="date_end" type="datetime-local" class="datepicker d-block"
                        v-model="voucherLocal.date_end">
                    <ErrorMessage name="date_end" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh
                <span class="error-feedback">*</span>
            </label>
            <div>
                <Field name="image" type="file" class="frm-file" accept="image/*" @change="onFileChange"
                    v-model="voucherLocal.image" id="my-file" />
            </div>
            <div>
                <img :src="voucherLocal.image" alt="Hình ảnh" class="img-edit img-responsive center-block">
            </div>
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <input type="submit" name="btnSave" value="Thực hiện">
            <input type="button" name="btnDelete" value="Xóa" v-if="voucherLocal.id">
            <input type="button" name="btnBack" value="Hủy" v-else @click="reset">
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
    emits: ["submit:voucher", "delete:voucher"],
    props: {
        voucher: { type: Object, required: true },
    },
    data() {
        const voucherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập tên phiếu khuyến mãi.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(30, "Tên có nhiều nhất 30 ký tự."),
            condition: yup
                .string()
                .required("Vui lòng nhập điều kiện.")
                .min(2, "Điều phải ít nhất 2 ký tự.")
                .max(255, "Điều có nhiều nhất 255 ký tự."),
            level: yup
                .string()
                .required("Vui lòng nhập ngưỡng giá.")
                .min(4, "Ngưỡng giá phải ít nhất 4 ký tự.")
                .max(8, "Ngưỡng giá có nhiều nhất 8 ký tự."),
            discount: yup
                .string()
                .required("Vui lòng nhập tỷ lệ giảm.")
                .test('is-valid-discount', "Tỷ lệ giảm không quá 100 (%).", value => {
                    if (!value) return true; // Cho phép trường rỗng nếu đã bị yêu cầu (required).
                        const parsedValue = parseFloat(value);
                    return parsedValue >= 0 && parsedValue <= 100;
                }),
            quantity_initial: yup
                .string()
                .required("Vui lòng nhập số lượng ban đầu."),
        });
        return {
            voucherLocal: this.voucher,
            voucherFormSchema,
        };
    },
    watch: {
        'voucher'(newValue) {
            this.voucherLocal = newValue;
        },
    },
    methods: {
        onFileChange(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.voucherLocal.image = reader.result;
            }
            // console.log(file);
            reader.readAsDataURL(file);
        },
        submitVoucher() {
            this.$emit("submit:voucher", this.voucherLocal);
        },
        deleteVoucher() {
            this.$emit("delete:voucher", this.voucherLocal.id);
        },
    },
};
</script>
<style scoped>
.img-edit {
    width: 100px;
    margin: 10px 0 0 0;
}

.select {
    appearance: auto;
}</style>
