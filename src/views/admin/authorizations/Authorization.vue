<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Phân quyền</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <AuthorizationStaff/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive mt-5">
                    <AuthorizationRole/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 <!-- end dashboard inner -->
</template>
<script>
    import AuthorizationList from "@/components/admin/authorizations/AuthorizationList.vue";
    import AuthorizationStaff from "./AuthorizationStaff.vue";
    import AuthorizationRole from "./AuthorizationRole.vue";

    export default {
        components: {
            AuthorizationList,
            AuthorizationRole,
            AuthorizationStaff
        },
        name: 'authorization',
    };
</script>
<style scoped>
    
</style>
