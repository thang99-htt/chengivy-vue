<template>
    <div class="sidebar">
        <nav class="navbar"> 
            <div class="navbar-nav w-100">
                <router-link 
                    :to="{ name: 'profile' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/profile') }"
                >
                    <i class="fa fa-user"></i>Tài khoản
                </router-link>
                <router-link 
                    :to="{ name: 'purchase' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/purchase') }"
                >
                    <i class="fa fa-cart-arrow-down"></i>Đơn mua
                </router-link>
                <router-link 
                    :to="{ name: 'return' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/returns') }"
                >
                    <img src="/images/icon/icon-return-menu.svg" alt="">Đổi trả
                </router-link>
                <router-link 
                    :to="{ name: 'favorite' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/favorites') }"
                >
                    <img src="/images/icon/icon-wishlist-menu.svg" alt="">Danh sách yêu thích
                </router-link>
                <router-link 
                    :to="{ name: 'review.customer' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/customer/reviews') }"
                >
                    <img src="/images/icon/icon-reviews-menu.svg" alt="">Đánh giá sản phẩm
                </router-link>
                <router-link 
                    :to="{ name: 'address' }"
                    class="nav-item nav-link"
                    :class="{ active: $route.path.includes('/address') }"
                >
                    <img src="/images/icon/icon-address-menu.svg" alt="">Địa chỉ giao hàng
                </router-link>
                <hr>
                <a @click="logout">
                    <i class="fa fa-sign-out"></i>Đăng xuất
                </a>
            </div>
        </nav>
    </div>
</template>
<script>
    import $ from 'jquery';
    import axios from 'axios';

    export default {
        data() {
            return {
                categories: [],
                token: localStorage.getItem('tokenUser')
            }
        },
        methods: {
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
        }
    }
</script>

<style>
</style>
