<script>
    import ProfileNavigation from './ProfileNavigation.vue';
    export default {
        name: 'layout',
        components: {
            ProfileNavigation,
        },
};
</script>

<template>
    <div class="container mt-100 profiles">
        <div class="row">
            <div class="col-3">
                <ProfileNavigation/>
            </div>
            <div class="col-9">
                <router-view></router-view>
            </div>
        </div>
        <!-- Sidebar End -->
    </div>
</template>

