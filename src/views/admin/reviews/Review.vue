<template>
    <ReviewModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :reviewID="reviewID"/>

    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <button type="button" class="btnAdd" @click="showModal = !showModal">
                                        <i class="fa fa-plus"></i>Thêm mới
                                    </button>
                                    <button type="button" class="btnPrint">
                                        <i class="fa fa-print"></i>In
                                    </button>
                                    <button type="button" class="btnAddFile">
                                        <i class="fa fa-download"></i>Thêm dữ liệu
                                    </button>
                                    <button type="button" class="btnExcel">
                                        <i class="fa fa-upload"></i>Xuất dữ liệu
                                    </button>
                                </div>
                                <div>
                                    <button type="button" class="btnBack sentiment-neg" 
                                        :class="{'bg-neg': isSentimentFiltered}"
                                        @click="sentimentReview()">
                                        <i class="fa fa-thumbs-down"></i>Đánh giá tiêu cực
                                    </button>
                                    <button type="button" class="btnBack" @click="refreshList()">
                                        <i class="fa fa-refresh"></i>Làm mới
                                    </button>
                                    <button type="button" class="btnDelete" @click="deleteReview()">
                                        <i class="fa fa-trash"></i>Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <ReviewList 
                                    v-if="filteredReviewsCount > 0" 
                                    :reviews="filteredReviews"
                                    :selectedIds="selectedIds" 
                                    :showModal="showModal"
                                    @update-modal="updateShowModal"
                                    :reviewID="reviewID"
                                    @update-reviewID="updateReview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ReviewList from "@/components/admin/reviews/ReviewList.vue";
import ReviewService from "@/services/admin/review.service";
import ReviewModal from "@/components/admin/reviews/ReviewModal.vue";
import axios from 'axios';

export default {
    components: {
        ReviewList,
        ReviewModal
    },
    name: 'review',
    data() {
        return {
            reviews: [],
            selectedIds: [],
            reviewID: null,
            showModal: false,
            isSentimentFiltered: false, // Biến để kiểm tra trạng thái lọc đánh giá tiêu cực
        };
    },
    computed: {
        filteredReviews() {
            return this.reviews;
        },
        filteredReviewsCount() {
            return this.filteredReviews.length;
        },
    },
    methods: {
        async retrieveReviews() {
            try {
                if (this.isSentimentFiltered) {
                    // Nếu đang lọc đánh giá tiêu cực, gọi API tương ứng và gán dữ liệu cho biến reviews
                    const response = await axios.get('http://127.0.0.1:5000/reviews/sentiment');
                    this.reviews = response.data;
                } else {
                    // Ngược lại, lấy danh sách đánh giá từ service
                    this.reviews = await ReviewService.getAll();
                }
                if ($.fn.DataTable.isDataTable('.example1')) {
                    $('.example1').DataTable().destroy();
                }
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        sentimentReview() {
            // Khi nhấp vào nút "Đánh giá tiêu cực," chuyển trạng thái và cập nhật danh sách đánh giá
            this.isSentimentFiltered = !this.isSentimentFiltered;
            this.retrieveReviews();
        },
        refreshList() {
            // Khi làm mới danh sách, chuyển trạng thái và cập nhật danh sách đánh giá
            this.retrieveReviews();
            this.selectedIds = [];
        },
        closeModal() {
            this.showModal = false;
            this.reviewID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateReview(value) {
            this.reviewID = value;
        },
    },
    mounted() {
        this.retrieveReviews();
    },
};
</script>

<style scoped>
    .sentiment-neg, 
    .sentiment-neg i {
        color: #e30000 !important;
        font-weight: bold;
    }
    .bg-neg {
        background-color: #ffffc1;
    }
</style>