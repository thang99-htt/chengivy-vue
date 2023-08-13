<template>
    <section class="content">
        <div class="option-filter">
            <router-link 
                :to="{ name: 'staff' }"
                :class="{ active: $route.path.includes('/staffs/staff-list') }"    
            >   Quản lý thông tin
            </router-link>
            <router-link 
                :to="{ name: 'role' }"
                :class="{ active: $route.path.includes('/staffs/roles') }"    
            >   Quản lý phân quyền
            </router-link>
        </div>
        <router-view></router-view>
    </section>
</template>
