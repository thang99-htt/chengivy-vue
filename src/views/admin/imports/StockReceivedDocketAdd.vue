<template>
    
    <section class="content mt-2">
        <div class="box-body">
            <div class="liveAlert"></div>
            <StockReceivedDocketForm :stockReceivedDocket="stockReceivedDocket" @submit:stockReceivedDocket="submitStockReceivedDocket" :reset="reset"/>
        </div>
    </section>
</template>
<script>
import StockReceivedDocketForm from "@/components/admin/imports/StockReceivedDocketForm.vue";
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";
import { mapGetters } from "vuex";
import { showAlert } from '@/utils';

export default { 
    components: {
        StockReceivedDocketForm,
    },
    data() {
        return {
            stockReceivedDocket: {
                'staff_id': "",
                'supplier_id': "",
                'payment_voucher_id': "",
                'form': "",
                'date': new Date().toISOString().substr(0, 10),
                'total_price': 0,
                'value_added': 0,
                'total_value': 0,
                'image': "",
                'description': "",
                'items': [],
                'inventories': []
            },
        };
    },
    watch: {
        'stockReceivedDocket.value_added': function(newValue) {
            if (newValue !== "") {  // Kiểm tra nếu newValue không rỗng
                this.stockReceivedDocket.total_value = parseFloat(this.stockReceivedDocket.total_price) + parseFloat(newValue);
            } else {
                this.stockReceivedDocket.total_value = "";  // Nếu newValue rỗng, đặt total_value thành rỗng
            }
        },
    },
    methods: {
        async submitStockReceivedDocket(data) {
            this.stockReceivedDocket.staff_id = this.getAdmin.id;

            // Lấy giờ hiện tại theo múi giờ Việt Nam
            const currentTime = new Date();
            const vnTime = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ

            const hours = String(vnTime.getHours()).padStart(2, "0");
            const minutes = String(vnTime.getMinutes()).padStart(2, "0");
            const seconds = String(vnTime.getSeconds()).padStart(2, "0");

            // Gộp ngày, giờ, phút, giây để tạo thành một đối tượng Date
            const dateTimeString = `${this.stockReceivedDocket.date} ${hours}:${minutes}:${seconds}`;
            const newDate = new Date(dateTimeString);

            // Định dạng lại ngày thành "YYYY-MM-DD HH:mm:ss"
            this.stockReceivedDocket.date = newDate.toISOString().substr(0, 19).replace("T", " ");
            
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
            try {
                await StockReceivedDocketService.create(data)
                    .then(res => {
                        console.log(res);
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });
                // this.reset();
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    const errorMessage = errorData.message; // Sửa dòng này
                    let firstError = null;
                    for (const key in errorMessage) {
                        if (errorMessage.hasOwnProperty(key) && errorMessage[key].length > 0) {
                            firstError = errorMessage[key][0];
                            break; // Tìm thấy phần tử đầu tiên và thoát vòng lặp
                        }
                    }
                    showAlert({ message: firstError, success: errorData.success });

                    console.log(error);
                }
                // this.reset();
            }
        },
        reset () {
            this.stockReceivedDocket.staff_id = "";
            this.stockReceivedDocket.supplier_id = "";
            this.stockReceivedDocket.payment_voucher_id = "";
            this.stockReceivedDocket.form = "";
            this.stockReceivedDocket.date = new Date().toISOString().substr(0, 10);
            this.stockReceivedDocket.total_value = 0;
            this.stockReceivedDocket.value_added = 0;
            this.stockReceivedDocket.total_price = 0;
            this.stockReceivedDocket.image = "";
            this.stockReceivedDocket.description = "";
            this.stockReceivedDocket.items = [];
            this.stockReceivedDocket.inventories = [];
        },
    },
    computed: {
        ...mapGetters(['getAdmin'])
    }
};
</script>
