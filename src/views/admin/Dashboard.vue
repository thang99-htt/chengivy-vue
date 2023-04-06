<template>
  <!-- dashboard inner -->
    <div class="container-fluid">
      <div class="row column1 mt-5">
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-bar-chart blue1_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ formatNumber(statisticals.revenues) }}</p>
                      <p class="head_couter">Tổng doanh thu</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-cart-shopping green_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ formatNumber(statisticals.orders) }}</p>
                      <p class="head_couter">Đơn hàng</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-comments red_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ formatNumber(statisticals.products) }}</p>
                      <p class="head_couter">Sản phẩm</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="full counter_section margin_bottom_30">
                <div class="couter_icon col-3">
                  <div> 
                      <i class="fa fa-user yellow_color"></i>
                  </div>
                </div>
                <div class="counter_no col-9">
                  <div>
                      <p class="total_no">{{ formatNumber(statisticals.users) }}</p>
                      <p class="head_couter">Khách hàng</p>
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
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  },
                },
                chartSeries: [{
                  name: 'Doanh thu',
                  data: [],
                }],
            };
        },
        methods: {
            async retrieveStatisticals() {
                try {
                    await StatisticalService.getAll().then((response) => {
                      this.statisticals = response;
                      response.revenues_per_month.forEach(index=>{
                        this.chartSeries[0].data.push(index.revenue)
                      })
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