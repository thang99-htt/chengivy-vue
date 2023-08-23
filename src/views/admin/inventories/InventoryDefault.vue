<template>
    <section class="content">
        <div class="option-filter">
            <router-link 
                :to="{ name: 'inventories.overview' }"
                :class="{ active: $route.path.includes('/inventories/overview') }"    
            >   Tổng quan
            </router-link>
            <router-link 
                :to="{ name: 'product' }"
            >   Hàng vừa nhập
            </router-link>
            <router-link 
                :to="{ name: 'category' }"
                :class="{ active: $route.path.includes('/inventories/category') }"
            >   Hàng sắp hết
            </router-link>
            <router-link 
                :to="{ name: 'category' }"
                :class="{ active: $route.path.includes('/inventories/category') }"
            >   Hết hàng
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
