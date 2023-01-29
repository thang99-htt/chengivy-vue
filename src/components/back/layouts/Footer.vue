<script>
export default {
  name: 'Footer',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<template>
  <footer class="main-footer">
    <strong>Copyright &copy; {{ year }}
    <a href="javascript:;">Chengivy</a>.</strong> All rights reserved.
  </footer>
</template>