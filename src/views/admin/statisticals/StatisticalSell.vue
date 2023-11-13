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
                        <apexchart type="bar" height="350" :options="productsChartData.chartOptions"
                            :series="productsChartData.chartSeries" />
                        <h5 v-if="filteredProducts[0]">Số lượng sản phẩm bán ra ngày {{ filteredProducts[0].date }}</h5>
                        <table v-if="filteredProducts[0]" class="example1 table dataTable table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng bán ra</th>
                                    <th>Tổng giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(product, index) in filteredProducts[0].productQuantities" :key="product">
                                    <td>{{ index+1 }}</td>
                                    <td>
                                        <img :src="product.image" alt="Hình ảnh" width="80">
                                        {{ product.name }}
                                    </td>
                                    <td>{{ formatPrice(product.price) }}</td>
                                    <td>{{ (product.quantity).toLocaleString() }}</td>
                                    <td>{{ formatPrice(product.price*product.quantity) }}</td>
                                </tr>
                            </tbody>
                        </table>
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
import { initializeDataTable } from '../../../utils';
import $ from 'jquery';
import 'datatables.net';

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
            filteredProducts: [],
            datesUpdated: false,
            productsChartData: {
                chartOptions: {
                    chart: {
                        id: "product",
                        type: "bar", 
                        stacked: true,
                        events: {
                            xAxisLabelClick: (event, chartContext, config) => {
                                const vm = this; // Capture the reference to the Vue component
                                let selectedDate = config.config.xaxis.categories[config.labelIndex];
                                // Filter the products array based on the selected date
                                this.filteredProducts = vm.products.products.filter(product => product.date === selectedDate);   
                                if ($.fn.DataTable.isDataTable('.example1')) {
                                    $('.example1').DataTable().destroy();
                                }
                                this.$nextTick(() => {
                                    initializeDataTable();
                                });
                            }
                        }
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
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "90%",
                            endingShape: "rounded",
                            distributed: true
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                },
                chartSeries: [{
                    name: "Số lượng bán ra",
                    data: []
                }],
            },
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
            if (this.orders.orders_cancel && this.orders.orders_cancel.length > 0) {
                return this.orders.orders_cancel.reduce(
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
                        const totalCancel = res.orders_cancel
                            .filter((item) => item.cancel_date === date)
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
                await StatisticalService.getProductsSoldOut(data).then(res => {
                    let dates = [];
                    this.products = res;

                    dates = res.dates;
                    this.productsChartData.chartOptions.xaxis.categories.splice(0);
                    dates.map((date) => {
                        this.productsChartData.chartOptions.xaxis.categories.push(date);
                    });

                    const productsData = dates.map((date) => {
                        const totalQuantity = res.products
                            .filter((item) => item.date === date)
                            .reduce((sum, item) => sum + parseInt(item.total), 0);
                        return totalQuantity;
                    });

                    this.productsChartData.chartSeries[0].data = productsData; // Dữ liệu số đơn thành công
                });
            } catch (error) {
                console.log(error);
            }
        }

    },
    mounted() {
        this.handleDatesChange();
    },
};
</script>
  