<template>
    <Form 
        @submit="submitBrand" 
        :validation-schema="brandFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên thương hiệu
                <span class="error-feedback">*</span>
            </label>
            <Field name="name" type="text" class="form-control" v-model="brandLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả
                <span class="error-feedback">*</span>
            </label>
            <Field class="form-control" as="textarea" name="description" v-model="brandLocal.description" rows="8" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <div>
                <Field name="image" type="file" class="frm-file" accept="image/*" @change="onFileChange"
                    v-model="brandLocal.image" id="my-file" />
            </div>
            <div>
                <img src="brandLocal.image" alt="Hình ảnh" class="img-edit img-responsive center-block">
            </div>
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <input type="submit" name="btnSave" value="Thực hiện">
            <input type="button" name="btnDelete" value="Xóa" v-if="brandLocal.id">
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
    emits: ["submit:brand", "delete:brand"],
    props: {
        brand: { type: Object, required: true },
    },
    data() {
        const brandFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(1000, "Mô tả có nhiều nhất 1000 ký tự."),
        });
        return {
            brandLocal: this.brand,
            brandFormSchema,
            valueSelect: 'NULL',
            visible: false
        };
    },
    watch: {
        'brand'(newValue) {
            this.brandLocal = newValue;
        },
    },
    methods: {
        onFileChange(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.brandLocal.image = reader.result;
            }
            // console.log(file);
            reader.readAsDataURL(file);
        },
        submitBrand() {
            this.brandLocal.url = this.brandLocal.name.toLowerCase().replace(/\s+/g, '-');
            this.$emit("submit:brand", this.brandLocal);
        },
        deleteBrand() {
            this.$emit("delete:brand", this.brandLocal.id);
        },
        reset() {
            this.brandLocal.parent_id = "";
            this.brandLocal.name = "";
            this.brandLocal.description = "";
            this.brandLocal.url = "";
        },
		selectOption(brand) {
            if(brand.name == 'NULL') this.brandLocal.parent_id = 0;
			else {
                this.valueSelect = brand.name;
                this.brandLocal.parent_id = brand.id;
            }
            this.visible = false;
		}
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
