<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <div class="return-guide">
            <h3 class="mt-0">Đánh giá sản phẩm</h3>
        </div>

        <div v-if="reviews.length>0" class="profile-item" v-for="review in reviews" :key="ret">
            <hr>
            <div class="return-cancel">
                <h3>Mã đánh giá #{{ review.id }}</h3>
                <div class="button">
                    <button class="btn" @click="deleteReview(review.id)">Xóa</button>
                </div>
            </div>
            <router-link class="d-block" :to="{
                name: 'product.detail',
                params: { id: review.product.id },
            }">
                <div class="purchase-content">
                    <div class="purchase-item">
                        <div class="purchase-info">
                            <div class="d-flex">
                                <img class="d-block me-3" width="100" :src="review.product.product_image[0].image" alt="">
                                <div>
                                    <router-link :to="{
                                        name: 'product.detail',
                                        params: { id: review.product.id },
                                    }" class="text-dark">
                                        {{ review.product.name }}
                                    </router-link>
                                    <p>Phân loại: {{ review.classify }}</p>
                                    <p>
                                        <span class="me-3">{{ formatPrice(review.product.price) }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="return-head">
                <p>
                    <ul class="review">
                        <li v-for="i in 5" :key="i">
                            <i v-if="i <= review.star" class="bi bi-star-fill"></i>
                            <i v-else class="bi bi-star"></i>
                        </li>
                    </ul>
                    <span v-if="review.fitted_value==1">Nhỏ</span>
                    <span v-else-if="review.fitted_value==2">Đúng kích cỡ</span>
                    <span v-else>Lớn</span>
                </p>
                <p class="return-status">
                    <span>
                        <a class="text-primaly">Ngày đánh giá: {{ review.date }}</a>
                    </span>
                </p>
            </div>
            <p>Nội dung đã đánh giá: {{ review.content }}</p>
            <div class="return-image">
                <span v-for="image in review.review_image" :key="image">
                    <img :src="image.image" alt="">
                </span>
            </div>
        </div>
        <div v-else class="d-flex flex-column align-items-center mt-5">
            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b96488590b8f781f.png" alt="" width="150">
            <p class="mt-3">Bạn hiện không có Đánh giá sản phẩm nào.</p>
        </div>
    </div>
</template>
<script>
import UserService from "@/services/user/user.service";
import { formatPrice } from '@/utils';
import { mapGetters } from 'vuex';

export default {
    components: {

    },
    data() {
        return {
            reviews: []
        };
    },
    methods: {
        formatPrice,
        async retrieveReviews() {
            try {
                this.reviews = await UserService.getReviews(this.getUser.id);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReview(review) {
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
            await UserService.deleteReview(review);
            this.retrieveReviews();
            Toast.fire({
                    icon: 'success',
                    title: 'Xóa đánh giá thành công.'
                });
        }
    },
    mounted() {
        this.retrieveReviews();
    },
    computed: {
        ...mapGetters(['getUser']),
    }
};
</script>

<style scoped>
.return-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.return-status .text-status {
    color: #12b712;
    font-weight: bold;
    text-decoration: underline;
}

.return-reason {
    color: #d20000 !important;
}

.return-cancel .btn {
    background-color: #c70404 !important;
    padding: 6px 20px !important;
    border-radius: 6px !important;
}

.return-image span {
    width: 120px;
    margin-right: 10px;
}
.return-cancel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}
.return-guide {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.return-guide a {
    color: #0070b5;
    font-weight: bold;
    text-decoration: underline;
}
.profiles .profile-info h3 {
    margin-top: 0;
}
.review i {
    color: #fecb00;
    font-size: 18px;
    margin-right: 2px;
}
.review li {
    display: inline-block;
    margin: 0;
}

</style>