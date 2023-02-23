<template>
    <div class="sidebar">
        <nav class="navbar"> 
            <div class="navbar-nav w-100">
                <a href="" class="nav-item nav-link"><i class="fa fa-user"></i>Tài khoản</a>
                <router-link 
                    :to="{ name: 'purchase' }"
                    class="nav-item nav-link"
                >
                    <i class="fa fa-cart-arrow-down"></i>Đơn mua
                </router-link>
                <a href="" class="nav-item nav-link"><i class="fa fa-map-marker"></i>Địa chỉ giao hàng</a>
            </div>
        </nav>
    </div>
</template>
<script>
    
</script>

<style>
</style>
