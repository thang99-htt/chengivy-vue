<template>
    <div class="sidebar">
        <nav class="navbar"> 
            <div class="navbar-nav w-100">
                <router-link 
                    :to="{ name: 'profile' }"
                    class="nav-item nav-link active"
                >
                    <i class="fa fa-user"></i>Tài khoản
                </router-link>
                <router-link 
                    :to="{ name: 'purchase' }"
                    class="nav-item nav-link"
                >
                    <i class="fa fa-cart-arrow-down"></i>Đơn mua
                </router-link>
                <!-- <a href="" class="nav-item nav-link"><i class="fa fa-map-marker"></i>Địa chỉ giao hàng</a> -->
            </div>
        </nav>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        mounted() {
          $(".nav-link").on("click", function() {
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
          });
        },
    }
</script>

<style>
</style>
