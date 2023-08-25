<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%" data-orderable="false">ID</th>
                <th width="20%">Sản phẩm</th>
                <th width="7%">Giá nhập</th>
                <th width="7%">Giá bán</th>
                <th width="7%">Đã bán</th>
                <th width="7%">Lượt thích</th>
                <th width="7%">Trạng thái</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(product, index) in productsList" :key="product"
                :class="{ 'disabled': product.deleted_at }">
                <td>{{ product.id }}</td>
                <td>
                    <img v-if="product.image" :src="product.image" alt="" width="50" height="50">    
                    <span class="ms-3">{{ product.name }}</span>
                </td>
                <td>{{ formatPrice(product.price_purchase) }}</td>
                <td>
                    <span v-if="product.discount_percent" class="text-danger">{{ formatPrice(product.price_final) }}</span>
                    <span v-else>{{ formatPrice(product.price) }}</span>
                </td>
                <td>{{ (product.total_export ).toLocaleString() }}</td>
                <td>{{ product.total_likes }}</td>
                <td>
                    <button class="btn-sm" :class="[product.status == 1 ? 'btn-show' : 'btn-hide']"
                        @click="statusUpdate(product)">
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
                        <button type="button" class="btn" @click="showModalEdit(product.id)">
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
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(product.id)" :checked="selectedIds.includes(product.id)">
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
import ProductService from "@/services/admin/product.service";
import { formatPrice } from '@/utils';

export default {
    name: 'ProductOverview',
    props: {
        products: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        productsList() {
            return this.products;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        formatPrice,
        statusUpdate(product) {
            try {
                ProductService.updateStatus(product.id, product.status).then(() => {
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
            if(this.selectedIds.length == this.productsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.products.forEach(product => {
                    this.selectedIds.push(product.id);
                });
            } else {
                this.products.forEach(product => {
                    this.selectedIds.push(product.id);
                });
            }
        },
        showModalEdit(productID) {
            this.$emit('update-modal', true);
            this.$emit('update-productID', productID);
        }
    },

};
</script>