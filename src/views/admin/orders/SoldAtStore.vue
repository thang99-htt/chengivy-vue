<template>
    <section class="content mt-2">
        <div class="box-body">
            <div class="liveAlert"></div>
            <SoldAtStoreForm :soldAtStore="soldAtStore" @submit:soldAtStore="submitSoldAtStore" :reset="reset"/>
        </div>
        <div id="bill" class="bill">
            <div class="d-flex align-items-center">
                <div>
                    <h3>CHENGIVY STORE</h3>
                    <p>Địa chỉ: 123 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                    <p>Điện thoại: (+84) 222 666 8888</p>
                </div>
                <div class="bill-sale">
                    <h2>HÓA ĐƠN BÁN HÀNG</h2>
                </div>
                <div class="ms-5">
                    <img v-if="qrCodeDataURL" :src="qrCodeDataURL" alt="QR Code" style="width: 100px;height: 100px;" />
                </div>
            </div>
            <div class="bill-customer">
                <p>Tên khách hàng: {{ soldAtStore.name_receiver }}</p>
                <p>Số điện thoại: {{ soldAtStore.phone_receiver }}</p>
            </div>
            <div class="bill-product">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Phân loại</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in soldAtStore.items" :key="item">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.product_name }}</td>
                            <td>{{ item.color }}, {{ item.size }}</td>
                            <td>
                                <span v-if="item.price_final < item.price" class="text-decoration-line-through">{{ formatPrice(item.price) }}</span>
                                <span :class="{'text-danger ms-3': item.price_final < item.price}">{{ formatPrice(item.price_final) }}</span>
                            </td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ formatPrice(item.price_final * item.quantity) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4" class="text-center text-bold">Tổng cộng</th>
                            <th>{{ computedTotalQuantity.toLocaleString() }}</th>
                            <th>{{ computedTotalValue.toLocaleString() }}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="bill-summary">
                <p class="fst-italic">Thành tiền (viết bằng chữ): {{ convertNumberToWords(soldAtStore.total_value) }}</p>
            </div>
            <div class="d-flex justify-content-between mt-5">
                <div>
                    <p>KHÁCH HÀNG</p>
                </div>
                <div class="bill-admin">
                    <p class="fst-italic">{{ currentDate }}</p>
                    <p>NGƯỜI BÁN HÀNG</p>
                    <p>{{ getAdmin.name }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import SoldAtStoreForm from "@/components/admin/orders/SoldAtStoreForm.vue";
import OrderService from "@/services/admin/order.service";
import { mapGetters } from "vuex";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { formatPrice } from '../../../utils';
import axios from 'axios';

export default { 
    components: {
        SoldAtStoreForm,
    },
    data() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = today.getFullYear();

        return {
            soldAtStore: {
                'staff_id': "",
                'user_id': "",
                'name_receiver': "",
                'phone_receiver': "",
                'voucher_id': "",
                'receipted_at': new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                'total_price': 0,
                'total_discount': 0,
                'total_value': 0,
                'pay': "",
                'point': 0,
                'remain': "",
                'payment_method': "",
                'items': [],
                'bill': null
            },
            currentDate: `Ngày ${day} tháng ${month} năm ${year}`,
            accountInfo: {
                accountNo: '007704070022438',
                accountName: 'HUYNH TRUNG QUOC',
                acqId: '970437',
                amount: 0,
                addInfo: 'Chuyen khoan mua hang',
            },
            qrCodeDataURL: null,
        };
    },
    methods: {
        formatPrice,
        async submitSoldAtStore(data) {
            this.soldAtStore.staff_id = this.getAdmin.id;
            
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

            if(this.soldAtStore.items.length == 0) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Chưa có thông tin sản phẩm.',
                });
            } else if(this.soldAtStore.items.some(item => !item.color)) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Sản phẩm chưa được chọn phân loại.',
                });
            } else if(this.soldAtStore.items.some(item => !item.quantity)) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Sản phẩm chưa được nhập số lượng.',
                });
            } else if(this.soldAtStore.name_receiver == '') {
                Toast.fire({
                    icon: 'warning',
                    title: 'Chưa có thông tin khách hàng.',
                });
            } else if(this.soldAtStore.payment_method == '') {
                Toast.fire({
                    icon: 'warning',
                    title: 'Chưa chọn hình thức thanh toán.',
                });
            } else {
                try {
                    const response = await OrderService.soldAtStore(data);
                    Toast.fire({
                        icon: response.success,
                        title: response.message,
                    });
    
                    window.open(`http://127.0.0.1:8000/storage/uploads/orders/${response.bill}`, '_blank');
                } catch (error) {
                    console.error(error);
                }
            }


        },
        async generatePDF() {
            const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4',
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const element = document.getElementById('bill');

                const html2canvasConfig = {
                    scale: 2,
                };

                const canvas = await html2canvas(element, html2canvasConfig);
                const imgData = canvas.toDataURL('image/jpeg', 0.98);
                pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);

                // Generate the PDF blob
                const pdfBlob = pdf.output('blob');
                
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    const pdfBase64 = event.target.result;
                    this.soldAtStore.bill = pdfBase64;
                };
                reader.readAsDataURL(pdfBlob);

        },
        reset () {
            this.soldAtStore.staff_id = "";
            this.soldAtStore.user_id = "";
            this.soldAtStore.name_receiver = "";
            this.soldAtStore.phone_receiver = "";
            this.soldAtStore.voucher_id = "";
            this.soldAtStore.receipted_at = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
            this.soldAtStore.total_discount = 0;
            this.soldAtStore.value_added = 0;
            this.soldAtStore.total_price = 0;
            this.soldAtStore.total_value = 0;
            this.soldAtStore.payment_method = "";
            this.soldAtStore.items = [];
            this.soldAtStore.bill = null;
        },
        convertNumberToWords(number) {

            // Mảng chứa các đơn vị cơ bản
            const units = ["", " nghìn", " triệu", " tỷ"];

            let result = " đồng";

            for (let i = 0; i < units.length && number > 0; i++) {
                const threeDigits = number % 1000;
                if (threeDigits > 0) {
                result = this.convertThreeDigitsToWords(threeDigits) + units[i] + " " + result;
                }
                number = Math.floor(number / 1000);
            }

            return result.trim();
        },
        convertThreeDigitsToWords(number) {
            // Mảng chứa các số từ 0 đến 9
            const numbers = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

            const hundreds = Math.floor(number / 100);
            const remainder = number % 100;
            let result = "";

            if (hundreds > 0) {
                result += numbers[hundreds] + " trăm ";
            }

            if (remainder > 0) {
                if (remainder < 10) {
                result += numbers[remainder];
                } else if (remainder < 20) {
                result += "mười " + numbers[remainder - 10];
                } else {
                result += numbers[Math.floor(remainder / 10)] + " mươi " + numbers[remainder % 10];
                }
            }

            return result;
        },
        async generateQRCode() {
            try {
                const response = await this.callApi();
                if (response.code === '00') {
                this.qrCodeDataURL = response.data.qrDataURL;
                } else {
                console.error('Failed to generate QR Code:', response.desc);
                }
            } catch (error) {
                console.error('Error while calling API:', error);
            }

        },
        async callApi() {
            const apiUrl = 'https://api.vietqr.io/v2/generate';

            try {
                const response = await axios.post(apiUrl, {
                ...this.accountInfo,
                    template: 'compact2',
                });

                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
    mounted() {
        // Tạo một trình theo dõi cho phần tử có id là "bill"
        const billElement = document.getElementById('bill');
        if(billElement) {
            const observer = new MutationObserver((mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList' || mutation.type === 'subtree') {
                        // Gọi lại hàm generatePDF khi có thay đổi trong phần tử "bill"
                    this.accountInfo.amount = this.soldAtStore.total_value;

                        this.generateQRCode();

                        this.generatePDF();
                    }
                }
            });
            
            observer.observe(billElement, { childList: true, subtree: true });
        }
    },
    computed: {
        ...mapGetters(['getAdmin']),
        computedTotalQuantity() {
            let total = 0;
            for (const item of this.soldAtStore.items) {
                total += item.quantity;
            }
            return total;
        },
        computedTotalValue() {
            let total = 0;
            for (const item of this.soldAtStore.items) {
                total += item.price_final * item.quantity;
            }
            return total;
        },
    }
};
</script>
<style scoped>
.bill {
    margin: 10px auto 0;
    width: 940px;
    padding: 20px;
}
.bill h3 {
    margin-bottom: 10px;
}
.bill .bill-sale {
    margin-left: 100px;
}
.bill .bill-customer {
    margin-top: 20px;
}
.bill .bill-customer p {
    color: #000;
    font-size: 16px;
}
.bill .bill-admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.table-bordered>thead>tr>th,
.table-bordered>tfoot>tr>th,
.table-bordered>tbody>tr>td {
    border: 1px solid #000 !important;
}
</style>