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
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteProduct()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <table class=" example1 table table-bordered table-striped dataTable">
                                    <thead>
                                        <tr role="row">
                                            <th width="6%" data-orderable="false">ID</th>
                                            <th width="24%">Sản phẩm</th>
                                            <th width="8%">Giá Bán</th>
                                            <th width="8%">Đã bán</th>
                                            <th width="8%">Lượt thích</th>
                                            <th width="8%">Trạng thái</th>
                                            <th width="7%">Tùy chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr role="row" v-for="(product, index) in inventories" :key="product"
                                            :class="{ 'disabled': product.deleted_at }">
                                            <td>{{ product.id }}</td>
                                            <td>
                                                <img v-if="product.image" :src="product.image" alt="" width="100" height="70">    
                                                <span class="ms-3">{{ product.name }}</span>
                                            </td>
                                            <td>
                                                <span v-if="product.discount_percent" class="text-danger">{{ formatPrice(product.price_final) }}</span>
                                                <span v-else>{{ formatPrice(product.price) }}</span>
                                            </td>
                                            <td>{{ product.total_export }}</td>
                                            <td>{{ product.total_likes }}</td>
                                            <td>
                                                <button class="btn-sm" :class="[product.status == 1 ? 'btn-show' : 'btn-hide']">
                                                    {{ product.status == 1 ? 'Đăng bán' : 'Ẩn' }}
                                                </button>
                                            </td>
                                            <td>
                                                <div v-if="product.deleted_at">
                                                    <button type="button" class="me-2 btn btn-danger">
                                                        Ngừng kinh doanh
                                                    </button>
                                                </div>
                                                <div v-else>
                                                    <button type="button" class="btn">
                                                        <img src="/images/icon/iconedit.png" alt="">
                                                    </button>
                                                    <button type="button" class="btn">
                                                        <router-link :to="{
                                                            name: 'product.view',
                                                            params: { id: product.id },
                                                        }">
                                                            <img src="/images/icon/icondetail.png" alt="">
                                                        </router-link>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
import ProductService from "@/services/admin/product.service";
import { formatPrice } from '@/utils';

export default {
    name: 'inventory',
    data() {
        return {
            inventories: [],
        };
    },
    methods: {
        formatPrice,
        async retrieveInventories() {
            try {
                this.inventories = await ProductService.getAll();
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveInventories();
    },
};
</script>