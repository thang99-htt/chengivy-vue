<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                <div class="statistical-report">
                    <div class="report-item">
                        <h4>Doanh số</h4>
                        <div class="report-quantity">
                            <p>
                                <span>Doanh thu</span>
                                <span v-if="salesCount">{{ formatPrice(salesCount) }}</span>
                            </p>
                            <p>
                                <span>Chi phí</span>
                                <span v-if="salesPaymentCount">{{ formatPrice(salesPaymentCount) }}</span>
                            </p>
                            <p>
                                <span>Lợi nhuận</span>
                                <span v-if="salesProfitCount">{{ formatPrice(salesProfitCount) }}</span>
                            </p>
                        </div>
                        <apexchart type="bar" height="350" :options="salesChartData.chartOptions"
                            :series="salesChartData.chartSeries" />
                        <apexchart type="area" height="350" :options="salesChartData.chartOptions"
                            :series="salesChartData.chartSeries" />
                    </div>
                    <div class="report-item">
                        <h4>Đơn hàng</h4>
                        <div class="report-quantity">
                            <p>
                                <span>Tổng số đơn</span>
                                <span v-if="ordersCount">{{ ordersCount }}</span>
                            </p>
                            <p>
                                <span>Giao thành công</span>
                                <span v-if="ordersSuccessCount">{{ ordersSuccessCount }}</span>
                            </p>
                            <p>
                                <span>Đơn bị hủy</span>
                                <span v-if="ordersCancelCount">{{ ordersCancelCount }}</span>
                            </p>
                        </div>
                        <apexchart type="bar" height="350" :options="ordersChartData.chartOptions"
                        :series="ordersChartData.chartSeries" />
                    </div>
                    <div class="report-item">
                        <h4>Sản phẩm</h4>
                        <div class="report-quantity">
                            <p>
                                <span>Tổng số sản phẩm</span>
                                <span v-if="products">{{ products.products }}</span>
                            </p>
                            <p>
                                <span>Số sản phẩm mỗi đơn (Avg)</span>
                                <span v-if="products">{{ products.averageQuantityPerOrder }}</span>
                            </p>
                        </div>
                        <apexchart type="bar" height="350" :options="productsChartData.chartOptions"
                            :series="productsChartData.chartSeries" />
                        <p>Sản phẩm chưa bán được</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import StatisticalService from "@/services/admin/statistical.service";
import { formatPrice } from '../../../utils';

