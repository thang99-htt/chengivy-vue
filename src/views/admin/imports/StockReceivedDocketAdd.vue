<template>
    <section class="content mt-2">
        <div class="box-body">
            <StockReceivedDocketForm :stockReceivedDocket="stockReceivedDocket" @submit:stockReceivedDocket="submitStockReceivedDocket" :reset="reset"/>
        </div>
    </section>
</template>
<script>
import StockReceivedDocketForm from "@/components/admin/imports/StockReceivedDocketForm.vue";
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";
import { mapGetters } from "vuex";

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
                'total_price': "",
                'value_added': "",
                'total_value': "",
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
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });
                // this.reset();
            } catch (error) {
                let errorMessage = 'Có lỗi xảy ra.';

                if (error.response && error.response.data) {
                    const errorData = error.response.data;

                    for (const fieldName in errorData) {
                        if (errorData.hasOwnProperty(fieldName)) {
                            const fieldErrors = errorData[fieldName];
                            if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                                errorMessage = fieldErrors[0];
                                break;
                            }
                        }
                    }
                }

                Toast.fire({
                    icon: 'warning',
                    title: errorMessage
                });
                console.log(error);
            }
        },
        reset () {
            this.stockReceivedDocket.staff_id = "";
            this.stockReceivedDocket.supplier_id = "";
            this.stockReceivedDocket.payment_voucher_id = "";
            this.stockReceivedDocket.form = "";
            this.stockReceivedDocket.date = new Date().toISOString().substr(0, 10);
            this.stockReceivedDocket.total_value = "";
            this.stockReceivedDocket.value_added = "Nam";
            this.stockReceivedDocket.total_price = "";
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
