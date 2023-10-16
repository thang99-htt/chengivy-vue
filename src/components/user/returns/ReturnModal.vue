<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Yêu cầu Trả hàng / Hoàn tiền</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="return-product" v-if="selectedPurchase">
                        <h4>Sản phẩm cần Trả hàng và Hoàn tiền</h4>
                        <div class="purchase-content">
                            <div class="purchase-item" v-for="product in selectedPurchase.items" :key="product.id">
                                <div class="purchase-info">
                                    <div class="d-flex">
                                        <input class="me-3" type="checkbox" @change="idSelected(product)">
                                        <img class="d-block me-3" width="100" :src="product.image" alt="">
                                        <div>
                                            <router-link :to="{
                                                name: 'product.detail',
                                                params: { id: product.id },
                                            }" class="text-dark">
                                                {{ product.name }}
                                            </router-link>
                                            <p>Phân loại: {{ product.color }}, {{ product.size }}</p>
                                            <p class="return-date">7 ngày trả hàng</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="purchase-price">
                                    <p>x {{ product.quantity }}</p>
                                    <p>
                                        <span class="me-3 text-danger " v-if="product.price_discount > 0">
                                            {{ formatPrice(product.price - product.price_discount) }}
                                        </span>
                                        <span :class="{ 'text-decoration-line-through ': product.price_discount > 0 }">
                                            {{ formatPrice(product.price) }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="return-form">
                        <h4>Lý do Trả hàng và Hoàn tiền?</h4>
                        <ReturnForm :returns="returns" />
                    </div>
                    <div class="return-info">
                        <h4>Thông tin hoàn tiền</h4>
                        <div class="return-info__container">
                            <p>
                                <span>Số tiền hoàn lại:</span>
                                <span>{{ formatPrice(totalReturn) }}</span>
                            </p>
                            <p>
                                <span>Hoàn tiền vào:</span> 
                                <span class="acccount" @click="modalUpdate = !modalUpdate">Tài khoản ngân hàng</span>
                            </p>
                            <p>
                                <span>Email:</span> 
                                <span>{{ selectedPurchase.user_account_detail.email }}</span>
                            </p>
                        </div>
                        <hr>
                        <div class="return-info__container">
                            <p>
                                <span>Số tiền có thể hoàn lại:</span>
                                <span>{{ formatPrice(totalReturn-25000) }}</span>
                            </p>
                            <p>
                                <span>Phí vận chuyển:</span>
                                <span>{{ formatPrice(25000) }}</span>
                            </p>
                            <hr>
                            <p class="price">
                                <span>Số tiền hoàn nhận được:</span>
                                <span>{{ formatPrice(totalReturn-25000) }}</span>
                            </p>
                            <div class="form-group float-end mt-5">
                                <button type="button" class="btnAdd" @click="submitReturn">
                                    Thực hiện
                                </button>
                            </div>
                        </div>
                    </div>
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
</template>
<script>
import ReturnForm from "./ReturnForm.vue";
import ReturnService from "@/services/user/return.service";
import UserService from "@/services/user/user.service";
import ProfileForm from "@/components/user/profiles/ProfileForm.vue";
import { formatPrice } from '@/utils';
import { mapGetters } from 'vuex';
import { showAlert } from '@/utils';

export default {
    props: {
        selectedPurchase: { type: Array, required: true }
    },
    components: {
        ReturnForm,
        ProfileForm
    },
    data() {
        return {
            returns: {
                'order_id': this.selectedPurchase.id,
                'reason': "",
                'description': "",
                'total_price': 0,
                'images': [],
                'products': [],
            },
            totalReturn: 0,
            accountProfile: {},
            modalUpdate: false,
        };
    },
    methods: {
        formatPrice,
        async submitReturn() {
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

            if(this.returns.products.length==0) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Vui lòng chọn sản phẩm cần Trả hàng/Hoàn tiền.'
                });
            } else if(!this.accountProfile.bank_account) {
                console.log('aaa')
                Toast.fire({
                    icon: 'warning',
                    title: 'Vui lòng cung cấp số tài khoản của bạn.'
                });
            } else {
                try {
                    await ReturnService.create(this.returns).then(res => {
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });
    
                    this.closeModal();
                    this.$router.push({ name: "return" });

                } catch (error) {
                    console.log(error);
                }
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
        idSelected(product) {
            const index = this.returns.products.indexOf(product);
            if (index === -1) {
                this.returns.products.push(product);
                this.totalReturn = this.totalReturn + (product.price * product.quantity);
                this.returns.total_price = this.totalReturn;
            } else {
                this.returns.products.splice(index, 1);
            }
        },
        async retrieveAccount() {
            try {
                this.accountProfile = await UserService.getInfoAccount(this.getUser.id);
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
.return-product h4,
.return-info h4,
.return-form h4 {
    margin: 0;
    margin-bottom: 10px;
    font-weight: bold;
}
.return-date {
    color: #0101bf !important;
    border: 1px solid #0101bf;
    font-size: 13px;
    padding: 2px 4px 4px;
    display: inline;
    border-radius: 4px;
}

.return-info__container p {
    display: flex;
}

.return-info__container p span:first-child {
    width: 150px;
}

.return-info__container p:first-child span:last-child{
    font-size: 18px;
}

.return-info__container:last-child {
    float: right;
}
.return-info__container .price span:last-child {
    color: #0101bf !important;
    font-size: 22px;
    font-weight: bold;
}

.return-info hr {
    background-color: #cacaca;
}
.return-info__container .acccount {
    text-decoration: underline;
    color: #0101bf;
    cursor: pointer;
}
</style>
