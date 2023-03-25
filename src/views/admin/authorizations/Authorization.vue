<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
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
</template>
<script>
    import AuthorizationStaff from "./AuthorizationStaff.vue";
    import AuthorizationRole from "./AuthorizationRole.vue";

    export default {
        components: {
            AuthorizationRole,
            AuthorizationStaff
        },
        name: 'authorization',
    };
</script>
<style scoped>
    
</style>
