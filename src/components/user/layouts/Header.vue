<template>
    <header class="header navbar-area">
        <div class="topbar bg-transparent topbar-transparent d-none">
            <div class="container-fluid px-5">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="top-left">
                        <div class="mega-category-menu">
                            <router-link 
                                :to="{
                                    name: 'product.all',
                                }" 
                            >
                                <span class="cat-button">
                                    <i class="bi bi-list"></i>
                                    Tất cả danh mục
                                </span>  
                            </router-link>
                            <ul class="sub-category">
                                <li>
                                    <router-link
                                        :to="{
                                            name: 'product.all',
                                        }" 
                                    >
                                        Tất cả sản phẩm
                                    </router-link>
                                </li>
                                <li
                                    v-for="(category, index) in categories"
                                    :key="category"
                                >
                                    <router-link
                                        :to="{
                                            name: 'product.category',
                                            params: { url: category.url },
                                        }" 
                                    >
                                        {{ category.name }}
                                        <span
                                            v-if="category.childs.length > 0"
                                        >
                                            <i class="bi bi-chevron-right"></i> 
                                        </span>
                                    </router-link>
                                    <ul class="inner-sub-category" v-if="category.childs.length > 0">
                                        <li
                                            v-for="(child, index) in category.childs"
                                            :key="child"
                                        >
                                            <router-link 
                                                :to="{
                                                    name: 'product.category',
                                                    params: { url: child.url },
                                                }"
                                            >
                                                <span
                                                    v-if="child.status == 1"
                                                >
                                                    {{ child.name }}
                                                </span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="top-middle">
                        <a class="navbar-brand" href="/">
                            <img src="/images/logo/logo.jpg" alt="Logo" />
                        </a>
                    </div>
                    <div class="top-end pe-4">
                        <div class="middle-right-area">
                            <div class="navbar-cart">
                                <div class="wishlist">
                                    <a href="javascript:void(0)">
                                        <i class="bi bi-heart"></i>
                                        <span class="total-items">0</span>
                                    </a>
                                </div>
                                <div class="cart-items">        
                                    <router-link :to="{ name: 'cart' }" class="main-btn">
                                        <i class="bi bi-cart"></i>
                                        <span class="total-items" v-if="carts.count_item > 0">{{ carts.count_item }}</span>
                                        <span class="total-items" v-else>0</span>
                                    </router-link>
                                    <div class="shopping-item" v-if="carts.count_item > 0">
                                        <div class="dropdown-cart-header">
                                            <a href="cart.html">Giỏ hàng</a>
                                            <span>{{ carts.count_item }} sản phẩm</span>
                                        </div>
                                        <ul class="shopping-list">
                                            <li
                                                v-for="(cart, index) in carts.getCartItems"
                                                :key="cart"
                                            >
                                                <a href="javascript:void(0)" class="remove" title="Remove this item"><i class="fa fa-close"></i></a>
                                                <div class="cart-img-head">
                                                    <img v-if="cart.product.image" :src="getImage(cart.product.image)" alt="#" />
                                                </div>
                                                <div class="content">
                                                    <h6><a href="product-details.html">{{ cart.product.name }}</a></h6>
                                                    <p>Size: {{ cart.size }}</p>
                                                    <p class="quantity">
                                                        {{ cart.quantity }} x - {{ formatPrice(cart.final_price) }}
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="bottom mt-4">
                                            <div class="total">
                                                <span>Tổng tiền</span>
                                                <span class="total-amount">{{ formatPrice(carts.into_money) }} VNĐ</span>
                                            </div>
                                            <div class="button">
                                                <router-link 
                                                    :to="{ name: 'cart' }" 
                                                    class="btn animate"
                                                >
                                                    Xem giỏ hàng
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        v-else
                                        class="shopping-item"
                                    >
                                        <h6>GIỎ HÀNG</h6>
                                        <img src="/images/cart/empty-cart.svg" alt="" />
                                        <p class="m-3 text-center text-dark">Bạn chưa có sản phẩm nào trong giỏ hàng của mình.</p>
                                    </div>
                                </div>
                                <div class="user ms-3">
                                    <div class="user-circle">
                                        <i class="bi bi-person"></i>
                                        <span v-if="getUser" class="total-items">Hi</span>
                                    </div>     
                                    <ul class="sub-user" v-if="getUser">
                                        <li>
                                            <a href="">Hello {{ getUser.name }}</a>
                                        </li>
                                        <li>
                                            <a href="/profiles">Tài khoản</a>
                                        </li>
                                        <li>
                                            <a href="/profiles/purchases">Đơn mua</a>
                                        </li>
                                        <li>
                                            <a @click="logout">
                                                Đăng xuất<i class="bi bi-power"></i>
                                            </a>
                                        </li>
                                    </ul>   
                                    <ul class="sub-user" v-else>
                                        <li>
                                            <a href="/register">Đăng ký</a>
                                        </li>
                                        <li>
                                            <a href="/login">Đăng nhập</a>
                                        </li>
                                    </ul>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="topbar">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="top-left">
                        <a class="navbar-brand" href="/">
                            <img src="/images/logo/logo-dark.png" alt="Logo" />
                        </a>
                    </div>
                    <div class="top-middle">
                        <ul class="useful-links">
                            <li><a href="/" class="top-middle-link" :class="{ link: $route.path === '/' }">Trang chủ</a></li>
                            <li><a href="/products/all" class="top-middle-link" :class="{ link: $route.path === '/products/all' }">Sản phẩm</a></li>
                            <li><a href="about-us.html" class="top-middle-link" :class="{ link: $route.path === '/about-us.html' }">Về chúng tôi</a></li>
                            <li><a href="contact.html" class="top-middle-link" :class="{ link: $route.path === '/contact.html' }">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div class="top-end pe-4">
                        <ul class="menu-top-link">
                            <li>
                                <div class="select-position">
                                    <select id="select4">
                                        <option value="0" selected>đ VNĐ</option>
                                        <option value="1">$ USD</option>
                                        <option value="2">€ EURO</option>
                                        <option value="3">$ CAD</option>
                                        <option value="4">₹ INR</option>
                                        <option value="5">¥ CNY</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="select-position">
                                    <select id="select5">
                                        <option value="0" selected>Tiếng việt</option>
                                        <option value="1">English</option>
                                        <option value="2">Filipino</option>
                                        <option value="3">Français</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="header-middle">
            <div class="container-fluid">
                <div class="row align-items-center px-5">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-7">
                        <div class="mega-category-menu">
                            <router-link 
                                :to="{
                                    name: 'product.all',
                                }" 
                            >
                                <span class="cat-button">
                                    <i class="bi bi-list"></i>
                                    Tất cả danh mục
                                </span>  
                            </router-link>
                            <ul class="sub-category">
                                <li>
                                    <router-link
                                        :to="{
                                            name: 'product.all',
                                        }" 
                                    >
                                        Tất cả sản phẩm
                                    </router-link>
                                </li>
                                <li
                                    v-for="(category, index) in categories"
                                    :key="category"
                                >
                                    <router-link
                                        :to="{
                                            name: 'product.category',
                                            params: { url: category.url },
                                        }" 
                                    >
                                        {{ category.name }}
                                        <span
                                            v-if="category.childs.length > 0"
                                        >
                                            <i class="bi bi-chevron-right"></i> 
                                        </span>
                                    </router-link>
                                    <ul class="inner-sub-category" v-if="category.childs.length > 0">
                                        <li
                                            v-for="(child, index) in category.childs"
                                            :key="child"
                                        >
                                            <router-link 
                                                :to="{
                                                    name: 'product.category',
                                                    params: { url: child.url },
                                                }"
                                            >
                                                <span
                                                    v-if="child.status == 1"
                                                >
                                                    {{ child.name }}
                                                </span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-5 col-md-6 d-xs-none">
                        <div class="main-menu-search">
                            <div class="navbar-search search-style-5">
                                <div class="search-input">
                                    <input type="text" v-model="keyword" placeholder="Tìm kiếm" @keypress="handleKeyPress"/>
                                    <button @click="startListening" class="microphone-btn"><i class="fa fa-microphone"></i></button>
                                </div>
                                <div class="search-btn">
                                    <router-link 
                                        :to="{ 
                                            name: 'search',
                                            query: { keyword: keyword }
                                        }" 
                                        class="main-btn"
                                    >
                                        <button><i class="bi bi-search"></i></button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-2 col-5">
                        <div class="middle-right-area">
                            <div class="nav-hotline">
                                <i class="bi bi-telephone-fill"></i>
                                <h3>
                                    Hotline:
                                    <span>(+84) 222 666 8888</span>
                                </h3>
                            </div>
                            <div class="navbar-cart">
                                <div class="wishlist">
                                    <a href="javascript:void(0)">
                                        <i class="bi bi-heart"></i>
                                        <span class="total-items">0</span>
                                    </a>
                                </div>
                                <div class="cart-items">        
                                    <router-link :to="{ name: 'cart' }" class="main-btn">
                                        <i class="bi bi-cart"></i>
                                        <span class="total-items" v-if="carts.count_item > 0">{{ carts.count_item }}</span>
                                        <span class="total-items" v-else>0</span>
                                    </router-link>
                                    <div class="shopping-item" v-if="carts.count_item > 0">
                                        <div class="dropdown-cart-header">
                                            <a href="cart.html">Giỏ hàng</a>
                                            <span>{{ carts.count_item }} sản phẩm</span>
                                        </div>
                                        <ul class="shopping-list">
                                            <li
                                                v-for="(cart, index) in carts.getCartItems"
                                                :key="cart"
                                            >
                                                <a href="javascript:void(0)" class="remove" title="Remove this item"><i class="fa fa-close"></i></a>
                                                <div class="cart-img-head">
                                                    <img v-if="cart.product.image" :src="getImage(cart.product.image)" alt="#" />
                                                </div>
                                                <div class="content">
                                                    <h6><a href="product-details.html">{{ cart.product.name }}</a></h6>
                                                    <p>Size: {{ cart.size }}</p>
                                                    <p class="quantity">
                                                        {{ cart.quantity }} x - {{ formatPrice(cart.final_price) }}
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="bottom mt-4">
                                            <div class="total">
                                                <span>Tổng tiền</span>
                                                <span class="total-amount">{{ formatPrice(carts.into_money) }} VNĐ</span>
                                            </div>
                                            <div class="button">
                                                <router-link 
                                                    :to="{ name: 'cart' }" 
                                                    class="btn animate"
                                                >
                                                    Xem giỏ hàng
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        v-else
                                        class="shopping-item"
                                    >
                                        <h6>GIỎ HÀNG</h6>
                                        <img src="/images/cart/empty-cart.svg" alt="" />
                                        <p class="m-3 text-center text-dark">Bạn chưa có sản phẩm nào trong giỏ hàng của mình.</p>
                                    </div>
                                </div>
                                <div class="user ms-3">
                                    <div class="user-circle">
                                        <i class="bi bi-person"></i>
                                        <span v-if="getUser" class="total-items">Hi</span>
                                    </div>     
                                    <ul class="sub-user" v-if="getUser">
                                        <li>
                                            <a href="">Hello {{ getUser.name }}</a>
                                        </li>
                                        <li>
                                            <a href="/profiles">Tài khoản</a>
                                        </li>
                                        <li>
                                            <a href="/profiles/purchases">Đơn mua</a>
                                        </li>
                                        <li>
                                            <a @click="logout">
                                                Đăng xuất<i class="bi bi-power"></i>
                                            </a>
                                        </li>
                                    </ul>   
                                    <ul class="sub-user" v-else>
                                        <li>
                                            <a href="/register">Đăng ký</a>
                                        </li>
                                        <li>
                                            <a href="/login">Đăng nhập</a>
                                        </li>
                                    </ul>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    import CategoryService from "@/services/user/category.service";
    import CartService from "@/services/user/cart.service";
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import $ from 'jquery'

    export default {
        name: 'Header',
        data() {
            return {
                categories: [],
                token: localStorage.getItem('tokenUser'),
                keyword: this.$route.query.keyword
            };
        },
        async created() {
            CategoryService.getCategory().then((response) => {
                this.categories = response;
            });

            if(this.getUser) {
                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
            }
            
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
                if (window.scrollY > 130) {
                    $(".topbar-transparent").addClass('d-block position-fixed w-100').removeClass('d-none');
                } else {
                    $(".topbar-transparent").addClass('d-none').removeClass('d-block fixed');
                }
            },
            productByUrl(url) {
                console.log(url);
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async logout() {
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                    await axios.post(`http://127.0.0.1:8000/api/logout`).then(() => {
                        localStorage.removeItem('tokenUser');
                        this.$store.dispatch('logoutUser');
                        this.$router.push({ name: "login" });

                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                            }
                        })
            
                        Toast.fire({
                            icon: 'success',
                            title: 'Đăng xuất thành công.'
                        })
                    });
                    
                } catch (error) {            
                    console.log(error);
                }
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            startListening() {
                const recognition = new window.webkitSpeechRecognition()
                recognition.onresult = (event) => {
                    const speechToText = event.results[0][0].transcript
                    this.keyword = speechToText
                }
                recognition.start()
            },
            handleKeyPress(event) {
                if (event.key === 'Enter') {
                this.redirectToSearchPage();
                }
            },
            redirectToSearchPage() {
                this.$router.push({
                name: 'search',
                query: { keyword: this.keyword }
                });
            }
        },
        computed: {
            ...mapGetters(['getUser', 'carts'])
        },
     };
</script>


<style scoped>
    .microphone-btn {
    background-color: #fff;
    width: 45px;
    height: 45px;
    padding: 0;
    border: 1px solid #e2e2e2;
    border-left: none;
    margin-left: -2px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    font-size: 18px;
    padding-right: 10px;
    }
    .link {
        color: #0167f3 !important;
    }
</style>