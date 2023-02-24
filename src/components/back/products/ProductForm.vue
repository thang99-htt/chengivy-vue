<template>
    <Form
        @submit="submitProduct"
        :validation-schema="productFormSchema"
    >
        <div class="form-group">
            <label for="category_id">Danh mục
                <span class="error-feedback">*</span>
            </label>       
            <Field 
                name="category_id" as="select"
                 class="form-control select"
                 v-model="productLocal.category_id"
            >
                <option disabled value="">Chọn danh mục</option>
                <option v-for="(category, index) in products.categories"
                    :key="category" 
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </Field>  
            <ErrorMessage name="category_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="productLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="productLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá Bán
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="price"
                type="number"
                class="form-control"
                v-model="productLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <span class="error-feedback">*</span>
            <Field 
                name="image"
                type="file"
                class="form-control frm-file"
                accept="image/*"
                @change="onFileChange"
                v-model="productLocal.image"
            />
            <img v-if="image" :src="getImage(image)"
                 alt="Image" class="img-edit img-responsive center-block">
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="type_id">Thể loại
                <span class="error-feedback">*</span>
            </label>       
            <Field 
                name="type_id" as="select"
                class="form-control"
                v-model="productLocal.type_id"
            >
                <option v-for="(type, index) in products.types"
                    :key="type" 
                    :value="type.id"
                >
                    {{ type.name }}
                </option>
            </Field>  
            <ErrorMessage name="type_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="discount_percent">Phần trăm giảm giá</label>
            <Field
                name="discount_percent"
                type="number"
                class="form-control"
                v-model="productLocal.discount_percent"
            />
            <ErrorMessage name="discount_percent" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="productLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deleteProduct"
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
    import ProductService from "@/services/back/product.service";

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
            ProductService.getAdd().then((response) => {
                this.products = response;
            });
        },
        data() {
            const productFormSchema = yup.object().shape({
                category_id: yup
                .string()
                .required("Danh mục phải được chọn."),
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                image: yup
                .string()
                .required("Hình ảnh phải có giá trị."),
                description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(1000, "Mô tả có nhiều nhất 1000 ký tự."),
                price: yup
                .string()
                .required("Giá Bán phải có giá trị."),
                type_id: yup
                .string()
                .required("Thể loại phải được chọn."),
            });
            return {
                productLocal: this.product,
                productFormSchema,
                products: [],
                image: this.product.image,
            };
        },
        methods: {
            onFileChange(event){
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.productLocal.image = reader.result;
                }
                console.log(file);
                reader.readAsDataURL(file);
            },
            submitProduct() {
                this.$emit("submit:product", this.productLocal);
            },
            deleteProduct() {
                this.$emit("delete:product", this.productLocal.id);
            },
            reset () {
                this.productLocal.category_id = "";
                this.productLocal.name = "";
                this.productLocal.img = "";
                this.productLocal.description = "";
                this.productLocal.price = "";
                this.productLocal.type_id = "";
                this.productLocal.discount_percent = "0";
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
        },
        computed: {
            datetime () {
                return new Date()
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
    }
</style>