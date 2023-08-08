<template>
    <header class="header navbar-area">
        <div class="container-fluid">
            <div class="topbar bg-transparent topbar-transparent d-none">
                <div class="top-left">
                    <div class="mega-category-menu"  @click="subCategory = !subCategory">
                        <a href="javascript:void(0)">
                            <span class="cat-button">
                                <i class="bi bi-list"></i>
                                Tất cả danh mục
                            </span>
                        </a>
                        <ul class="sub-category" v-if="subCategory">
                            <button class="close"><i class="fa fa-close"></i></button>
                            <li>
                                <router-link :to="{
                                    name: 'product.all',
                                }">
                                    Tất cả sản phẩm
                                </router-link>
                            </li>
                            <li v-for="(category, index) in categories" :key="category">
                                <router-link :to="{
                                    name: 'product.all',
                                    query: { category: category.name },
                                }">
                                    {{ category.name }}
                                    <span v-if="category.childs.length > 0">
                                        <i class="bi bi-chevron-right"></i>
                                    </span>
                                </router-link>
                                <ul class="inner-sub-category" v-if="category.childs.length > 0">
                                    <li v-for="(child, index) in category.childs" :key="child">
                                        <router-link :to="{
                                            name: 'product.all',
                                            query: { category: child.name },
                                        }">
                                            <span v-if="child.status == 1">
                                                {{ child.name }}
                                            </span>
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <div>
                                <img src="/images/hero/slider-bg3.jpg" alt="">
                            </div>
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
                        <div class="navbar-icon-right">
                            <div class="wishlist">
                                <a href="/customer/favorites">
                                    <i class="bi bi-heart"></i>
                                    <span class="total-items" v-if="favorites.favoriteCount">{{ favorites.favoriteCount
                                    }}</span>
                                    <span class="total-items" v-else>0</span>
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
                                        <span>{{ carts.count_item }} sản phẩm</span>
                                        <router-link :to="{ name: 'cart' }" class="btn animate">
                                            Xem giỏ hàng
                                        </router-link>
                                    </div>
                                    <ul class="shopping-list">
                                        <li v-for="(cart, index) in carts.getCartItems" :key="cart">
                                            <a href="javascript:void(0)" class="remove" title="Remove this item"><i
                                                    class="fa fa-close"></i></a>
                                            <div class="cart-img-head">
                                                <img v-if="cart.image" :src="getImage(cart.image)"
                                                    alt="#" />
                                            </div>
                                            <div class="content">
                                                <h4>
                                                    <router-link :to="{
                                                        name: 'product.detail',
                                                        params: { id: cart.product.id },
                                                    }">
                                                        {{ cart.product.name }}
                                                    </router-link>    
                                                </h4>
                                                <p>Size: {{ cart.size_name }}</p>
                                                <p class="quantity">
                                                    {{ cart.quantity }} x {{ formatPrice(cart.product.price_final) }}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng tiền</span>
                                            <span class="total-amount">{{ formatPrice(carts.into_money) }}</span>
                                        </div>
                                        <div class="button">
                                            <router-link 
                                                :to="{
                                                    name: 'checkout',
                                                }" 
                                                class="btn animate"
                                            >
                                                Mua ngay   
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="shopping-item">
                                    <h6>GIỎ HÀNG</h6>
                                    <img src="/images/cart/empty-cart.svg" alt="" />
                                    <p class="m-3 text-center text-dark">Bạn chưa có sản phẩm nào trong giỏ hàng của mình.
                                    </p>
                                </div>
                            </div>
                            <div class="user ms-3">
                                <div class="user-circle">
                                    <i class="bi bi-person"></i>
                                    <span v-if="getUser" class="total-items">Hi</span>
                                </div>
                                <ul class="sub-user" v-if="getUser">
                                    <li>
                                        <a href="" class="text-bold">{{ getUser.name }}</a>
                                    </li>
                                    <li>
                                        <a href="/customer/profiles">Tài khoản</a>
                                    </li>
                                    <li>
                                        <a href="/customer/purchases">Đơn mua</a>
                                    </li>
                                    <li>
                                        <a @click="logout">
                                            Đăng xuất
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

        <div class="topbar topbar-main">
            <div class="top-left">
                <div class="top-link" href="#">
                    <div class="hotline-item">
                        <div class="hotline-phone-ring">
                            <div class="hotline-phone-ring-circle"></div>
                            <div class="hotline-phone-ring-circle-fill"></div>
                            <div class="hotline-phone-ring-img-circle">
                                <a href="tel:0931059007">
                                    <i class="bi bi-telephone-fill"></i>
                                </a>
                            </div>
                        </div>
                        <div class="hotline-item-content">
                            Hotline:
                            <span>(+84) 222 666 8888</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top-middle">
                <div class="banner-list">
                    <div class="banner-item">
                        <img class="banner-img" alt="" src="/images/shipping/shipping5.png" width="30px">
                        <span class="banner-text">Giảm 15% cho đơn hàng đầu tiên</span>
                    </div>
                </div>
            </div>
            <div class="top-end">

                <div class="navbar-icon-right">
                    <div class="language">
                        <a href="javascript:void(0)" @click="showLanguagePopover = !showLanguagePopover">
                            <i class="bi bi-globe"></i>
                        </a>
                        <div class="language-popover-inner" :class="{ 'd-block': showLanguagePopover }">
                            <div class="language-popover-inner-content language-popover-inner--default">
                                <div class="language-currency-content">
                                    <div class="currency-content-item">
                                        <p class="currency-content-title">Ngôn ngữ</p>
                                        <div class="language-select cursor-pointer dropdown language-select-small"
                                            style="width: 100%;">
                                            <div class="text" @click="showSelectLanguage = !showSelectLanguage">
                                                {{ selectedLanguage }}</div>
                                            <span class="icon-dropdown icon-dropdown-small"
                                                :class="{ 'rotated': showSelectLanguage }">
                                                <i class="bi bi-chevron-down"></i>
                                            </span>
                                            <div class="language-select-menu_list menu" v-show="showSelectLanguage">
                                                <div class="language-select-option-content">
                                                    <div v-for="(language, index) in languages" :key="index"
                                                        @click="selectLanguage(language)"
                                                        :class="['language-select-menu_item', 'language-select-content-small', { 'language-select-content-active': language === selectedLanguage }]">
                                                        {{ language }}
                                                        <i v-if="language === selectedLanguage" class="bi bi-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="currency-content-item">
                                        <p class="currency-content-title">Tiền tệ</p>
                                        <div class="language-select cursor-pointer dropdown  language-select-small"
                                            style="width: 100%;">
                                            <div class="text" @click="showSelectCurrency = !showSelectCurrency">
                                                <div class="currency-content-items">
                                                    <div class="currency-content-item-icon">
                                                        <div class="language-image absolute no_resize"
                                                            style="width: 18px; height: 18px;">
                                                            <img class="language-image-inner first-image"
                                                                :src="`/images/currency/${selectedCurrency.image}`"
                                                                style="width: 100%; height: 100%; object-fit: cover;">
                                                        </div>
                                                    </div>
                                                    <div>{{ selectedCurrency.name }}</div>
                                                </div>
                                            </div>
                                            <span class="icon-dropdown icon-dropdown-small"
                                                :class="{ 'rotated': showSelectCurrency }">
                                                <i class="bi bi-chevron-down"></i>
                                            </span>
                                            <div class="language-select-menu_list menu" v-show="showSelectCurrency">
                                                <div class="language-select-option-content">
                                                    <div v-for="(currency, index) in currencies" :key="index"
                                                        @click="selectCurrency(currency)"
                                                        :class="['language-select-menu_item', 'language-select-content-small', { 'language-select-content-active': currency === selectedCurrency }]">
                                                        <div class="currency-content-items">
                                                            <div class="currency-content-item-icon">
                                                                <div class="language-image absolute no_resize"
                                                                    style="width: 18px; height: 18px;">
                                                                    <img class="language-image-inner first-image"
                                                                        :src="`/images/currency/${currency.image}`"
                                                                        style="width: 100%; height: 100%; object-fit: cover;">
                                                                </div>
                                                            </div>
                                                            <div>{{ currency.name }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="currency-content-button">
                                        <div class="language-button cursor-pointer button-mini is-bold"
                                            style="min-width: 100%; font-size: 14px;">Cập nhật</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="header-middle">
            <div class="main-menu-logo">
                <a class="navbar-brand" href="/">
                    <img src="/images/logo/logo.jpg" alt="Logo" />
                </a>
            </div>
            <div class="main-menu-search">
                <div class="navbar-search search-style-5">
                    <div class="search-input" @click="viewSearchHistory">
                        <button class="search-btn"><i class="bi bi-search"></i></button>
                        <input type="text" v-model="keyword" placeholder="Tìm kiếm" @keypress="handleKeyPress" />
                        <button @click="startListening" class="microphone-btn"><i class="bi bi-mic"></i></button>
                    </div>
                </div>
                <div class="sub-menu-search">
                    <ul id="nav" class="navbar-nav ms-aut">
                        <li class="nav-item">
                            <a href="javascript:void(0)">
                                Lịch sử tìm kiếm
                            </a>
                        </li>
                        <li 
                            class="nav-item"
                            v-for="history in searchHistory" :key="history"
                        >
                            <a href="javascript:void(0)">
                                <span class="history" @click="redirectToSearch(history)">{{ history }}</span>
                                <span class="close" @click="deleteSearchHistory(history)">
                                    <i class="fa fa-close"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle-right-area">
                <div class="navbar-icon-right">
                    <div class="wishlist">
                        <a href="/customer/favorites">
                            <i class="bi bi-heart"></i>
                            <span class="total-items" v-if="favorites.favoriteCount">{{ favorites.favoriteCount
                            }}</span>
                            <span class="total-items" v-else>0</span>
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
                                <span>{{ carts.count_item }} sản phẩm</span>
                                <router-link :to="{ name: 'cart' }" class="btn animate">
                                    Xem giỏ hàng
                                </router-link>
                            </div>
                            <ul class="shopping-list">
                                <li v-for="(cart, index) in carts.getCartItems" :key="cart">
                                    <a href="javascript:void(0)" @click="deleteProduct(cart.id)" class="remove"
                                        title="Remove this item">
                                        <i class="fa fa-close"></i>
                                    </a>
                                    <div class="cart-img-head">
                                        <img v-if="cart.image" :src="getImage(cart.image)" alt="#" />
                                    </div>
                                    <div class="content">
                                        <h4>
                                            <router-link :to="{
                                                name: 'product.detail',
                                                params: { id: cart.product.id },
                                            }">
                                                {{ cart.product.name }}
                                            </router-link>
                                        </h4>
                                        <p>Size: {{ cart.size_name }}</p>
                                        <p class="quantity">
                                            {{ cart.quantity }} x {{ formatPrice(cart.product.price_final) }}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div class="bottom mt-4">
                                <div class="total">
                                    <span>Tổng tiền</span>
                                    <span class="total-amount">{{ formatPrice(carts.into_money) }}</span>
                                </div>
                                <div class="button">
                                    <router-link 
                                        :to="{
                                            name: 'checkout',
                                        }" 
                                        class="btn animate"
                                    >
                                        Mua ngay   
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div v-else class="shopping-item">
                            <h6>GIỎ HÀNG</h6>
                            <img src="/images/cart/empty-cart.svg" alt="" />
                            <p class="m-3 text-center text-dark">Bạn chưa có sản phẩm nào trong giỏ hàng của
                                mình.</p>
                        </div>
                    </div>
                    <div class="user ms-3">
                        <div class="user-circle">
                            <i class="bi bi-person"></i>
                            <span v-if="getUser" class="total-items">Hi</span>
                        </div>
                        <ul class="sub-user" v-if="getUser">
                            <li>
                                <a href="" class="text-bold">{{ getUser.name }}</a>
                            </li>
                            <li>
                                <a href="/customer/profiles">Tài khoản</a>
                            </li>
                            <li>
                                <a href="/customer/purchases">Đơn mua</a>
                            </li>
                            <li>
                                <a @click="logout">
                                    Đăng xuất
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

        <div class="header-bottom">
            <div class="mega-category-menu"  @click="subCategory = !subCategory">
                <a href="javascript:void(0)">
                    <span class="cat-button">
                        <i class="bi bi-list"></i>
                        Tất cả danh mục
                    </span>
                </a>
                <ul class="sub-category" v-if="subCategory">
                    <button class="close"><i class="bi bi-x-lg"></i></button>
                    <li>
                        <router-link :to="{
                            name: 'product.all',
                        }">
                            Tất cả sản phẩm
                        </router-link>
                    </li>
                    <li v-for="(category, index) in categories" :key="category">
                        <router-link :to="{
                            name: 'product.all',
                            query: { category: category.name },
                        }">
                            {{ category.name }}
                            <span v-if="category.childs.length > 0">
                                <i class="bi bi-chevron-right"></i>
                            </span>
                        </router-link>
                        <ul class="inner-sub-category" v-if="category.childs.length > 0">
                            <li v-for="(child, index) in category.childs" :key="child">
                                <router-link :to="{
                                    name: 'product.all',
                                    query: { category: child.name },
                                }">
                                    <span v-if="child.status == 1">
                                        {{ child.name }}
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <div>
                        <img src="/images/hero/slider-bg3.jpg" alt="">
                    </div>
                </ul>
            </div>
            <div class="nav-inner">
                <nav class="navbar navbar-expand-md">
                    <!-- <button class="navbar-toggler mobile-menu-btn" type="button" @click="toggleNavbar">
                        <span class="toggler-icon"></span>
                        <span class="toggler-icon"></span>
                        <span class="toggler-icon"></span>
                    </button> -->
                    <div class="collapse navbar-collapse sub-menu-bar">
                        <ul id="nav" class="navbar-nav ms-aut">
                            <li class="nav-item">
                                <a href="/" :class="{ link: $route.path === '/' }">
                                    <i class="bi bi-house-door-fill me-1"></i>
                                    Trang chủ
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="dd-menu collapsed" :class="{ link: $route.path === '/products/all' }"
                                    href="javascript:void(0)" @click="toggleSubNavbar">Sản phẩm</a>
                                <ul class="sub-menu collapse" id="submenu-1-3">
                                    <div class="row">
                                        <div class="col-4">
                                            <li>
                                                <router-link :to="{
                                                    name: 'product.all',
                                                }" class="fw-bold">
                                                    Tất cả sản phẩm
                                                </router-link>
                                            </li>
                                            <li v-for="(category, index) in categories" :key="category">
                                                <router-link :to="{
                                                    name: 'product.all',
                                                    query: { category: category.name },
                                                }" class="fw-bold"
                                                    v-if="category && category.childs && category.childs.length === 0">
                                                    {{ category.name }}
                                                </router-link>
                                            </li>
                                        </div>
                                        <div class="col-4">
                                            <li v-for="(category, index) in computedCategories[0]" :key="category">
                                                <router-link :to="{
                                                    name: 'product.all',
                                                    query: { category: category.name },
                                                }" v-if="category && category.childs && category.childs.length > 0"
                                                    class="fw-bold">
                                                    {{ category.name }}
                                                </router-link>
                                                <ul class="inner-sub" v-if="category.childs.length > 0">
                                                    <li v-for="(child, index) in category.childs" :key="child">
                                                        <router-link :to="{
                                                            name: 'product.all',
                                                            query: { category: child.name },
                                                        }" class="fw-normal">
                                                            <span v-if="child.status == 1">
                                                                {{ child.name }}
                                                            </span>
                                                        </router-link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </div>
                                        <div class="col-4">
                                            <li v-for="(category, index) in computedCategories[1]" :key="category">
                                                <router-link :to="{
                                                    name: 'product.all',
                                                    query: { category: category.name },
                                                }" v-if="category && category.childs && category.childs.length > 0"
                                                    class="fw-bold">
                                                    {{ category.name }}
                                                </router-link>
                                                <ul class="inner-sub" v-if="category.childs.length > 0">
                                                    <li v-for="(child, index) in category.childs" :key="child">
                                                        <router-link :to="{
                                                            name: 'product.all',
                                                            query: { category: child.name },
                                                        }" class="fw-normal">
                                                            <span v-if="child.status == 1">
                                                                {{ child.name }}
                                                            </span>
                                                        </router-link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html">Bán chạy nhất</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html">Giảm Giá</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html" :class="{ link: $route.path === '/about-us.html' }">Về chúng tôi</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div class="main-menu-search">
                <div class="navbar-search search-style-5">
                    <div class="search-input">
                        <button class="search-btn"><i class="bi bi-search"></i></button>
                        <input type="text" v-model="keyword" placeholder="Tìm kiếm" @keypress="handleKeyPress" />
                        <button @click="startListening" class="microphone-btn"><i class="bi bi-mic"></i></button>
                    </div>
                </div>
            </div>
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
    </header>
