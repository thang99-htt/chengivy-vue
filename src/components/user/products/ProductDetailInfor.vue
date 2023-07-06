<template>
    <div class="detail-info">
        <div class="info-name">
            <h3>{{ product.name }}</h3>
            <div class="product-item__favorite" @click="toggleFavorite(product)">
                <span class="product-item__favorite-item"
                    :class="{ 'product-item__favorite-item-fill': favoriteProductIds.includes(product.id) }">
                    <i class="bi" :class="favoriteProductIds.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                </span>
            </div>
        </div>
        <div class="info-category">
            <p>{{ product.category }} - {{ product.type }}</p>
        </div>
        <div class="info-price">
            <p>{{ formatPrice(product.final_price) }}</p>
        </div>
        <div class="info-price">
            <span class="filters-panel-group-item__item-box circle" :style="`background-color: ${product.color.color}`"></span>
        </div>
        <hr>
        <div class="info-des">
            <p>{{ product.description }}</p>
        </div>
    </div>
</template>
<script>
import FavoriteService from "@/services/user/favorite.service";
import { formatPrice } from '@/utils';
import { mapGetters } from 'vuex';

export default {
    props: {
        product: { type: Object, required: true },
    },
    data() {
        return {
            favorite: {
                'product_id': '',
            },
            favoriteProductIds: []
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    async created() {
        this.isFavorite();
    },
    methods: {
        formatPrice,
        async toggleFavorite(product) {
            this.favorite.product_id = product.id;
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
            try {
                if (this.getUser) {
                    if (!this.favoriteProductIds.includes(product.id)) {
                        // Thêm vào yêu thích sản phẩm
                        await FavoriteService.create(this.getUser.id, this.favorite).then(async (response) => {
                            if (response == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Sản phẩm đã được thêm vào danh sách yêu thích.'
                                });
                                this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id, this.favorite.id));

                            } else if (response == false) {
                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Sản phẩm đã được yêu thích.'
                                });
                            }
                        });
                    } else {
                        // Bỏ yêu thích sản phẩm
                        await FavoriteService.delete(this.getUser.id, product.id).then(async (response) => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Sản phẩm đã được xoá khỏi danh sách yêu thích.'
                            });
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));

                            // this.$store.commit('removeFavorite', await FavoriteService.delete(this.getUser.id, product.id));
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
        }
    }
};
</script>

