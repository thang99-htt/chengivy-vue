<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="coupon" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/orders">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Chi Tiết Phiếu nhập hàng</h3>
                    </div>
                    
                    <div class="box-body">
                        <div class="row column1 social_media_section">
                            <div class="col-4">
                                <div class="full socile_icons tw margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-box"></i>
                                            Thông tin phiếu nhập hàng
                                    </div>
                                    <div class="social_cont">
                                        <p>Tổng tiền nhập: {{ formatPrice(coupon.total_price) }} VNĐ</p>
                                        <p>Thuế GTGT: {{ formatPrice(coupon.value_added) }} VNĐ</p>
                                        <p>Tổng giá trị phiếu nhập: {{ formatPrice(coupon.total_value) }} VNĐ</p>
                                        <p>Ngày lập: {{ coupon.date }}</p>
                                        <p>Chứng từ gốc: 
                                            <p>
                                                <img :src="getImage(coupon.image)"
                                                alt="Image" class="img-edit img-responsive">
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="full socile_icons fb margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-book"></i>
                                        Thông tin phiếu chi tiền
                                    </div>
                                    <div class="social_cont">
                                        <p>Ngày chi: {{ coupon.payment_voucher.date }}</p>
                                        <p>Tổng tiền chi: {{ coupon.payment_voucher.total_price }}</p>
                                        <p>Diễn giải: {{ coupon.payment_voucher.description }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="full socile_icons linked margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-car"></i>
                                        Thông tin nhà cung cấp
                                    </div>
                                    <div class="social_cont">
                                        <p>Họ tên: {{ coupon.supplier.name }}</p>
                                        <p>Địa chỉ: {{ coupon.supplier.address }}</p>
                                        <p>Email: {{ coupon.supplier.email }}</p>
                                        <p>Số điện thoại: {{ coupon.supplier.phone }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="head-product">
                                Thông tin sản phẩm
                            </div>
                            <ImportCouponView
                                :coupon="coupon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import ImportCouponService from "@/services/admin/import-coupon.service";
    import ImportCouponView from "@/components/admin/coupons/ImportView.vue";
    export default {
        components: {
            ImportCouponView,
        },
        props: {
            id: { type: String, required: true },
            coupon: { type: Object, required: true },
        },
        data() {
            return {
                coupon: null,
            };
        },
        methods: {
            async getImportCoupon(id) {
                try {
                    this.coupon = await ImportCouponService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
        },
        created() {
            this.getImportCoupon(this.id);
        },
    };
</script>
<style>
    .box-body {
        padding: 30px;
    }
    .social_cont {
        height: 230px;
    }
    .social_cont p {
        text-align: left;
        padding-left: 10px;
    }
    .head-product {
        font-size: 25px;
        font-weight: 500;
        padding: 12px;
        color: #fff;
        background-color: #ff9800 ;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>