<script>
  import CurrentTime from "@/components/CurrentTime.vue";
  export default {
    components: {
      CurrentTime,
    },
    data() {
        return {
            value: null
        }
    }
  };
</script>
<template>
  <div class="midde_cont">
    <p class="mt-100">
      Home page
    </p>
    <i class="pi pi-bell mr-4 p-text-secondary" style="font-size: 2rem" v-badge="2"></i>
    <current-time />
  </div>
</template>
<style scoped>
      .mt-100 {
        margin-top: 100px;
      }
</style>
