<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="8%">Ngày đánh giá</th>
                <th width="16%">Sản phẩm</th>
                <th width="10%">Khách hàng</th>
                <th width="8%">Đánh giá</th>
                <th width="16%">Nội dung</th>
                <th width="15%">Phản hồi</th>
                <th width="8%">Trạng thái</th>
                <th width="4%">Sửa</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(review, index) in reviewsList" :key="review" >
                <td>{{ review.date }}</td>
                <td>
                    <div class="d-flex">
                        <img :src="review.image" alt="" width="50">
                        <span class="ms-1">
                            <span>ID: {{ review.product.id }}</span>
                            <span>{{ review.product.name }}</span>
                        </span>
                    </div>
                    
                </td>
                <td>{{ review.name }} {{ review.user.email }}</td>
                <td>
                    <span v-if="review.fitted_value==1">Nhỏ</span>
                    <span v-else-if="review.fitted_value==2">Đúng kích cỡ</span>
                    <span v-else>Lớn</span>
                    <br>
                    <ul class="review">
                        <li v-for="i in 5" :key="i">
                            <i v-if="i <= review.star" class="bi bi-star-fill"></i>
                            <i v-else class="bi bi-star"></i>
                        </li>
                    </ul>    
                </td>
                <td :class="{'bg-neg': review.classification}">
                    {{ review.content.split(' ').slice(0, 20).join(' ') + '.....' }}
                </td>
                <td>
                    <span v-if="review.reply">{{ review.reply.split(' ').slice(0, 20).join(' ') + '.....' }}</span>
                </td>
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
import ReviewService from "@/services/admin/review.service";
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
                ReviewService.updateStatus(this.getAdmin.id, review);
                this.$parent.refreshList();
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
        showModalEdit(reviewID) {
            this.$emit('update-modal', true);
            this.$emit('update-reviewID', reviewID);
        }
    },

};
</script>
<style scoped>
    .review i {
        color: #fecb00;
        font-size: 15px;
        margin-right: 2px;
    }
    .review li {
        display: inline-block;
        margin: 0;
    }
    .bg-neg {
        background-color: rgb(255, 197, 197) !important;
    }
</style>
