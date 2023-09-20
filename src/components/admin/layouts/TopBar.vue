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
                        <li class="notification">
                            <a href="#"  id="dropdownMenuButton2"  data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-bell"></i><span class="badge">{{ notifications.length }}</span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <h3>Thông báo</h3>
                                <div class="notification-container">
                                    <div class="notification-item"
                                        v-for="notification in notifications" :key="notification"
                                    >
                                        <p class="notification-content">
                                            {{ notification.user }}: {{ notification.message }}
                                        </p>
                                        <p class="notification-detail">
                                            <span>{{ formattedDate(notification.date) }}</span>
                                            <a :href="notification.link">Chi tiết</a>
                                        </p>
                                    </div>
                                </div>
                                <div class="notification-view">
                                    <a href="#">Xem tất cả</a>
                                </div>
                            </div>
                        </li>
                        <li><a href="https://mail.google.com/mail/u/2/"><i class="fa fa-envelope"></i><span class="badge">3</span></a></li>
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
    import Pusher from 'pusher-js';
    import StatisticalService from "@/services/admin/statistical.service";

    export default {
        name: 'TopBar',
        data() {
            return {
                token: localStorage.getItem('tokenAdmin'),
                authorization: [],
                notifications: [],
                currentTime: new Date(),
                reviews: [],
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
            async retrieveNotifications() {
                try {
                    this.notifications = await StatisticalService.getNotifications();
                } catch (error) {
                    console.log(error);
                }
            },
            updateCurrentTime() {
                this.currentTime = new Date();
            },
            formattedDate(date1) {
                const date = new Date(date1);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                const now = this.currentTime; // Sử dụng currentTime mới để tính thời gian

                const timeDiff = now - date;

                if (timeDiff < 60000) {
                    // Hiển thị cách đây ít phút
                    return "Vừa xong";
                } else if (timeDiff < 3600000) {
                    // Hiển thị cách đây ít giờ
                    const minutesAgo = Math.floor(timeDiff / 60000);
                    return `${minutesAgo} phút trước`;
                } else if (timeDiff < 86400000) {
                    // Hiển thị cách đây ít ngày
                    const hoursAgo = Math.floor(timeDiff / 3600000);
                    return `${hoursAgo} giờ trước`;
                } else if (timeDiff < 518400000) { // 6 ngày = 6 * 24 * 60 * 60 * 1000 ms
                    const daysAgo = Math.floor(timeDiff / 86400000);
                    return `${daysAgo} ngày trước`;
                }   else {
                    // Hiển thị định dạng ngày/tháng/năm và giờ:phút
                    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                    return formattedDate;
                }
            },
            async retrieveReviews() {
                try {
                    const response = await axios.get('http://127.0.0.1:5000/reviews/sentiment');
                    this.reviews = response.data;
                    console.log(this.reviews)
                } catch (error) {
                    console.log(error);
                }
            },
        },
        computed: {
            ...mapGetters(['getAdmin'])
        },
        mounted() {
            this.retrieveNotifications();
            this.retrieveReviews()
            Pusher.logToConsole = true;
            const pusher = new Pusher('0d5201b4ba1917ad2dcf', {
                cluster: 'ap1',
            });

            const channel = pusher.subscribe('notification');
            channel.bind('notification', (data) => {
                this.notifications.push(data);
                this.retrieveNotifications();
            });
            // Cập nhật thời gian mỗi giây
            setInterval(this.updateCurrentTime, 1000); // Mỗi giây (1000 ms)
        },
    };
</script>