<template>
  <!-- dashboard inner -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-4 bg-1">
                  <div> 
                      <i class="fa fa-user color-white"></i>
                      <p class="head_couter">Nhân viên</p>
                  </div>
                </div>
                <div class="counter_no col-8 bg-2">
                  <div>
                      <p>TỔNG SỐ NHÂN VIÊN</p>
                      <p class="total_no">{{ statisticals.staffs }}</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-6">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-4 bg-3">
                  <div> 
                      <i class="fa fa-users color-white"></i>
                      <p class="head_couter">Khách hàng</p>
                  </div>
                </div>
                <div class="counter_no col-8 bg-4">
                  <div>
                      <p>TỔNG SỐ KHÁCH HÀNG</p>
                      <p class="total_no">{{ statisticals.users }}</p>
                      <p>Khách hàng mua nhiều nhất: {{ statisticals.customers }}</p>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-6">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-4 bg-5">
                  <div> 
                      <i class="fa fa-box color-white"></i>
                      <p class="head_couter">Sản phẩm</p>
                  </div>
                </div>
                <div class="counter_no col-8 bg-6">
                  <div>
                      <p>TỔNG SỐ SẢN PHẨM</p>
                      <p class="total_no">{{ statisticals.products }}</p>
                      <p>Bán nhiều nhất: {{ statisticals.products_best_seller }}</p>
                      <p>Bán ít nhất: {{ statisticals.products_flop }}</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-6">
              <div class="full counter_section margin_bottom_30">
                  <div class="couter_icon col-4 bg-7">
                    <div> 
                        <i class="fa fa-cart-shopping color-white"></i>
                        <p class="head_couter">Đơn hàng</p>
                    </div>
                  </div>
                  <div class="counter_no col-8 bg-8">
                    <div>
                        <p>TỔNG SỐ ĐƠN HÀNG</p>
                        <p class="total_no">{{ statisticals.orders }}</p>
                        <p>Đơn hàng bị hủy: {{ statisticals.orders_cancle }}</p>
                        <p>Đơn hàng thành công: {{ statisticals.orders_success }}</p>
                    </div>
                  </div>
              </div>
            </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="full counter_section margin_bottom_30">
              <div class="couter_icon col-4 bg-9">
                <div> 
                    <i class="fa fa-book color-white"></i>
                    <p class="head_couter">Doanh thu</p>
                </div>
              </div>
              <div class="counter_no col-8 bg-10">
                <div>
                    <p>TỔNG DOANH THU</p>
                    <p class="total_no">{{ formatNumber(statisticals.revenues) }}</p>
                    <p>Lợi nhuận: {{ formatNumber(statisticals.profits) }}</p>
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
<style scoped>
    
</style>

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
                      this.chartSeries = [  { name: 'Doanh thu', data: revenuesData },  { name: 'Lợi nhuận', data: profitsData }];

                    });
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveStatisticals();
            },
            formatNumber(value) {
              if (!value) return ''
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        },
        mounted() {
            this.refreshList();
        },
    };
</script>

<style scoped>
  .bg-1 {
    background-color: #d13100;
  }
  .bg-2 {
    background-color: #ff5722;
  }
  .bg-3 {
    background-color: #0079b1;
  }
  .bg-4 {
    background-color: #03a9f4;
  }
  .bg-5 {
    background-color: #dc8400;
  }
  .bg-6 {
    background-color: #ff9800;
  }
  .bg-7 {
    background-color: #007368;
  }
  .bg-8 {
    background-color: #009688;
  }
  .bg-9 {
    background-color: #c20041;
  }
  .bg-10 {
    background-color: #e91e63;
  }
</style>