</template>
<script>
import CategoryService from "@/services/user/category.service";
import CartService from "@/services/user/cart.service";
import FavoriteService from "@/services/user/favorite.service";
import axios from 'axios';
import { mapGetters } from 'vuex';
import $ from 'jquery'
import { formatPrice, getImage } from '@/utils';

export default {
    name: 'Header',
    data() {
        return {
            categories: [],
            token: localStorage.getItem('tokenUser'),
            keyword: this.$route.query.keyword,
            showLanguagePopover: false,
            showSelectLanguage: false,
            selectedLanguage: 'Tiếng Việt',
            languages: ['Tiếng Việt', 'English', 'Español', 'Français'],
            showSelectCurrency: false,
            selectedCurrency: {
                    name: 'VND ₫',
                    image: 'vnd.jpg'
                },
                currencies: [{
                    name: 'VND ₫',
                    image: 'vnd.jpg'
                },
                {
                    name: 'USD $',
                    image: 'usd.jpg'
                },
                {
                    name: 'EUR €',
                    image: 'eur.jpg'
                },
                {
                    name: 'GBP £',
                    image: 'gbp.jpg'
                }
            ],
            searchHistory: [],
            maxSearchHistory: 8,
            subCategory: false
        };
    },
    async created() {
        CategoryService.getCategory().then((response) => {
            this.categories = response;
        });

        if (this.getUser) {
            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));
        }

    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

        // Khi component được mounted, kiểm tra nếu có lịch sử tìm kiếm đã lưu trong localStorage
        const savedSearchHistory = localStorage.getItem('searchHistory');
        if (savedSearchHistory) {
            this.searchHistory = JSON.parse(savedSearchHistory);
            }
        },
    watch: {
        showLanguagePopover(newVal) {
            if (newVal) {
                setTimeout(() => {
                    window.addEventListener("click", this.handleOutsideClick);
                }, 0);
            } else {
                window.removeEventListener("click", this.handleOutsideClick);
            }
        },
    },
    methods: {
        formatPrice,
        handleScroll() {
            if (window.scrollY > 130) {
                $(".topbar-transparent").addClass('d-flex position-fixed mt-3 w-100').removeClass('d-none');
            } else {
                $(".topbar-transparent").addClass('d-none').removeClass('d-flex fixed');
            }
        },
        handleOutsideClick(event) {
            if (this.showLanguagePopover) {
                const popover = this.$el.querySelector(".language-popover-inner");
                if (!popover.contains(event.target)) {
                    this.showLanguagePopover = false;
                }
            }
        },
        productByUrl(url) {
            console.log(url);
        },
        getImage,
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
        redirectToSearch(keyword) {
            this.keyword = keyword;
            this.redirectToSearchPage();
        },
        redirectToSearchPage() {
            const index = this.searchHistory.findIndex(
                (history) => history === this.keyword
            );

            if (index === -1) {
                // Thêm từ khóa tìm kiếm mới vào đầu mảng
                this.searchHistory.unshift(this.keyword);

                // Giới hạn số lượng mục lịch sử tìm kiếm tối đa
                if (this.searchHistory.length > this.maxSearchHistory) {
                this.searchHistory.splice(this.maxSearchHistory);
                }

                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }

            this.$router.push({
                name: 'product.all',
                query: { keyword: this.keyword },
            });
        },
        deleteProduct(id) {
            CartService.delete(id).then(async (res) => {
                if (res.success) {
                    this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                }
            })
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
                title: 'Sản phẩm đã được xoá khỏi giỏ hàng.'
            });
        },
        selectLanguage(language) {
            this.selectedLanguage = language;
            this.showSelectLanguage = false;
        },
        selectCurrency(currency) {
            this.selectedCurrency = currency;
            this.showSelectCurrency = false;
        },
        toggleNavbar() {
            const navbarToggler = document.querySelector(".sub-menu-bar");
            navbarToggler.classList.toggle("d-block");
        },
        toggleSubNavbar() {
            const navbarToggler = document.querySelector(".sub-menu");
            navbarToggler.classList.toggle("d-block");
        },
        deleteSearchHistory(history) {
            console.log(history)
            const index = this.searchHistory.indexOf(history);
            if (index !== -1) {
                this.searchHistory.splice(index, 1);
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }
        },
        viewSearchHistory() {
            const navbarToggler = document.querySelector(".sub-menu-search");
            navbarToggler.classList.toggle("d-block");
        },
    },
    computed: {
        ...mapGetters(['getUser', 'carts', 'favorites']),

        computedCategories() {
            const categories = this.categories || [];
            const middleIndex = Math.ceil(categories.length / 2);
            const col2Categories = categories.slice(0, middleIndex);
            const col3Categories = categories.slice(middleIndex);
            return [col2Categories, col3Categories];
        }
    },
};
</script>


<style scoped>
.microphone-btn,
.search-btn {
    background-color: #fff;
    width: 45px;
    height: 44px;
    padding: 0;
    border: 1px solid #e2e2e2;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    font-size: 18px;
}

.microphone-btn {
    border-left: none;
    padding-right: 10px;
    border-radius: 0 50% 50% 0;
}

.search-btn {
    border-right: none;
    padding-left: 10px;
    border-radius: 50% 0 0 50%;
}

.link {
    color: var(--cls-primary) !important;
}

.fw-bold {
    font-weight: 700 !important;
    color: #000 !important;
}
</style>