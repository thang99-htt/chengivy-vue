<template>
    <Form @submit="submitCart">
        <div class="cart">
            <div class="info-size">
                <div class="d-flex justify-content-between">
                    <p class="size">
                        Size
                        <span class="error-feedback">*</span>
                    </p>
                    <p v-if="product_stock" class="guide size-available">{{ product_stock }} sản phẩm có sẵn</p>
                    <p v-if="product_stock == 0" class="guide text-danger">Hết hàng</p>
                </div>
                <div class="form-group">
                    <div class="multi-size-selector multi-size-selector--4-columns filters-panel-group-box__value-selector">
                        <div class="form__column" v-for="size in product.sizes" :key="size" @click="sizeProducts(size)">
                            <div class="form-input multi-size-selector__size" :class="{ 'multi-size-selector__size--is-checked': size.size_id == selectedSize }">
                                <div class="form-input__wrapper">
                                    <label class="form-input-checkbox">
                                        <div class="form-input-checkbox__input-wrapper">
                                            <input class="form-input-checkbox__input" type="checkbox" id="zds-165"
                                                name="size_id" data-qa-input-qualifier="size" :value="size.size_id"
                                                @change="sizeProducts(size)"
                                                checked="">
                                        </div>
                                        <span class="form-input-checkbox__label">{{ size.size_name }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-quantity">
                <div class="d-flex align-items-end">
                    <p class="fw-bold">Số lượng</p>
                    <div class="number-input">
                        <a @click="reduce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                        </a>
                        <Field name="quantity" type="number" class="quantity" v-model="cartLocal.quantity" />
                        <a class="plus" @click="increase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="info-add">
                <div class="row">
                    <div class="d-grid gap-2">
                        <button class="btn bag" type="submit">Thêm vào giỏ hàng</button>
                    </div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2">
                        <button class="btn checkout" type="submit">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    </Form>
</template>
<script>
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
        return {
            productLocal: this.product,
            cartLocal: this.cart,
            product_stock: null,
            selectedSize: this.product.sizes[0].size_id
        };
    },
    async created() {
        this.product_stock = await ProductService.getStock(this.productLocal.id, this.selectedSize);
        this.cart.size = this.selectedSize;
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
        async sizeProducts(size) {
            this.selectedSize = size.size_id;
            this.product_stock = await ProductService.getStock(this.productLocal.id, this.selectedSize);
            this.cartLocal.size = this.selectedSize;
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
.cart .info-size .multi-size-selector--4-columns .form__column {
    width: calc(10%);
}
</style>
