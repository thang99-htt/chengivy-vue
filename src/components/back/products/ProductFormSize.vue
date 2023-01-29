<template>
    <Form
        @submit="submitProduct"
        :validation-schema="productFormSchema"
        enctype="multipart/form-data"
    >
        <h5 class="box-title">Thêm mới Size</h5>
        <div class="h-form-item">
            <div class="form-group mt-size"> 
                <Field 
                    name="product_id"
                    type="number"
                    class="form-control"
                    v-model="productLocal.product.id"
                    :value="productLocal.product.id"
                    hidden
                />
            </div>
            <div class="form-group mt-size">
                <label for="size">Size
                    <span class="error-feedback">*</span>
                </label>       
                <Field 
                    name="size" as="select"
                    class="form-control"
                    v-model="productLocal.size"
                >
                    <option v-for="(size, index) in product.sizes"
                        :key="size" 
                        :value="size.id"
                    >
                        {{ size.name }}
                    </option>
                </Field>  
                <ErrorMessage name="size" class="error-feedback" />
            </div>
            <div class="form-group mt-size">
                <label for="quantity">Số lượng
                    <span class="error-feedback">*</span>
                </label>
                <Field 
                    name="quantity"
                    type="number"
                    class="form-control"
                    v-model="productLocal.quantity"
                />
                <ErrorMessage name="quantity" class="error-feedback" />
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
            ProductService.view().then((response) => {
                this.products = response;
            });
        },
        data() {
            const productFormSchema = yup.object().shape({
                size: yup
                .string()
                .required("Size phải được chọn."),
                quantity: yup
                .string()
                .required("Số lượng phải có giá trị.")
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
            reset () {
                this.productLocal.size = "";
                this.productLocal.quantity = "";
            },
        },
    };
</script>
<style scoped>
    .h-form-item {
        height: 250px;
    }
    
    .mt-size {
        padding: 16px 0;
    }
</style>
