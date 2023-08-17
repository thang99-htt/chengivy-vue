<template>
    <section class="content">
        <div class="option-filter">
            <router-link 
                :to="{ name: 'supplier' }"
                :class="{ active: $route.path.includes('/import/supplier') }"    
            >   Nhà cung cấp
            </router-link>  
            <router-link 
                :to="{ name: 'payment-voucher' }"
                :class="{ active: $route.path.includes('/import/payment-voucher') }"    
            >   Phiếu chi
            </router-link> 
            <router-link 
                :to="{ name: 'stock-received-docket' }"
                :class="{ active: $route.path.includes('/import/stock-received-docket') }"   
            >   Phiếu nhập
            </router-link>
        </div>
        <router-view></router-view>
    </section>
</template>
<script></script>