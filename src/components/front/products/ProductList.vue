<template>
    <section class="product-sort">
        <div class="container-fluid">
            <div class="mt-100">
                <div class="row">
                    <div class="offset-10">
                        <form action="" class="sortProducts" id="sortProducts">
                            <input type="hidden" id="url" name="url" value="{{ $url }}">
                            <div class="toolbar-sorter">
                                <div class="select-box-wrapper">
                                    <label for="sort" class="text-dark me-2">Sắp xếp</label>
                                    <select name="sort" id="sortListing" class="select-box">
                                        <option selected>Mặc định</option>
                                        <option value="newest">Mới nhất</option>
                                        <option value="name_a_z">A - Z</option>
                                        <option value="name_z_a">Z - A</option>
                                        <option value="price_lowest">Thấp đến cao</option>
                                        <option value="price_highest">Cao đến thấp</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section> 
    <section class="product-list section filter_products">
        <div class="container-fluid">
            <div class="row">       
                <div 
                    class="col-lg-3 col-md-3 col-12 mb-5"
                    v-for="(product, index) in product"
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
                                <router-link 
                                    :to="{
                                        name: 'product.detail',
                                        params: { id: product.id },
                                    }" 
                                >
                                    {{ product.name }}
                                </router-link>
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
    </section>
</template>
<script>

    export default {
        props: {
            product: { type: Object, required: true },
        },
        data() {
            return {
                productLocal: this.product,
                products: [],
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
        },
    };
</script>

