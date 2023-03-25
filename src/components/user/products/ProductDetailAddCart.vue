<template>
    <Form
        :validation-schema="productFormSchema"
        @submit="submitCart"
    >
        <div class="cart">
            <div class="info-size">
                <div class="d-flex justify-content-between">
                    <p>
                        Size
                        <span class="error-feedback">*</span>
                    </p>
                    <p v-if="product_stock" class="guide">{{ product_stock }} sản phẩm có sẵn</p>
                    <p v-if="product_stock == 0" class="guide text-danger">Hết hàng</p>
                </div>
                <div class="form-group">
                    <Field 
                        @change="changeSize($event)"
                        name="size_id" as="select"
                        class="form-control select"
                        v-model="cartLocal.size"
                    >
                        <option disabled value="">Vui lòng chọn size</option>
                        <option v-for="(size, index) in product.sizes"
                            :key="size" 
                            :value="size.id"
                        >
                            {{ size.name }} 
                        </option>
                    </Field>      
                    <!-- <p class="text-secondary">{{ size.pivot.stock }}  sản phẩm có sẵn.</p> -->
                    <ErrorMessage name="size_id" class="error-feedback" />
                </div>
            </div>
            <div class="info-quantity">
                <div class="d-flex align-items-end">
                    <p>Số lượng</p>
                    <div class="number-input">
                        <a @click="reduce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </a>
                        <Field
                            name="quantity"
                            type="number"
                            class="quantity"
                            v-model="cartLocal.quantity"
                        />
                        <a class="plus" @click="increase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="info-add">
                <div class="row">
                    <div class="d-grid gap-2">
                        <button class="btn bag" type="submit">Add to Bag</button>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import ProductService from "@/services/user/product.service";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            product: { type: Object, required: true },
            cart: { type: Object, required: true },
        },
        emits: ["submit:cart"],
        data() {
            const productFormSchema = yup.object().shape( {
                size_id: yup
                .string()
                .required("Size phải được chọn."),
            });
            return {
                productLocal: this.product,
                cartLocal: this.cart,
                productFormSchema,
                products: [],
                product_stock: null
            };
        },
        methods: {
            submitCart() {
                this.$emit("submit:cart", this.cartLocal);
            },
            reduce() {
                if (this.cartLocal.quantity > 1) this.cartLocal.quantity--;
            },
            increase() {
                this.cartLocal.quantity++;
            },
            async changeSize(event) {
                await ProductService.getStock(this.productLocal.id, event.target.value).then((response) => {
                    this.product_stock = response;
                    console.log(response);
                });
            },
        },
    };
</script>
<style scoped>
    .img-edit {
        width: 100px;
        margin: 10px 0 0 0;
    }
    .active {
        opacity: 1;
    }
    .select {
        appearance: auto;
    }
</style>
