<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="statistical-report top">
                    <div class="report-item">
                        <h4>Top 10 sản phẩm mua nhiều nhất</h4>
                        <div class="report-item__container">
                            <div>
                                <apexchart type="pie" :options="topBestSellerChartData.chartOptions"
                                    :series="topBestSellerChartData.chartSeries" />
                            </div>
                            <div class="product-container">
                                <div class="product-item" v-for="item in topBestSeller" :key="item">
                                    <img :src="item.image" alt="">
                                    <p>{{ item.name.slice(0, 17) }}...</p>
                                    <p>Đã bán <span>{{ (item.quantity_sold).toLocaleString() }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Top 10 sản phẩm mua ít nhất</h4>
                        <div class="report-item__container">
                            <div class="product-container">
                                <div class="product-item" v-for="item in topLeastSeller" :key="item">
                                    <img :src="item.image" alt="">
                                    <p>{{ item.name.slice(0, 17) }}...</p>
                                    <p>Đã bán <span>{{ (item.quantity_sold).toLocaleString() }}</span></p>
                                </div>
                            </div>
                            <div>
                                <apexchart type="pie" :options="topLeastSellerChartData.chartOptions"
                                    :series="topLeastSellerChartData.chartSeries" />
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Top 10 sản phẩm lợi nhuận cao nhất</h4>
                        <div class="report-item__container">
                            <div>
                                <apexchart type="pie" :options="topHighProfitChartData.chartOptions"
                                    :series="topHighProfitChartData.chartSeries" />
                            </div>
                            <div class="product-container">
                                <div class="product-item" v-for="item in topHighProfit" :key="item">
                                    <img :src="item.image" alt="">
                                    <p>{{ item.name.slice(0, 17) }}...</p>
                                    <p>Lợi nhuận <span>{{ formatPrice(item.profit) }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Top 10 sản phẩm lợi nhuận thấp nhất</h4>
                        <div class="report-item__container">
                            <div class="product-container">
                                <div class="product-item" v-for="item in topLowProfit" :key="item">
                                    <img :src="item.image" alt="">
                                    <p>{{ item.name.slice(0, 17) }}...</p>
                                    <p>Lợi nhuận <span>{{ formatPrice(item.profit) }}</span></p>
                                </div>
                            </div>
                            <div>
                                <apexchart type="pie" :options="topLowProfitChartData.chartOptions"
                                    :series="topLowProfitChartData.chartSeries" />
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Top 5 khách hàng mua nhiều nhất</h4>
                        <div class="report-item__container">
                            <div>
                                <apexchart type="pie" :options="topSellUserChartData.chartOptions"
                                    :series="topSellUserChartData.chartSeries" />
                            </div>
                            <div class="product-container">
                                <div class="product-item" v-for="item in topSellUser" :key="item">
                                    <p>{{ item.user_name }}</p>
                                    <p>Số đơn <span>{{ (item.order_count).toLocaleString() }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Top 5 khách hàng có giá trị đơn hàng cao nhất</h4>
                        <div class="report-item__container">
                            <div class="product-container">
                                <div class="product-item" v-for="item in topValueUser" :key="item">
                                    <p>{{ item.user_name }}</p>
                                    <p>Giá trị đơn <span>{{ formatPrice(item.order_value) }}</span></p>
                                </div>
                            </div>
                            <div>
                                <apexchart type="pie" :options="topValueUserChartData.chartOptions"
                                    :series="topValueUserChartData.chartSeries" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import StatisticalService from "@/services/admin/statistical.service";
import { formatPrice } from "../../../utils";

export default {
    components: {
        StatisticalPicker,
    },
    data() {
        return {
            topBestSeller: [],
            topLeastSeller: [],
            topHighProfit: [],
            topLowProfit: [],
            topSellUser: [],
            topValueUser: [],
            topBestSellerChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
            topLeastSellerChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
            topHighProfitChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
            topLowProfitChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
            topSellUserChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
            topValueUserChartData: {
                chartOptions: {
                    chart: {
                        width: 380,
                        type: "pie",
                    },
                    labels: [],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: "bottom",
                                },
                            },
                        },
                    ],
                },
                chartSeries: [],
            },
        };
    },
    methods: {
        formatPrice,
        async retrieveTopBestSeller() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topBestSeller = res.top_10_best_sellers;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topBestSeller.map((product) => {
                        return {
                            x: product.name, // Thêm tên sản phẩm vào nhãn
                            y: product.quantity_sold,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topBestSellerChartData.chartOptions.labels.push(data.x);
                    });

                    this.topBestSellerChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveTopLeastSeller() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topLeastSeller = res.top_10_least_sellers;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topLeastSeller.map((product) => {
                        return {
                            x: product.name, // Thêm tên sản phẩm vào nhãn
                            y: product.quantity_sold,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topLeastSellerChartData.chartOptions.labels.push(data.x);
                    });

                    this.topLeastSellerChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveTopHighProfit() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topHighProfit = res.top_10_high_profit;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topHighProfit.map((product) => {
                        return {
                            x: product.name, // Thêm tên sản phẩm vào nhãn
                            y: product.profit,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topHighProfitChartData.chartOptions.labels.push(data.x);
                    });

                    this.topHighProfitChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveTopLowProfit() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topLowProfit = res.top_10_low_profit;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topLowProfit.map((product) => {
                        return {
                            x: product.name, // Thêm tên sản phẩm vào nhãn
                            y: product.profit,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topLowProfitChartData.chartOptions.labels.push(data.x);
                    });

                    this.topLowProfitChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveTopSellUser() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topSellUser = res.top_5_sell_users;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topSellUser.map((user) => {
                        return {
                            x: user.user_name, // Thêm tên sản phẩm vào nhãn
                            y: user.order_count,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topSellUserChartData.chartOptions.labels.push(data.x);
                    });

                    this.topSellUserChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveTopValueUser() {
            try {
                await StatisticalService.getTopProducts().then((res) => {
                    this.topValueUser = res.top_5_value_users;

                    // Tính toán giá trị phần trăm và cập nhật dữ liệu cho biểu đồ tròn
                    const chartData = this.topValueUser.map((user) => {
                        return {
                            x: user.user_name, // Thêm tên sản phẩm vào nhãn
                            y: user.order_value,
                        };
                    });

                    // Cập nhật dữ liệu cho biểu đồ tròn

                    chartData.map((data) => {
                        this.topValueUserChartData.chartOptions.labels.push(data.x);
                    });

                    this.topValueUserChartData.chartSeries = chartData.map((data) => {
                        return parseFloat(data.y);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveTopBestSeller();
        this.retrieveTopLeastSeller();
        this.retrieveTopHighProfit();
        this.retrieveTopLowProfit();
        this.retrieveTopSellUser();
        this.retrieveTopValueUser();
    },
};
</script>

<style scoped>
.statistical-report.top .report-item__container {
    display: flex;
}
.statistical-report.top .report-item__container  > div {
    width: 50%;
}


.product-container {
    display: flex;
    flex-wrap: wrap;
}

.product-item {
    border-bottom: 1px solid #e5e5e5;
    flex: 0 0 calc(20% - 10px) ;
    margin: 5px;
    box-sizing: border-box;
    text-align: center;
}

.product-item img {
    width: 60px;
    height: 60px;
}

.product-item p {
    margin: 6px 0;
}

.product-item p:last-child span {
    font-weight: bold;
    color: #1f4173;
}
.product-item p:nth-child(2) {
    height: 40px;
}
</style>