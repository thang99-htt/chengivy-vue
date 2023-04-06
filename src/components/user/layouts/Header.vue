<template>
    <header class="header navbar-area">
        <div class="topbar">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 col-md-4 col-12">
                        <div class="top-left">
                            <ul class="menu-top-link">
                                <li>
                                    <div class="select-position">
                                        <select id="select4">
                                            <option value="0" selected>$ USD</option>
                                            <option value="1">€ EURO</option>
                                            <option value="2">$ CAD</option>
                                            <option value="3">₹ INR</option>
                                            <option value="4">¥ CNY</option>
                                            <option value="5">৳ BDT</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div class="select-position">
                                        <select id="select5">
                                            <option value="0" selected>English</option>
                                            <option value="1">Tiếng việt</option>
                                            <option value="2">Filipino</option>
                                            <option value="3">Français</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-12">
                        <div class="top-middle">
                            <ul class="useful-links">
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href="about-us.html">Về chúng tôi</a></li>
                                <li><a href="contact.html">Liên hệ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-12">
                        <div class="top-end">
                            <div v-if="getUser">
                                <div class="user">
                                    <i class="bi bi-user"></i>
                                    Hello {{ getUser.name }}
                                </div>
                                <ul class="user-login">
                                    <li>
                                        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                            <i class="bi bi-power-switch"></i>Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                <div class="user">
                                    <i class="bi bi-user"></i>
                                    Hello Guest
                                </div>
                                <ul class="user-login">
                                    <li>
                                        <a href="<?= request()->baseUrl(); ?>/login">Đăng ký</a>
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

        <div class="header-middle">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-3 col-7">
                        <a class="navbar-brand" href="/">
                            <img src="/images/logo/logo.jpg" alt="Logo" />
                        </a>
                    </div>
                    <div class="col-lg-5 col-md-7 d-xs-none">
                        <div class="main-menu-search">
                            <div class="navbar-search search-style-5">
                                <div class="search-select">
                                    <div class="select-position">
                                        <select id="select1">
                                            <option selected>Tất cả</option>
                                            <option value="1">option 01</option>
                                            <option value="2">option 02</option>
                                            <option value="3">option 03</option>
                                            <option value="4">option 04</option>
                                            <option value="5">option 05</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="search-input">
                                    <input type="text" placeholder="Tìm kiếm" />
                                </div>
                                <div class="search-btn">
                                    <button><i class="bi bi-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-2 col-5">
                        <div class="middle-right-area">
                            <div class="nav-hotline">
                                <i class="bi bi-telephone-fill"></i>
                                <h3>
                                    Hotline:
                                    <span>(+100) 123 456 7890</span>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 col-md-6 col-12">
                    <div class="nav-inner">
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

                        <nav class="navbar navbar-expand-lg">
                            <button class="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a href="index.html" class="active" aria-label="Toggle navigation">Trang chủ</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="dd-menu collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#submenu-1-2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">Pages</a>
                                        <ul class="sub-menu collapse" id="submenu-1-2">
                                            <li class="nav-item">
                                                <a href="about-us.html">About Us</a>
                                            </li>
                                            <li class="nav-item"><a href="faq.html">Faq</a></li>
                                            <li class="nav-item"><a href="/login">Login</a></li>
                                            <li class="nav-item">
                                                <a href="/register">Register</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="mail-success.html">Mail Success</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="404.html">404 Error</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="dd-menu collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#submenu-1-3" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">Shop</a>
                                        <ul class="sub-menu collapse" id="submenu-1-3">
                                            <li class="nav-item">
                                                <a href="product-grids.html">Shop Grid</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="product-list.html">Shop List</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="product-details.html">shop Single</a>
                                            </li>
                                            <li class="nav-item"><a href="cart.html">Cart</a></li>
                                            <li class="nav-item">
                                                <a href="checkout.html">Checkout</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="dd-menu collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#submenu-1-4" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">Blog</a>
                                        <ul class="sub-menu collapse" id="submenu-1-4">
                                            <li class="nav-item">
                                                <a href="blog-grid-sidebar.html">Blog Grid Sidebar</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="blog-single.html">Blog Single</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="blog-single-sidebar.html">Blog Single Sibebar</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a href="contact.html" aria-label="Toggle navigation">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="nav-social">
                        <h5 class="title">Theo dõi chúng tôi:</h5>
                        <ul>
                            <li>
                                <a href="javascript:void(0)"><i class="bi bi-facebook"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0)"><i class="bi bi-twitter"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0)"><i class="bi bi-instagram"></i></a>
                            </li>
                            <li>
                                <a href="javascript:void(0)"><i class="bi bi-skype"></i></a>
                            </li>
                        </ul>
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

    export default {
        name: 'Header',
        data() {
            return {
                categories: [],
                token: localStorage.getItem('tokenUser'),
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
        methods: {
            productByUrl(url) {
                console.log(url);
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async logout() {
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                    await axios.post(`http://127.0.0.1:8000/api/logout`)
                    .then(() => {
                        localStorage.removeItem('tokenUser');
                        this.$store.dispatch('logoutUser');
                        this.$router.push({ name: "login" });

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
            }
        },
        computed: {
            ...mapGetters(['getUser', 'carts'])
        }
         
     };
</script>
