<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách đánh giá sản phẩm</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="ms-4 btn btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="ms-3 btn btn-success">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="ms-3 btn btn-danger"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <ReviewList
                        v-if="filteredReviewsCount > 0"
                        :reviews="filteredReviews"
                    />
                    <p v-else>Không có sản phẩm nào.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 <!-- end dashboard inner -->
</template>
<script>
    import ReviewList from "@/components/admin/reviews/ReviewList.vue";
    import ReviewService from "@/services/admin/review.service";

    export default {
        components: {
            ReviewList,
        },
        name: 'review',
        data() {
            return {
                reviews: [],
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveReviews();
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
