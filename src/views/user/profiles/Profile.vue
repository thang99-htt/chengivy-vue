<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>Tài khoản</h3>
        <div class="profile-item" v-if="account">
            <h4>Thông tin hạng thành viên</h4>
            <hr>
            <h3 class="name">{{ account.name }}</h3>
            <p class="rating">Hạng thành viên:
                <span>{{ account.level }}</span>
            </p>
            <p>Tổng chi tiêu: <span class="spend">{{ formatPrice(account.total_spend) }} / {{ account.total_order }}</span> đơn hàng</p>
            <p>Tổng điểm tích lũy:
                <span class="point" v-if="account.point">{{ (account.point).toLocaleString() }}</span> điểm
            </p>
            <div id="progressbar">
                <div class="progressbar__rank">
                    <div class="progressbar__rank-item">MEMBER</div>
                    <div class="progressbar__rank-item">SILVER</div>
                    <div class="progressbar__rank-item">GOLD</div>
                    <div class="progressbar__rank-item">PLATINUM</div>
                    <div class="progressbar__rank-item">DIAMOND</div>
                </div>
                <div class="progressbar-border">
                    <div class="progressbar-grey" :style="{
                        width: {
                            'MEMBER': '20%',
                            'SILVER': '40%',
                            'GOLD': '60%',
                            'PLATINUM': '80%',
                            'DIAMOND': '100%'
                        }[account.level]
                        }">
                    </div>
                </div>
                <div class="progressbar__rank">
                    <div class="progressbar__rank-item">0 đ</div>
                    <div class="progressbar__rank-item">15.000.000 đ</div>
                    <div class="progressbar__rank-item">40.000.000 đ</div>
                    <div class="progressbar__rank-item">80.000.000 đ</div>
                    <div class="progressbar__rank-item">120.000.000 đ</div>
                </div>
            </div>
            <div class="note__text">
                <div class="item">
                    <p v-if="account.total_spend<120000000">Bạn cần chi tiêu thêm 
                        <span v-if="account.level == 'MEMBER'">{{ formatPrice(15000000 - account.total_spend) }}</span>
                        <span v-if="account.level == 'SILVER'">{{ formatPrice(4000000 - account.total_spend) }}</span>
                        <span v-if="account.level == 'GOLD'">{{ formatPrice(8000000 - account.total_spend) }}</span>
                        <span v-else>{{ formatPrice(120000000 - account.total_spend) }}</span>
                         để được nâng lên hạng 
                        <span v-if="account.level == 'MEMBER'">SILVER</span>
                        <span v-if="account.level == 'SILVER'">GOLD</span>
                        <span v-if="account.level == 'GOLD'">PLATINUM</span>
                        <span v-if="account.level == 'PLATINUM'">DIAMOND</span>
                    </p>
                    <p v-else>Mua sắm nhiều hơn để có được mức thành viên cao hơn.</p>
                </div>
            </div>
        </div>

        <div class="profile-item">
            <h4>Thông tin tài khoản</h4>
            <hr>
            <p>{{ account.name }}</p>
            <p>{{ account.email }}</p>
            <p>{{ account.phone }}</p>
            <p>{{ account.gender }}</p>
            <p>
                <span class="pe-3 border-end">
                    <a class="text-danger" @click="openModalProfile(account)">
                        Chỉnh sửa
                    </a>
                </span>
                <span class="ps-2 pe-3">
                    <a class="text-danger" @click="modalPassword = !modalPassword">Thay đổi mật khẩu</a>
                </span>
            </p>
        </div>

        <div class="customer_level custom_js_customerlevel">
            <div class="widget block block-static-block">
                <div class="title_customerlevel w70">
                    <h1>CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT</h1>
                    <h2>Áp dụng từ 01/01/2023</h2>
                    <div class="border_customerlevel"></div>
                </div>
                <div class="icon_customer_level w70">
                    <div class="top_banner">
                        <div class="img_banner">
                            <img src="/images/icon/tichdiem.svg" alt="">
                        </div>
                        <p class="accumulate_points">Tích điểm dễ dàng Trên mỗi giao dịch</p>
                    </div>
                    <div class="top_banner">
                        <div class="img_banner">
                            <img src="/images/icon/dungdiem.svg" alt="">
                        </div>
                        <p class="point_payment">Dùng điểm thanh toán </p>
                        <p class="point_payment">tại cửa hàng CHENGIVY</p>
                    </div>
                    <div class="top_banner">
                        <div class="img_banner">
                            <img src="/images/icon/uudai.svg" alt="">
                        </div>
                        <p class="many_offers">Nhiều ưu đãi hấp dẫn</p>
                    </div>
                </div>
            </div>
            <div class="widget block block-static-block" id="content-bottom">
                <div>
                    <p id="limit-content"></p>
                    <section class="preferential w70 ">
                        <div class="table_preferential">
                            <div class="cloumn_preferential w30">
                                <div class="option_preferential option_rip texts">
                                    <div class="suggestions">
                                        <p>Hạng thẻ</p>
                                    </div>
                                </div>
                                <div class="option_preferential option_rip texts">
                                    <div class="suggestions">
                                        <p>Điều kiện nâng hạng</p>
                                        <strong>Chi tiêu tích lũy tất cả đơn hàng</strong>
                                    </div>
                                </div>
                                <div class="option_preferential option_rip">
                                    <div class="suggestions">
                                        <p>Giảm giá</p>
                                        <strong>(*) Áp dụng khi mua bất kỳ sản phẩm nào</strong>
                                    </div>
                                </div>
                                <div class="option_preferential option_rip">
                                    <div class="suggestions">
                                        <p>Tích điểm</p>
                                    </div>
                                </div>
                                <div class="option_preferential option_rip">
                                    <p>Sử dụng điểm</p>
                                </div>
                                <div class="option_preferential option_rip">
                                    <p>Ưu đãi sinh nhật</p>
                                </div>
                            </div>
                            <div class="columns w70">
                                <ul class="option_level">
                                    <li class="option_top margin_option" :class="{'active': selectedType==1}">
                                        <a href="#Member" data-toggle="tab" aria-expanded="true"
                                            @click="selectedType=1"
                                        >
                                            Member
                                        </a>
                                    </li>
                                    <li class="option_top margin_option" :class="{'active': selectedType==2}">
                                        <a href="#Silver" data-toggle="tab" aria-expanded="false"
                                            @click="selectedType=2"
                                        >
                                            Silver
                                        </a>
                                    </li>
                                    <li class="option_top margin_option" :class="{'active': selectedType==3}">
                                        <a href="#Gold" data-toggle="tab" aria-expanded="false"
                                            @click="selectedType=3"
                                        >
                                            Gold
                                        </a>
                                    </li>
                                    <li class="option_top margin_option" :class="{'active': selectedType==4}">
                                        <a href="#Platinum" data-toggle="tab" aria-expanded="false"
                                            @click="selectedType=4"
                                        >
                                            Platinum
                                        </a>
                                    </li>
                                    <li class="option_top margin_option" :class="{'active': selectedType==5}">
                                        <a href="#Diamond" data-toggle="tab" aria-expanded="false"
                                            @click="selectedType=5"
                                        >
                                            Diamond
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="Member" class="tab-pane fade" v-if="selectedType==1"
                                        :class="{'active in': selectedType==1}"
                                    >
                                        <p class="option_rip texts">Đăng ký miễn phí</p>
                                        <p class="option_rip">Hãy nâng hạng để được hưởng ưu đãi</p>
                                        <p class="option_rip"><b>100.000 VNĐ = 1 điểm</b></p>
                                        <p class="option_rip mb-text grid_text"><b>1 điểm = 1.000 vnđ</b><strong><a>Mua hàng
                                                    tại cửa hàng/ website</a>, Đổi ưu đãi</strong></p>
                                        <p class="option_rip mb-text">Giảm 20% / HÓA ĐƠN</p>
                                    </div>
                                    <div id="Silver" class="tab-pane fade" v-if="selectedType==2"
                                        :class="{'active in': selectedType==2}"
                                    >
                                        <p class="option_rip reponsive">Chi tiêu từ 15.000.000 vnđ đến dưới 40.000.000 vnđ
                                        </p>
                                        <p class="option_rip">Giảm 5% tổng hóa đơn</p>
                                        <p class="option_rip"><b>100.000 VNĐ = 1 điểm</b></p>
                                        <p class="option_rip mb-text grid_text"><b>1 điểm = 1.000 vnđ</b><strong><a>Mua hàng
                                                    tại cửa hàng/ website</a>, Đổi ưu đãi</strong></p>
                                        <p class="option_rip mb-text">Giảm 20% / HÓA ĐƠN</p>
                                    </div>
                                    <div id="Gold" class="tab-pane fade" v-if="selectedType==3"
                                        :class="{'active in': selectedType==3}"
                                    >
                                        <p class="option_rip reponsive">Chi tiêu từ 40.000.000 vnđ đến dưới 80.000.000 vnđ
                                        </p>
                                        <p class="option_rip">Giảm 5% tổng hóa đơn</p>
                                        <p class="option_rip"><b>100.000 vnđ = 3 điểm</b></p>
                                        <p class="option_rip mb-text grid_text"><b>1 điểm = 1.000 vnđ</b><strong><a>Mua hàng
                                                    tại cửa hàng/ website</a>, Đổi ưu đãi</strong></p>
                                        <p class="option_rip mb-text">Giảm 30% / HÓA ĐƠN</p>
                                    </div>
                                    <div id="Platinum" class="tab-pane fade" v-if="selectedType==4"
                                        :class="{'active in': selectedType==4}"
                                    >
                                        <p class="option_rip reponsive">Chi tiêu từ 80.000.000 vnđ đến dưới 120.000.000 vnđ
                                        </p>
                                        <p class="option_rip">Giảm 10% tổng hóa đơn</p>
                                        <p class="option_rip"><b>100.000 vnđ = 5 điểm</b></p>
                                        <p class="option_rip mb-text grid_text"><b>1 điểm = 1.000 vnđ</b><strong><a>Mua hàng
                                                    tại cửa hàng/ website</a>, Đổi ưu đãi</strong></p>
                                        <p class="option_rip mb-text">Giảm 30% / HÓA ĐƠN</p>
                                    </div>
                                    <div id="Diamond" class="tab-pane fade" v-if="selectedType==5"
                                        :class="{'active in': selectedType==5}"
                                    >
                                        <p class="option_rip reponsive">Chi tiêu từ 120.000.000 vnđ</p>
                                        <p class="option_rip">Giảm 10% tổng hóa đơn</p>
                                        <p class="option_rip"><b>100.000 vnđ = 10 điểm</b></p>
                                        <p class="option_rip mb-text grid_text"><b>1 điểm = 1.000 vnđ</b><strong><a>Mua hàng
                                                    tại cửa hàng/ website</a>, Đổi ưu đãi</strong></p>
                                        <p class="option_rip mb-text">Giảm 30% / HÓA ĐƠN</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <p></p>
                </div>
            </div>

            <div class="widget block block-static-block" id="content-bottom">
                <div id="full-content">
                    <div class="title_customerlevel w70">
                        <h1 style="margin-bottom: 15px;">quy định &amp; thông tin</h1>
                        <div class="border_customerlevel"></div>
                    </div>
                    <div class="rules w70">
                        <div class="tab_rule">
                            <ul class="buton_option_top">
                                <li class="tablink_rule" @click="selectedRule=1" :class="{'active in': selectedRule==1}">
                                    <a class="grid_tab" href="#Rank" data-toggle="tab">quy định nâng / giảm hạng</a>
                                </li>
                                <li class="tablink_rule tabone" @click="selectedRule=2" :class="{'active in': selectedRule==2}">
                                    <a href="#Accumulate_Points" data-toggle="tab">quy định tích điểm</a>
                                </li>
                                <li class="tablink_rule tabreponsive" @click="selectedRule=3" :class="{'active in': selectedRule==3}">
                                    <a class="grid_tab" href="#Use_Points" data-toggle="tab">quy định sử dụng điểm</a>
                                </li>
                                <li class="tablink_rule tabone" @click="selectedRule=4" :class="{'active in': selectedRule==4}">
                                    <a href="#Birthday" data-toggle="tab">ưu đãi sinh nhật</a>
                                </li>
                                <li class="tablink_rule tabone" @click="selectedRule=5" :class="{'active in': selectedRule==5}">
                                    <a href="#Other_Rule" data-toggle="tab">quy định khác</a>
                                </li>
                            </ul>
                            <div class="tab-content rule_tab">
                                <div id="Rank" v-if="selectedRule==1" class="tab-pane fade" :class="{'active in': selectedRule==1}">
                                    <p>Thành viên sẽ được nâng hạng khi đạt hạng mức chi tiêu theo Quy định.</p>
                                    <p>Hạng thẻ có hiệu lực trong vòng 12 tháng kể từ ngày nâng hạng.</p>
                                    <p>Mua sắm tích lũy được áp dụng tại tất cả cửa hàng thuộc
                                        <a href="http://localhost:3000/">chengivy.com.vn</a>
                                    </p>
                                    <p>Mỗi hạng thẻ có mức ưu đãi giảm giá tương ứng và chỉ áp dụng khi mua sản phẩm nguyên
                                        giá.</p>
                                </div>
                                <div id="Accumulate_Points" v-if="selectedRule==2" class="tab-pane fade" :class="{'active in': selectedRule==2}">
                                    <p>Tích lũy điểm dựa trên tổng chi tiêu: <strong>100.000 VNĐ = 1 điểm</strong> (kèm
                                        chính sách nhân điểm theo từng hạng thành viên).</p>
                                    <p>Tổng chi tiêu là số tiền thanh toán thực tế của khách hàng sau giảm giá, chiết khấu,
                                        không làm tròn.</p>
                                    <p>Khách hàng sẽ bắt đầu được tích lũy điểm cho các giao dịch phát sinh từ 1/1/2023.</p>
                                    <p>Điểm tích lũy khi mua hàng sẽ được cộng ngay vào tài khoản thành viên.</p>
                                    <p>Để tích lũy điểm, khách hàng cung cấp số điện thoại / thẻ thành viên cho nhân viên
                                        cửa hàng hoặc đăng nhập tại website trước khi thanh toán.</p>
                                </div>
                                <div id="Use_Points" v-if="selectedRule==3" class="tab-pane fade" :class="{'active in': selectedRule==3}">
                                    <p>Tỷ lệ quy đổi điểm: <strong>1 điểm = 1.000 vnđ</strong></p>
                                    <p>Dùng điểm để mua hàng tại cửa hàng hoặc website <em>(chỉ áp dụng cho hạng thẻ Gold,
                                            Platinum, Diamond).</em></p>
                                    <p>Chỉ áp dụng điểm để giảm giá tối đa 50% giá trị hóa đơn (bao gồm cả mức chiết khấu từ
                                        các chương trình khuyến mãi khác).</p>
                                    <p>Điểm tích lũy trong năm sẽ có hạn sử dụng đến hết tháng 2 của năm tiếp theo.</p>
                                    <em>Ví dụ: tất cả điểm tích lũy trong năm 2023 (từ tháng 1 đến hết tháng 12.2023) sẽ có
                                        hạn sử dụng đến 29.2.2024.</em>
                                    <p style="margin-top: 10px;">Điểm của thành viên sẽ bị trừ ngay sau khi sử dụng.</p>
                                    <p>Điểm không có giá trị quy đổi thành tiền mặt.</p>
                                </div>
                                <div id="Birthday" v-if="selectedRule==4" class="tab-pane fade" :class="{'active in': selectedRule==4}">
                                    <p>Thành viên sẽ nhận được tin nhắn Chúc mừng sinh nhật kèm mã ưu đãi giảm 20% hoặc 30%
                                        tùy theo hạng thành viên, mã được áp dụng trong tháng sinh nhật. <em>(Ví dụ bạn sinh
                                            tháng 10, mã ưu đãi áp dụng từ ngày nhận tin đến hết ngày 31/10).</em></p>
                                    <p>Chỉ áp dụng cho thành viên có đăng ký thông tin ngày tháng năm sinh trên hệ thống và
                                        có tổng chi tiêu (*) ít nhất 1,000,000 VNĐ trong 12 tháng gần nhất. (*Tổng chi tiêu
                                        này không bao gồm đơn hàng có áp dụng mã Ưu đãi sinh nhật).</p>
                                </div>
                                <div id="Other_Rule" v-if="selectedRule==5" class="tab-pane fade" :class="{'active in': selectedRule==5}">
                                    <p>Ưu đãi giảm giá hạng thành viên chỉ áp dụng cho các sản phẩm nguyên giá và không áp
                                        dụng đồng thời với các chương trình khuyến mãi khác.</p>
                                    <p>Chỉ áp dụng cho khách hàng là chủ thẻ. Để được xác nhận áp dụng ưu đãi tại cửa hàng,
                                        khách hàng vui lòng xuất trình thẻ hoặc CCCD/CMND/giấy tờ tùy thân khác cho nhân
                                        viên trước khi thanh toán tại cửa hàng.</p>
                                    <p>Trong trường hợp có bất kỳ tranh chấp, khiếu nại liên quan đến chương trình thành
                                        viên, quyết định của CHENGIVY là quyết định cuối cùng.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><a id="see-less-content" style="display: none">(Ẩn bớt)</a></p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalUpdate">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title fw-bold">Cập nhật hồ sơ</h4>
                        <button type="button" class="btn-close" @click="modalUpdate = !modalUpdate"></button>
                    </div>
                    <div class="modal-body">
                        <ProfileForm :accountProfile="accountProfile" @submit:accountProfile="updateProfile" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalPassword">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title fw-bold fs-4">Thay đổi mật khẩu</p>
                        <button type="button" class="btn-close" @click="modalPassword = ! modalPassword"></button>
                    </div>
                    <div class="modal-body">
                        <PasswordForm :accountPassword="accountPassword" @submit:accountPassword="updatePassword" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from "@/services/user/user.service";
