<template>
    <BrandModal v-if="modalBrand" :showModal="showModal" @closeModal="closeModal"/>
    <CategoryModal v-if="modalCategory" :showModal="showModal" @closeModal="closeModal"/>
    <Form
        @submit="submitProduct"
        :validation-schema="productFormSchema"
    >
        <div class="row">
            <div class="col-6">
                <h4>Thông tin</h4>
                <div class="form-group">
                    <label for="name">Tên sản phẩm
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="productLocal.name"
                    />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="description">Mô tả
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        class="form-control" 
                        as="textarea" 
                        name="description" 
                        v-model="productLocal.description" rows="4" />
                    <ErrorMessage name="description" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="price">Giá Bán
                        <span class="error-feedback">*</span>
                    </label>
                    <Field
                        name="price"
                        type="number"
                        class="form-control"
                        v-model="productLocal.price"
                    />
                    <ErrorMessage name="price" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="discount_percent">Phần trăm giảm giá</label>
                    <Field
                        name="discount_percent"
                        type="number"
                        class="form-control"
                        v-model="productLocal.discount_percent"
                    />
                    <ErrorMessage name="discount_percent" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="price_final">Giá sau khi giảm</label>
                    <Field
                        name="price_final"
                        type="number"
                        class="form-control"
                        v-model="productLocal.price_final"
                    />
                    <ErrorMessage name="price_final" class="error-feedback" />
                </div>
                <div class="form-group">
                    <input type="submit" name="btnSave" value="Thực hiện">
                    <input type="button" name="btnDelete" value="Xóa" v-if="productLocal.id">
                    <input type="button" name="btnBack" value="Hủy" v-else @click="reset">
                </div>
            </div>
            <div class="col-6">
                <h4>Phân loại</h4>
                <div class="form-group">
                    <label for="city">Danh mục
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="aselect" :data-value="value" :data-list="categories">
                        <div class="plus" @click="openModalCategory">
                            <i class="fa fa-plus" data-bs-toggle="tooltip" 
                            data-bs-placement="top" title="Thêm danh mục"></i>
                        </div>
                        <div class="selector" @click="visible1 = !visible1">
                            <div class="label">
                                    <span>{{ selectedCategory }}</span>
                            </div>
                            <div class="arrow1" :class="{ expanded : visible1 }"></div>
                            <div :class="{ hidden : !visible1, visible1 }">
                                <div class="selector-container">
                                    <ul>
                                        <li 
                                            :class="{ current : category.name === selectedCategory }" 
                                            v-for="(category, index) in categories" 
                                            :key="category.id" :value="category.id" 
                                            @click.stop="selectOptionCategory(category)"
                                        >
                                            {{ category.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="form-group">
                    <label for="city">Thương hiệu
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="aselect" :data-value="value" :data-list="brands">
                        <div class="plus" @click="openModalBrand">
                            <i class="fa fa-plus" data-bs-toggle="tooltip" 
                            data-bs-placement="top" title="Thêm thương hiệu"></i>
                        </div>
                        <div class="selector" @click="visible = !visible">
                            <div class="label">
                                    <span>{{ selectedBrand }}</span>
                            </div>
                            <div class="arrow1" :class="{ expanded : visible }"></div>
                            <div :class="{ hidden : !visible, visible }">
                                <div class="selector-container">
                                    <ul>
                                        <li 
                                            :class="{ current : brand.name === selectedBrand }" 
                                            v-for="(brand, index) in brands" 
                                            :key="brand.id" :value="brand.id" 
                                            @click.stop="selectOptionBrand(brand)"
                                        >
                                            {{ brand.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                <h4 class="mt-5">Ảnh sản phẩm</h4>
                <div class="form-group">
                    <label for="image">Chọn màu sắc
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="info-color">
                        <span v-for="(color, index) in colors" :key="color"
                            class="filters-panel-group-item__item-box circle" 
                            :style="`background-color: ${color.color}`"
                            :class="{'active': Object.values(productLocal.images).some(item => item.color_id == color.id)}"
                            @click="changeColor(color)"
                        >
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <table class="table table-stripe">
                        <thead>
                            <tr>
                                <th width="30%">Màu Sắc</th>
                                <th width="60%">Hình ảnh</th>
                                <th width="10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in productLocal.images" :key="item">
                                <td>
                                    <div class="info-color d-flex align-items-center">
                                        <span class="name">{{ item.color_name }}</span>
                                        <span
                                            class="filters-panel-group-item__item-box circle" 
                                            :style="`background-color: ${item.color}`"
                                        ></span>
                                    </div>    
                                </td>
                                <td>
                                    <div class="form-group mb-0">
                                        <div>
                                            <Field 
                                                name="images"
                                                type="file"
                                                class="form-control frm-file"
                                                accept="image/*"
                                                @change="onFileChange(item.color_id, $event)"
                                                multiple
                                                v-model="productLocal.image"
                                            />
                                        </div>
                                        <div v-if="item.items">
                                            <span v-for="image in item.items" :key="image">
                                                <img
                                                    :src="image.image" 
                                                    alt="Hình ảnh" class="img-edit img-responsive center-block me-2">
                                            </span>
                                        </div>
                                        <ErrorMessage name="images" class="error-feedback" />
                                    </div>
                                </td>
                                <td>
                                    <a class="remove-color" @click="removeColor(item.color_id)">Xóa</a>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot v-if="productLocal.images.length === 0">
                            <tr>
                                <th colspan="3" class="fw-normal">Chưa có hình ảnh</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>        
    </Form>
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import CategoriesService from "@/services/admin/category.service";
    import ProductService from "@/services/admin/product.service";
    import BrandsService from "@/services/admin/brand.service";
    import BrandModal from "@/components/admin/brands/BrandModal.vue";
    import CategoryModal from "@/components/admin/categories/CategoryModal.vue";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            BrandModal,
            CategoryModal
        },
        emits: ["submit:product", "delete:product"],
        props: {
            product: { type: Object, required: true },
        },
        async mounted() {
            this.categories = await CategoriesService.getAll();
            this.brands = await BrandsService.getAll();
            this.colors = await ProductService.getColorAll();

            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })

            if(this.productLocal.category) {
                this.selectedCategory = this.productLocal.category;
            }

            if(this.productLocal.brand) {
                this.selectedBrand = this.productLocal.brand;
            }
        },
        data() {
            const productFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Vui lòng nhập tên sản phẩm.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                description: yup
                .string()
                .required("Vui lòng nhập mô tả sản phẩm.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(1000, "Mô tả có nhiều nhất 1000 ký tự."),
                price: yup
                .string()
                .max(7, "Giá bán nhiều nhất 7 chữ số.")
                .required("Vui lòng nhập giá bán."),
            });
            return {
                productLocal: this.product,
                productFormSchema,
                categories: [],
                brands: [],
                visible: false,
                visible1: false,
                selectedCategory: "---Chọn danh mục---",
                selectedBrand: "---Chọn thương hiệu---",
                showModal: false,
                modalBrand: false,
                modalCategory: false,
                colors: [],
            };
        },
        watch: {
            'product'(newValue) {
                this.productLocal = newValue;
            },
        },
        methods: {
            // onFileChange(event){
            //     let file = event.target.files[0];
            //     let reader = new FileReader();
            //     reader.onloadend = (file) => {
            //         this.productLocal.image = reader.result;
            //     }
            //     console.log(file);
            //     reader.readAsDataURL(file);
            // },
            onFileChange(colorId, event){
                const currentColorIndex = this.productLocal.images.findIndex(
                    imageColor => imageColor.color_id === colorId);
                let files = event.target.files;
                let reader;
                
                this.productLocal.images[currentColorIndex].items = [];
                for (let i = 0; i < files.length; i++) {
                    reader = new FileReader();
                    
                    reader.onload = (e) => {
                        this.productLocal.images[currentColorIndex].items.push({
                            image: e.target.result
                        });
                    };
                    
                    reader.readAsDataURL(files[i]);
                }   
            },
            submitProduct() {
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
                if(!this.productLocal.category_id) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Danh mục chưa được chọn.'
                    });
                } else if(!this.productLocal.brand_id) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Thương hiệu chưa được chọn.'
                    });
                } else if(this.productLocal.images.length == 0) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Hình ảnh chưa được thêm.'
                    });
                } else {
                    this.$emit("submit:product", this.productLocal);
                }
            },
            deleteProduct() {
                this.$emit("delete:product", this.productLocal.id);
            },
            reset () {
                this.productLocal.category_id = "";
                this.productLocal.name = "";
                this.productLocal.description = "";
                this.productLocal.price = "";
                this.productLocal.price_final = "";
                this.productLocal.brand_id = "";
                this.productLocal.discount_percent = "";
            },
            selectOptionCategory(category) {
                this.productLocal.category_id = category.id;
                this.selectedCategory = category.name;
                this.visible1 = false;
            },
            selectOptionBrand(brand) {
                this.productLocal.brand_id = brand.id;
                this.selectedBrand = brand.name;
                this.visible = false;
            },
            openModalCategory() {
                this.showModal = true;
                this.modalCategory = true;
            },
            openModalBrand() {
                this.showModal = true;
                this.modalBrand = true;
            },
            closeModal() {
                this.showModal = false;
                this.modalBrand = false;
                this.modalCategory = false;
            },
            async refreshList() {
                this.categories = await CategoriesService.getAll();
                this.brands = await BrandsService.getAll();
            },
            changeColor(color) {
                const index = this.productLocal.images.findIndex(
                    imageColor => imageColor.color_id === color.id);
                if (index === -1) {
                    this.productLocal.images.push({
                        color_id: color.id,
                        color_name: color.name,
                        color: color.color,
                        items: []
                    });
                } 
            },
            removeColor(id) {
                const index = this.productLocal.images.findIndex(
                    imageColor => imageColor.color_id == id);
                if (index !== -1) {
                    this.productLocal.images.splice(index, 1);
                } 
            }
        },
        computed: {
            datetime () {
                return new Date()
            }
        },
    };
</script>
<style scoped>
    .img-edit {
        width: 50px;
        margin: 10px 0 0 0;
    }
    .select {
        appearance: auto;
    }

    .info-color .name {
        width: 80px;
        font-size: 15px;
    }
    
    .remove-color {
        cursor: pointer;
    }
</style>