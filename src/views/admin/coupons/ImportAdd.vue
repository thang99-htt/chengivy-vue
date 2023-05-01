<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="coupon" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/import-coupons">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Thêm mới Phiếu nhập</h3>
                    </div>
                    
                    <div class="box-body">
                        <div class="row justify-content-evenly">
                            <div class="col-4">
                                <ImportForm
                                    :coupon="coupon"
                                    @submit:coupon="createImportCounpon"
                                />
                            </div>
                            <div class="col-4 ms-4">
                                <ProductForm
                                    :product="product"
                                    @submit:product="createProduct"
                                />
                            </div>
                        </div>
                        <div class="row mt-5">
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
    import ImportForm from "@/components/admin/coupons/ImportForm.vue";
    import ImportService from "@/services/admin/import-coupon.service";
    import ProductForm from "@/components/admin/products/ProductForm.vue";
    import ImportCouponView from "@/components/admin/coupons/ImportView.vue";
    import ProductService from "@/services/admin/product.service";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            ImportForm,
            ProductForm,
            ImportCouponView,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                coupon: {
                    'supplier_id': "",
                    'payment_voucher_id': "",
                    'date': new Date().toISOString().slice(0, 10),
                    'total_price': "",
                    'value_added': "",
                    'total_value': "",
                    'image': "",
                    'products': [],
                },
                product: {
                    'categoy_id': "",
                    'name': "",
                    'description': "",
                    'purchase_price': "",
                    'price': "",
                    'quantity': "",
                    'type_id': "",
                    'discount_percent': 0,
                },
            };
        },
        methods: {
            async createImportCounpon(data) {
                this.coupon.date = new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                try {
                    await ImportService.create(this.getAdmin.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Phiếu nhập hàng được thêm thành công.'
                    })
                } catch (error) {
                    Toast.fire({
                        icon: 'warning',
                        title: "Định dạnh tệp không được hỗ trợ"
                    })
                    console.log(error.response.data.message);
                }
            },
            async createProduct(data) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                try {
                    await ProductService.create(data).then((response) => {
                        const newProduct = response;
                        newProduct.purchase_price = this.product.purchase_price; 
                        newProduct.quantity = this.product.quantity; 
                        this.coupon.products.push(newProduct);

                    });
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được thêm thành công.'
                    })
                } catch (error) {
                    Toast.fire({
                        icon: 'warning',
                        title: "Định dạnh tệp không được hỗ trợ"
                    })
                    console.log(error.response.data.message);
                }
            },
        },
        computed: {
            ...mapGetters(['getAdmin']),
        },
    };
</script>