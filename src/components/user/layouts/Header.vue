<template>
    <header class="header navbar-area">
    <div class="topbar">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-4">                        
                    <div class="top-left">
                        <div class="nav-inner">
                            <div class="mega-category-menu">
                                <span class="cat-button">
                                    <i class="fa fa-bars"></i>
                                    <router-link 
                                        :to="{
                                            name: 'product.all',
                                        }" 
                                    >
                                        Shop    
                                    </router-link>
                                </span>
                                <div class="sub-category">
                                    <div class="row">
                                        <div class="col-4">
                                            <ul class="">{{ categories.name }}
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
                                                            <i class="fa fa-chevron-right"></i> 
                                                        </span>
                                                    </router-link>
                                                    <div 
                                                        v-if="category.childs.length > 0"
                                                        class="inner-sub-category"
                                                    >
                                                        <div class="row">
                                                            <div class="col-3">
                                                                <ul class="">
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
                                                            </div>
                                                            <div class="col-9">
                                                                <img src="/images/header/topbar-2.jpg" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-8">
                                            <div class="pe-3">
                                                <img src="/images/header/topbar-1.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="top-middle">
                        <a class="navbar-brand" href="/">
                            <img src="/images/logo/logo.jpg" alt="Logo" />
                        </a>
                    </div>
                </div>
                <div class="col-4">      
                    <div class="top-end">
                        <div class="navbar-search">
                            <router-link :to="{ name: 'search' }" class="main-btn">
                                <i class="bi bi-search"></i>
                            </router-link>
                        </div>
                        <div class="navbar-cart">
                            <div class="cart-items">
                                <router-link :to="{ name: 'cart' }" class="main-btn">
                                    <i class="bi bi-bag"></i>
                                    <span class="total-items">{{ carts.count_item }}</span>
                                </router-link>
                                
                                <div 
                                    v-if="carts.count_item > 0"
                                    class="shopping-item"
                                >
                                    <div class="dropdown-cart-header d-flex justify-content-between">
                                        <h6>Giỏ hàng</h6>
                                        <span>{{ carts.count_item }} sản phẩm</span>
                                    </div>
                                    <ul class="shopping-list">
                                        <li 
                                            v-for="(cart, index) in carts.getCartItems"
                                            :key="cart"
                                        >  
                                            <div class="cart-img-head">
                                                <a class="cart-img" href="product-details.html">
                                                    <img v-if="cart.product.image" :src="getImage(cart.product.image)" alt="#" />
                                                </a>
                                            </div>
                                            <div class="">
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
                                            <span class="total-amount">{{ formatPrice(carts.into_money) }} VĐN</span>
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
                        <div class="navbar-user">
                            <ul class="navbar-nav user-login">
                                <a href="javascript:void(0)">
                                    <i class="bi bi-person"></i>
                                    <span 
                                        v-if="user"
                                        class="total-items"
                                    >
                                        Hi
                                    </span>
                                </a>
                                <li class="nav-item">
                                    <ul 
                                        class="sub-menu"
                                        v-if="user"
                                    >
                                        <li class="nav-item">
                                           <a href="">
                                                {{ user.name }}
                                           </a>
                                        </li>
                                        <li class="nav-item">
                                            <router-link :to="{ name: 'purchase' }">
                                                Đơn mua
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link :to="{ name: 'profile' }">
                                                Hồ sơ
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                @click="logout"
                                            >
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </ul>
                                    <ul 
                                        class="sub-menu"
                                        v-else
                                    >
                                        <li class="nav-item">
                                            <router-link to="register">
                                                Đăng ký
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link to="login">
                                                Đăng nhập
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
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
    import {mapGetters} from 'vuex'

    export default {
        name: 'Header',
        data() {
            return {
                categories: [],
                carts: [],
                token: localStorage.getItem('token'),
            };
        },
        mounted() {
            CategoryService.getCategory().then((response) => {
                this.categories = response;
            });
            this.retrieveCarts();
        },
        async created() {
            await axios.get(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.$store.dispatch('user', response.data);
                this.$store.dispatch('userId', response.data.id)
            });
        },
        methods: {
            async retrieveCarts() {
                try {
                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        this.carts = await CartService.getCart(response.data.id);
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async logout() {
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                    await axios.post(`http://127.0.0.1:8000/api/logout`)
                    .then((response) => {
                        localStorage.removeItem('token');
                        this.$store.dispatch('user', null);
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
                let val = (value/1).toFixed(2)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
         
     };
</script>
