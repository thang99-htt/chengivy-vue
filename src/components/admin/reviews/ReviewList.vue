<script>
    import $ from 'jquery'
    import ReviewService from "@/services/admin/review.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { getImage } from '../../../utils';
    
    export default {
        name: 'ReviewList',
        props: {
            reviews: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            });
        },
        data() {
            return {
                reviewsList: this.reviews,
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage,
            statusUpdate(review) {
                try {
                    ReviewService.updateStatus(review.id, review.status)
                    .then( (response) => {
                        this.refreshList();
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            async retrieveReviewss() {
                try {
                    this.reviewsList = await ReviewService.getAll();
                    this.$nextTick(() => {
                        $(".example1").DataTable({
                            "language": {
                                "search": "Tìm kiếm:",
                                "loadingRecords": "Đang tải...",
                                "zeroRecords": "Không tìm thấy kết quả",
                                "lengthMenu": "Hiển thị _MENU_ bản ghi",
                                "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                                "paginate": {
                                    "first": "Trang đầu",
                                    "last": "Trang cuối",
                                    "next": "Trang sau",
                                    "previous": "Trang trước"
                                }
                            }
                        })
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveReviewss();
            },
        },
        
    };
</script>
<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tên Khách hàng</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tên Sản phẩm</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Hình ảnh Sản phẩm</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Nội dung</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Số sao</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày đánh giá</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(review, index) in reviewsList"
            :key="review"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ review.user }}</td>
            <td>{{ review.product.name }}</td>
            <td>
                <img v-if="review.product.image" :src="getImage(review.product.image)"
                 alt="Image" class="img-responsive center-block">
            </td>
            <td>{{ review.content }}</td>
            <td>
                <ul class="review ms-3">
                    <li v-for="i in 5" :key="i">
                        <i v-if="review.rate >= i" class="fa fa-star"></i>
                        <i v-else class="bi bi-star"></i>
                    </li>
                </ul>                
            </td>
            <td>{{ new Date(review.created_at).toISOString().replace('T', ' ').substr(0, 16) }}</td>
            <td>
                <button
                    class="btn-sm"
                    :class="[review.status == 1 ? 'btn-show' : 'btn-hide']"
                    @click="statusUpdate(review)"
                >
                {{review.status == 1 ? 'Hiện' : 'Ẩn'}}
                </button>                    
            </td>
            <td>
                <button
                    type="button"
                    class="me-2 btn btn-primary"
                >
                    <i class="fa fa-eye"></i>
                </button>
                <button
                    type="button"
                    class="me-2 btn btn-success"
                >
                    <i class="fa fa-pen"></i>
                </button>
                <button
                    v-if="review.id"
                    type="button"
                    class="me-2 btn btn-danger"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<style>
    
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');

    table.dataTable thead .sorting:after,
    table.dataTable thead .sorting_asc:after,
    table.dataTable thead .sorting_desc:after {
        font-family: 'FontAwesome';
    }
    
    table.dataTable thead .sorting:after {
        content: '\f0dc';
    }
    
    table.dataTable thead .sorting_asc:after {
        content: '\f0dd';
    }
    
    table.dataTable thead .sorting_desc:after {
        content: '\f0de';
    }

    select.input-sm {
        line-height: unset;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.7;
    }
    .review i {
        color: #fecb00;
    }
    .review li {
        display: inline-block;
    }
</style>