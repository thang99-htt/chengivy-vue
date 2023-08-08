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
    <div class="container profiles">
        <div class="d-flex">
            <ProfileNavigation/>
            <router-view></router-view>
        </div>
    </div>
</template>

