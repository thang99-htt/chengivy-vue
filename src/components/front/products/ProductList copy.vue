<script>
    import $ from 'jquery'
    import ProductService from "@/services/front/product.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { ref } from 'vue'
    
    export default {
        name: 'ProductList',
        props: {
            products: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            ProductService.getAll().then((response) => {
                this.products = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                products: [],
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            statusUpdate(product) {
                try {
                    console.log(product.status);
                    ProductService.updateStatus(product.id, product.status)
                    .then( (response) => {
                        this.refreshList();
                        console.log(response.product.status);
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            async retrieveProducts() {
                try {
                    this.products = await ProductService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveProducts();
            },
            deleteProduct(id) {
                Swal.fire({
                    title: 'Bạn có chắc?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        ProductService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            deleteAll(id){
                alert(id)
            }
        },
        setup () {
            return {
                selection: ref([ 1, 2 ])
            }
        }
        
    };
</script>
<template> 
    
    <div class="container-fluid">
        <div class="row">       
            <div 
                class="col-lg-3 col-md-3 col-12 mb-5"
                v-for="(product, index) in products"
                :key="product"
            >
                <div class="single-product">
                    <div class="product-image">
                        <img :src="getImage(product.image)" alt="#" />
                        <div class="button">
                            <a href="product-details.html" class="btn"><i class="fa fa-cart"></i>Thêm vào giỏ hàng</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="category">{{ product.category.name }}</span>
                        <h4 class="title">
                            <a href="/product/">{{ product.name }}</a>
                        </h4>
                        <ul class="review">
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><span>5.0 Review(s)</span></li>
                        </ul>
                        <div class="price">
                            <span>{{ product.price }} VNĐ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>     
</template>
