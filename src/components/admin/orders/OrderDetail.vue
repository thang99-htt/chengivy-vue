<template>
    <table class="table table-order-detail">
        <thead>
            <tr role="row">
                <th>ID</th>
                <th>Sản phẩm</th>
                <th>Phân loại</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(product, index) in productLocal"
                    :key="product" 
                    :value="product.id"
            >
                <td>{{ index + 1 }}</td>
                <td>
                    <img v-if="product.image" :src="(product.image)"
                        alt="Image" class="img-responsive d-inline" width="100">
                    {{ product.name }}
                </td>
                <td>{{ product.color }}, {{ product.size }}</td>
                <td>
                    <span class="me-3 text-danger "
                        v-if="product.price_discount > 0">
                        {{ formatPrice(product.price_discount) }}
                    </span>
                    <span :class="{ 'text-decoration-line-through ': product.price_discount > 0 }">
                        {{ formatPrice(product.price) }}
                    </span>
                </td>
                <td>{{ product.quantity }}</td>
                <td>
                    <span v-if="product.price_discount > 0">{{ formatPrice(product.price_discount*product.quantity) }}</span>
                    <span v-else>{{ formatPrice(product.price*product.quantity) }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import { formatPrice } from '@/utils';

    export default {        
        props: {
            order: { type: Object, required: true },
        },
        
        data() {
            return {
                productLocal: this.order.items,
            };
        },
        methods: {
            formatPrice,
        }
    };
</script>

<style>
    .table-order-detail thead tr {
        background-color: #f3f8ff;
    }
</style>
