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
                                <p v-else>Không có đánh giá nào.</p>
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
            showModal: false
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
                this.reviews = await ReviewService.getAll();
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
        refreshList() {
            this.retrieveReviews();
            this.selectedIds = [];
        },
        deleteReview() {
            this.$swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    ReviewService.delete(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
                    this.$swal.fire('Đã xóa thành công!', '', 'success')
                }
            })
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
        this.refreshList();
    },
};
</script>
