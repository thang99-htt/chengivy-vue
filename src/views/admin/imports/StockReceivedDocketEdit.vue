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
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        })
                    });

                    
                } catch (error) {
                    console.log(error.response);
                }
            },
            async deleteStockReceivedDocket() {
                if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                    try {
                        await StockReceivedDocketService.delete(this.stockReceivedDocket.id);
                        this.$router.push({ name: "stockReceivedDocket" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        async mounted() {
            this.getStockReceivedDocket(this.id);
        },
    };
</script>
