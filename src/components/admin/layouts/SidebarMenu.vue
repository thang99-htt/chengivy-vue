<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <!-- <li class="pageLink" v-if="checkRangeOfPermissionIDs(getAdmin.permissionIDs, 21, 69)" :class="{ active: $route.path.includes('/admin/dashboard') }"> -->
    <li class="pageLink" :class="{ active: $route.path.includes('/admin/dashboard') }">
      <router-link to="/admin/dashboard">
        <i class="fa fa-desktop color8"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="treeview pageLink" v-if="getAdmin.permissionIDs.includes(23)"
      :class="{ active: $route.path.includes('/admin/staffs') }">
      <a href="/admin/staffs/staff-list">
        <i class="fa fa-user color1"></i>
        <span class="treeview-title">Nhân viên</span>
      </a>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(40)"
     :class="{ active: $route.path.includes('/admin/products') }">
      <router-link to="/admin/products/list">
        <i class="fa fa-box color4"></i>
        <span class="page">Sản phẩm</span>
      </router-link>
    </li>
    <li class="treeview pageLink" v-if="getAdmin.permissionIDs.includes(44)"
      :class="{ active: $route.path.includes('/admin/import') }">
      <a href="/admin/import/stock-received-docket">
        <i class="fa fa-book color2"></i>
        <span class="treeview-title">Nhập hàng</span>
      </a>
    </li>
    <!-- <li class="pageLink" :class="{ active: $route.path.includes('/admin/categories') }">
      <router-link to="/admin/categories">
        <i class="fa fa-sitemap color3"></i>
        <span class="page">Danh mục</span>
      </router-link>
    </li> -->

    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(55)"
      :class="{ active: $route.path.includes('/admin/orders') }">
      <router-link to="/admin/orders">
        <i class="fa fa-shopping-cart color5"></i>
        <span class="page">Đơn hàng</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(59)"
      :class="{ active: $route.path.includes('/admin/reviews') }">
      <router-link to="/admin/reviews">
        <i class="fa fa-star color6"></i>
        <span class="page">Đánh giá</span>
      </router-link>
    </li>
    <li class="pageLink" v-if="getAdmin.permissionIDs.includes(58)"
      :class="{ active: $route.path.includes('/admin/invoices') }">
      <router-link to="/admin/invoices">
        <i class="fa fa-ticket color7"></i>
        <span class="page">Hóa đơn</span>
      </router-link>
    </li>
    <li class="header">ME</li>
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
  padding: 10px 15px 12px 15px;
  margin-bottom: 4px;
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

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}


.color1 {
  color: #6300cc;
}

.color2 {
  color: #baa400;
}

.color3 {
  color: #48b300;
}

.color4 {
  color: #0498e8;
}

.color5 {
  color: #d600bd;
}

.color6 {
  color: #f701a9;
}

.color7 {
  color: #00c3d5;
}

.color8 {
  color: #7a1b67;
}</style>
