<template>
    <div class="modal d-block widden">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="productID">Cập nhật sản phẩm</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm sản phẩm</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="product" class="box box-info">
                        <div class="box-body">
                            <ProductForm :product="product" @submit:product="submitProduct" :reset="reset" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductForm from "./ProductForm.vue";
import ProductService from "@/services/admin/product.service";

export default {
    props: {
        modalProduct: { type: Boolean, required: true },
        productID: { type: Number, required: true },
    },
    components: {
        ProductForm,
    },
    data() {
        return {
            product: {
                'category_id': "",
                'brand_id': "",
                'name': "",
                'description': "",
                'price': "",
                'price_final': "",
                'discount_percent': "",
                'images': []
            },
        };
    },
    watch: {
        'product.discount_percent': {
            handler(newDiscount, oldDiscount) {
                if(newDiscount) {
                    this.product.price_final = this.product.price - (this.product.price * newDiscount) / 100;
                }
            },
            immediate: true
        }
    },
    methods: {
        async getProduct() {
            if (this.productID) {
                await ProductService.getDetail(this.productID).then((response) => {
                    this.product = response;
                    this.product.role_id = [];
                    response.roles.forEach(index => {
                        this.product.role_id.push(index.id)
                    })
                });
            }
        },
        async submitProduct(data) {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
            if (this.productID) {
                try {
                    await ProductService.update(this.product.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được cập nhật thành công.'
                    });
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await ProductService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được thêm thành công.'
                    });
                    this.reset();
                    this.$parent.refreshList();
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
        reset() {
            
        },
    },
    mounted() {
        this.getProduct();
    },
};
</script>
