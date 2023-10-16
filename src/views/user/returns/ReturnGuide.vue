<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>[Trả hàng/Hoàn tiền] Hướng dẫn trả hàng sau khi yêu cầu Trả hàng/Hoàn tiền của bạn được chấp nhận</h3>

        <div class="profile-item guide">
            <hr>
            <h4>Các bước trả hàng</h4>
            <ul class="step">
                <li><span>Bước 1:</span> Đóng gói hàng hoàn trả theo 
                    <span class="regular" @click="modalRegular = !modalRegular">quy định</span>
                </li>
                <li><span>Bước 2:</span> In dán phiếu trả hàng hoặc viết tay thông tin trả hàng theo 
                    <span class="regular" @click="modalGuide = !modalGuide">hướng dẫn</span>
                </li>
                <li><span>Bước 3:</span> Chọn 1 trong 3 hình thức trả hàng bên dưới:</li>
                <ul class="form">
                    <li>
                        <p>Hình thức 1: Lấy hàng hoàn trả theo địa chỉ yêu cầu</p>
                        <ul>
                            <li>Miễn phí trả hàng</li>
                            <li>Đơn vị vận chuyển của chúng tôi sẽ đến lấy hàng tại nhà của bạn</li>
                            <li>Đơn vị vận chuyển đến lấy hàng theo địa chỉ và thời gian bạn đã chọn</li>
                        </ul>
                    </li>
                    <li>
                        <p>Hình thức 2: Gửi trả hàng tại bưu cục</p>
                        <ul>
                            <li>Chủ động đóng gói đơn hàng và mang hàng đến bưu cục bất kỳ để gửi trả</li>
                            <li>Bạn cần thanh toán trước phí trả hàng</li>
                        </ul>
                    </li>
                </ul>
            </ul>
        </div>
    </div>
    <div v-if="modalRegular">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title fw-bold fs-4">[Trả hàng] Cách đóng gói đơn hàng hoàn trả</p>
                        <button type="button" class="btn-close" @click="modalRegular = ! modalRegular"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <p>Đóng gói đơn hàng hoàn trả theo hướng dẫn của Chengivy Store để đảm bảo an toàn cho sản phẩm bên trong</p>
                            <p>Đóng gói tất cả sản phẩm cần trả kèm đầy đủ các phụ kiện/quà tặng đã được giao đến bạn trước đó, ví dụ như: túi/hộp của sản phẩm, quà tặng kèm, giấy tờ bảo hành, nhãn/mác sản phẩm, hướng dẫn sử dụng và các phụ kiện đi kèm khác</p>
                            <p>Sau đó, hãy dán phiếu trả hàng hoặc viết tay các thông tin cần thiết lên gói hàng hoàn trả nhé.</p>
                            <p><span class="note">⚠️ Lưu ý:</span> Chengivy Store không chịu trách nhiệm cho những hư hỏng của sản phẩm hoàn trả do đóng gói hàng không đúng quy định</p>
                        </div>
                        <div>
                            <h3 class="note">Hướng dẫn đóng gói sản phẩm</h3>
                            <p class="guide-pack">1. Nguyên liệu để đóng hàng đảm bảo an toàn</p>
                            <img src="/images/icon/regular.jpg" alt="" width="500" class="d-block m-auto">
                            <p class="guide-pack">2. Các bước đóng gói cơ bản</p>
                            <ul class="guide-pack__detail">
                                <li>Quấn xốp bong bóng hoặc mút xốp 6 mặt của sản phẩm</li>
                                <li>Chèn kín các khe hở giữa các sản phẩm / sản phẩm và thùng carton bằng mút xốp</li>
                                <li>Dán kín thùng carton bằng băng keo</li>
                                <li>Dán phiếu giao hàng hoặc viết tay mã vận đơn bên ngoài thùng carton (tùy yêu cầu của từng đơn vị vận chuyển)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalGuide">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title fw-bold fs-4">[Trả hàng] Cách in, dán phiếu/ghi thông tin trả hàng lên gói hàng cần hoàn trả</p>
                        <button type="button" class="btn-close" @click="modalGuide = ! modalGuide"></button>
                    </div>
                    <div class="modal-body">
                        <p>Để đảm bảo gói hàng được trả về đúng địa chỉ của cửa hàng, sau khi đóng gói hàng theo quy định, <span class="fw-bold d-inline">bạn cần in, dán phiếu trả hàng (*) hoặc viết tay trực tiếp</span> lên gói hàng với các thông tin sau:</p>
                        <ul class="guide-detail">
                            <li>Chữ <span class="text-danger fw-bold">Trả hàng Chengivy Store</span></li>
                            <li>Mã đơn hàng</li>
                            <li>Mã yêu cầu trả hàng</li>
                            <li>Địa chỉ trả hàng của Chengivy Store</li>
                            <li>Địa chỉ lấy hàng hoàn trả của bạn</li>
                        </ul>
                        <p>(*) Để <span class="fw-bold d-inline">nhận và in phiếu trả hàng</span> bạn có thể kiểm tra thông tin phiếu đã được gửi vào Email đăng ký.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            modalRegular: false,
            modalGuide: false
        };
    },
    methods: {

    }
};
</script>

<style scoped>
    .guide h4 {
        font-weight: bold;
        color: rgb(0, 0, 171);
        margin-top: 20px;
    }
    .guide .step span:first-child {
        font-weight: bold;
    }
    .guide .step .regular {
        color: #0086e6;
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }
    .guide .step li {
        margin: 10px 0;
    }
    .guide .form li p:first-child {
        font-weight: bold;
        color: #000;
    }
    .guide .form li ul li {
        list-style: circle;
        margin-left: 22px;
    }
    .note {
        color: orangered;
        font-weight: bold;
    }
    .guide-pack {
        font-weight: bold;
    }
    .guide-pack__detail li,
    .guide-detail li {
        list-style: circle;
        margin-left: 22px;
    }
</style>