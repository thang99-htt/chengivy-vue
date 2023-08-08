<script>
    import TopBar from './TopBar.vue';
    import Footer from './Footer.vue';
    import SideBar from './SideBar.vue';
    export default {
        name: 'layout',
        components: {
            SideBar,
            TopBar,
            Footer,
        },
};
</script>

<template>
    <div :class="['wrapper']">
        <top-bar></top-bar>
        <side-bar />
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header mb-3">
                <h1>
                {{$route.meta.description.toUpperCase() }}
                </h1>
                <ol class="breadcrumb">
                <li>
                    <a href="javascript:;">
                    <i class="fa fa-home"></i>Home</a>
                </li>
                <li class="active">{{$route.meta.description}}</li>
                </ol>
            </section>

            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
    
</template>


<style>
@import "@/assets/admin.css";

.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}
</style>
