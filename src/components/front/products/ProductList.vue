<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="mt-100 mb-5">
                <div class="row">
                    <div class="offset-10"> 
                        <form action="" class="sortProducts" id="sortProducts">
                            <input type="hidden" id="url" name="url" value="{{ $url }}">
                            <div class="toolbar-sorter">
                                <div class="select-box-wrapper">
                                    <label for="sort" class="text-dark me-2">Sắp xếp</label>
                                    <select v-model="sortOrder">
                                        <option value="default" selected>Mặc định</option>
                                        <option value="asc">Giá: Thấp đến cao</option>
                                        <option value="desc">Giá: Cao đến thấp</option>
                                        <option value="ascName">Tên: A đến Z</option>
                                        <option value="descName">Tên: Z đến A</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div 
                class="col-lg-3 col-md- col-12 mb-5"
                v-for="(product, index) in displayedProducts"
                :key="product"
            >
                <div class="single-product">
                    <div class="product-image">
                        <img :src="getImage(product.image)" alt="#" />
                        <span 
                            v-if="product.discount_percent > 0"
                            class="sale-tag"
                        >
                            SALE
                        </span>
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
                            <span >
                                {{ formatPrice(product.final_price) }} VNĐ
                            </span>
                            <span class="text-decoration-line-through float-end text-secondary"
                                v-if="product.discount_percent > 0" 
                            >
                                {{ formatPrice(product.price) }} VNĐ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage = 1">Trang đầu</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage--">Trước đó</a>
                    </li>
                    <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
                        <a class="page-link" href="#" @click.prevent="currentPage = pageNumber">{{ pageNumber }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">Tiếp theo</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage = totalPages">Trag cuối</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate';

    export default {
        components: {
            Paginate
        },
        props: {
            product: { type: Object, required: true },
        },
        data() {
            return {
                products: this.product,
                currentPage: 1,
                itemsPerPage: 8,
                sortOrder: 'default',
            };
        },
        computed: {
            filteredProducts() {
                return this.products;
            },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
            totalPages() {
                return Math.ceil(this.filteredProductsCount / this.itemsPerPage);
            },
            sortedProducts() {
                const sorted = [...this.filteredProducts];
    
                if (this.sortOrder === 'asc') {
                    sorted.sort((a, b) => a.final_price - b.final_price);
                } else if (this.sortOrder === 'desc') {
                    sorted.sort((a, b) => b.final_price - a.final_price);
                } else if (this.sortOrder === 'ascName') {
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                } else if (this.sortOrder === 'descName') {
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                } else {
                    sorted
                }

                return sorted;
            },
            displayedProducts() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.sortedProducts.slice(start, end);
            },
        },
        methods: {
            changePage(pageNumber) {
              this.currentPage = pageNumber;
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
    };
</script>

