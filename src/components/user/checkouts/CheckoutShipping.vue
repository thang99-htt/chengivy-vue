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
                                    <Field name="address" type="radio" :value="address.id" v-model="orderLocal.contact_id"/>
                                        <span class="text-bold ms-3">{{ user.name }}</span>
                                        <p class="ms-address">Địa chỉ:
                                            {{ address.address }}, {{ address.name }}, 
                                            {{ address.district }}, {{ address.district.city }}
                                        </p>
                                        <p class="ms-address">Điện thoại: {{ address.phone }}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="item_more">
                            <div class="center">
                                Bạn muốn giao hàng đến địa chỉ khác?
                                <a class="main_bt read_bt" @click="openModel">
                                    Thêm địa chỉ giao hàng mới
                                </a>
                            </div>
                            <div v-if="myModel">
                                <div class="modal d-block">
                                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="updateAddressModalLabel">Thêm địa chỉ mới</h5>
                                                <button type="button" class="btn-close"  @click="closeModel"></button>
                                            </div>
                                            <div class="modal-body">
                                                <AddressForm 
                                                    :cities="cities"
                                                    :contact="contact"
                                                    @submit:contact="createContact"
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
                                <li>
                                    <p class="mb-3">
                                        <input type="checkbox" checked>
                                        Giao hàng tiêu chuẩn
                                    </p>
                                    <p>Ghi chú đơn hàng</p>
                                    <textarea name="" id="" cols="50" rows="3" v-model="orderLocal.note"></textarea>
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
    import AddressService from "@/services/user/address.service";
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AddressForm from "@/components/user/checkouts/AddressForm.vue";

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
                token: localStorage.getItem('token'),
                addresses: [],
                cities: [],
                orderLocal: this.order,
                myModel: false,
                contact: {
                    'ward_id': "",
                    'name': "",
                    'address': "",
                    'phone': ""
                },
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
            this.refreshList();
        },
        methods: { 
            openModel() {
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async retrieveCities() {
                try {
                    this.cities = await AddressService.getCities();
                } catch (error) {
                    console.log(error);
                }
            },
            async retrieveAddressByUser() {
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
            refreshList() {
                this.retrieveAddressByUser();
                this.retrieveCities();
            },
            async createContact(data) {
                try {      
                    await axios.get(`/api/user`, {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                    }).then(async (response) => {
                        this.$store.dispatch('user', response.data);
                        await AddressService.createNewAddress(response.data.id, data).then((response) => {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })

                            if(response.success == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Địa chỉ được thêm thành công.'
                                })

                                this.refreshList();
                            } 

                            if(response.success == false) {
                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Địa chỉ đã tồn tại.'
                                })
                            }
        
                        });
                    });           
                } catch (error) {
                    console.log(error);
                }
            },
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
        cursor: pointer;
    }
    .ms-address {
        margin-left: 29px;
    }

</style>