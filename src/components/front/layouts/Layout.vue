<script>
    import Header from './Header.vue';
    import Footer from './Footer.vue';
    export default {
        name: 'layout',
        components: {
            Header,
            Footer,
        },
};
</script>

<template>
    <div>
        <Header></Header>
        <div>
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
    
</template>

