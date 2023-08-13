<template>
    <header class="main-header">
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
                    <ul class="user_profile_dd dropdown">
                        <li>
                            <a class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img class="img-responsive rounded-circle" :src="getAdmin.avatar" alt="#" />
                                <span class="name_user" v-if="getAdmin">{{ getAdmin.name }}</span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                token: localStorage.getItem('tokenAdmin'),
                authorization: [],
                
            };
        },
        methods: {
            async logout() {
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                    await axios.post(`http://127.0.0.1:8000/api/admin/logout`)
                    .then((response) => {
                        localStorage.removeItem('tokenAdmin');
                        this.$store.dispatch('logoutAdmin');
                        this.$router.push({ name: "login.admin" });

                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
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
            ...mapGetters(['getAdmin'])
        }
    };
</script>