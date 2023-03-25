<template>
    <Form
        @submit="submitProduct"
        :validation-schema="productFormSchema"
        enctype="multipart/form-data"
    >
        <h4>Hình Ảnh </h4>
        <div class="h-form-item">
            <div class="form-group"> 
                <Field 
                    name="product_id"
                    type="number"
                    class="form-control"
                    v-model="productLocal.product.id"
                    :value="productLocal.product.id"
                    hidden
                />
            </div>
            <div class="form-group">
                <p>
                    <img :src="getImage(productLocal.product.image)"
                        alt="Image" class="img-edit img-responsive">
                </p>
            </div>
            <div class="form-group mt-3">
                <label for="image">Hình ảnh
                    <span class="error-feedback">*</span>
                </label>
                <Field 
                    name="image"
                    type="file"
                    class="form-control frm-file"
                    accept="image/*"
                    v-model="productLocal.image"
                    @change="onFileChange"
                />
                <ErrorMessage name="image" class="error-feedback" />
            </div>
        </div>
        <div class="form-group mb-3">
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
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import ProductService from "@/services/admin/product.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        emits: ["submit:product", "delete:product"],
        props: {
            product: { type: Object, required: true },
        },
        
        mounted() {
            ProductService.view().then((response) => {
                this.products = response;
            });
        },
        data() {
            const productFormSchema = yup.object().shape({
                image: yup
                .string()
                .required("Hình ảnh phải được chọn."),
            });
            return {
                productLocal: this.product,
                productFormSchema,
                products: [],
            };
        },
        methods: {
            submitProduct() {
                this.$emit("submit:product", this.productLocal);
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
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
        },
    };
</script>
<style scoped>
    .img-edit {
        width: 100px;
        margin: 10px 0 0 0;
    }

    .h-form-item {
        height: 250px;
    }
</style>
