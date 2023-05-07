<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <li class="pageLink active">
      <router-link to="/admin/dashboard">
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="treeview pageLink" v-if="test3">
      <a href="#">
        <i class="fa fa-user color1"></i>
        <span class="treeview-title">Nhân viên</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/admin/roles">
            Vai trò
          </router-link>
        </li>
        <li>
          <router-link to="/admin/permissions">
            Quyền
          </router-link>
        </li>
        <li>
          <router-link to="/admin/staffs">
            Danh sách nhân viên
          </router-link>
        </li>
        <li>
          <router-link to="/admin/authorization">
            Phân quyền nhân viên
          </router-link>
        </li>
      </ul>
    </li>
    <li class="treeview pageLink" v-if="test4">
      <a href="#">
        <i class="fa fa-book color2"></i>
        <span class="treeview-title">Nhập hàng</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/admin/suppliers">
            Nhà cung cấp
          </router-link>
        </li>
        <li>
          <router-link to="/admin/payment-vouchers">
            Phiếu chi
          </router-link>
        </li>
        <li>
          <router-link to="/admin/import-coupons">
            Phiếu nhập
          </router-link>
        </li>
      </ul>
    </li>
    <li class="pageLink" v-if="test14">
      <router-link to="/admin/categories">
        <i class="fa fa-sitemap color3"></i>
        <span class="page">Danh mục</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="test10">
      <router-link to="/admin/products">
        <i class="fa fa-box color4"></i>
        <span class="page">Sản phẩm</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="test22">
      <router-link to="/admin/orders">
        <i class="fa fa-shopping-cart color5"></i>
        <span class="page">Đơn hàng</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="test24">
      <router-link to="/admin/reviews">
        <i class="fa fa-star color6"></i>
        <span class="page">Đánh giá</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="test7">
      <router-link to="/admin/invoices">
        <i class="fa fa-ticket color7"></i>
        <span class="page">Hóa đơn</span>
      </router-link>
    </li>
    <li class="header">ME</li>
    <li class="pageLink">
      <router-link to="/admin/tasks">
        <i class="fa fa-tasks"></i>
        <span class="page">Tasks</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/setting">
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </router-link>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder"></i>
        <span class="treeview-title">Files</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf"></i> Item 3
          </a>
        </li>
      </ul>
    </li>

    <li class="header">LOGS</li>
    <li>
      <router-link to="/access">
        <i class="fa fa-book"></i>
        <span class="page">Access</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/server">
        <i class="fa fa-hdd"></i>
        <span class="page">Server</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/repos">
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </router-link>
    </li>

    <li class="header">PAGES</li>
    <li class="pageLink">
      <router-link to="/login">
        <i class="fa fa-circle text-yellow"></i>
        <span class="page"> Logout</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/404">
        <i class="fa fa-circle text-red"></i>
        <span class="page"> 404</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
    import $ from 'jquery'
    import {mapGetters} from 'vuex';
    import AuthorizationService from "@/services/admin/authorization.service";

    export default {
        name: 'TopBar',
        data() {
            return {
                token: localStorage.getItem('tokenAdmin'),
                test1: false,
                test2: false,
                test3: false,
                test4: false,
                test5: false,
                test6: false,
                test7: false,
                test10: false,
                test14: false,
                test18: false,
                test22: false,
                test24: false,

            };
        },
        async created() {
            await AuthorizationService.getStaff(this.getAdmin.id).then((response) => {
              response.roles.forEach(index=>{
                index.permissions.forEach(index1=>{
                  if(index1.id == 1)
                    this.test1 = true;
                  else if(index1.id == 2)
                    this.test2 = true;
                  else if(index1.id == 3)
                    this.test3 = true;
                  else if(index1.id == 4)
                    this.test4 = true;
                  else if(index1.id == 5)
                    this.test5 = true;
                  else if(index1.id == 6)
                    this.test6 = true;
                  else if(index1.id == 7)
                    this.test7 = true;
                  else if(index1.id == 10)
                      this.test10 = true;
                  else if(index1.id == 14)
                    this.test14 = true;
                  else if(index1.id == 18)
                    this.test18 = true;
                  else if(index1.id == 22)
                    this.test22 = true;
                  else if(index1.id == 24)
                    this.test24 = true;
                })
                })
                
            });
        },
        computed: {
            ...mapGetters(['getAdmin'])
        },
        mounted() {
          $(".pageLink").on("click", function() {
            $(".pageLink").removeClass("active");
            $(this).addClass("active");
          });
        },
        watch: {
          $route: function(to, from) {
            $(".pageLink").on("click", function() {
            $(".pageLink").removeClass("active");
            $(this).addClass("active");
          });
          }
        }
    };
</script>
<style scoped>
  /* override default */
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active > a > .fa-angle-left,
  .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  .treeview-title {
    z-index: 1;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }


  .color1 {
    color: #cd0000;
  }
  .color2 {
    color: #f4d801;
  }
  .color3 {
    color: #66f606;
  }
  .color4 {
    color: #0498e8;
  }
  .color5 {
    color: #f104d6;
  }
  .color6 {
    color: #f701a9;
  }
  .color7 {
    color: #03e5f5;
  }
</style>
