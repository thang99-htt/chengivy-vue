<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="dash_blog">
                    <div class="dash_blog_inner">
                        <div class="dash_head">
                            <h3>ĐỊA CHỈ GIAO HÀNG</h3>
                        </div>
                        <div class="list_cont">
                            <p>Địa chỉ</p>
                        </div>
                        <div class="dash_main">
                            <ul class="item">
                                <li 
                                    v-for="(address, index) in addresses"
                                    :key="address"
                                >
                                    <Field name="address" type="radio" :value="address.pivot.id" v-model="addess_checked.contact_id"/>
                                        <span class="text-bold ms-3">{{ user.name }}</span>
                                        <p class="ms-address">Địa chỉ:
                                            {{ address.pivot.address }}, {{ address.name }}, 
                                            {{ address.district.name }}, {{ address.district.city.name }}
                                        </p>
                                        <p class="ms-address">Điện thoại: {{ address.pivot.phone }}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="item_more">
                            <div class="center">
                                Bạn muốn giao hàng đến địa chỉ khác?
                                <a class="main_bt read_bt" href="#">
                                    Thêm địa chỉ giao hàng mới
                                </a>
                            </div>
                        </div>
                        <div class="list_cont">
                            <p>Hình thức giao hàng</p>
                        </div>
                        <div class="dash_main">
                            <ul class="item">
                                <li>
                                    <p class="mb-3">
                                        <input type="checkbox" checked>
                                        Giao hàng tiêu chuẩn
                                    </p>
                                    <p>Ghi chú đơn hàng</p>
                                    <textarea name="" id="" cols="50" rows="3"></textarea>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AddressService from "@/services/front/address.service";
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            addess_check: { type: Object, required: true },
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                addresses: [],
                addess_checked: this.addess_check,
            };
        },
        async mounted() {
            await axios.get(`/api/user`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
            }).then(async (response) => {
                this.$store.dispatch('user', response.data);
                await AddressService.getAddresses(response.data.id).then((response) => {
                    this.addresses = response;
                });
            });
            
        },
        computed: {
            ...mapGetters(['user'])
        }
    };
</script>


<style>
    .dash_blog {
        min-height: 600px;
        background: #fafafa;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        float: left;
        width: 100%;
        margin-bottom: 15px;
    }
    .dash_blog_inner .list_cont {
        border-bottom: 1px solid #e2e2e2;
        padding: 15px 30px;
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
        padding: 20px 30px;
        background-size: cover;
        background-color: #2965a1;
        position: relative;
    }
    .dash_head h3 {
        color: #fff;
        text-transform: none;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
    }
    .item {
        float: left;
        width: 100%;
        list-style: none;
        margin: 0;
    }
    .item li,
    .item .form-check {
        padding: 16px 25px;
        border-bottom: solid #eee 1px;
        line-height: normal;
        font-size: 12px;
        border-left: solid 5px #666;
        color: #292929;
    }
    .item li p {
        color: #292929;
        font-size: 14px;
    }
    .item_more {
        float: left;
        width: 100%;
        margin: 25px 15px 70px 15px;
    }
    .item_more a {
        color: #000;
        font-weight: 700;
        text-decoration: underline;
    }
    .ms-address {
        margin-left: 29px;
    }

</style>