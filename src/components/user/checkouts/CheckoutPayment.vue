<template>
    <div class="dash_blog">
        <div class="dash_blog_inner">
            <div class="dash_head">
                <h3>KIỂM TRA VÀ THANH TOÁN</h3>
            </div>
            <Form>
                <div class="checkout-payment">
                    <div class="payment-item">
                        <div class="list_cont">
                            <p>Hình thức thanh toán</p>
                        </div>
                        <div class="dash_main item mb-3">
                            <div 
                                class="form-check"
                                v-for="(payment, index) in payments"
                                :key="payment"
                            >
                                <Field name="payment" type="radio" :value="payment.id" v-model="orderLocal.payment_method_id"/>
                                <label class="form-check-label ms-2" for="exampleRadios1">
                                    <img :src="payment.image" width="25" alt="">
                                    {{ payment.description }}
                                </label>
                            </div>
                        </div>
                        <div class="list_cont">
                            <p>Gửi đến</p>
                        </div>
                        <div
                            class="dash_main ps-5"
                        >
                            <div>
                                <span class="acc-name">{{ order.delivery_address.name }}</span>
                                <span>{{ order.delivery_address.phone }}</span>
                            </div>
                            <div>
                                {{ order.delivery_address.address_detail }}
                            </div>
                            <div>
                                {{ order.delivery_address.address }}
                            </div>
                        </div>
                        <div class="list_cont">
                            <p>Phương thức vận chuyển</p>
                        </div>
                        <div
                            class="dash_main ps-5"
                        >
                            <div>Giao hàng tiêu chuẩn</div>
                            <div>
                                Dự kiến nhận hàng {{ nextThreeDaysString }}
                            </div>
                        </div>
                        <div class="list_cont">
                            <p>Voucher của Shop</p>
                        </div>
                        <div
                            class="dash_main ps-5"
                        >
                            <div class="checkout-voucher">
                                <img src="/images/icon/uudai.svg" alt="" width="50">
                                <a href="javascript:void(0)" @click="viewVoucher">Chọn Voucher</a>
                                <div class="voucher">
                                    <span class="border-left">
                                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 5 35" style="fill: #da4343;"><path d="M0 0v2.27a2 2 0 010 3.46v2.54a2 2 0 010 3.46v2.54a2 2 0 010 3.46V19h2v-1h-.76A2.99 2.99 0 001 13.76v-1.52a3 3 0 000-4.48V6.24a3 3 0 000-4.48V1h1V0H0z"></path></svg>
                                    </span>
                                    <span>-{{ formatPrice(discountVoucher) }}</span>
                                    <span class="border-right">
                                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 5 35" style="fill: #da4343;"><path d="M0 0v2.27a2 2 0 010 3.46v2.54a2 2 0 010 3.46v2.54a2 2 0 010 3.46V19h2v-1h-.76A2.99 2.99 0 001 13.76v-1.52a3 3 0 000-4.48V6.24a3 3 0 000-4.48V1h1V0H0z"></path></svg>
                                    </span>
                                </div>
                                <div class="menu-voucher">
                                    <h4>Chengivy Voucher</h4>
                                    <ul id="nav" class="navbar-nav ms-aut">
                                        <li class="nav-item" v-for="voucher in vouchers" :key="voucher"
                                            :class="{'disable': totalCheck<voucher.level}">
                                            <div class="nav-item__container">
                                                <div class="nav-item__item">
                                                    <div class="nav-item__image">
                                                        <div v-if="voucher.image" class="image">
                                                            <img :src="voucher.image" alt="">
                                                        </div>
                                                        <div v-else class="no-image">
                                                            <img src="/images/logo/logo.jpg" alt="" width="70">
                                                        </div>
                                                    </div>
                                                    <div class="nav-item__info">
                                                        <p>{{ voucher.name }}</p>
                                                        <p>{{ voucher.condition }}</p>
                                                        <p v-if="voucher.date_start">{{ formattedDate(voucher.date_start) }} ~ {{ formattedDate(voucher.date_end) }}</p>
                                                        <p v-if="voucher.quantity_initial">
                                                            <span></span>
                                                            <span :style="{ width: (100 - voucher.quantity_remain*100/voucher.quantity_initial) + '%' }"></span>
                                                        </p>
                                                        <p v-if="voucher.quantity_initial">Đã dùng {{ 100 - voucher.quantity_remain*100/voucher.quantity_initial }}%</p>
                                                    </div>
                                                    <div class="nav-item__button">
                                                        <span v-if="selectedVoucher==voucher" @click="selectVoucher(voucher)">
                                                            <i class="fa fa-check"></i>
                                                        </span>
                                                        <button v-else @click="selectVoucher(voucher)">Lưu</button>
                                                    </div>
                                                </div>
                                                <div class="nav-item__plus" v-if="totalCheck<voucher.level">
                                                    <span><i class="fa fa-exclamation-circle"></i></span>
                                                    <span>Mua thêm {{ formatPrice(voucher.level - totalValue) }} để sử dụng Voucher</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-item">
                        <div class="view-product">
                            <div class="product-items">                                
                                <div class="shopping-item" v-if="!productBuyNow">
                                    <div class="text-dark text-bold">
                                        <span>{{ cartAvailable.length }} sản phẩm</span>
                                    </div>
                                    <hr>
                                    <ul class="shopping-list">
                                        <li 
                                            v-for="(cart, index) in cartAvailable"
                                            :key="cart"
                                        >  
                                            <div class="product-img-head">
                                                <a class="cart-img" href="product-details.html">
                                                    <img v-if="cart.image" :src="cart.image" alt="#" />
                                                </a>
                                            </div>
                                            <div class="">
                                                <h6><a href="product-details.html">{{ cart.product.name }}</a></h6>
                                                <p>Phân loại: {{ cart.color_name }}, {{ cart.size_name }}</p>
                                                <p class="quantity">
                                                    <span class="me-1">{{ cart.quantity }} x </span>
                                                    <span :class="{ 'text-danger': cart.product.discount_percent > 0 }">
                                                         {{ formatPrice(cart.product.price_final) }}
                                                    </span>
                                                    <span class="text-decoration-line-through text-secondary ms-3"
                                                        v-if="cart.product.discount_percent > 0">
                                                        {{ formatPrice(cart.product.price) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng tiền</span>
                                            <span class="total-amount">{{ formatPrice(cartLocal.total_price) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Sản phẩm khuyến mãi</span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountProduct) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Mã giảm giá <span class="voucher" v-if="selectedVoucher">{{ selectedVoucher.name }}</span></span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountVoucher) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Tổng giảm giá</span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountTotal) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Phí vận chuyển</span>
                                            <span class="total-amount">{{ formatPrice(25000) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Tổng đơn đặt hàng</span>
                                            <span class="total-amount">{{ formatPrice(totalValue) }}</span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span class="payment">
                                                <span>Cần thanh toán</span>
                                                <span>({{ cartAvailable.length }} sản phẩm)</span>
                                            </span>
                                            <span class="total-amount bold">{{ formatPrice(totalValue) }}</span>
                                        </div>
                                        <Field    
                                            hidden
                                            name="order_total_price" type="number"
                                            class="form-control select" id="order_total_price"
                                           :value="((cartLocal.into_money+25000)/23795).toFixed()"
                                        />
                                    </div>
                                    
                                    <div v-show="orderLocal.payment_id == 3 && paymentStatus !== 'paid'" class="w-75 mx-auto mt-4 text-center">
                                        <div ref="paypal"></div>
                                    </div>
                                </div>
                                <div class="shopping-item" v-else>
                                    <div class="text-dark text-bold">
                                        <span> 1 sản phẩm</span>
                                    </div>
                                    <hr>
                                    <ul class="shopping-list">
                                        <li>  
                                            <div class="product-img-head">
                                                <a class="cart-img" href="product-details.html">
                                                    <img v-if="productBuyNow.image" :src="productBuyNow.image" alt="#" />
                                                </a>
                                            </div>
                                            <div class="">
                                                <h6><a href="product-details.html">{{ productBuyNow.name }}</a></h6>
                                                <p>Phân loại: {{ productBuyNow.color_name }}, {{ productBuyNow.size_name }}</p>
                                                <p class="quantity">
                                                    <span class="me-1">1 x </span>
                                                    <span :class="{ 'text-danger': productBuyNow.discount_percent > 0 }">
                                                         {{ formatPrice(productBuyNow.price_final) }}
                                                    </span>
                                                    <span class="text-decoration-line-through text-secondary ms-3"
                                                        v-if="productBuyNow.discount_percent > 0">
                                                        {{ formatPrice(productBuyNow.price) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng tiền</span>
                                            <span class="total-amount">{{ formatPrice(productBuyNow.price_final) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Sản phẩm khuyến mãi</span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountProduct) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Mã giảm giá <span class="voucher" v-if="selectedVoucher">{{ selectedVoucher.name }}</span></span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountVoucher) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Tổng giảm giá</span>
                                            <span class="total-amount sale">
                                                -{{ formatPrice(discountTotal) }}
                                            </span>
                                        </div>
                                        <div class="total">
                                            <span>Phí vận chuyển</span>
                                            <span class="total-amount">{{ formatPrice(25000) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Tổng đơn đặt hàng</span>
                                            <span class="total-amount">{{ formatPrice(totalValue) }}</span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span class="payment">
                                                <span>Cần thanh toán</span>
                                                <span>(1 sản phẩm)</span>
                                            </span>
                                            <span class="total-amount bold">{{ formatPrice(totalValue) }}</span>
                                        </div>
                                    </div>
                                    <div v-show="orderLocal.payment_id == 3 && paymentStatus !== 'paid'" class="w-75 mx-auto mt-4 text-center">
                                        <div ref="paypal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    import PaymentMethodService from "@/services/admin/payment-method.service";
    import VoucherService from "@/services/admin/voucher.service";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { formatPrice } from '@/utils';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Header',
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            order: { type: Object, required: true },
            carts: { type: Object, required: true },
        },
        data() {
            const nextThreeDays = new Date();
            nextThreeDays.setDate(nextThreeDays.getDate() + 3);

            const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
            const monthsOfYear = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

            const dayOfWeekIndex = nextThreeDays.getDay();
            const dayOfMonth = nextThreeDays.getDate();
            const monthIndex = nextThreeDays.getMonth();
            const year = nextThreeDays.getFullYear();

            const nextThreeDaysVietnamese = daysOfWeek[dayOfWeekIndex] + ", " + 
                    dayOfMonth + " " + monthsOfYear[monthIndex] + " " + year;
            return {
                payments: [],
                vouchers: [],
                cartLocal: this.carts,
                orderLocal: this.order,
                paymentStatus: '',
                cartAvailable: [],
                nextThreeDaysString: nextThreeDaysVietnamese,
                selectedVoucher: null,
            };
        },
        mounted: function() {
            this.refreshList();
            this.submitOrder();
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=AT5pO4SLjEoDt65gg6gzPGMAp4Ml1XpOkoeWr7_G-qa3moiSJJFkdqDIBxh1ytFYbCLXHRoT1MsJSur1";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
        },
        methods: {
            formatPrice,
            async retrievePaymentMethod() {
                try {
                    this.payments = await PaymentMethodService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            async retrieveVoucher() {
                try {
                    this.vouchers = await VoucherService.getByUser(this.getUser.id);
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePaymentMethod();
                this.retrieveVoucher();
            },
            submitOrder() {
                if(this.productBuyNow) {
                    this.orderLocal.total_price = this.productBuyNow.price_final;
                } else {
                    this.orderLocal.total_price = this.cartLocal.total_price;
                }
                this.orderLocal.total_discount = this.discountTotal;
                this.orderLocal.total_value = this.totalValue;
            },
            viewVoucher() {
                const navbarToggler = document.querySelector(".menu-voucher");
                navbarToggler.classList.toggle("d-block");
            },
            setLoaded: function() {
                var order_total_price = $("#order_total_price").val();
                this.loaded = true;
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                            purchase_units: [
                                {
                                description: "Thanh toán Paypal",
                                amount: {
                                    currency_code: "USD",
                                    value: order_total_price
                                }
                                }
                            ]
                        });
                    },

                    style: {
                        size: 'large',
                        color: 'gold',
                        shape: 'pill',
                        tagline : 'false',
                    },

                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        this.orderLocal.paid = 1;
                        this.paymentStatus = 'paid';
                        console.log(order);
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
            },
            formattedDate(originalDate) {
                const date = new Date(originalDate);
                            
                // Lấy giờ, phút, giây
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                            
                // Lấy ngày, tháng, năm
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
                const year = date.getFullYear();
                            
                const formatted = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} ${hours}:${minutes}`;
                            
                return formatted;
            },
            selectVoucher(voucher) {
                if(this.totalCheck > voucher.level) {
                    if(this.selectedVoucher !== voucher) {
                        this.selectedVoucher = voucher;
                        this.order.voucher_id = voucher.id;
                    } else {
                        this.selectedVoucher = null;
                        this.order.voucher_id = 0;
                    }

                    this.orderLocal.total_discount = this.discountTotal;
                    this.orderLocal.total_value = this.totalValue;
                }
            }
        }, 
        computed: {
            ...mapGetters(['productBuyNow', 'getUser']),
            cartAvailable() {
                return this.cartLocal.getCartItems.filter(cart => cart.inventory.total_final > 0);
            },
            discountVoucher() {
                if(this.selectedVoucher) {
                    if(this.productBuyNow) {
                        return this.productBuyNow.price_final*(this.selectedVoucher.discount/100);
                    } else {
                        return this.cartLocal.into_money*(this.selectedVoucher.discount/100);
                    }
                } else {
                    return 0;
                }
            },
            discountProduct() {
                if(this.productBuyNow) {
                    return this.productBuyNow.price - this.productBuyNow.price_final;
                } else {
                    return this.cartLocal.total_price - this.cartLocal.into_money;
                }
            },
            discountTotal() {
                if(this.selectedVoucher) {
                    if(this.productBuyNow) {
                        return this.productBuyNow.price_final*(this.selectedVoucher.discount/100) + this.discountProduct;
                    } else {
                        return this.cartLocal.into_money*(this.selectedVoucher.discount/100) + this.discountProduct;
                    }
                } else {
                    return this.discountProduct;
                }
            },
            totalValue() {
                if(this.productBuyNow) {
                    return this.productBuyNow.price_final + 25000 - this.discountTotal;
                } else {
                    return this.cartLocal.total_price + 25000 - this.discountTotal;
                }
            },
            totalCheck() {
                if(this.productBuyNow) {
                    return this.productBuyNow.price_final + 25000 - this.discountProduct;
                } else {
                    return this.cartLocal.total_price + 25000 - this.discountProduct;
                }
            }
        },        
     };
</script>

<style>
    .dash_main label {
        font-weight: 400;
        margin-bottom: 0;
    }
    .dash_main .voucher {
        margin-left: 50px;
        color: #da4343;
        border-top: 1px solid #da4343;
        border-bottom: 1px solid #da4343;
        position: relative;
        height: 30px;
        padding: 3px 10px 0 10px;
        display: inline-block;
    }

    .dash_main .voucher .border-left,
    .dash_main .voucher .border-right {
        position: absolute;
        content: "";
        top: 0;
        height: 100%;
    }
    .dash_main .voucher .border-left {
        left: 0;
    }
    .dash_main .voucher .border-right {
        right: -9px;
    }

    .dash_main .voucher svg {
        width: 10px;
        height: 55px;
    }
    .product-items a,
    .product-items p,
    .product-items span {
        font-size: 13px;
    }
    .view-product .product-items .shopping-item {
        background: #fff;
        padding: 20px 25px;
        transition: all 0.3s ease 0s;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item {
            width: 250px;
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .view-product .product-items .shopping-item {
            top: 68px;
        }
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item {
            top: 66px;
        }
    }
    .view-product .product-items .shopping-item .shopping-list {
        height: auto;
        max-height: 260px;
        overflow-y: scroll;
        padding-right: 10px;
    }
    .view-product .product-items .shopping-item .shopping-list li {
        overflow: hidden;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 15px;
        margin-bottom: 15px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .view-product .product-items .shopping-item .shopping-list li .cart-img {
        border: 1px solid #ededed;
        overflow: hidden;
        height: 105px;
        width: 80px;
        border-radius: 4px;
        float: left;
        margin-right: 20px;
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item .shopping-list li .cart-img {
            height: 60px;
            width: 60px;
            margin-right: 10px;
        }
    }
    .view-product .product-items .shopping-item .bottom {
        text-align: center;
    }
    
    .view-product .product-items .shopping-item .bottom .total {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        padding-bottom: 4px;
    }
    .view-product .product-items .shopping-item .bottom .total .voucher {
        color: #da4343;
        border: 1px solid #da4343;
        border-radius: 6px;
        padding: 0 3px;
        font-weight: bold;
    }
    .view-product .product-items .shopping-item .bottom .total span {
        text-transform: normal;
        color: #6d6d6d;
        font-weight: 500;
        font-size: 15px;
    }
    .view-product .product-items .shopping-item .bottom .total .total-amount {
        font-size: 15px;
        font-weight: bold;
        color: #000;
    }

    .view-product .product-items .shopping-item .bottom .total .total-amount.bold {
        font-weight: bold;
        font-size: 24px;
        color: #222edd;
    }

    .view-product .product-items .shopping-item .bottom .total .payment {
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .view-product .product-items .shopping-item .bottom .total .payment span:last-child {
        font-weight: bold;
        color: #000;
    }
    form {
        position: relative;
    }

    .paypal-btn {
        background-color: #004c93;
        width: 250px;
        border: none;
        border-radius: 5px;
        margin: 10px 0 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .paypal-btn i {
        font-size: 30px;
        color: #fff;
        margin-right: 6px;
    }

    .paypal-btn span {
        color: #fff;
        font-size: 16px;
    }

    .SingleShippingAddress_shipping-addresses_19Ila {
        display: none !important;
        background: #000 !important;
    }

    .checkout-payment {
        display: flex;
        justify-content: space-between;
    }

    .checkout-payment .payment-item {
        width: 49%;
    }

    .checkout-voucher {
        position: relative;
    }
    .checkout-voucher .menu-voucher  {
        bottom: 50px;
        top: unset;
        background-color: #fffef8;
    }

    .checkout-voucher .menu-voucher h4 {
        padding: 6px 20px;
    }

    .checkout-voucher .menu-voucher .navbar-nav {
        width: 100%;
        padding: 0 20px;
        margin-top: 0;
        max-width: unset;
    }
    .checkout-voucher .menu-voucher .nav-item {
        border-left: none;
        display: flex;
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        margin-right: 0;
        padding: 0 !important;
        background-color: #fff;
    }
    .checkout-voucher .menu-voucher .nav-item.disable .nav-item__item {
        opacity: 0.5;
    }
    .checkout-voucher .menu-voucher .nav-item .nav-item__plus {
        width: 100%;
        height: 40px;
        background-color: #fff8e4;
        margin-top: 1px;
        display: flex;
        padding: 10px;
    }
    .checkout-voucher .menu-voucher .nav-item .nav-item__plus span {
        color: #fa6338;
        margin-right: 6px;
    }
    .nav-item__container {
        width: 100%;
        position: relative;
    }
    .nav-item__item {
        height: 136px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        box-shadow: var(--vc-template-box-shadow,.125rem .125rem .3125rem rgba(0,0,0,.07));
        border-bottom: 0.0625rem solid var(--vc-card-left-border-color,#e8e8e8);
        border-bottom-left-radius: 0.125rem;
        border-top: 0.0625rem solid var(--vc-card-left-border-color,#e8e8e8);
        border-top-left-radius: 0.125rem;
    }
    .nav-item__image {
        width: 25%;
        border-right: 0.0625rem dashed #d7d7d7;
        margin-right: 6px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg,transparent calc(var(--vc-card-radius, .25rem)*2),var(--vc-card-left-border-color,#dfdfdf) 0) 0 0.0625rem /0.0625rem calc(var(--vc-card-radius, .25rem)*2 + var(--vc-card-gap, .125rem)) repeat-y,radial-gradient(circle at 0 var(--vc-card-radius,.25rem),transparent 0,transparent calc(var(--vc-card-radius, .25rem) - 0.0625rem),var(--vc-card-left-border-color,#dfdfdf) 0,var(--vc-card-left-border-color,#dfdfdf) var(--vc-card-radius,.25rem),var(--vc-card-left-fill-color,#fff) 0) 0 0.0625rem /100% calc(var(--vc-card-radius, .25rem)*2 + var(--vc-card-gap, .125rem)) repeat-y;
    }
    .nav-item__image .no-image {
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nav-item__image .image { 
        padding: 0 10px;
    }
    .nav-item__info {
        width: 55%;
        padding: 10px 0;
    }
    .nav-item__info p {
        margin: 0;
    }
    .nav-item__info p:first-child {
        font-weight: bold;
        color: #fa6338;
    }
    .nav-item__info p:last-child {
        color: #fa6338;
    }
    .nav-item__info p:nth-child(3) {
        color: #666;
    }
    .nav-item__info p:nth-child(4) {
        width: 100%;
        position: relative;
    }
    .nav-item__info p:nth-child(4) span {
        width: 100%;
        height: 6px;
        background-color: #ccc;
        border-radius: 4px;
    }
    .nav-item__info p:nth-child(4) span:last-child {
        position: absolute;
        content: "";
        top: 10.5px;
        left: 0;
        background-color: #fa6338;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .nav-item__button {
        width: 15%;
    }
    .nav-item__button span {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #337ab7;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    .nav-item__button span i {
        color: #fff;
        font-size: 10px;
        line-height: 10px;
    }
    .nav-item__button button {
        padding: 6px 16px;
        border: 0;
        background-color: #337ab7;
        color: #fff;
        border-radius: 2px;
    }
</style>