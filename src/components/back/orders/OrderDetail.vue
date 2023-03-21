<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
        <thead>
            <tr role="row">
                <th>#</th>
                <th>Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Size</th>
                <th>Giá (VNĐ)</th>
                <th>Số lượng</th>
                <th>Thành tiền (VNĐ)</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(order, index) in orderLocal"
                    :key="order" 
                    :value="order.id"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ order.product_name }}</td>
                <td>
                    <img v-if="order.product_image" :src="getImage(order.product_image)"
                    alt="Image" class="img-responsive center-block" width="100">
                </td>
                <td>{{ order.product_size }}</td>
                <td>{{ formatPrice(order.product_price) }}</td>
                <td>{{ order.product_quantity }}</td>
                <td>{{ formatPrice(order.product_into_money) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {        
        props: {
            order: { type: Object, required: true },
        },
        
        data() {
            return {
                orderLocal: this.order.order_details,
            };
        },
        methods: {
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
        }
    };
</script>
