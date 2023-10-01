<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Đánh giá sản phẩm</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="reviews" class="box box-info">
                        <div class="box-body">
                            <ReviewForm :reviews="reviews" :selectedPurchase="selectedPurchase"
                                @submit:reviews="submitReview" :reset="reset" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReviewForm from "./ReviewForm.vue";
import ReviewService from "@/services/admin/review.service";
import NotificationService from "@/services/admin/notification.service";
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
    props: {
        selectedPurchase: { type: Array, required: true }
    },
    components: {
        ReviewForm,
    },
    data() {
        return {
            reviews: []
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        async submitReview(data) {
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
                await ReviewService.create(data).then(res => {
                    Toast.fire({
                        icon: res.success,
                        title: res.message
                    });
                });
                const response = await axios.get('http://127.0.0.1:5000/reviews/sentiment');
               
                if(response.data) {
                    await NotificationService.createReview(this.getUser.id);
                }

                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
};
</script>
