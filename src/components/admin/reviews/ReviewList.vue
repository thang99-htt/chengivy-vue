<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="7%">Sản phẩm</th>
                <th width="10%">Khách hàng</th>
                <th width="11%">Ngày đánh giá</th>
                <th width="8%">Số sao</th>
                <th width="8%">Tổng thể</th>
                <th width="14%">Nội dung</th>
                <th width="12%">Trả lời</th>
                <th width="8%">Trạng thái</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(review, index) in reviewsList" :key="review">
                <td>
                    {{ review.product.id }}
                </td>
                <td>{{ review.user }}</td>
                <td>{{ review.date }}</td>
                <td>
                    <ul class="review">
                        <li v-for="i in 5" :key="i">
                            <i v-if="i <= review.star" class="bi bi-star-fill"></i>
                            <i v-else class="bi bi-star"></i>
                        </li>
                    </ul>    
                </td>
                <td>
                    <span v-if="review.fitted_value==1">Nhỏ</span>
                    <span v-else-if="review.fitted_value==2">Đúng kích cỡ</span>
                    <span v-else>Lớn</span>
                </td>
                <td>{{ review.content.split(' ').slice(0, 20).join(' ') + '.....' }}</td>
                <td>{{ review.reply }}</td>
                <td>
                    <button class="btn-sm" :class="[review.status == 1 ? 'btn-show' : 'btn-hide']"
                        @click="statusUpdate(review)">
                        {{ review.status == 1 ? 'Hiện' : 'Ẩn' }}
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn"  @click="showModalEdit(review.id)">                        
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                    <button type="button" class="btn">                        
                        <img src="/images/icon/icondetail.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(review.id)" :checked="selectedIds.includes(review.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="8" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import Reviewservice from "@/services/admin/review.service";
import { formatPrice } from "../../../utils";
import {mapGetters} from 'vuex';

export default {
    name: 'ReviewList',
    props: {
        reviews: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        reviewID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        reviewsList() {
            return this.reviews;
        },
        ...mapGetters(['getAdmin'])
    },
    data() {
        return {
            
        };
    },
    methods: {
        formatPrice,
        statusUpdate(review) {
            try {
                Reviewservice.updateStatus(this.getAdmin.id, review.id, review.status.id).then(() => {
                    this.$parent.refreshList();
                })
            } catch (error) {
                console.log(error);
            }
        },
        idSelected(id) {
            const index = this.selectedIds.indexOf(id);
            if (index === -1) {
                // Nếu id chưa tồn tại trong mảng, thêm nó vào
                this.selectedIds.push(id);
            } else {
                // Ngược lại, loại bỏ id khỏi mảng
                this.selectedIds.splice(index, 1);
            }
        },
        idAllSelected() {
            if(this.selectedIds.length == this.reviewsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.reviews.forEach(review => {
                    this.selectedIds.push(review.id);
                });
            } else {
                this.reviews.forEach(review => {
                    this.selectedIds.push(review.id);
                });
            }
        },
    },

};
</script>
<style>
    .review i {
        color: #fecb00;
        font-size: 15px;
        margin-right: 2px;
    }
    .review li {
        display: inline-block;
        margin: 0;
    }
</style>
