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
    <div class="container-fluid p-5 profiles">
        <div class="row">
            <div class="col-2">
                <ProfileNavigation/>
            </div>
            <div class="col-10">
                <router-view></router-view>
            </div>
        </div>
        <!-- Sidebar End -->
    </div>
</template>

