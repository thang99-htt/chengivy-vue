<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>Danh sách yêu thích ({{ favorites.favoriteCount }})</h3>
        <div class="profile-item">
            <div class="checkbox-all">
                <div><input type="checkbox" class="m-0 me-2" @change="idAllSelected()">Chọn tất cả</div>
                <div class="button">
                    <button class="btn px-4 py-3 fs-4" @click="addToCart()">Thêm vào giỏ hàng </button>
                </div>
            </div>
            <hr>
            <div class="favorites">
                <div class="row">
                    <div 
                        class="col-lg-3 col-md-4 col-12" 
                        v-for="(item, index) in favorites.getFavoriteItems" :key="item"
                    >
                        <div class="single-product">
                            <div class="product-image">
                                <router-link :to="{
                                    name: 'product.detail',
                                    params: { id: item.id },
                                }">
                                    <img :src="getImage(item.product.image)" alt="#" />
                                </router-link>
                                <span v-if="item.product.discount_percent > 0" class="sale-tag">
                                    SALE
                                </span>
                                <div class="button">
                                    <a v-if="item.deleted_at" href="" class="btn"><i class="fa fa-cart"></i>Ngừng kinh
                                        doanh</a>
                                </div>
                            </div>
                            <router-link :to="{
                                name: 'product.detail',
                                params: { id: item.id },
                            }">
                                <div class="product-info">
                                    <h4 class="title">
                                        <a href="#">{{ item.product.name }}</a>
                                    </h4>
                                    <div class="price">
                                        <span>
                                            {{ formatPrice(item.product.final_price) }}
                                        </span>
                                        <span class="text-decoration-line-through float-end text-secondary"
                                            v-if="item.product.discount_percent > 0">
                                            {{ formatPrice(item.product.price) }}
                                        </span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="product-option">
                            <span>
                                <input type="checkbox" class="m-0 me-2" @change="idSelected(item.product)" :checked="selectedIds.includes(item.product.id)">
                                Chọn sản phẩm
                            </span>
                            <span @click="deleteFavorite(item.id)">Xóa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formatPrice, getImage, showAlert } from '@/utils';
import FavoriteService from "@/services/user/favorite.service";
import CartService from "@/services/user/cart.service";

export default {
    data() {
        return {
            selectedIds: [],
            selectedItems: []
        };
    },
    methods: {
        getImage,
        formatPrice,
        async addToCart() {
            try {
                if(this.getUser) {
                    await FavoriteService.addToCart(this.getUser.id, this.selectedItems).then(async (response) => {
                        showAlert(response);
                        this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                        this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));
                    });
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
        async deleteFavorite(id) {
            try {
                await FavoriteService.delete(id).then(async (response) => {
                    showAlert(response);
                    this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));
                })
            } catch (error) {
                console.log(error.response);
            }
            
        },
        idSelected(product) {
            const index = this.selectedIds.indexOf(product.id);
            if (index === -1) {
                this.selectedIds.push(product.id);
                this.selectedItems.push(product);
            } else {
                this.selectedIds.splice(index, 1);
                this.selectedItems.splice(index, 1);
            }
        },
        idAllSelected() {
            if(this.selectedIds.length == this.favorites.favoriteCount) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
                this.selectedItems.splice(0, this.selectedItems.length);
            } else if(this.selectedIds.length) {
                this.favorites.getFavoriteItems.splice(0, this.selectedIds.length);
                this.favorites.getFavoriteItems.forEach(item => {
                    this.selectedIds.push(item.product.id);
                    this.selectedItems.push(item.product);
                });
            } else {
                this.favorites.getFavoriteItems.forEach(item => {
                    this.selectedIds.push(item.product.id);
                    this.selectedItems.push(item.product);
                });
            }
        }
    },
    mounted() {
        
    },
    computed: {
        ...mapGetters(['getUser', 'favorites']),
    }
};
</script>

<style scoped> 
    .favorites .single-product .product-image img {
        height: 200px;
    }
    .favorites .single-product .product-info {
        padding: 10px;
    }
    .favorites h4,
    .favorites .single-product .product-info .title a {
        margin: 0;
    }
    .favorites .single-product .product-info .title a,
    .favorites .single-product .product-info .price span {
        font-size: 14px;
    }
    .favorites .single-product .product-info .price {
        margin-top: 4px;
    }
    .profile-item .checkbox-all {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .favorites .single-product {
        margin-bottom: 0;
    }
    .favorites .product-option {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 6px 0;
    }
    .favorites .product-option span {
        font-size: 13px;
    }
    .favorites .product-option span:first-child,
    .profile-item .checkbox-all div:first-child {
        display: flex;
        align-items: center;
    }
    .favorites .product-option span:nth-last-child(1) {
        color: #bc0000;
        cursor: pointer;
    }
    .profile-info .button .btn {
        margin-top: 0;
    }
</style>