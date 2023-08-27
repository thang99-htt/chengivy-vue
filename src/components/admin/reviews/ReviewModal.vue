<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Phản hồi đánh giá</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="review" class="box box-info">
                        <div class="box-body">
                            <Form>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex">
                                        <img class="d-block me-3" width="70" :src="review.image" alt="">
                                        <div>
                                            <p>{{ review.product.name }}</p>
                                            <p>Phân loại: {{ review.classify }}</p>
                                            <p>{{ formatPrice(review.product.price) }}</p>
                                        </div>
                                    </div>
                                    <div class="me-5">
                                        <p>Khách hàng: {{ review.user.name }}</p>
                                        <p>Email: {{ review.user.email }}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="d-flex align-items-center">
                                        <label>Phù hợp với tổng thể: 
                                            <span v-if="review.fitted_value == 1">Nhỏ</span>
                                            <span v-if="review.fitted_value == 2">Đúng kích cỡ</span>
                                            <span v-if="review.fitted_value == 3">Lớn</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="d-flex align-items-center">
                                        <label for="star" class="mb-0">Chất lượng sản phẩm</label>
                                        <ul class="review ms-1">
                                            <li v-for="i in 5" :key="i" @click="setStaring(i, index)">
                                                <i v-if="i <= review.star" class="bi bi-star-fill"></i>
                                                <i v-else class="bi bi-star"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="mb-2">Khách hàng đánh giá:</label>
                                    <textarea :value="review.content" cols="94" rows="6" disabled></textarea>
                                </div>
                                <div class="form-group">
                                    <div v-if="review.images" class="text-center mt-3">
                                        <span v-for="image in review.images" :key="image">
                                            <img :src="image.image" alt="Hình ảnh"
                                                class="img-edit img-responsive center-block me-2" width="80">
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Phản hồi đánh giá:</label>
                                    <textarea v-model="review.reply" cols="94" rows="6"></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="button" name="btnSave" value="Thực hiện" class="float-end" @click="submitReview">
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReviewService from "@/services/admin/review.service";
import { formatPrice } from '@/utils';

export default {
    props: {
        reviewID: { type: Number, required: true },
    },
    data() {
        return {
            review: null
        };
    },
    methods: {
        formatPrice,
        async getReview() {
            this.review = await ReviewService.get(this.reviewID);
        },
        async submitReview() {
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
                await ReviewService.update(this.review.id, this.review);
                Toast.fire({
                    icon: 'success',
                    title: 'Phản hồi được thêm thành công.'
                });
                this.$parent.refreshList();
                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
    mounted() {
        this.getReview();
    },
};
</script>
