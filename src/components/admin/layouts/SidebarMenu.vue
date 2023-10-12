<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <!-- <li class="pageLink" v-if="checkRangeOfPermissionIDs(getAdmin.permissionIDs, 21, 69)" :class="{ active: $route.path.includes('/admin/dashboard') }"> -->
    <li class="pageLink" :class="{ active: $route.path.includes('/admin/dashboard') }">
      <router-link to="/admin/dashboard">
        <i class="fa fa-th-large"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="treeview pageLink" v-if="getAdmin.permissionIDs.includes(23)"
      :class="{ active: $route.path.includes('/admin/staffs') }">
      <a href="/admin/staffs/staff-list">
        <i class="fa fa-users"></i>
        <span class="treeview-title">Nhân viên</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/admin/staffs/staff-list">
            <i class="fa fa-info-circle"></i>Quản lý thông tin
          </a>
        </li>
        <li>
          <a href="/admin/staffs/roles">
            <i class="fa fa-user"></i>Quản lý phân quyền
          </a>
        </li>
      </ul>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(40)"
      :class="{ active: $route.path.includes('/admin/products') }">
      <a href="/admin/products/overview">
        <i class="fa fa-box"></i>
        <span class="treeview-title">Sản phẩm</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/admin/products/overview">
            <i class="fa fa-info-circle"></i>Tổng quan
          </a>
        </li>
        <li>
          <a href="/admin/products/inventory">
            <i class="fa fa-archive"></i>Tồn kho
          </a>
        </li>
        <li>
          <a href="/admin/products/sale">
            <i class="fa fa-long-arrow-down"></i>Giảm giá
          </a>
        </li>
        <li>
          <a href="/admin/products/hidden">
            <i class="fa fa-ban"></i>Đã ẩn
          </a>
        </li>
        <li>
          <a href="/admin/products/category">
            <i class="fa fa-sitemap"></i>Danh mục
          </a>
        </li>
        <li>
          <a href="/admin/products/brand">
            <i class="fa fa-handshake"></i>Thương hiệu
          </a>
        </li>
      </ul>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(44)"
      :class="{ active: $route.path.includes('/admin/import') }">
      <a href="/admin/import/stock-received-docket">
        <i class="fa fa-book"></i>
        <span class="treeview-title">Nhập hàng</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/admin/import/supplier">
            <i class="fa fa-handshake"></i>Nhà cung cấp
          </a>
        </li>
        <li>
          <a href="/admin/import/payment-voucher">
            <i class="fa fa-file"></i>Phiếu chi
          </a>
        </li>
        <li>
          <a href="/admin/import/stock-received-docket">
            <i class="fa fa-paste"></i>Phiếu nhập
          </a>
        </li>
        <li>
          <a href="/admin/import/stock-received-docket">
            <i class="fa fa-file-text"></i>Phiếu xuất
          </a>
        </li>
      </ul>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(55)"
      :class="{ active: $route.path.includes('/admin/orders') }">
      <a href="/admin/import/stock-received-docket">
        <i class="fa fa-shopping-cart"></i>
        <span class="treeview-title">Đơn hàng</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/admin/orders/overview">
            <i class="fa fa-info-circle"></i>Tổng quan
          </a>
        </li>
        <li>
          <a href="/admin/orders/returns">
            <i class="fa fa-retweet"></i>Hoàn trả
          </a>
        </li>
      </ul>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(59)"
      :class="{ active: $route.path.includes('/admin/reviews') }">
      <router-link to="/admin/reviews">
        <i class="fa fa-star"></i>
        <span class="page">Đánh giá</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(59)"
      :class="{ active: $route.path.includes('/admin/vouchers') }">
      <router-link to="/admin/vouchers">
        <i class="fa fa-ticket"></i>
        <span class="page">Phiếu khuyến mãi</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(44)"
      :class="{ active: $route.path.includes('/admin/statisticals') }">
      <a href="/admin/statisticals/overview">
        <i class="fa fa-bar-chart"></i>
        <span class="treeview-title">Thống kê, báo cáo</span>
      </a>
    </li>
    <li class="header">ME</li>
    <li class="pageLink">
      <router-link to="/admin/notifications">
        <i class="fa fa-bell"></i>
        <span class="page">Thông báo</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/tasks">
        <i class="fa fa-tasks"></i>
        <span class="page">Nhiệm vụ</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/setting">
        <i class="fa fa-cog"></i>
        <span class="page">Cài đặt</span>
      </router-link>
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
import { mapGetters } from 'vuex';

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters(['getAdmin'])
  },
  methods: {
    checkRangeOfPermissionIDs(permissionIDs, startID, endID) {
      return (
        permissionIDs.length >= (endID - startID + 1) &&
        Array.from({ length: endID - startID + 1 }, (_, index) => startID + index)
          .every(id => permissionIDs.includes(id))
      );
    }
  }
};
</script>
<style scoped>
/* override default */
.sidebar-menu>li>a {
  padding: 10px 20px 12px;
  margin-bottom: 4px;
  font-size: 16px;
  color: #30435e;
  display: flex;
  align-items: center;
}

.sidebar-menu li.active>a>.fa-angle-left,
.sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}


.fa.fa-star {
    color: unset;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