import ProfileForm from "@/components/user/profiles/ProfileForm.vue";
import PasswordForm from "@/components/user/profiles/PasswordForm.vue";
import { mapGetters } from 'vuex';
import axios from 'axios';
import { showAlert } from '@/utils';
import { formatPrice } from '../../../utils';

export default {
    components: {
        ProfileForm,
        PasswordForm
    },
    data() {
        return {
            token: localStorage.getItem('tokenUser'),
            account: [],
            modalUpdate: false,
            modalPassword: false,
            accountProfile: {},
            accountPassword: {
                'password': "",
                'new_password': "",
                'confirm_password': ""
            },
            selectedRule: 1,
            selectedType: 1
        };
    },
    methods: {
        formatPrice,
        openModalProfile(account) {
            this.modalUpdate = true;
            this.accountProfile = {...account};
        },
        async retrieveAccount() {
            try {
                this.account = await UserService.getInfoAccount(this.getUser.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateProfile(data) {
            try {
                await UserService.updateProfile(this.getUser.id, data).then(async (response) => {
                    if (response.success == 'success') {
                        showAlert(response);
                        this.retrieveAccount();
                    }
                    this.modalUpdate = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async updatePassword(data) {
            try {
                await UserService.updatePassword(this.getUser.id, data).then(async (response) => {
                    try {
                        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                        await axios.post(`http://127.0.0.1:8000/api/logout`).then((res) => {
                            localStorage.removeItem('tokenUser');
                            this.$store.dispatch('logoutUser');
                            this.$router.push({ name: "login" });
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    showAlert(response);
                    this.modalPassword = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveAccount();
    },
    computed: {
        ...mapGetters(['getUser']),
    }
};
</script>

<style scoped>
.link_website {
    font-weight: 700;
}

.tab-pane i {
    font-size: 15px;
}

.rules {
    margin-bottom: 40px;
}

.buton_option_top {
    display: flex;
    padding: unset;
    margin: unset;
    border-bottom: 4px solid #730A15;
}

.tablink_rule {
    width: calc(100% / 5);
    background: #FFFBF8;
    height: 64px;
    margin: unset;
    display: flex;
    align-items: center;
}

li.tablink_rule:first-child {
    border-radius: 10px 0 0 0;
}

li.tablink_rule:last-child {
    border-radius: 0 10px 0 0;
}

.tab_rule .tablink_rule.active {
    background: #730A15;
    border-radius: 10px 10px 0 0;
    height: 74px;
    margin-top: -10px;
}

.tab_rule .tablink_rule.active a {
    color: #fff;
}

.border_customerlevel {
    border: 2px solid #730A15;
    width: 100px;
    margin: auto;
    margin-bottom: 50px;
}

.title_customerlevel {
    padding-top: 30px;
}

.title_customerlevel h2 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
}

.title_customerlevel h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    text-align: center;
    margin: unset;
    text-transform: uppercase;
}

.title_customerlevel h1:before {
    border: 4px solid #730A15;
    width: 100px;
}

.w70 {
    width: 100%;
    margin: auto;
}

.icon_customer_level {
    display: flex;
    justify-content: space-between;
}

.top_banner {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 324px;
    justify-content: center;
}

.top_banner p {
    text-transform: uppercase;
}

.img_banner {
    border-radius: 50%;
    height: 140px;
    width: 140px;
    background: #FFE0C8;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img_banner img {
    width: 100px;
}

.accumulate_points,
.many_offers,
.point_payment {
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #151515;
}

.top_banner .point_payment {
    margin-bottom: unset;
}

.accumulate_points {
    width: 80%;
}

.many_offers {
    width: 80%;
}

.customer_level {
    margin-top: 20px;
    font-family: 'Proxima';
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: linear-gradient(215.26deg, rgba(246, 236, 222, 0.4) 12%, rgba(246, 194, 160, 0.4) 31%, rgba(244, 218, 195, 0.4) 52%, rgba(246, 179, 138, 0.4) 66%, rgba(246, 188, 151, 0.4) 78%, rgba(244, 214, 189, 0.4) 89%, rgba(246, 171, 127, 0.4) 100%) !important;
}

.customer_level #content-bottom {
    background: unset;
    margin: unset;
    padding: unset;
    width: 100%;
}


.tablink_rule a:hover {
    text-decoration: none;
}

.tablink_rule a {
    color: #434343;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    padding: 11px 10px;
}

li.tablink_rule:not(:last-child) {
    margin-right: 2px;
}

.rule_tab .tab-pane p:before {
    content: "\2022";
    padding-right: 10px;
}

.rule_tab {
    background: #fff;
    border-radius: 0 0 10px 10px;
    padding: 40px;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
}

.rule_tab .tab-pane p {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #000000;
}

.tab_rule .tablink_rule .grid_tab {
    display: grid;
    padding: 11px 20px;
}

.tab_rule .tabone.tablink_rule.active a {
    padding: 26px 25px;
}

.tab-content .option_rip.grid_text {
    display: grid;
    padding: 15px 0;
}

.option_rip b {
    margin-bottom: 3px;
}

.option_rip strong a {
    color: red;
}

.table_preferential {
    display: flex;
}

.preferential {
    margin-top: 45px;
}

.columns .option_level,
.drop_down_member {
    border-bottom: unset;
    margin: unset;
    padding: unset;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    overflow: visible;
    display: flex;
}

.option_level,
.drop_down_member {
    overflow: hidden;
}

.option_level,
.drop_down_member li {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

.option_level,
.drop_down_member li.active {
    background: #FFE5D0;
}

.option_level,
.drop_down_member li.active a {
    font-weight: 700;
}

.option_preferential {
    background: #730A15;
}

.option_top a:hover {
    text-decoration: unset;
}

.tab-content .option_rip {
    background: #fff;
    margin: unset;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    padding: 25px 0;
}

.value_table_preferential.option_rip p {
    margin: unset;
}

.value_table_preferential p {
    width: 100%;
}


.option_top.margin_option {
    width: calc(100% /5 - 2px);
}

li.option_top.margin_option:not(:last-child) {
    margin-right: 2px;
    margin-bottom: 2px;
}
li.margin_option a {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    padding: 18px 28px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #730A15;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

li:last-child {
    border-radius: 0 10px 0 0;
}

.option_preferential.option_top {
    border-radius: 10px 0 0 0;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
    height: 62px;
}

.option_preferential.option_rip:last-child {
    border-radius: 0 0 0 10px;
}

p.option_rip:last-child {
    border-radius: 0 0 10px 0;
}

li.option_top.margin_option {
    text-align: center;
    margin: unset;
    position: relative;
}

li.option_top.margin_option.active:before {
    position: absolute;
    content: '';
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
    display: block;
    height: calc(100% + 16px);
    background: #FFE5D0;
    border-radius: 10px 10px 0 0;
    border: 1px solid #FFD8B9;
}

.table_preferential .tab-content {
    margin-top: 62px;
}

li.option_top.margin_option:hover {
    background: #ccc;
}

#content-bottom {
    background: #ffff;
}

.tab-content .option_rip.grid_text {
    display: grid;
    padding: 15px 0;
}

.option_rip b {
    margin-bottom: 3px;
}

.option_rip strong a {
    color: red;
}

.table_preferential {
    display: flex;
}

.preferential {
    margin-top: 45px;
}

.columns .option_level,
.drop_down_member {
    border-bottom: unset;
    margin: unset;
    padding: unset;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    overflow: visible;
    display: flex;
}

.option_level,
.drop_down_member {
    overflow: hidden;
}

.option_level,
.drop_down_member li {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

.option_level,
.drop_down_member li.active {
    background: #FFE5D0;
}

.option_level,
.drop_down_member li.active a {
    font-weight: 700;
}

.option_preferential {
    background: #730A15;
}

.option_top a:hover {
    text-decoration: unset;
}

.table_preferential .option_top {
    font-family: 'Proxima';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    padding: unset;
    color: #FFFFFF;
    height: 60px;
}

.table_preferential .option_rip strong {
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #fff;
}
.tab-content .option_rip strong {
    text-transform: none;
    font-size: 18px;
    color: #000;
    font-style: inherit;
}

.columns .tab-content>.active {
    display: block;
    opacity: 1;
}

.value_table_preferential.option_rip {
    display: flex;
}

.w30 {
    width: 30%;
}

.columns.w70 {
    width: 70%;
    position: relative;
}

.option_top.margin_option {
    width: calc(100% /5 - 2px);
}

li.option_top.margin_option:not(:last-child) {
    margin-right: 2px;
    margin-bottom: 2px;
}

.option_preferential:not(:last-child) {
    margin-bottom: 2px;
}

p.option_rip:not(:last-child) {
    margin-bottom: 2px;
}

.option_rip {
    height: 72px;
}

.option_preferential.option_rip {
    padding-left: 20px;
    display: flex;
    align-items: center;
}

.option_preferential.option_rip p {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: -10px;
}

.option_preferential.option_rip .suggestions p {
    margin-bottom: 5px;
}

.option_preferential {
    margin-right: 2px;
}

li.margin_option {
    background: #FFFBF8;
}

li.margin_option a {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    padding: 21px 30px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #730A15;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.w1000 {
    width: 1000px;
    margin: auto;
}

.block_qrapp_zalooa {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
}

.image_qrapp {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image_zalooa {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.img_qr img {
    width: 200px;
}

.qrapp {
    max-width: 200px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.zalooa {
    max-width: 200px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.link_pr {
    text-decoration: none;
    color: black;
}

.link_pr:hover {
    text-decoration: none;
    color: black;
}

.box {
    display: flex;
    justify-content: space-between;
    max-width: 522px;
    width: 100%;
}

.click-qr-url:hover {
    cursor: pointer;
}

@media (max-width: 768px) {
    .w1000 {
        width: 90%;
        flex-direction: column;
    }

    .image_phone {
        text-align: center;
    }

    .box {
        margin: 40px auto 0 auto;
        justify-content: space-around;
    }

    .image_qrapp {
        width: 40%;
    }

    .image_zalooa {
        width: 40%;
    }

    .zalooa {
        font-size: 15px;
    }

    .qrapp {
        font-size: 15px;
    }
}

@media (max-width: 365px) {
    .zalooa {
        font-size: 11px;
    }

    .qrapp {
        font-size: 11px;
    }
}

.w1000 {
    width: 1000px;
    margin: auto;
}

.block_qrapp_zalooa {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
}

.image_qrapp {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image_zalooa {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.img_qr img {
    width: 200px;
}

.qrapp {
    max-width: 200px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.zalooa {
    max-width: 200px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.link_pr {
    text-decoration: none;
    color: black;
}

.link_pr:hover {
    text-decoration: none;
    color: black;
}

.box {
    display: flex;
    justify-content: space-between;
    max-width: 522px;
    width: 100%;
}

.click-qr-url:hover {
    cursor: pointer;
}

@media (max-width: 768px) {
    .w1000 {
        width: 90%;
        flex-direction: column;
    }

    .image_phone {
        text-align: center;
    }

    .box {
        margin: 40px auto 0 auto;
        justify-content: space-around;
    }

    .image_qrapp {
        width: 40%;
    }

    .image_zalooa {
        width: 40%;
    }

    .zalooa {
        font-size: 15px;
    }

    .qrapp {
        font-size: 15px;
    }
}

@media (max-width: 365px) {
    .zalooa {
        font-size: 11px;
    }

    .qrapp {
        font-size: 11px;
    }
}

#progressbar .progressbar__rank {
    margin-bottom: 5px;
    margin-top: 10px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
}
#progressbar .progressbar-border {
    height: 8px;
    background: #e3e3e3;
    border-radius: 5px;
    position: relative;
}
#progressbar .progressbar-border .progressbar-grey {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #97243c;
    border-radius: 5px;
    max-width: 100%;
}
#progressbar .progressbar__rank-item {
    width: 20%;
}
.note__text {
    padding: 20px;
    background: #e3e3e3;
    margin-top: 20px;
}
.note__text .item span:first-child {
    font-weight: 600;
    color: #000;
}
.point {
    font-weight: bold;
    color: #97243c !important;
    font-size: 18px;
}
.spend {
    color: #000; 
    font-weight: bold;
    font-size: 17px;
}
</style>