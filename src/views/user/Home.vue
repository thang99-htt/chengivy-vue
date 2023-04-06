<script>
    import ProductTrending from "@/components/user/products/ProductTrending.vue";
    import ProductSpecial from "@/components/user/products/ProductSpecial.vue";
    import CategoryService from "@/services/user/category.service";

    export default {
        components: {
            ProductTrending,
            ProductSpecial
        },
        data() {
            return {
                products: [],
                categories: [],
            };
        },
        async created() {
            await CategoryService.getCategory().then((response) => {
                this.categories = response;
            });
        },
        computed: {
            filteredProducts() {
                return this.products;
            },
            filteredCategories() {
                return this.categories;
            },        
        },
    };
</script>
<template>
    <div class="container-fluid">
        <section class="hero-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-12 custom-padding-right">
                        <div class="slider-head">
                            <div class="hero-slider">
                                <div id="carouselExampleControls1" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active single-slider" style=" background-image: url(/images/hero/slider-bg1.jpg);">
                                            <div class="content">
                                                <h2>
                                                    <span>No restocking fee ($35 savings)</span>
                                                    M75 Sport Watch
                                                </h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur elit, sed do
                                                    eiusmod tempor incididunt ut labore dolore magna aliqua.
                                                </p>
                                                <h3><span>Now Only</span> $320.99</h3>
                                                <div class="button">
                                                    <a href="product-grids.html" class="btn">Shop Now</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="carousel-item single-slider"  style=" background-image: url(/images/hero/slider-bg2.jpg);">
                                            <img src="images/hero/slider-bg2.jpg" class="d-block w-100" alt="...">
                                            <div class="content">
                                                <h2>
                                                    <span>No restocking fee ($35 savings)</span>
                                                    M75 Sport Watch
                                                </h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur elit, sed do
                                                    eiusmod tempor incididunt ut labore dolore magna aliqua.
                                                </p>
                                                <h3><span>Now Only</span> $320.99</h3>
                                                <div class="button">
                                                    <a href="product-grids.html" class="btn">Shop Now</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="carousel-item single-slider"  style=" background-image: url(/images/hero/slider-bg3.jpg);">
                                            <div class="content">
                                                <h2>
                                                    <span>No restocking fee ($35 savings)</span>
                                                    M75 Sport Watch
                                                </h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur elit, sed do
                                                    eiusmod tempor incididunt ut labore dolore magna aliqua.
                                                </p>
                                                <h3><span>Now Only</span> $320.99</h3>
                                                <div class="button">
                                                    <a href="product-grids.html" class="btn">Shop Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 col-12 md-custom-padding">
                                <div class="hero-small-banner" style="background-image: url('/images/hero/slider-bg4.jpg');">
                                    <div class="content">
                                        <h2>
                                            <span>New line required</span>
                                            iPhone 12 Pro Max
                                        </h2>
                                        <h3>$259.99</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="hero-small-banner style2">
                                    <div class="content">
                                        <h2>Weekly Sale!</h2>
                                        <p>
                                            Saving up to 50% off all online store items this week.
                                        </p>
                                        <div class="button">
                                            <a class="btn" href="product-grids.html">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="featured-categories section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <h2>Ready To Wear</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="single-category">
                        <ul>
                            <div v-for="(category, index) in categories">
                                <div :key="category.id" v-if="category.childs.length > 0">
                                <li v-for="(child, index) in category.childs" :key="child.id" :class="{ 'active': child.id === 6 }">
                                    <a class="heading" href="">{{ child.name }}</a>
                                    <div class="images" :style="{ backgroundImage: 'url(http://127.0.0.1:8000/storage/uploads/categories/' + child.image + ')' }"></div>
                                </li>
                                </div>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    
        <section class="trending-product section">
            <div class="container-fluid">
                <ProductTrending
                    :products="filteredProducts"
                />
            </div>
        </section>
    
        <!-- <section class="banner section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                        <div class="single-banner" style="background-image: url('/images/banner/banner-1-bg.jpg');">
                            <div class="content">
                                <h2>Smart Watch 2.0</h2>
                                <p>
                                    Space Gray Aluminum Case with <br />Black/Volt Real Sport Band
                                </p>
                                <div class="button">
                                    <a href="product-grids.html" class="btn">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <div class="single-banner custom-responsive-margin" style="
                        background-image: url('/images/banner/banner-2-bg.jpg');
                    ">
                            <div class="content">
                                <h2>Smart Headphone</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, <br />eiusmod tempor incididunt ut
                                    labore.
                                </p>
                                <div class="button">
                                    <a href="product-grids.html" class="btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
    
        <section class="special-offer section">
            <ProductSpecial
                :products="filteredProducts"
            />
        </section>
    
        <!-- <section class="home-product-list section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-12 custom-responsive-margin">
                        <h4 class="list-title">Best Sellers</h4>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/01.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">GoPro Hero4 Silver</a>
                                </h3>
                                <span>$287.99</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/02.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Puro Sound Labs BT2200</a>
                                </h3>
                                <span>$95.00</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/03.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">HP OfficeJet Pro 8710</a>
                                </h3>
                                <span>$120.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-12 custom-responsive-margin">
                        <h4 class="list-title">New Arrivals</h4>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/04.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">iPhone X 256 GB Space Gray</a>
                                </h3>
                                <span>$1150.00</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/05.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Canon EOS M50 Mirrorless Camera</a>
                                </h3>
                                <span>$950.00</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/06.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Microsoft Xbox One S</a>
                                </h3>
                                <span>$298.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-12">
                        <h4 class="list-title">Top Rated</h4>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/07.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Samsung Gear 360 VR Camera</a>
                                </h3>
                                <span>$68.00</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/08.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Samsung Galaxy S9+ 64 GB</a>
                                </h3>
                                <span>$840.00</span>
                            </div>
                        </div>
    
                        <div class="single-list">
                            <div class="list-image">
                                <a href="product-grids.html"><img src="/images/home-product-list/09.jpg" alt="#" /></a>
                            </div>
                            <div class="list-info">
                                <h3>
                                    <a href="product-grids.html">Zeus Bluetooth Headphones</a>
                                </h3>
                                <span>$28.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <div class="brands">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-md-12 col-12">
                        <h2 class="title">Popular Brands</h2>
                    </div>
                </div>
                <div class="brands-logo-wrapper">
                    <div class="
                    brands-logo-carousel
                    d-flex
                    align-items-center
                    justify-content-between
                    ">
                        <div class="brand-logo">
                            <img src="/images/brands/01.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/02.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/03.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/04.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/05.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/06.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/03.png" alt="#" />
                        </div>
                        <div class="brand-logo">
                            <img src="/images/brands/04.png" alt="#" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <section class="blog-section section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <h2>Our Latest News</h2>
                            <p>
                                There are many variations of passages of Lorem Ipsum available,
                                but the majority have suffered alteration in some form.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="single-blog">
                            <div class="blog-img">
                                <a href="blog-single-sidebar.html">
                                    <img src="/images/blog/blog-1.jpg" alt="#" />
                                </a>
                            </div>
                            <div class="blog-content">
                                <a class="category" href="javascript:void(0)">eCommerce</a>
                                <h4>
                                    <a href="blog-single-sidebar.html">What information is needed for shipping?</a>
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt.
                                </p>
                                <div class="button">
                                    <a href="javascript:void(0)" class="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="single-blog">
                            <div class="blog-img">
                                <a href="blog-single-sidebar.html">
                                    <img src="/images/blog/blog-2.jpg" alt="#" />
                                </a>
                            </div>
                            <div class="blog-content">
                                <a class="category" href="javascript:void(0)">Gaming</a>
                                <h4>
                                    <a href="blog-single-sidebar.html">Interesting fact about gaming consoles</a>
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt.
                                </p>
                                <div class="button">
                                    <a href="javascript:void(0)" class="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="single-blog">
                            <div class="blog-img">
                                <a href="blog-single-sidebar.html">
                                    <img src="/images/blog/blog-3.jpg" alt="#" />
                                </a>
                            </div>
                            <div class="blog-content">
                                <a class="category" href="javascript:void(0)">Electronic</a>
                                <h4>
                                    <a href="blog-single-sidebar.html">Electronics, instrumentation & control engineering
                                    </a>
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt.
                                </p>
                                <div class="button">
                                    <a href="javascript:void(0)" class="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

    </div>

    

</template>
<style scoped>

</style>
