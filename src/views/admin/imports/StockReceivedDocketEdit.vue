<template>
    <section class="content">
        <div class="box-body">
            <StockReceivedDocketForm v-if="stockReceivedDocket" :stockReceivedDocket="stockReceivedDocket" @submit:stockReceivedDocket="submitStockReceivedDocket" :reset="reset"/>
        </div>
    </section>
</template>
<script>
    import StockReceivedDocketForm from "@/components/admin/imports/StockReceivedDocketForm.vue";
    import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";

    export default {
        components: {
            StockReceivedDocketForm,
        },
        props: {
            id: { type: Number, required: true },
        },
        data() {
            return {
                stockReceivedDocket: null,
                datePart: null
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
            'stockReceivedDocket.total_price': function(newValue) {
                if (newValue !== "") {  // Kiểm tra nếu newValue không rỗng
                    this.stockReceivedDocket.total_value = parseFloat(this.stockReceivedDocket.value_added) + parseFloat(newValue);
                } 
            },
        },
        methods: {
            async getStockReceivedDocket(id) {
                try {
                    this.stockReceivedDocket = await StockReceivedDocketService.get(id);
                } catch (error) {
                    console.log(error);
                }
            },
            async submitStockReceivedDocket(data) {
                try {
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
                    await StockReceivedDocketService.update(this.id, data).then(res=> {
                        console.log(res)
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        })
                    });

                    
                } catch (error) {
                    console.log(error.response);
                }
            },
        },
        async mounted() {
            this.getStockReceivedDocket(this.id);
        },
    };
</script>
