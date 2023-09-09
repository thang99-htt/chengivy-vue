<template>
    <div class="statistical">
        <router-link class="statistical-item" :to="{
            name: 'statistical.finance',
        }">
            <p>Hoạt động tài chính</p>
            <p>Báo cáo về hiệu suất kinh doanh và tình hình tài chính của hệ thống trong giai đoạn thời gian cụ thể.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.sell',
        }">
            <p>Hoạt động bán hàng</p>
            <p>Báo cáo doanh số bán hàng, lợi nhuận, chi phí, và các số liệu kết quả kinh doanh khác.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.top',
        }">
            <p>Top nổi bật</p>
            <p>Báo cáo các sản phẩm, đơn hàng, khách hàng được xác định hoặc đánh giá trong một thời kỳ cụ thể.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.inventory',
        }">
            <p>Lịch sử tồn kho</p>
            <p>Báo cáo tình trạng kho hiện có cùng với dự đoán về tình hình tồn kho trong tương lai.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.finance',
        }">
            <p>Lịch sử hóa đơn</p>
            <p>Báo cáo các chi tiết liên quan đến các giao dịch mua bán hoặc dịch vụ cụ thể.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.return',
        }">
            <p>Lịch sử hoàn trả</p>
            <p>Báo cáo các chi tiết liên quan đến các giao dịch hoàn trả hoặc đổi trả sản phẩm hoặc dịch vụ.</p>
        </router-link>
        <router-link class="statistical-item" :to="{
            name: 'statistical.trend',
        }">
            <p>Xu hướng bán hàng</p>
            <p>Báo cáo trình bày và phân tích các dấu hiệu và biểu đồ về sự biến đổi trong hoạt động bán hàng của một
                    doanh nghiệp theo thời gian.</p>
        </router-link>
    </div>
</template>
<style scoped>
.statistical {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.statistical .statistical-item {
    flex: 0 0 calc(32%);
    height: 286px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.statistical .statistical-item p {
    color: #1f4173;
}

.statistical .statistical-item p:first-child {
    font-size: 28px;
}

.statistical .statistical-item p:last-child {
    font-size: 17px;
}
</style>
