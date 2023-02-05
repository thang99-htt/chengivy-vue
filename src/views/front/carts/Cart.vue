<template>
    
    <div class="section">
        <div class="cart-list list">
            <div class='container mt-30'>
                <div class="d-flex justify-content-between">
                    <h5 class="mb-4">
                        <svg class="d-inline me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                        <span>YOUR SHOPPING CART</span>
                        <span class="text-secondary fs-6">(5 products)</span>
                    </h5>
                    
                    <div class="w-30">
                        <!-- Validation Errors -->
                        <x-auth-validation-errors class="mb-4" :errors="$errors" />
                    </div>
                </div>
                
                <div class="table-responsive overflow-hidden">
                    <div class="row">
                        <div class="col-8">
                            <table class="table table-hover mt-2">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <form method="POST" action="" enctype="multipart/form-data">
                                        <tr>
                                            <td>
                                                <div class="d-flex">
                                                    <div class="me-4">
                                                        <img width="100" src="" alt="" />    
                                                    </div>
                                                    <div>
                                                        <input type="hidden" name="cart_product_id" id="" value="">
                                                        <p>Name</p>
                                                        <input type="hidden" name="cart_size_id" id="" value="">
                                                        <p>Size: S</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p>444 $</p>
                                            </td>
                                            <td>
                                                <div class="number-input ms-0">
                                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                        </svg>
                                                    </button>
                                                    <input class="quantity" min="1" name="cart_quantity" value="" type="number">
                                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="position-relative">
                                                <p>1111 $</p>    
                                                <div class="position-absolute bottom-0 right-0">
                                                    <a href="javascript:avoid(0)" class="confirmDeleteFront remove-item delete-cart"
                                                        module="item" moduleid="{{ $item['id'] }}" modulename="{{ $item['id'] }}">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg>
                                                    </a>   
                                                </div> 
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                        </tr>
                                    </form>
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-between">
                                <div></div>
                                <a href=""><x-button class="mt-4" ></x-button></a>
                            </div>
                        </div>
                        <div class="col-4 provisional">
                            <h6>PROVISIONAL</h6>
                            <div class="row total">
                                <div class="col-6">
                                    <p>Coupon Discount</p>
                                </div>
                                <div class="col-6">
                                    4444 $
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <p>Total Orders</p>
                                </div>
                                <div class="col-6">
                                    1111 $
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="d-flex justify-content-center">
                        <img src="" alt="" />
                    </div>
                    <h6 class="text-center mt-4">Cart is empty!</h6>
                    <div class="d-flex justify-content-center">
                        <a href="/all"><x-button class="mt-4" >COUNTINUTE SHOPPING</x-button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <section class="content">  
          <div class="row center-block">
            <div class="col-md-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Danh sách sản pẩm</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                  <div class="dataTables_wrapper dt-bootstrap" id="example1_wrapper">
                    <div class="row">
                      <div class="col-sm-6">
                        <div id="example1_length" class="dataTables_length">
      
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 table-responsive">
                        <CartList
                            v-if="filteredCartsCount > 0"
                            :carts="filteredCarts"
                        />
                        <p v-else>Không có sản phẩm nào.</p>
                        </div>
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
        import CartList from "@/components/back/carts/CartList.vue";
        import CartService from "@/services/back/cart.service";
    
        export default {
            components: {
                CartList,
            },
            name: 'cart',
            data() {
                return {
                    carts: [],
                };
            },
            computed: {
                filteredCarts() {
                    return this.carts;
                },
                filteredCartsCount() {
                    return this.filteredCarts.length;
                },
            },
            methods: {
                async retrieveCarts() {
                    try {
                        this.carts = await CartService.getAll();
                    } catch (error) {
                        console.log(error);
                    }
                },
                refreshList() {
                    this.retrieveCarts();
                },
            },
            mounted() {
                this.refreshList();
            },
        };
    </script>
    <style scoped>
        
    </style>
    