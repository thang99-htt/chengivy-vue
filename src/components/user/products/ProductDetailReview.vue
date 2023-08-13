<template>
    <div class="mt-3">
        <h3>Khách Hàng Đánh Giá ( {{ productLocal.reviews.length }} )</h3>
        <div class="d-flex flex-column review">
            <p>Đánh giá trung bình</p>
            <ul>
                <li><span>{{ productLocal.reviews.length ? Math.round(sumRate/productLocal.reviews.length * 2) / 2 : 0 }}</span> trên 5</li>
                <li v-for="i in 5" :key="i">
                    <i v-if="i <= Math.floor(sumRate/productLocal.reviews.length)" class="fa fa-star"></i>
                    <i v-else-if="i == Math.ceil(sumRate/productLocal.reviews.length)" class="fas fa-star-half-alt"></i>
                    <i v-else class="bi bi-star"></i>
                </li>
            </ul>
        </div>
        <p v-if="productLocal.reviews.length>0" class="fw-bold text-black my-3">Tất cả bình luận</p>
        <p v-else class="fw-bold text-black my-3">Chưa có bình luận nào.</p>

        <div class="accordion mt-3">
            <div
                v-for="(review, index) in productLocal.reviews"
                :key="review.id"
            >
                <div 
                    class="accordion-item py-3"
                    v-if="review.status==1"
                >
                    <div class="accordion-content">
                        <div class="row">
                            <div class="col-1 d-flex justify-content-center align-items-center">
                                <img class="d-block me-3" width="40" src="/images/user.jpg" alt="">
                            </div>
                            <div class="col-10">
                                <div class="d-flex flex-column">
                                    <p>{{ review.user }}</p>
                                    <div class="star">
                                        <ul>
                                            <li v-for="i in 5" :key="i">
                                                <i v-if="i <= review.rate" class="fa fa-star"></i>
                                                <i v-else class="bi bi-star"></i>
                                            </li>
                                        </ul>
                                    </div>
                                    <p>{{ new Date(review.created_at).toISOString().replace('T', ' ').substr(0, 16) }}</p>
                                    <p>{{ review.content }}</p>
                                    <div class="d-flex">
                                        <img 
                                            v-for="(image, index) in review.images_review"
                                            :key="image.id"
                                            class="d-block me-3" width="100" 
                                            :src="image.image" alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
    
    export default {
        props: {
            product: { type: Object, required: true },
        },
        data() {
            return {
                productLocal: this.product,
                sumRate: 0
            };
        },
        computed: {
            totalRate() {
                if (!this.productLocal.reviews.length) {
                    return 0;
                }
                return this.productLocal.reviews.reduce((sum, review) => sum + review.rate, 0);
            }
        },
        mounted() {
            this.sumRate = this.totalRate;
        },
        methods: {
            
        },
    };
</script>
<style scoped>
    .review {
        background-color: #f0f2f5;
        padding: 30px 20px;
    }
    .review i,
    .star i {
        color: #fecb00;
        font-size: 16px;
    }
    .review li,
    .star li {
        display: inline-block;
        margin: 2px;
    }

    .review p,
    .review li {
        font-size: 18px;
        color: #000;
    }
    .review li span {
        font-size: 22px;
    }
    p {
        color: #000;
    }
    
</style>