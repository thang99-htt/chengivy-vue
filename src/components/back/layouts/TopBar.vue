<template>
    <header class="main-header">
        <span class="logo-mini">
            <a href="/">
                <img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block logo">
            </a>
        </span>
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <div class="icon_info">
                    <ul>
                        <li><a href="#"><i class="fa fa-bell"></i><span class="badge">2</span></a></li>
                        <li><a href="#"><i class="fa fa-envelope"></i><span class="badge">3</span></a></li>
                        <li><a href="#"><i class="fa fa-question-circle"></i></a></li>
                        
                    </ul>
                    <ul class="user_profile_dd">
                        <li>
                            <a class="dropdown-toggle" data-toggle="dropdown">
                                <img class="img-responsive rounded-circle" src="/images/admin/photos/6215.jpg" alt="#" />
                                <span class="name_user" v-if="user">{{ user.name }}</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" @click="logout">
                                    <span>Đăng xuất</span> 
                                    <i class="fa fa-sign-out"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';

    export default {
        name: 'TopBar',
        data() {
            return {
                currentUser: [],
                token: localStorage.getItem('tokenAdmin'),
            };
        },
        async created() {
            await axios.get(`http://127.0.0.1:8000/api/user`, {
                headers: {
                Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.$store.dispatch('user', response.data)
            });
        },
        methods: {
            async logout() {
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                    await axios.post(`http://127.0.0.1:8000/api/admin/logout`)
                    .then((response) => {
                        localStorage.removeItem('tokenAdmin');
                        this.$store.dispatch('user', null);
                        this.$router.push({ name: "login.admin" });

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
            
                        Toast.fire({
                            icon: 'success',
                            title: 'Đăng xuất thành công.'
                        })
                    });
                    
                } catch (error) {            
                    console.log(error);
                }
            },
        },
        computed: {
      ...mapGetters(['user'])
    }
    };
</script>