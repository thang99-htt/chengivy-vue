<script>
    import 'tiny-slider/dist/tiny-slider.css';
    import { tns } from 'tiny-slider/src/tiny-slider';

    import ProductDesign from "@/components/user/products/ProductDesign.vue";
    import ProductLimit from "@/components/user/products/ProductLimit.vue";
    import CategoryService from "@/services/user/category.service";

    export default {
        components: {
            ProductDesign,
            ProductLimit
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
        mounted() {
            this.initializeSlider();
        },
        methods: {
            initializeSlider() {
                const slider = this.$refs.slider;
                if (slider) {
                    new tns({
                        container: slider,
                        slideBy: 'page',
                        autoplay: true,
                        autoplayButtonOutput: false,
                        mouseDrag: true,
                        gutter: 0,
                        items: 1,
                        nav: false,
                        controls: true,
                        controlsText: [
                            '<i class="fa fa-chevron-left"></i>',
                            '<i class="fa fa-chevron-right"></i>'
                        ]
                    });
                }
            }
        }
    };
</script>
<template>
    <div class="container-fluid">
        <section class="hero-area mt-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-8 col-12 custom-padding-right">
                        <div class="slider-head">
                            <div ref="slider" class="hero-slider">
                                <div class="single-slider"
                                    style=" background-image: url(/images/hero/slider-bg1.jpg);">
                                    <div class="content text-white">
                                        <h2 class="text-white">
                                            Thời trang cao cấp Christian Dior
                                        </h2>
                                        <p>
                                            Christian Dior có niềm đam mê với nghệ thuật bói toán và các dấu hiệu của vận mệnh. Cuốn tự truyện của anh ấy được nhấn mạnh bởi những cuộc gặp gỡ thường mang tính quyết định với những nhân vật có tầm nhìn xa trông rộng: Nó sẽ rất phi thường. Ngôi nhà này sẽ cách mạng hóa thời trang!
                                        </p>
                                        <div class="button">
                                            <router-link to="/products/Thời-trang-cao-cấp-Christian-Dior" class="btn">Khám phá</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="single-slider"
                                    style=" background-image: url(/images/hero/slider-bg3.jpg);">
                                    <div class="content text-white">
                                        <h2 class="text-white">
                                            Mùa xuân đẹp nhất - Giambattista Valli
                                        </h2>
                                        <p>
                                            Bộ sưu tập dành riêng cho "những con thiên nga" của Truman Capote, bao gồm Marella Agnelli, Lee Radziwill và 
                                            Jackie Onassis, cùng những người khác trong thập niên 60 và 70. Có 34 bộ váy dạ hội tinh xảo với các sắc hồng 
                                            nhạt và vàng chanh, vàng nghệ và bọt biển, hoa vân anh và đỏ thẫm. Cùng với các lớp vải tuyn dày dặn đặc trưng của Valli, 
                                            còn có các lớp diềm xếp nếp và lớp phủ hoa phức tạp, các đường diềm lạ mắt và mặt nạ lông vũ kỳ ảo…
                                        </p>
                                        <div class="button">
                                            <router-link to="/products/Mùa-xuân-đẹp-nhất-Giambattista-Valli" class="btn">Khám phá</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="single-slider"
                                    style=" background-image: url(/images/hero/slider-bg2.jpg);">
                                    <div class="content text-white">
                                        <h2 class="text-white">
                                            Quà tặng thu đông Earthrise
                                        </h2>
                                        <p>
                                            Iris van Herpen trình diễn bộ sưu tập mới nhất của cô ấy 'Earthrise' trong Tuần lễ thời trang cao cấp ở Paris
                                            vào ngày 5 tháng 7 năm 2023. Với việc hành tinh của chúng ta được đặt ở vị trí hàng đầu trong chương trình nghị sự 
                                            toàn cầu hơn bao giờ hết, 'Earthrise' khám phá vẻ đẹp lộng lẫy của vật thể màu xanh lam mà chúng ta gọi là quê 
                                            hương này xoay quanh nhận thức hợp nhất để duy trì sự hùng vĩ của quả cầu quay mà chúng ta đi qua. 
                                        </p>
                                        <div class="button">
                                            <router-link to="/products/Quà-tặng-thu-đông-Earthrise" class="btn">Khám phá</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 col-12 md-custom-padding">
                                <div class="hero-small-banner" style="background-image: url('/images/hero/slider-bg4.jpg');">
                                    <div class="content">
                                        <!-- <h2>
                                            <span>New line required</span>
                                            iPhone 12 Pro Max
                                        </h2>
                                        <h3>$259.99</h3> -->
                                    </div>
                                </div>
                            </div>
            
                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="hero-small-banner style2">
                                    <div class="content">
                                        <h2>Tuần lễ giảm giá</h2>
                                        <p>
                                            Tiết kiệm tới 50% cho tất cả các mặt hàng trong cửa hàng trực tuyến trong tuần này.
                                        </p>
                                        <div class="button">
                                            <a class="btn" href="product-grids.html">Mua ngay</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="trending-product section">
            <div class="container-fluid">
                <ProductDesign
                    :products="filteredProducts"
                />
            </div>
        </section>

        <section class="special-offer section">
            <ProductLimit
                :products="filteredProducts"
            />
        </section>

        <section class="featured-categories section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <h2>Danh mục</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="single-category">
                        <ul>
                            <div v-for="(category, index) in categories">
                                <li :key="category.id" :class="{ 'active': category.id === 1 }">
                                    <router-link
                                        :to="{
                                            name: 'product.category',
                                            params: { url: category.url },
                                        }" 
                                        class="heading"
                                    >
                                        {{ category.name }}                                        
                                    </router-link>
                                    <div class="images" :style="{ backgroundImage: 'url(http://127.0.0.1:8000/storage/uploads/categories/' + category.image + ')' }"></div>
                                </li>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>
        </section>

    </div>

    

</template>
<style scoped>

</style>
