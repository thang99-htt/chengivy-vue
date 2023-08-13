<template>
    <Form @submit="submitCart">
        <div class="cart">
            <div class="info-size">
                <div class="d-flex justify-content-between">
                    <p class="size">
                        Size
                        <span class="error-feedback">*</span>
                    </p>
                    <p v-if="inventory.total_final == 0" class="guide text-danger">Hết hàng</p>
                    <p v-else class="guide size-available">{{ inventory.total_final }} sản phẩm có sẵn</p>
                </div>
                <div class="form-group">
                    <div class="multi-size-selector multi-size-selector--4-columns filters-panel-group-box__value-selector">
                        <div class="form__column" v-for="size in getUniqueSizes(product.inventories[0].items)" :key="size"
                            @click="sizeProducts(size.size_id)">
                            <div class="form-input multi-size-selector__size" :class="{
                                'multi-size-selector__size--is-checked': size.size_id == inventoryLocal.size_id,
                                'multi-size-selector__size--out-stock': getOutStock.includes(size.size_id)
                            }">
                                <div class="form-input__wrapper">
                                    <label class="form-input-checkbox">
                                        <div class="form-input-checkbox__input-wrapper">
                                            <input class="form-input-checkbox__input" type="checkbox"
                                                name="size_id" :value="size.size_id"
                                                @change="sizeProducts(size.size_id)">
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
                <div class="info-add__item">
                    <button class="btn bag" type="submit">Thêm vào giỏ hàng</button>
                </div>
                <div class="info-add__item">
                    <div class="btn wish" @click="toggleFavorite(product)">
                        <span class="product-item__favorite-item"
                            :class="{ 'product-item__favorite-item-fill': favoriteProductIds.includes(product.id) }">
                            <i class="bi"
                                :class="favoriteProductIds.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                        </span>
                        <span>Yêu thích</span>
                    </div>
                    <div class="btn checkout" @click="goToCheckout">Mua ngay</div>
                </div>
            </div>
        </div>
    </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapGetters } from 'vuex';
import { showAlert } from '@/utils';
import ProductService from "@/services/user/product.service";
import FavoriteService from "@/services/user/favorite.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        product: { type: Object, required: true },
        cart: { type: Object, required: true },
        inventoryLocal: { type: Object, required: true },
        inventory: { type: Object, required: true },
        isColorSelected: { type: Object, required: true },
    },
    emits: ["submit:cart"],
    data() {
        return {
            productLocal: this.product,
            cartLocal: this.cart,
            favorite: {
                'product_id': '',
            },
            favoriteProductIds: [],
            getOutStock: []
        };
    },
    async created() {
        this.isFavorite();
        this.updateOutStock();
    },
    watch: {
        isColorSelected: {
            immediate: true, // Call the watcher immediately on component creation
            handler: function (newValue) {
                // Call the function to filter and update out-of-stock sizes whenever isColorSelected changes
                this.updateOutStock();
            },
        },
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
            if(!this.getOutStock.includes(size)) {
                this.inventoryLocal.size_id = size;
                this.cartLocal.size_id = size;
            }
        },
        async toggleFavorite(product) {
            this.favorite.product_id = product.id;
            try {
                if (this.getUser) {
                    if (!this.favoriteProductIds.includes(product.id)) {
                        // Thêm vào yêu thích sản phẩm
                        await FavoriteService.create(this.getUser.id, this.favorite).then(async (response) => {
                            showAlert(response);
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id, this.favorite.id));
                        });
                    } else {
                        // Bỏ yêu thích sản phẩm
                        await FavoriteService.deleteByUser(this.getUser.id, product.id).then(async (response) => {
                            showAlert(response);
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));
                        });
                    }

                    // Cập nhật trạng thái yêu thích
                    this.isFavorite();
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Bạn phải là thành viên.'
                    });
                    this.$router.push({ name: "login" });
                }

            } catch (error) {
                console.log(error);
            }

        },
        async isFavorite() {
            if (this.getUser) {
                try {
                    let favoriteList = await FavoriteService.getFavorite(this.getUser.id);
                    this.favoriteProductIds = favoriteList.getFavoriteItems.map(item => item.product_id);
                    return true;
                } catch (error) {
                    console.error(error);
                }
            }
            return false;
        },
        goToCheckout() {
            this.$store.commit('addBuyNow', Object.assign({}, this.cartLocal, this.productLocal));
        },
        getUniqueSizes(sizes) {
            const uniqueSizes = [];
            const sizesSet = new Set();
            for (const size of sizes) {
                if (!sizesSet.has(size.size_name)) {
                    sizesSet.add(size.size_name);
                    uniqueSizes.push(size);
                }
            }
            return uniqueSizes;
        },
        filterByColor(inventories, color_id) {
            return inventories.filter(item => item.color_id === color_id);
        },
        updateOutStock() {
            this.getOutStock = [];
            const desiredColorId = this.isColorSelected.color_id; // Use the value of isColorSelected

            const filteredInventories = this.filterByColor(this.product.inventories[0].items, desiredColorId);

            filteredInventories.forEach(item => {
                if (item.total_final == 0) {
                    this.getOutStock.push(item.size_id);
                }
            });
        },
    },
    computed: {
        ...mapGetters(['getUser', 'productBuyNow']),
    },
};
</script>
<style scoped>
.select {
    appearance: auto;
}

.cart .info-size .multi-size-selector--4-columns .form__column {
    width: calc(10%);
}
</style>
