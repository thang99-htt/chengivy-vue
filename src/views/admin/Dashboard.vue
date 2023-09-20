<template>
  <div class="container-fluid">
    <div class="item-container">
      <div class="item-left">
        <div class="row">
          <div class="col">
            <div class="full counter_section mb-4 bg-light-green">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-users icon-green"></i>
                  <p class="head_couter">Khách Hàng</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">{{ formattedPrice(statisticals.users) }}</p>
                  <p class="reduce">
                    <i class="bi bi-arrow-down-left"></i>15%
                  </p>
                  <!-- <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="full counter_section mb-4 bg-light-blue">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-cart-shopping icon-blue"></i>
                  <p class="head_couter">Đơn Hàng</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">{{ formattedPrice(statisticals.orders) }}</p>
                  <p class="increase">
                    <i class="bi bi-arrow-up-right"></i>30%
                  </p>
                  <!-- <p>Đơn hàng bị hủy: {{ statisticals.orders_cancle }}</p>
                        <p>Đơn hàng thành công: {{ statisticals.orders_success }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="full counter_section mb-4 bg-light-red">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-box icon-red"></i>
                  <p class="head_couter">Sản Phẩm</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">{{ formattedPrice(statisticals.products) }}</p>
                  <p class="increase">
                    <i class="bi bi-arrow-up-right"></i>30%
                  </p>
                  <!-- <p>Bán nhiều nhất: {{ statisticals.products_best_seller }}</p>
                        <p>Bán ít nhất: {{ statisticals.products_flop }}</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="full counter_section1 mb-4 bg-white">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-refresh icon-green"></i>
                  <p class="head_couter">{{ statisticals.orders_confirm }}</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">Khách hàng hoàn trả</p>
                  <i class="bi bi-chevron-right"></i>
                  <!-- <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="full counter_section1 mb-4 bg-white">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-shopping-cart icon-blue"></i>
                  <p class="head_couter">{{ statisticals.orders_confirm }}</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">Đơn chờ xác nhận</p>
                  <a href="/admin/orders"><i class="bi bi-chevron-right"></i></a>
                  <!-- <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="full counter_section1 mb-4 bg-white">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-home icon-red"></i>
                  <p class="head_couter">{{ statisticals.products_out_of_stock }}</p>
                </div>
              </div>
              <div class="counter_icon">
                <div>
                  <p class="total_no">Sản phẩm hết hàng</p>
                  <i class="bi bi-chevron-right"></i>
                  <!-- <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p> -->
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="item-right">
        <div class="row">
          <div class="col">
            <div class="full counter_section mb-4 bg-light-purple">
              <div class="couter_icon">
                <div>
                  <i class="fa fa-book icon-purple"></i>
                  <p class="head_couter">Doanh Thu</p>
                </div>
              </div>
              <div class="counter_icon ">
                <div>
                  <p class="total_no">{{ formattedPrice(statisticals.revenues) }}</p>
                  <p class="increase">
                    <i class="bi bi-arrow-up-right"></i>30%
                  </p>
                  <!-- <p>Chi phí: {{ (statisticals.payments) }}</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="full counter_section1 mb-4 bg-white product-out_of_stock">
              <div>
                <div class="couter_icon">
                  <div>
                    <i class="fa fa-cubes icon-purple"></i>
                  </div>
                </div>
                <div class="counter_icon ">
                  <div>
                    <p class="total_no">Sản phẩm bán chạy</p>
                  </div>
                </div>
              </div>
              <div class="product-container">
                <div class="product-item" v-for="item in statisticals.top_10_best_sellers" :key="item">
                  <img :src="item.image" alt="">
                  <p>{{ item.name.slice(0, 17) }}...</p>
                  <p>Đã bán <span>{{ (item.quantity_sold).toLocaleString() }}</span></p>
                </div>
                <p class="view">Xem tất cả</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <apexchart type="line" height="350" :options="monthlyChartData.chartOptions" :series="monthlyChartData.chartSeries">
    </apexchart>
    <apexchart type="area" height="350" :options="monthlyChartData.chartOptions" :series="monthlyChartData.chartSeries">
    </apexchart>
    <div class="mt-5">
      <!-- <apexchart type="bar" height="350" :options="yearlyChartData.chartOptions" :series="yearlyChartData.chartSeries" /> -->
      <apexchart type="bar" height="350" :options="monthlyChartData.chartOptions"
        :series="monthlyChartData.chartSeries" />
    </div>
  </div>
</template>
<style scoped></style>

<script>
import StatisticalService from "@/services/admin/statistical.service";
import { formatPrice } from '@/utils';

export default {
  name: 'DashBoard',
  data() {
    return {
      statisticals: [],
      monthlyChartData: {
        chartOptions: {
          chart: {
            id: 'revenue-chart',
          },
          xaxis: {
            categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          },
          colors: ["#0a46d2", "#ff5722"],
          dataLabels: {
            enabled: false,
          },
        },
        chartSeries: [
          {
            name: 'Doanh thu',
            data: [],
          },
          {
            name: 'Chi phí',
            data: [],
          },
        ],
      },
      yearlyChartData: {
        chartOptions: {
          chart: {
            id: 'revenue-chart-yearly',
          },
          xaxis: {
            categories: [], // Add years here
          },
          colors: ["#009f00", "#ff5722"],
        },
        chartSeries: [
          {
            name: 'Doanh thu',
            data: [],
          },
          {
            name: 'Chi phí',
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    formattedPrice(price) {
      if (price >= 1000000000) {
        return (price / 1000000000).toFixed(2) + "B";
      } else if (price >= 1000000) {
        return (price / 1000000).toFixed(2) + "M";
      } else if (price >= 1000) {
        return (price / 1000).toFixed(2) + "K";
      } else {
        // Ngược lại, hiển thị giá trị gốc
        return price;
      }
    },
    formatPrice,
    async retrieveStatisticals() {
      try {
        await StatisticalService.getAll().then((response) => {
          this.statisticals = response;
          const revenuesData = Array(12).fill(0);
          const paymentsData = Array(12).fill(0);
          const years = [];

          response.revenues_per_month.forEach((revenue, index) => {
            revenuesData[revenue.month - 1] = revenue.revenue;
            if (!years.includes(revenue.year)) {
              years.push(revenue.year);
            }
          });

          response.payments_per_month.forEach((payment, index) => {
            paymentsData[payment.month - 1] = payment.payment;
            if (!years.includes(payment.year)) {
              years.push(payment.year);
            }
          });

          this.monthlyChartData.chartSeries = [
            { name: 'Doanh thu', data: revenuesData },
            { name: 'Chi phí', data: paymentsData },
          ];

          // Populate yearly data
          this.yearlyChartData.chartOptions.xaxis.categories = years;
          this.yearlyChartData.chartSeries = [
            {
              name: 'Doanh thu',
              data: years.map((year) => {
                return response.revenues_per_month
                  .filter((item) => item.year === year)
                  .reduce((sum, item) => sum + parseInt(item.revenue), 0);
              }),
            },
            {
              name: 'Chi phí',
              data: years.map((year) => {
                return response.payments_per_month
                  .filter((item) => item.year === year)
                  .reduce((sum, item) => sum + parseInt(item.payment), 0);
              }),
            },
          ];
        });
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveStatisticals();
    },
  },
  mounted() {
    this.refreshList();
  },
};

</script>

<style scoped>
.bg-light-red {
  background: linear-gradient(89.69deg, #F39034 2.03%, #FF2727 99.73%);
}

.bg-light-green {
  background: linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%);
}

.bg-light-purple {
  background: linear-gradient(269.97deg, #5900C9 0.02%, #9852F0 99.98%);
}

.bg-light-yellow {
  background: linear-gradient(269.97deg, #c9b500 0.02%, #e5f052 99.98%);
}

.bg-light-blue {
  background: linear-gradient(270deg, #003AD2 0%, #0097EC 100%);
}

.icon-red {
  color: #e96236;
  background-color: #ffe4db;
}

.icon-green {
  color: #39d179;
  background-color: #d9ffe8;
}

.icon-purple {
  color: #914fc5;
  background-color: #f6ebff;
}

.icon-yellow {
  color: #fcb63d;
  background-color: #fff1d6;
}

.icon-blue {
  color: #36b3e9;
  background-color: #e3fbfe;
}

.counter_icon p.increase {
  color: #fff;
}

.counter_icon p.increase i {
  color: #0fa80f;
}

.counter_icon p.increase i {
  background-color: #fff;
}

.counter_icon p.reduce {
  color: #fff;
}

.counter_icon p.reduce i {
  color: #f82b2b;
}

.counter_icon p.reduce i {
  background-color: #fff;
}

.product-out_of_stock {
  height: 410px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  display: block !important;
}

.product-out_of_stock::-webkit-scrollbar {
  width: 0;
}

.product-out_of_stock>div:first-child {
  display: flex;
}

.product-out_of_stock .product-container {
  display: flex;
  flex-wrap: wrap;
}

.product-out_of_stock .product-item {
  border-bottom: 1px solid #e5e5e5;
  flex: 0 0 calc(50% - 10px);
  margin: 5px;
  box-sizing: border-box;
  text-align: center;
}

.product-out_of_stock .product-item img {
  width: 60px;
  height: 60px;
}

.product-out_of_stock .product-item p {
  margin: 6px 0;
}

.product-out_of_stock .product-item p:last-child span {
  font-weight: bold;
  color: #1f4173;
}

.product-out_of_stock .product-container .view {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 6px;
  color: #003ad2;
  cursor: pointer;
}

.item-container {
  display: flex;
  justify-content: space-between;
}

.item-left {
  width: 74%;
}

.item-right {
  width: 23.5%;
}
</style>