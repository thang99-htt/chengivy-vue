<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <li class="pageLink active">
      <router-link to="/admin/dashboard">
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/tables">
        <i class="fa fa-table"></i>
        <span class="page">Tables</span>
      </router-link>
    </li>
    <li class="treeview pageLink">
      <a href="#">
        <i class="fa fa-user"></i>
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
          <a href="#">
            Quyền
          </a>
        </li>
        <li>
          <a href="#">
            Danh sách nhân viên
          </a>
        </li>
      </ul>
    </li>
    <li class="pageLink">
      <router-link to="/admin/categories">
        <i class="fa fa-sitemap"></i>
        <span class="page">Danh mục</span>
      </router-link>
    </li>
    <li class="pageLink">
      <router-link to="/admin/products">
        <i class="fa fa-th-large"></i>
        <span class="page">Sản phẩm</span>
      </router-link>
    </li>
    <li class="treeview pageLink">
      <a href="#">
        <i class="fa fa-shopping-cart"></i>
        <span class="treeview-title">Đơn hàng</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/admin/statuses">
            Trạng thái
          </router-link>
        </li>
        <li>
          <router-link to="/admin/orders">
            Đơn hàng
          </router-link>
        </li>
      </ul>
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
export default {
  name: 'SidebarMenu'
}
</script>
<style>
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
</style>
