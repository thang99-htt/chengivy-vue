<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
        <thead>
            <tr role="row">
                <th>#</th>
                <th>Danh mục</th>
                <th>Loại</th>
                <th>Tên</th>
                <th>Giá mua</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
                <th>Mô tả</th>
                <th>Hình ảnh</th>
                <th>Phần trăm GG</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(coupon, index) in couponLocal"
                    :key="coupon" 
                    :value="coupon.id"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ coupon.category }}</td>
                <td>{{ coupon.type }}</td>
                <td>{{ coupon.name }}</td>
                <td>{{ formatPrice(coupon.purchase_price) }}</td>
                <td>{{ formatPrice(coupon.price) }}</td>
                <td>{{ coupon.quantity }}</td>
                <td>{{ coupon.description.substring(0,50) }}......</td>
                <td>
                    <img v-if="coupon.image" :src="getImage(coupon.image)"
                    alt="Image" class="img-responsive center-block" width="100">
                </td>
                <td>{{ formatPrice(coupon.discount_percent) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {        
        props: {
            coupon: { type: Object, required: true },
        },
        
        data() {
            return {
                couponLocal: this.coupon.products,
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
