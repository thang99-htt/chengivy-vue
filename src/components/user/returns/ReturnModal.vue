<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Tình huống bạn đang gặp?</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="return">
                        <div class="return-item" v-for="item in returns" :key="item">
                            <router-link :to="{
                                name: 'return',
                                params: { id: item.id },
                            }">
                                <div class="return-item__container">
                                    <div class="item-left" v-html="item.image"></div>
                                    <div class="item-right">
                                        <div class="item-right__title">
                                            {{ item.title }}
                                        </div>
                                        <div class="item-right__note">
                                            {{ item.note }}
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    props: {

    },
    data() {
        return {
            returns: [
                {
                    'id': 1,
                    'title': 'Tôi đã nhận hàng & hàng có vấn đề (bể vỡ, sai mẫu, lỗi, khác mô tả...)',
                    'note': 'Lưu ý: Trường hợp yêu cầu Trả hàng Hoàn tiền của bạn được chấp nhận, Voucher có thể sẽ không được hoàn lại',
                    'image': '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#FEF6F5"></circle><path d="M31.3333 16.6468L23.9777 13.0335L19.3333 10.667L7.33334 16.6468" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.33334 16.6465L19.3333 22.3963V35.3334L7.33334 29.5835V16.6465Z" fill="#FEF6F5" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><line x1="0.5" y1="-0.5" x2="5.46488" y2="-0.5" transform="matrix(-0.895029 -0.446008 -0.448421 0.893822 14.0068 23.3037)" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></line><line x1="0.5" y1="-0.5" x2="2.48244" y2="-0.5" transform="matrix(-0.895029 -0.446008 -0.448421 0.893822 11.3374 23.9688)" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></line><path d="M19.3333 35.334L31.3333 29.5842V27.0974M19.3333 22.3969L31.3333 16.8543V27.3905" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.7133 4.66699C23.7133 4.37631 23.5453 4.11181 23.2822 3.98819C23.0191 3.86457 22.7083 3.90411 22.4845 4.08965L14.1879 10.9692C14.0145 11.113 13.9149 11.3271 13.9167 11.5523C13.9184 11.7776 14.0213 11.9901 14.1969 12.1312L22.4935 18.7977C22.7185 18.9785 23.0272 19.0142 23.2874 18.8894C23.5477 18.7647 23.7133 18.5017 23.7133 18.2131V14.8314C25.0873 14.9119 26.349 15.2187 27.2928 15.7792C28.3639 16.4151 29.0379 17.3762 29.0379 18.8308C29.0379 20.3115 28.6843 21.3262 27.9077 22.166C27.0955 23.0442 25.756 23.8038 23.6163 24.6031C23.2849 24.7268 23.0851 25.0653 23.1368 25.4153C23.1885 25.7652 23.4777 26.0314 23.8307 26.0541C27.1575 26.2677 29.7329 25.3066 31.4807 23.6794C33.2203 22.06 34.0833 19.8322 34.0833 17.6167C34.0833 15.2799 33.3442 12.875 31.5353 11.0525C29.8375 9.34207 27.2744 8.22179 23.7133 8.08452V4.66699Z" fill="#FEF6F5" stroke="#FEF6F5" stroke-width="1.5" stroke-linejoin="round"></path><path d="M14.6667 11.5465L22.9633 4.66699V8.82028C30.5757 8.82028 33.3333 13.2497 33.3333 17.6167C33.3333 21.6635 30.1818 25.7103 23.8788 25.3056C28.2121 23.6869 29.7879 22.0682 29.7879 18.8308C29.7879 15.3347 26.4304 14.0598 22.9633 14.0598V18.2131L14.6667 11.5465Z" fill="#FEF6F5" stroke="#0a00be" stroke-linejoin="round"></path></svg>'
                },
                {
                    'id': 2,
                    'title': 'Tôi chưa nhận hàng/nhận thiếu hàng',
                    'note': 'Lưu ý: Trong trường hợp yêu cầu Trả Hàng Hoàn tiền của bạn được chấp nhận, Shopee Xu, Voucher, Phí vận chuyển có thể không được hoàn lại',
                    'image': '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#FEF6F5"></circle><path d="M31.3333 13.9798L23.9777 10.3665L19.3333 8L7.33334 13.9798" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.33334 13.9795L19.3333 19.7293V32.6664L7.33334 26.9166V13.9795Z" fill="#FEF6F5" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><line x1="0.5" y1="-0.5" x2="5.46488" y2="-0.5" transform="matrix(-0.895029 -0.446008 -0.448421 0.893823 14.0068 20.6367)" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></line><line x1="0.5" y1="-0.5" x2="2.48244" y2="-0.5" transform="matrix(-0.895029 -0.446008 -0.448421 0.893823 11.3374 21.3018)" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></line><path d="M19.3333 32.667L31.3333 26.9172V24.4304M19.3333 19.7299L31.3333 14.1873V24.7235" stroke="#0a00be" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.5 13.9997C35.5 17.4054 32.7391 20.1663 29.3333 20.1663C25.9276 20.1663 23.1667 17.4054 23.1667 13.9997C23.1667 10.5939 25.9276 7.83301 29.3333 7.83301C32.7391 7.83301 35.5 10.5939 35.5 13.9997Z" fill="#FEF6F5" stroke="#0a00be"></path><path d="M28.6517 15.6967C28.6517 15.2711 28.705 14.9319 28.8116 14.6791C28.9182 14.4263 29.1281 14.1494 29.4414 13.8486C29.7579 13.5446 29.9582 13.3286 30.0422 13.2006C30.1714 13.0054 30.236 12.7942 30.236 12.5669C30.236 12.2661 30.1601 12.0373 30.0083 11.8805C29.8597 11.7205 29.6401 11.6405 29.3494 11.6405C29.0716 11.6405 28.8471 11.7189 28.6759 11.8757C28.5079 12.0293 28.424 12.2389 28.424 12.5045H27.2466C27.2531 11.9381 27.4469 11.4901 27.828 11.1604C28.2124 10.8308 28.7195 10.666 29.3494 10.666C29.9986 10.666 30.5041 10.8292 30.8658 11.1556C31.2308 11.4821 31.4133 11.9381 31.4133 12.5237C31.4133 13.0454 31.1678 13.559 30.6769 14.0646L30.0809 14.6455C29.8678 14.8855 29.7579 15.2359 29.7515 15.6967H28.6517ZM28.5693 17.1896C28.5693 17.0008 28.6291 16.8488 28.7486 16.7336C28.8681 16.6152 29.0296 16.556 29.2331 16.556C29.4398 16.556 29.6029 16.6168 29.7224 16.7384C29.8419 16.8568 29.9017 17.0072 29.9017 17.1896C29.9017 17.3656 29.8435 17.5129 29.7273 17.6313C29.611 17.7497 29.4463 17.8089 29.2331 17.8089C29.0199 17.8089 28.8552 17.7497 28.7389 17.6313C28.6258 17.5129 28.5693 17.3656 28.5693 17.1896Z" fill="#0a00be"></path></svg>'
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
    },
};
</script>
<style>
.return {
    padding: 10px 10px 0;
}

.return .return-item {
    border: 1px solid #dfdfdf;
    padding: 16px 24px;
    margin-bottom: 20px;
    cursor: pointer;
    background-color: #f9f9f9;
}

.return .return-item:last-child {
    margin-bottom: 5px;
}

.return .return-item__container {
    display: flex;
}

.return .return-item__container .item-left {
    margin-right: 15px;
}

.return .return-item__container .item-right__title {
    font-size: 24px;
}

.return .return-item__container .item-right__note {
    color: #808080;
}
</style>