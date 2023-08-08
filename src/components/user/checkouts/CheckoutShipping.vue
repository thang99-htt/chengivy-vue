<template>
    <div class="dash_blog_inner">
        <div class="dash_head">
            <h3>ĐỊA CHỈ GIAO HÀNG</h3>
        </div>
        <div class="liveAlert"></div>
        <div class="list_cont">
            <p>Địa chỉ</p>
        </div>
        <div class="dash_main">
            <ul class="item item1">
                <li 
                    v-for="(address, index) in addresses"
                    :key="address"
                >
                    <Field name="address" type="radio" :value="address" v-model="orderLocal.delivery_address"/>
                    <div class="ms-4">
                        <div>
                            <span class="acc-name">{{ address.name }}</span>
                            <span>{{ address.phone }}</span>
                        </div>
                        <div>
                            {{ address.address_detail }}
                        </div>
                        <div>
                            {{ address.address }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item_more">
            <div class="center">
                Bạn muốn giao hàng đến địa chỉ khác?
                <a class="main_bt read_bt" @click="myModel = !myModel">
                    Thêm địa chỉ giao hàng mới
                </a>
            </div>
            <div v-if="myModel">
                <div class="modal d-block address">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title fw-bold">Thêm địa chỉ mới</h4>
                                <button type="button" class="btn-close"  @click="myModel = !myModel"></button>
                            </div>
                            <div class="modal-body">
                                <AddressForm 
                                    :reset="reset" 
                                    :accountAddress="accountAddress"
                                    @submit:accountAddress="createAddress"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list_cont">
            <p>Hình thức giao hàng</p>
        </div>
        <div class="dash_main">
            <ul class="item">
                <li class="py-0">
                    <p class="mb-3">
                        <input type="checkbox" checked>
                        Giao hàng tiêu chuẩn
                    </p>
                    <p>Ghi chú đơn hàng</p>
                    <textarea name="" id="" cols="50" rows="4" v-model="orderLocal.note"></textarea>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import AddressService from "@/services/user/address.service";
    import {mapGetters} from 'vuex';
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AddressForm from "@/components/user/addresses/AddressForm.vue";
    import { showAlert } from '@/utils';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            AddressForm
        },
        props: {
            order: { type: Object, required: true },
        },
        data() {
            return {
                addresses: [],
                orderLocal: this.order,
                myModel: false,
                accountAddress: {
                    'name': "",
                    'phone': "",
                    'address': "",
                    'ward_id': "",
                },
            };
        },
        mounted() {
            this.refreshList();
        },
        methods: { 
            async retrieveAddress() {
                await AddressService.getAllAdress(this.getUser.id).then((res) => {
                    this.addresses = res;
                    res.forEach((index) => {
                        if(index.default == 1) {
                            this.orderLocal.delivery_address = index;
                        }
                    });
                })
            },
            refreshList() {
                this.retrieveAddress();
            },
            async createAddress(data) {
                try {
                    await AddressService.create(this.getUser.id, data).then((response) => {
                        showAlert(response);
                        this.refreshList();
                        this.myModel = false;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            reset() {
                this.accountAddress.name = "";
                this.accountAddress.phone = "";
                this.accountAddress.address = "";
                this.accountAddress.ward_id = "";
            },
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    };
</script>


<style>
    .dash_blog_inner .list_cont {
        padding: 15px 30px;
        text-transform: uppercase;
    }
    .dash_blog_inner .list_cont p {
        margin: 2px 0 0 0;
        font-size: 14px;
        color: #000;
        font-weight: 900;
    }
    .dash_blog_inner {
        float: left;
        width: 100%;
    }
    .dash_head {
        font-weight: normal;
        height: auto;
        border-radius: 5px 5px 0 0;
        padding: 25px 30px;
        background-size: cover;
        background-color: #f3faff;
        position: relative;
        border-bottom: 1px solid #ccc;
    }
    .dash_head h3 {
        color: #000;
        text-transform: none;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        margin: 0;
    }
    .item {
        float: left;
        width: 100%;
        list-style: none;
        margin: 0;
    }
    .item li,
    .item .form-check {
        padding: 12px 25px;
        line-height: normal;
        font-size: 14px;
        color: #333333;
    }
    .item.item1 li {
        flex-basis: 48%; 
        display: flex;
        border: solid #dbdbdb 1px;
        border-left: solid 5px #3872b2;
        margin-bottom: 10px;
        background-color: #f8f8f8;
    }
    .item.item1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item li div {
        color: #292929;
        font-size: 14px;
        margin-bottom: 4px;
    }
    .item_more {
        float: left;
        width: 100%;
        margin: 25px 15px 30px 15px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
    }
    .item_more a {
        color: #000;
        font-weight: 700;
        text-decoration: underline;
        cursor: pointer;
    }
    .ms-address {
        margin-left: 29px;
    }

</style>