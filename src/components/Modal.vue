<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateAddressModalLabel">EDIT ADDRESS</h5>
                    <button type="button" class="btn-close"  @click="closeModel"></button>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Lưu</button>
                </div>
            </div>
        </div>
    </div>
   
  </template>
  
  <script>
  import $ from 'jquery'
  export default {
    mounted(){
        $('.btn-close').click(function() {
            $('.modal').toggleClass('d-none');
        });
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>