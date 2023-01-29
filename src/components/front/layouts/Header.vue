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
                                    <a href="">Shop</a>
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
                        <a class="navbar-brand" href="/home">
                            <img src="/images/logo/logo.jpg" alt="Logo" />
                        </a>
                    </div>
                </div>
                <div class="col-4">      
                    <div class="top-end">
                        <div class="navbar-search">
                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </a>
                        </div>
                        <div class="navbar-cart">
                            <div class="cart-items">
                                <a href="" class="main-btn">
                                    <svg x.ms-automns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                    </svg>
                                </a>
                                <div class="shopping-item">
                                    <h6>CART</h6>
                                    <img src="" alt="" />
                                    <p class="m-3 text-center text-dark">You have no items in your shopping cart.</p>
                                </div>
                            </div>
                        </div>
                        <div class="navbar-user">
                            <ul class="navbar-nav user-login">
                                <a href="javascript:void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                    </svg>
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
                                            <router-link to="profiles">
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
    import CategoryService from "@/services/front/category.service";
    import axios from 'axios';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Header',
        props: {
            categories: { type: Array, default: [] },
        },
        data() {
            return {
                categories: [],
                token: localStorage.getItem('token'),
            };
        },
        mounted() {
            CategoryService.getCategory().then((response) => {
                this.categories = response;
            });
        },
        async created() {
            await axios.get(`http://127.0.0.1:8000/api/user`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.$store.dispatch('user', response.data)
            });
        },
        methods: {
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
        },
        computed: {
            ...mapGetters(['user'])
        }
         
     };
</script>
