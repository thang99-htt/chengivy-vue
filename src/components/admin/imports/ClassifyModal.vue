<template>
    <div class="modal d-block widden">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Phân loại sản phẩm</h4>
                    <button type="button" class="btn-close" @click="closeModalClassify"></button>
                </div>
                <div class="modal-body">
                    <div class="box box-info">
                        <div class="box-body">
                            <Form @submit="submitPayment" :validation-schema="paymentFormSchema">
                                <div class="row">
                                    <div class="col-5">
                                        <div class="form-group">
                                            <div class="d-flex align-items-center">
                                                <img :src="currentProduct.product_image" width="100" height="100">
                                                <div class="ms-3 d-flex flex-column">
                                                    <span>{{  currentProduct.product_name }}</span>
                                                    <span>
                                                        Tổng số lượng đã nhập: {{ formattedPrice(currentProduct.quantity) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="image">Chọn màu sắc 
                                                <span class="error-feedback">*</span>
                                            </label>
                                            <div class="info-color">
                                                <span v-for="(color, index) in colors" :key="color"
                                                    class="filters-panel-group-item__item-box circle" 
                                                    :class="{'active': (selectedColor !== null && selectedColor.color_id === color.color_id)}"
                                                    :style="`background-color: ${color.color}`"
                                                    @click="changeColor(color)"
                                                >
                                                </span>
                                                <input class="btn-add__color" type="button" name="btnSave" value="Thêm màu" @click="openModalProduct">
                                            </div>
                                        </div>  
                                        <div class="form-group">
                                            <label for="image">Chọn kích cỡ 
                                                <span class="error-feedback">*</span>
                                            </label>
                                            <div class="zds-accordion-item__panel">
                                                <fieldset class="filters-panel-group-box">
                                                    <div
                                                        class="multi-size-selector multi-size-selector--4-columns filters-panel-group-box__value-selector">
                                                        <div class="form__column" v-for="size in sizes" :key="size"
                                                            @click="changeSize(size)">
                                                            <div class="form-input multi-size-selector__size"
                                                                :class="{ 'multi-size-selector__size--is-checked': selectedSizes.includes(size) }">
                                                                <div class="form-input__wrapper">
                                                                    <label class="form-input-checkbox">
                                                                        <div class="form-input-checkbox__input-wrapper">
                                                                            <input class="form-input-checkbox__input"
                                                                                type="checkbox" id="zds-165" name="size"
                                                                                data-qa-input-qualifier="size" :value="size.id"
                                                                                @change="changeSize(size)" checked="">
                                                                        </div>
                                                                        <span class="form-input-checkbox__label">{{ size.name
                                                                        }}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>  
                                        <div class="form-group mb-3">
                                            <input class="btn-add" type="button" name="btnSave" value="Thêm phân loại" @click.stop="addInventory">
                                        </div>
                                    </div>
                                    <div class="col-7">
                                        <div class="form-group">
                                            <table class="example1 dataTable">
                                                <thead>
                                                    <tr role="row">
                                                        <th width="6%">#</th>
                                                        <th width="30%">Màu sắc</th>
                                                        <th width="29%">Kích cỡ</th>
                                                        <th width="29%">Số lượng</th>
                                                        <th width="6%"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(inventory, index) in filteredInventories" :key="inventory">
                                                        <td>{{ index+1 }}</td>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <span
                                                                    class="filters-panel-group-item__item-box circle mb-0" 
                                                                    :style="`background-color: ${inventory.color}`"
                                                                >
                                                                </span>
                                                                <span>{{ inventory.color_name }}</span>
                                                            </div>
                                                        </td>
                                                        <td>{{ inventory.size_name }}</td>
                                                        <td>
                                                            <input type="text" 
                                                                :value="formattedPrice(inventory.quantity)" 
                                                                @input="updateQuantity(index, $event)"
                                                                @keypress="validateKeyPress"/>
                                                        </td>
                                                        <td>
                                                            <a class="remove-option" @click="removeInventory(inventory)">Xóa</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colspan="3" class="text-center text-bold">Tổng số lượng</th>
                                                        <th class="px-4">{{ calculatedTotalQuantity.toLocaleString() }}</th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <ProductModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :productID="productID"/>

</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ProductService from "@/services/admin/product.service";
import ProductModal from "@/components/admin/products/ProductModal.vue";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ProductModal
    },
    props: {
        stockReceivedDocketLocal: { type: Object, required: true },
        currentProduct: { type: Object, required: true }
    },
    data() {
        return {
            colors: [],
            sizes: [],
            selectedColor: null,
            selectedSizes: [],
            showModal: false,
            productID: null
        };
    },
    computed: {
        filteredInventories() {
            return this.stockReceivedDocketLocal.inventories.filter(
                inventory => inventory.product_id === this.currentProduct.product_id
            );
        },
        calculatedTotalQuantity() {
            let total = 0;
            for (const inventory of this.filteredInventories) {
                total += inventory.quantity;
            }
            return total;
        },
    },
    methods: {
        async getSizes() {
            try {
                this.sizes = await ProductService.getSizeAll();
            } catch (error) {
                console.log(error);
            } 
        },
        changeColor(color) {
            this.selectedColor = color;
        },
        changeSize(size) {
            if (this.selectedColor) {
                this.selectedSizes.push(size); // Add selected size to the array
            }
        },
        closeModalClassify() {
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
            if (this.calculatedTotalQuantity !== this.currentProduct.quantity) {
                Toast.fire({
                    icon: 'warning',
                    title: "Tổng số lượng không tương thích!"
                });
            } else {
                this.$emit('closeModal');
                this.showModal = false;
                this.productID = null;
            }
        },
        closeModal() {
            this.showModal = false;
        },
        addInventory() {
            if (this.selectedColor && this.selectedSizes.length > 0) {
                this.selectedSizes.forEach(size => {
                    // Check if the entry already exists
                    const existingEntry = this.stockReceivedDocketLocal.inventories.find(entry =>
                        entry.product_id == this.currentProduct.product_id &&
                        entry.color_id === this.selectedColor.color_id && 
                        entry.size_id === size.id
                    );

                    // Add the entry only if it doesn't already exist
                    if (!existingEntry) {
                        this.stockReceivedDocketLocal.inventories.push({
                            product_id: this.currentProduct.product_id,
                            color_id: this.selectedColor.color_id,
                            color_name: this.selectedColor.color_name,
                            color: this.selectedColor.color,
                            size_id: size.id,
                            size_name: size.name,
                            quantity: 0,
                        });
                    }
                });

                // Clear selections after pushing inventories
                this.selectedColor = null;
                this.selectedSizes = [];
            }
        },
        removeInventory(inventory) {
            const index = this.stockReceivedDocketLocal.inventories.findIndex(
                item =>
                    item.product_id === this.currentProduct.product_id &&
                    item.color_id === inventory.color_id &&
                    item.size_id === inventory.size_id
            );

            if (index !== -1) {
                this.stockReceivedDocketLocal.inventories.splice(index, 1);
            }
        },
        validateKeyPress(event) {
            // Allow only numeric characters and backspace
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        },
        updateQuantity(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.filteredInventories[index].quantity = parseFloat(newValue);
        },
        formattedPrice(value) {
            return value.toLocaleString();
        },
        async getProduct() {
            await ProductService.getDetail(this.currentProduct.product_id).then((response) => {
                this.colors = response.images;
            });
        },
        openModalProduct() {
            this.showModal = true;
            this.productID = this.currentProduct.product_id;
        }
    },
    mounted() {
        this.getSizes();
        this.getProduct();
    },
};
</script>
<style scoped>
    .btn-add {
        position: absolute;
        content: "";
        top: -40px;
        right: 0;
        padding: 6px 20px;
        text-align: center;
    }
    .btn-add__color {
        position: absolute;
        content: "";
        top: 10px;
        right: 0;
        padding: 6px 20px;
        text-align: center;
    }
    table {
        width: 100%;
        min-height: 60px;
    }
</style>