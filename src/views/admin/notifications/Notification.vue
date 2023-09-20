<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="notifications">
                    <div class="group-btn">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <h3>Thông báo mới nhất</h3>
                            <div>
                                <button type="button" class="btnBack" @click="notificationRead()"
                                    :class="{'btn-active': statusNotification==1}">
                                    <i class="fa fa-eye-slash"></i>Chưa đọc
                                </button>
                                <button type="button" class="btnDelete" @click="notificationReaded()"
                                    :class="{'btn-active': statusNotification==2}">
                                    <i class="fa fa-eye"></i>Đã đọc
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="notification">
                        <div class="notification-container">
                            <div class="notification-item" v-for="notification in filteredNotifications" :key="notification">
                                <p class="notification-content">
                                    <span>{{ notification.user }}: {{ notification.message }}</span>
                                    <span v-if="status=='Đã đọc'"><i class="fa fa-eye"></i></span>
                                    <span v-else><i class="fa fa-eye-slash"></i></span>
                                </p>
                                <p class="notification-detail">
                                    <span>{{ formattedDate(notification.date) }}</span>
                                    <a :href="notification.link">Chi tiết</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import StatisticalService from "@/services/admin/statistical.service";
export default {
    data() {
        return {
            notifications: [],
            statusNotification: 0
        }
    },
    computed: {
        filteredNotifications() {
            if (this.statusNotification === 1) {
                // Lọc ra các thông báo có trạng thái "chưa đọc"
                return this.notifications.filter(notification => notification.status === "Chưa đọc");
            } else if (this.statusNotification === 2) {
                // Lọc ra các thông báo có trạng thái "đã đọc"
                return this.notifications.filter(notification => notification.status === "Đã đọc");
            } else {
                // Trả về toàn bộ danh sách thông báo nếu không có lựa chọn hoặc lựa chọn không hợp lệ
                return this.notifications;
            }
        },
    },
    methods: {
        async retrieveNotifications() {
            try {
                this.notifications = await StatisticalService.getNotifications();
            } catch (error) {
                console.log(error);
            }
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
            } else {
                // Hiển thị định dạng ngày/tháng/năm và giờ:phút
                const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                return formattedDate;
            }
        },
        notificationRead() {
            if(this.statusNotification==1) 
                this.statusNotification = 0;
            else this.statusNotification = 1;
        },
        notificationReaded() {
            if(this.statusNotification==2) 
                this.statusNotification = 0;
            else this.statusNotification = 2;
        }
    },
    mounted() {
        this.retrieveNotifications();
    }
}
</script>

<style scoped>
.btn-active {
    background-color: antiquewhite;
}
</style>