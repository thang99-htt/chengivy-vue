<template>
    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deletereview()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <ReviewList 
                                    v-if="filteredReviewsCount > 0" 
                                    :reviews="filteredReviews"
                                    :selectedIds="selectedIds" 
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
import Reviewservice from "@/services/admin/review.service";

export default {
    components: {
        ReviewList,
    },
    name: 'review',
    data() {
        return {
            reviews: [],
            selectedIds: [],
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
        async retrievereviews() {
            try {
                this.reviews = await Reviewservice.getAll();
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
            this.retrievereviews();
            this.selectedIds = [];
        },
        deletereview() {
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
                    Reviewservice.delete(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
                    this.$swal.fire('Đã xóa thành công!', '', 'success')
                }
            })
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
