<template>
    <section class="content">
        <div class="option-filter">
            <router-link 
                :to="{ name: 'product' }"
                :class="{ active: $route.path.includes('/products/list') }"    
            >   Tổng quan
            </router-link>
            <router-link 
                :to="{ name: 'inventory' }"
                :class="{ active: $route.path.includes('/products/inventory') }"   
            >   Tồn kho
            </router-link>
            <router-link 
                :to="{ name: 'product' }"
            >   Giảm giá
            </router-link>
            <router-link 
                :to="{ name: 'category' }"
                :class="{ active: $route.path.includes('/products/category') }"
            >   Danh mục
            </router-link>
            <router-link 
                :to="{ name: 'brand' }"
                :class="{ active: $route.path.includes('/products/brand') }"
            >   Thương hiệu
            </router-link>
        </div>
        <router-view></router-view>
    </section>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        
    },
};
</script>