export default {
    components: {
        StatisticalPicker,
    },
    data() {
        return {
            startDateFormatted: "",
            endDateFormatted: "",
            orders: [],
            sales: [],
            products: [],
            datesUpdated: false,
            ordersChartData: {
                chartOptions: {
                    chart: {
                        id: "sell",
                    },
                    xaxis: {
                        categories: [], // Các nhãn ngày
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return value.toLocaleString();
                            },
                        },
                    },
                    colors: ["#009f00", "#ff0000"],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "90%",
                            endingShape: "rounded",
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                },
                chartSeries: [
                    {
                        name: "Giao thành công",
                        data: [], // Dữ liệu số đơn thành công
                    },
                    {
                        name: "Đơn bị hủy",
                        data: [], // Dữ liệu số đơn bị hủy
                    },
                ],
            },
            salesChartData: {
                chartOptions: {
                    chart: {
                        id: "sales",
                    },
                    xaxis: {
                        categories: [], 
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return formatPrice(value);
                            },
                        },
                    },
                    colors: ["#0a46d2", "#ff5722"],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "90%",
                            endingShape: "rounded",
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                },
                chartSeries: [
                    {
                        name: "Doanh thu",
                        data: [], 
                    },
                    {
                        name: "Chi phí",
                        data: [], 
                    },
                ],
            },
            productsChartData: {
                chartOptions: {
                    chart: {
                        id: "sales",
                    },
                    xaxis: {
                        categories: [], 
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return value.toLocaleString();
                            },
                        },
                    },
                    colors: ["#6a4c91"],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "90%",
                            endingShape: "rounded",
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                },
                chartSeries: [
                    {
                        name: "Số sản phẩm bán ra",
                        data: [], 
                    },
                ],
            },
        };
    },
    computed: {
        ordersCount() {
            if (this.orders.orders && this.orders.orders.length > 0) {
                return this.orders.orders.reduce((total, item) => total + item.total, 0);
            } else {
                return 0;
            }
        },
        ordersSuccessCount() {
            if (this.orders.orders_success && this.orders.orders_success.length > 0) {
                return this.orders.orders_success.reduce(
                    (total, item) => total + item.total,
                    0
                );
            } else {
                return 0;
            }
        },
        ordersCancelCount() {
            if (this.orders.orders_cancle && this.orders.orders_cancle.length > 0) {
                return this.orders.orders_cancle.reduce(
                    (total, item) => total + item.total,
                    0
                );
            } else {
                return 0;
            }
        },
        salesCount() {
            let total = 0;
            if (this.sales.revenues && this.sales.revenues.length > 0) {
                for (const item of this.sales.revenues) {
                    total += parseInt(item.total, 10);
                }
            } 
            return total;
        },
        salesPaymentCount() {
            let total = 0;
            if (this.sales.payments && this.sales.payments.length > 0) {
                for (const item of this.sales.payments) {
                    total += parseInt(item.total, 10);
                }
            } 
            return total;
        },
        salesProfitCount() {
            let total = 0;
            if (this.sales.profits && this.sales.profits.length > 0) {
                for (const item of this.sales.profits) {
                    total += parseInt(item.total, 10);
                }
            } 
            return total;
        },
    },
    watch: {
        startDateFormatted: 'handleDatesChange', 
        endDateFormatted: 'handleDatesChange', 
    },
    methods: {
        formatPrice,
        updateStartDate(value) {
            this.startDateFormatted = value;
        },
        updateEndDate(value) {
            this.endDateFormatted = value;
        },
        handleDatesChange() {
            if (this.datesUpdated) {
                this.retrieveOrders();
                this.retrieveSales();
                this.retrieveProducts();
                this.datesUpdated = false; 
            }
        },
        async retrieveOrders() {
            const data = {
                startDate: this.startDateFormatted,
                endDate: this.endDateFormatted
            };
            
            try {
                await StatisticalService.getOrders(data).then(res => {
                    let dates = [];
                    this.orders = res;
                    dates = res.dates;
                    // Thiết lập các nhãn ngày trên trục x

                    this.ordersChartData.chartOptions.xaxis.categories.splice(0);

                    dates.map((date) => {
                        this.ordersChartData.chartOptions.xaxis.categories.push(date);
                    });

                    // Tạo dữ liệu cho biểu đồ cột
                    const successData = dates.map((date) => {
                        const totalSuccess = res.orders_success
                            .filter((item) => item.receipt_date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalSuccess;
                    });
    
                    const cancelData = dates.map((date) => {
                        const totalCancel = res.orders_cancle
                            .filter((item) => item.cancle_date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalCancel;
                    });
                    
                    this.ordersChartData.chartSeries[0].data = successData; // Dữ liệu số đơn thành công
                    this.ordersChartData.chartSeries[1].data = cancelData; // Dữ liệu số đơn bị hủy
    
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveSales() {
            const data = {
                startDate: this.startDateFormatted,
                endDate: this.endDateFormatted
            };
            
            try {
                await StatisticalService.getSales(data).then(res => {
                    let dates = [];
                    this.sales = res;
                    dates = res.dates;
                    // Thiết lập các nhãn ngày trên trục x

                    this.salesChartData.chartOptions.xaxis.categories.splice(0);

                    dates.map((date) => {
                        this.salesChartData.chartOptions.xaxis.categories.push(date);
                    });

                    
                    // Tạo dữ liệu cho biểu đồ cột
                    const revenuessData = dates.map((date) => {
                        const totalRevenues = res.revenues
                            .filter((item) => item.date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalRevenues;
                    });
    
                    const paymentsData = dates.map((date) => {
                        const totalPayment = res.payments
                            .filter((item) => item.date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalPayment;
                    });
                    
                    this.salesChartData.chartSeries[0].data = revenuessData; // Dữ liệu số đơn thành công
                    this.salesChartData.chartSeries[1].data = paymentsData; // Dữ liệu số đơn bị hủy
    
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveProducts() {
            const data = {
                startDate: this.startDateFormatted,
                endDate: this.endDateFormatted
            };
            
            try {
                await StatisticalService.getProducts(data).then(res => {
                    let dates = [];
                    this.products = res;
                    dates = res.dates;
                    // Thiết lập các nhãn ngày trên trục x

                    this.productsChartData.chartOptions.xaxis.categories.splice(0);

                    dates.map((date) => {
                        this.productsChartData.chartOptions.xaxis.categories.push(date);
                    });

                    
                    // Tạo dữ liệu cho biểu đồ cột
                    const productsSellData = dates.map((date) => {
                        const totalSells = res.products_sell
                            .filter((item) => item.date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalSells;
                    });
    
                    
                    this.productsChartData.chartSeries[0].data = productsSellData; // Dữ liệu số đơn thành công
    
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.handleDatesChange();
    },
};
</script>
  