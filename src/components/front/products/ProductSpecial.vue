<script>
    import ProductService from "@/services/front/product.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'ProductSpeacial',
        props: {
            products: { type: Array, default: [] },
        },
        mounted() {
            ProductService.getType().then((response) => {
                this.products = response;
            });
        },
        data() {
            return {
                products: [],
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async retrieveProducts() {
                try {
                    this.products = await ProductService.getType();
                } catch (error) {
                    console.log(error);
                }
            },
        },
        
    };

    
</script>
<template>
    <div class="container-fluid">
         <div class="row">
             <div class="col-12">
                 <div class="section-title">
                     <h2>Bộ sưu tập đặc biệt</h2>
                 </div>
             </div>
         </div>
         <div class="row pb-5">
             <div class="col-lg-8 col-md-12 col-12">
                 <div class="row">
                     <div 
                        class="col-lg-4 col-md-4 col-12"
                        v-for="(product, index) in products.specialProducts"
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

                 <div 
                    class="single-banner right mt-3" 
                    v-for="(product, index) in products.specialNewProduct"
                    :key="product"
                    :style="{ 'background-image': 'url(' + getImage(product.image) + ')' }"
                 >
                     <div class="content">
                         <h2><a href="/product/">{{ product.name }}</a></h2>
                         <p>{{ product.description }}</p>
                         <div class="price">
                             <span>{{ product.price }} VNĐ</span>
                         </div>
                         <div class="button">
                             <a href="/product/" class="btn">Mua ngay</a>
                         </div>
                     </div>
                 </div>
             </div>
             <div 
                v-for="(product, index) in products.specialHighestPriceProduct"
                :key="product"
                class="col-lg-4 col-md-12 col-12"
             >
                 <div class="offer-content">
                     <div class="image">
                         <img :src="getImage(product.image)" alt="#" />
                         <span class="sale-tag">LIMIT</span>
                     </div>
                     <div class="text">
                         <h2><a href="/product/">{{ product.name }}</a></h2>
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
                         <p>{{ product.description }}</p>
                         <div class="button">
                             <a href="/product/" class="btn">Mua ngay</a>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    </div> 

</template>

