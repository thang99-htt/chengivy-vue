<template>
    <ReviewModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :reviewID="reviewID"/>
        
        <section class="content">
            <div class="box">
                <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                    
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-between my-4">
                        <div>
                            <button type="button" class="btnAdd" @click="toxicReview()" :class="{'bg-neg': isToxicFiltered}">
                                <i class="fa fa-thumbs-down"></i>Đánh giá tiêu cực
                                <div class="spinner-border text-primary ms-3" role="status" v-if="isToxicFiltered && isLoading">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        </div>
                        <div>
                            <button type="button" class="btnBack" @click="refreshList()">
                                <i class="fa fa-refresh"></i>Làm mới
                            </button>
                            <button type="button" class="btnDelete" @click="deleteReview()">
                                <i class="fa fa-trash"></i>Xóa
                            </button>
                            <button type="button" class="btnDelete" @click="hiddenReview()">
                                <i class="fa fa-eye-slash"></i>Ẩn
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
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ReviewList from "@/components/admin/reviews/ReviewList.vue";
import ReviewService from "@/services/admin/review.service";
import ReviewModal from "@/components/admin/reviews/ReviewModal.vue";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";

import axios from 'axios';

export default {
    components: {
        ReviewList,
        ReviewModal,
        StatisticalPicker
    },
    name: 'review',
    data() {
        return {
            reviews: [],
            selectedIds: [],
            reviewID: null,
            showModal: false,
            isToxicFiltered: false, // Biến để kiểm tra trạng thái lọc đánh giá tiêu cực
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
            isLoading: true
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
    watch: {
        startDateFormatted: 'handleDatesChange', 
        endDateFormatted: 'handleDatesChange', 
    },
    methods: {
        updateStartDate(value) {
            this.startDateFormatted = value;
        },
        updateEndDate(value) {
            this.endDateFormatted = value;
        },
        handleDatesChange() {
            if (this.datesUpdated) {
                this.retrieveReviews();
                this.datesUpdated = false; 
            }
        },
        async retrieveReviews() {
            try {
                let data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                if (this.isToxicFiltered) {
                    // Nếu đang lọc đánh giá tiêu cực, gọi API tương ứng và gán dữ liệu cho biến reviews
                    const response = await axios.post('http://127.0.0.1:5000/reviews/toxic', data);
                    this.reviews = response.data;
                    this.isLoading = false;
                } else {
                    // Ngược lại, lấy danh sách đánh giá từ service
                    this.reviews = await ReviewService.getAll(data);
                    this.isLoading = true;
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
        toxicReview() {
            // Khi nhấp vào nút "Đánh giá tiêu cực," chuyển trạng thái và cập nhật danh sách đánh giá
            this.isToxicFiltered = !this.isToxicFiltered;
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
        hiddenReview() {
            this.$swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ẩn',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    ReviewService.hidden(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
                    this.$swal.fire('Đã ẩn thành công!', '', 'success')
                }
            })
        },
    },
    mounted() {
        this.retrieveReviews();
    },
};
</script>

<style scoped>
    .bg-neg,
    .bg-neg i {
        background-color: rgb(255, 213, 213);
        color: red;
        font-weight: bold;
    }
</style>