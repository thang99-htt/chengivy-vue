<script>
    import axios from 'axios';

    export default {
        name: 'TopBar',
        data() {
            return {
                currentUser: [],
                token: localStorage.getItem('tokenAdmin'),
            };
        },
        mounted() {
            if(this.token) {
                axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                axios.get(`http://127.0.0.1:8000/api/admin/staff`).then((response) => {
                    this.currentUser = response.data;
                });
            } else {
                this.currentUser = "";
            }
        },
        methods: {
            async logout() {
                try {
                    axios.post(`http://127.0.0.1:8000/api/admin/logout`).then((response) => {
                        Swal.fire({
                        title: 'Bạn có chắc?',
                        text: false,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Đăng xuất',
                        cancelButtonText: 'Hủy'
                    }).then((result) => {
                        if (result.value) {
                            localStorage.removeItem('tokenAdmin');
                            Swal.fire('Đăng xuất thành công!','','success');
                            this.currentUser = "";
                            this.$router.push({ name: "login.admin" });
                        }
                    })
            
                    });
                    
                } catch (error) {            
                    console.log(error);
                }
            },
        },
    };
</script>

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
                                <span class="name_user">{{ currentUser.name }}</span>
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