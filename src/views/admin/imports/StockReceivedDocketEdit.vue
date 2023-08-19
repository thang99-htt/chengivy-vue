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
                    
                    const dateObject = new Date(this.stockReceivedDocket.date);

                    const year = dateObject.getFullYear();
                    const month = dateObject.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
                    const day = dateObject.getDate();

                    this.datePart = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    this.stockReceivedDocket.date = this.datePart;

                } catch (error) {
                    console.log(error);
                }
            },
            async submitStockReceivedDocket(data) {
                if(this.datePart != this.stockReceivedDocket.date) {
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
                }

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
