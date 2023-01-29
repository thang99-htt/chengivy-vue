<template>
    <aside class="main-sidebar">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image">
            <img class="img-responsive" src="/images/admin/photos/6215.jpg" alt="#" />
          </div>
          <div class="pull-left info">
            <div class="user_info">
              <h6>{{ currentUser.name }}</h6>
              <p><span class="online_animation"></span> Online</p>
            </div>
          </div>
        </div>
  
        <form v-on:submit.prevent class="sidebar-form" id="searchForm">
          <div class="input-group" id="searchContainer">
            <span class="input-group-btn">
              <input type="text"
              name="search"
              id="search"
              class="search form-control"
              laceholder="Search Menus"
              data-list=".sidebar-menu">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
  
        <!-- Sidebar Menu -->
        <sidebar-menu />

      </section>
      <!-- /.sidebar -->
    </aside>
</template>
<script>
  import SidebarMenu from './SidebarMenu.vue'
  import axios from 'axios';

  export default {
    name: 'Sidebar',
    props: ['user'],
    components: { 
        SidebarMenu 
    },
    data() {
      return {
        currentUser: [],
        token: localStorage.getItem('token'),
      };
    },
    mounted() {
      if(this.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        axios.get(`http://127.0.0.1:8000/api/admin/staff`).then((response) => {
        this.currentUser = response.data;
      });
      } else {
        this.currentUser = "";
      }
    },
    
  }
</script>
<style scope="local">
  .user-panel .image img {
    border-radius: 50%;
  }
  #searchForm {
    padding-left: 0em;
    padding-right: 0em;
  }
  #searchContainer {
    height: 100%;
    padding-bottom: 0em;
  }
  #search {
    width: 80%;
    float: right;
  }
  
  #search-btn {
    width: 20%;
  }
</style>
  