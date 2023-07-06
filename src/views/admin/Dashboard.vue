<template>
  <!-- dashboard inner -->
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="full counter_section margin_bottom_30 bg-light-red">
          <div class="couter_icon">
            <div>
              <i class="fa fa-user icon-red"></i>
              <p class="total_no">{{ statisticals.staffs }}000000</p>
            </div>
          </div>
          <div class="counter_no">
            <div>
              <p class="head_couter">Nhân Viên</p>
              <p class="increase">
                <i class="bi bi-arrow-up-right"></i>30%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="full counter_section margin_bottom_30 bg-light-green">
          <div class="couter_icon">
            <div>
              <i class="fa fa-users icon-green"></i>
              <p class="total_no">{{ statisticals.users }}000000</p>
            </div>
          </div>
          <div class="counter_no">
            <div>
              <p class="head_couter">Khách Hàng</p>
              <p class="reduce">
                <i class="bi bi-arrow-down-left"></i>15%
              </p>
              <!-- <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="full counter_section margin_bottom_30 bg-light-purple">
          <div class="couter_icon">
            <div>
              <i class="fa fa-box icon-purple"></i>
              <p class="total_no">{{ statisticals.products }}000000</p>
            </div>
          </div>
          <div class="counter_no">
            <div>
              <p class="head_couter">Sản Phẩm</p>
              <p class="increase">
                <i class="bi bi-arrow-up-right"></i>30%
              </p>
              <!-- <p>Bán nhiều nhất: {{ statisticals.products_best_seller }}</p>
                      <p>Bán ít nhất: {{ statisticals.products_flop }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="full counter_section margin_bottom_30 bg-light-yellow">
          <div class="couter_icon">
            <div>
              <i class="fa fa-cart-shopping icon-yellow"></i>
              <p class="total_no">{{ statisticals.orders }}000000</p>
            </div>
          </div>
          <div class="counter_no">
            <div>
              <p class="head_couter">Đơn Hàng</p>
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
        <div class="full counter_section margin_bottom_30 bg-light-blue">
          <div class="couter_icon">
            <div>
              <i class="fa fa-book icon-blue"></i>
              <p class="total_no">{{ formatNumber(statisticals.revenues) }}000000</p>
            </div>
          </div>
          <div class="counter_no">
            <div>
              <p class="head_couter">Doanh Thu</p>
              <p class="increase">
                <i class="bi bi-arrow-up-right"></i>30%
              </p>
              <!-- <p>Lợi nhuận: {{ formatNumber(statisticals.profits) }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- graph -->
    <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
    <div class="mt-5">
      <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
    </div>
  </div>
  <!-- end dashboard inner -->
</template>
<style scoped></style>

<script>
import StatisticalService from "@/services/admin/statistical.service";

export default {
  name: 'DashBoard',
  data() {
    return {
      statisticals: [],
      chartOptions: {
        chart: {
          id: 'revenue-chart',
        },
        xaxis: {
          categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        },
      },
      chartSeries: [
        {
          name: 'Doanh thu',
          data: [],
        },
        {
          name: 'Lợi nhuận',
          data: [],
        }
      ],
    };
  },
  methods: {
    async retrieveStatisticals() {
      try {
        await StatisticalService.getAll().then((response) => {
          this.statisticals = response;
          // response.revenues_per_month.forEach(index=>{
          //   console.log(index);
          //   this.chartSeries[0].data.push(index.revenue);
          // });
          // response.profits_per_month.forEach(index=>{
          //   this.chartSeries[1].data.push(index.profit);
          // })
          const revenuesData = Array(12).fill(0);
          const profitsData = Array(12).fill(0);
          response.revenues_per_month.forEach((revenue, index) => {
            revenuesData[revenue.month - 1] = revenue.revenue;
          });
          response.profits_per_month.forEach((profit, index) => {
            profitsData[profit.month - 1] = profit.profit;
          });
          this.chartSeries = [{ name: 'Doanh thu', data: revenuesData }, { name: 'Lợi nhuận', data: profitsData }];

        });
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveStatisticals();
    },
    formatNumber(value) {
      if (!value) return 0;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.bg-light-red {
  background-color: #fdeae4;
}

.bg-light-green {
  background-color: #e3faec;
}

.bg-light-purple {
  background-color: #efdafe;
}

.bg-light-yellow {
  background-color: #fff5e1;
}

.bg-light-blue {
  background-color: #cff0fd !important;
}

.icon-red {
  color: #e96236;
  background-color: #f7c8b8;
}

.icon-green {
  color: #39d179;
  background-color: #b4eecb;
}

.icon-purple {
  color: #914fc5;
  background-color: #d8bfe9;
}

.icon-yellow {
  color: #fcb63d;
  background-color: #fde1ad;
}

.icon-blue {
  color: #36b3e9;
  background-color: #b4e6ee;
}

.counter_no p.increase {
  color: #06a046;
}

.counter_no p.increase i {
  background-color: #b4e1ce;
}

.counter_no p.reduce {
  color: #e96236;
}

.counter_no p.reduce i {
  background-color: #fed4dc;
}
</style>