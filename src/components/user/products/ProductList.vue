<template>
    <div class="container-fluid">
        <div class="row">
            <div class="d-flex justify-content-end align-items-center pe-4 mb-2">
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Bộ lọc</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div class="filters-panel">
                            <div class="filters-panel__wrapper">
                                <div class="zds-accordion-item" :class="{ 'zds-accordion-item--expanded': isExpandedSort }">
                                    <button class="zds-accordion-item__trigger" id="color-145" @click="toggleSort">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">Sắp
                                                    xếp</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedSort" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedSort" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item d-block">
                                            <div class="form-input filters-panel-group-item__value w-100"
                                                v-for="sort in sorts" :key="sort"
                                                :class="{ 'filters-panel-group-item__value--checked': sort.id === sortId }"
                                                @click="sortProducts(sort)">
                                                <div class="form-input__wrapper">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper checkbox-type">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" value="">
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__text">{{ sort.value
                                                            }}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item" :class="{ 'zds-accordion-item--expanded': isExpandedType }">
                                    <button class="zds-accordion-item__trigger" id="color-145" @click="toggleType">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span class="filters-panel__filter-name filters-panel__filter-name--highlight">
                                                    Thể Loại
                                                </span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedTypeIds.length }}</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedType" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedType" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item d-block">
                                            <div class="form-input filters-panel-group-item__value w-100"
                                                v-for="typ in types" :key="typ"
                                                :class="{ 'filters-panel-group-item__value--checked': isTypeSelected(typ.id) }"
                                                @click="typeProducts(typ)">
                                                <div class="form-input__wrapper">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper checkbox-type">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" 
                                                                :value="typ.id"
                                                                @change="typeProducts(typ)">
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__text">{{ typ.value }}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item" :class="{ 'zds-accordion-item--expanded': isExpandedColor }">
                                    <button class="zds-accordion-item__trigger" id="color-145" @click="toggleColor">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">MÀU
                                                    SẮC</span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedColorIds.length }}</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedColor" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedColor" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item">
                                            <div class="form-input filters-panel-group-item__value"
                                                v-for="color in colors"
                                                :key="color"
                                                :class="{ 'filters-panel-group-item__value--checked': isColorSelected(color.id) }"
                                                @click="colorProducts(color)"
                                            >
                                                <div class="form-input__wrapper">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" 
                                                                :value="color.id"
                                                                @change="colorProducts(color)"
                                                                >
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__item-box"
                                                                :style="`background-color: ${color.cls}`"></span>
                                                            <span class="filters-panel-group-item__text">{{ color.value
                                                            }}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item" :class="{ 'zds-accordion-item--expanded': isExpandedSize }">
                                    <button class="zds-accordion-item__trigger" id="color-145" @click="toggleSize">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">KÍCH
                                                    CỠ</span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedSizeIds.length }}</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedSize" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedSize" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-box">
                                            <div
                                                class="multi-size-selector multi-size-selector--4-columns filters-panel-group-box__value-selector">
                                                <div class="form__column" 
                                                    v-for="size in sizes" :key="size"
                                                    @click="sizeProducts(size)"
                                                >
                                                    <div class="form-input multi-size-selector__size"
                                                        :class="{ 'multi-size-selector__size--is-checked': isSizeSelected(size.id) }">
                                                        <div class="form-input__wrapper">
                                                            <label class="form-input-checkbox">
                                                                <div class="form-input-checkbox__input-wrapper">
                                                                    <input class="form-input-checkbox__input"
                                                                        type="checkbox" id="zds-165"
                                                                        name="size"
                                                                        data-qa-input-qualifier="size" 
                                                                        :value="size.id"
                                                                        @change="sizeProducts(size)"
                                                                        checked="">
                                                                </div>
                                                                <span class="form-input-checkbox__label">{{ size.value }}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item" :class="{ 'zds-accordion-item--expanded': isExpandedPrice }">
                                    <button class="zds-accordion-item__trigger" id="color-145" @click="togglePrice">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">Giá</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedPrice" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedPrice" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item d-block">
                                            <div class="double-range-slider__labels">
                                                <span class="min-price-label">{{ formatPrice(minPrice) }}</span>
                                                <span class="max-price-label">{{ formatPrice(maxPrice) }}</span>
                                            </div>
                                            <div class="double-range-slider" ref="slider">
                                                <div class="double-range-slider__slider">
                                                    <div class="double-range-slider__bar"
                                                        :style="`background: linear-gradient(90deg, #ccc 0px, #ccc ${minKnob}px, #000 ${minKnob}px, #000 ${maxKnob}px, #ccc ${maxKnob}px);`">
                                                    </div>
                                                    <button ref="minKnob" type="button" class="double-range-slider__knob"
                                                        :style="`transform: translate(${minKnob}px, -50%);`"
                                                        @mousedown="startDrag($event, 'min')"></button>
                                                    <button ref="maxKnob" type="button" class="double-range-slider__knob"
                                                        :style="`transform: translate(${maxKnob}px, -50%);`"
                                                        @mousedown="startDrag($event, 'max')"></button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="filters-panel__buttons">
                                <button class="filters-panel__buttons-results" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <span>Xem kết quả</span> {{ filteredProductsCount }}
                                </button>
                                <button class="filters-panel__buttons-clear" @click="clearFiltered()">
                                    <span>Xóa</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="filters__button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <span class="filters__button-title">
                        <span>Bộ lọc</span></span>
                </button>
                <button class="category-zoom-selector__button" @click="changeGrid()">
                    <div class="category-zoom-selector__icon category-zoom-selector__icon1"></div>
                    <div class="category-zoom-selector__icon category-zoom-selector__icon1"></div>
                    <div class="category-zoom-selector__icon category-zoom-selector__icon2"></div>
                    <div class="category-zoom-selector__icon category-zoom-selector__icon2"></div>
                </button>
            </div>
        </div>
        <div :class="[{ 'grid2': clickCount === 2 }, { 'grid1 container': clickCount === 1 }]">
            <div v-if="filteredProductsCount">
                <div class="row">
                    <div :class="[{ 'col-lg-2 col-md-3 col-6': clickCount === 2 },
                    { 'col-lg-3 col-md-4 col-12': clickCount === 1 || clickCount === 0 }]"
                        v-for="(product, index) in displayedProducts" :key="product">
                        <div class="single-product" :class="{ 'disabled': product.deleted_at }">
                            <div class="product-image">
                                <router-link :to="{
                                    name: 'product.detail',
                                    params: { id: product.id },
                                }">
                                    <img :src="getImage(product.image)" alt="#" />
                                </router-link>
                                <span v-if="product.discount_percent > 0" class="sale-tag">
                                    SALE
                                </span>
                                <div class="product-item__favorite">
                                    <span class="product-item__favorite-item"><i class="bi bi-heart"></i></span>
                                </div>
                                <div class="button">
                                    <a v-if="product.deleted_at" href="" class="btn"><i class="fa fa-cart"></i>Ngừng kinh
                                        doanh</a>
                                    <a v-else @click="addToCart(product)" class="btn"><i class="fa fa-cart"></i>Thêm vào giỏ
                                        hàng</a>
                                </div>
                            </div>
                            <router-link :to="{
                                name: 'product.detail',
                                params: { id: product.id },
                            }">
                                <div class="product-info">
                                    <span class="category">{{ product.category }}</span>
                                    <h4 class="title">
                                        <a href="#">{{ product.name }}</a>
                                    </h4>
                                    <ul class="review">
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><span>5.0 Review(s)</span></li>
                                    </ul>
                                    <div class="price">
                                        <span>
                                            {{ formatPrice(product.final_price) }} VNĐ
                                        </span>
                                        <span class="text-decoration-line-through float-end text-secondary"
                                            v-if="product.discount_percent > 0">
                                            {{ formatPrice(product.price) }} VNĐ
                                        </span>
                                    </div>
                                </div>
                            </router-link>
                            <div class="product-item__type">
                                <span v-if="product.type === 'Thông thường'">Thông thường</span>
                                <span v-if="product.type === 'Sản phẩm Cao cấp'">Cao cấp</span>
                                <span v-if="product.type === 'Phiên bản giới hạn'">Giới hạn</span>
                                <span v-if="product.type === 'Sản phẩm Thiết kế'">Thiết kế</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center">Không có sản phẩm nào.</p>
            </div>
        </div>
    </div>
    <div class="me-3 mt-5">
        <div class="row">
            <div class="col-12">
                <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage = 1">
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage--">
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li v-if="currentPage > maxVisibleButtons / 2 + 1" class="page-item disabled">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" v-for="pageNumber in visiblePageButtons" :key="pageNumber"
                        :class="{ active: currentPage === pageNumber }">
                        <a class="page-link" href="#" @click.prevent="currentPage = pageNumber">{{ pageNumber }}</a>
                    </li>
                    <li v-if="currentPage < totalPages - maxVisibleButtons / 2" class="page-item disabled">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage = totalPages">
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
import CartService from "@/services/user/cart.service";
import { mapGetters } from 'vuex';
import $ from 'jquery'

export default {
    components: {
    },
    props: {
        products: { type: Object, required: true },
    },
    data() {
        return {
            products: this.products,
            currentPage: 1,
            itemsPerPage: 16,
            sortId: 1,
            selectedTypeIds: [],
            selectedTypeValues: [],
            selectedSizeIds: [],
            selectedSizeValues: [],
            selectedColorIds: [],
            selectedColorValues: [],
            cart: {
                'product_id': this.id,
                'size': "",
                'quantity': 1,
            },
            maxVisibleButtons: 2,
            clickCount: 0,
            isExpandedType: false,
            isExpandedColor: true,
            isExpandedSize: true,
            isExpandedPrice: true,
            isExpandedSort: false,
            sorts: [
                { 'id': 1, 'value': 'Mặc định' },
                { 'id': 2, 'value': 'Giá thấp đến cao' },
                { 'id': 3, 'value': 'Giá cao đến thấp' },
                { 'id': 4, 'value': 'Tên A đến Z' },
                { 'id': 5, 'value': 'Tên Z đến A' }
            ],
            types: [
                { 'id': 1, 'value': 'Thông thường' },
                { 'id': 2, 'value': 'Sản phẩm Cao cấp' },
                { 'id': 3, 'value': 'Phiên bản giới hạn' },
                { 'id': 4, 'value': 'Sản phẩm Thiết kế' }
            ],
            colors: [
                { 'id': 1, 'value': 'Màu trắng', 'cls': '#fff' },
                { 'id': 2, 'value': 'Màu xám', 'cls': '#c6c4bf' },
                { 'id': 3, 'value': 'Màu be', 'cls': '#d0be95' },
                { 'id': 4, 'value': 'Màu vàng', 'cls': '#f8dd58' },
                { 'id': 5, 'value': 'Màu cam', 'cls': 'ec8a4d' },
                { 'id': 6, 'value': 'Màu đỏ', 'cls': '#e93224' },
                { 'id': 7, 'value': 'Màu hồng', 'cls': '#e46eb5' },
                { 'id': 8, 'value': 'Màu tím', 'cls': '#894fa5' },
                { 'id': 9, 'value': 'Xanh lục', 'cls': '#61882d' },
                { 'id': 10, 'value': 'Xanh dương', 'cls': '#3472a9' },
                { 'id': 11, 'value': 'Màu nâu', 'cls': '#683f20' },
                { 'id': 12, 'value': 'Màu đen', 'cls': '#000' }
            ],
            sizes: [
                { 'id': 1, 'value': 'XS' },
                { 'id': 2, 'value': 'S' },
                { 'id': 3, 'value': 'M' },
                { 'id': 4, 'value': 'L' },
                { 'id': 5, 'value': 'XL' },
                { 'id': 6, 'value': 'XXL' }
            ],
            minPrice: 3000000,
            maxPrice: 150000000,
            minKnob: 0,
            maxKnob: 350,
        };
    },
    computed: {
        ...mapGetters(['getUser']),
        filteredProducts() {
            let filtered = [...this.products];

            // Lọc loại sản phẩm
            if(this.selectedTypeValues.length!=0) {
                filtered = filtered.filter(item =>
                    Object.values(this.selectedTypeValues).some(value =>
                        item.type.toLowerCase().includes(value.toLowerCase())
                    )
                );
            }

            if (this.selectedSizeValues.length != 0) {
                filtered = filtered.filter(item =>
                    item.sizes.some(index =>
                        Object.values(this.selectedSizeValues).some(value =>
                            index.size_name.toLowerCase().includes(value.toLowerCase())
                        )
                    )
                );
            }

            if (this.selectedColorValues.length != 0) {
                filtered = filtered.filter(item =>
                    Object.values(this.selectedColorValues).some(value =>
                        item.color.toLowerCase().includes(value.toLowerCase())
                    )
                );
            }

            // Lọc theo minPrice và maxPrice
            filtered = filtered.filter(item =>
                item.final_price >= this.minPrice && item.final_price <= this.maxPrice
            );

            return filtered;
        },
        sortedProducts() {
            let sorted = [...this.filteredProducts];

            if (this.sortId === 2) {
                sorted.sort((a, b) => a.final_price - b.final_price);
            } else if (this.sortId === 3) {
                sorted.sort((a, b) => b.final_price - a.final_price);
            } else if (this.sortId === 4) {
                sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortId === 5) {
                sorted.sort((a, b) => b.name.localeCompare(a.name));
            }

            return sorted;
        },
        filteredProductsCount() {
            return this.sortedProducts.length;
        },
        totalPages() {
            return Math.ceil(this.filteredProductsCount / this.itemsPerPage);
        },
        displayedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.sortedProducts.slice(start, end);
        },
        visiblePageButtons() {
            const totalPages = this.totalPages;
            const currentPage = this.currentPage;
            const maxVisibleButtons = this.maxVisibleButtons;

            if (totalPages <= maxVisibleButtons) {
                // Nếu tổng số trang nhỏ hơn hoặc bằng số lượng nút hiển thị tối đa
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            } else {
                const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);
                let start, end;

                if (currentPage <= halfVisibleButtons) {
                    // Trang hiện tại nằm ở phần đầu của danh sách nút
                    start = 1;
                    end = maxVisibleButtons;
                } else if (currentPage >= totalPages - halfVisibleButtons) {
                    // Trang hiện tại nằm ở phần cuối của danh sách nút
                    start = totalPages - maxVisibleButtons + 1;
                    end = totalPages;
                } else {
                    // Trang hiện tại nằm ở phần giữa của danh sách nút
                    start = currentPage - halfVisibleButtons;
                    end = currentPage + halfVisibleButtons;
                }

                const buttons = Array.from({ length: end - start + 1 }, (_, i) => i + start);
                return buttons;
            }
        },
    },
    methods: {
        sortProducts(sort) {
            this.sortId = sort.id;
        },
        typeProducts(typ) {
            const index = this.selectedTypeIds.indexOf(typ.id);
            if (index === -1) {
                // Nếu typ.id chưa tồn tại trong mảng, thêm nó vào
                this.selectedTypeIds.push(typ.id);
                this.selectedTypeValues.push(typ.value);
            } else {
                // Ngược lại, loại bỏ typ.id khỏi mảng
                this.selectedTypeIds.splice(index, 1);
                this.selectedTypeValues.splice(index, 1);
            }
        },
        sizeProducts(size) {
            const index = this.selectedSizeIds.indexOf(size.id);
            if (index === -1) {
                // Nếu size.id chưa tồn tại trong mảng, thêm nó vào
                this.selectedSizeIds.push(size.id);
                this.selectedSizeValues.push(size.value);
            } else {
                // Ngược lại, loại bỏ size.id khỏi mảng
                this.selectedSizeIds.splice(index, 1);
                this.selectedSizeValues.splice(index, 1);
            }
        },
        colorProducts(color) {
            const index = this.selectedColorIds.indexOf(color.id);
            if (index === -1) {
                // Nếu color.id chưa tồn tại trong mảng, thêm nó vào
                this.selectedColorIds.push(color.id);
                this.selectedColorValues.push(color.value);
            } else {
                // Ngược lại, loại bỏ color.id khỏi mảng
                this.selectedColorIds.splice(index, 1);
                this.selectedColorValues.splice(index, 1);
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
        },
        formatPrice(price) {
            return price.toLocaleString("vi-VN") + " VNĐ";
        },
        async addToCart(product) {
            this.cart.product_id = product.id;
            this.cart.size = product.sizes[0].size_id;
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
            try {
                if (this.getUser) {
                    await CartService.create(this.getUser.id, this.cart).then(async (response) => {
                        if (response == true) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Sản phẩm đã được thêm vào giỏ hàng.'
                            });
                            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id, this.cart.id));

                        } else if (response == false) {
                            Toast.fire({
                                icon: 'warning',
                                title: 'Số lượng của sản phẩm này đã được bán hết.'
                            });
                        }
                        console.log(response);
                    });
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Bạn phải là thành viên.'
                    });
                    this.$router.push({ name: "login" });
                }
            } catch (error) {
                console.log(error.response.data);
            }
        },
        changeGrid() {
            var icon1Elements = document.getElementsByClassName('category-zoom-selector__icon1');
            var icon2Elements = document.getElementsByClassName('category-zoom-selector__icon2');

            this.clickCount++;

            if (this.clickCount === 1) {
                // Click lần 1: Chỉ có 2 div đen
                for (var i = 0; i < icon1Elements.length; i++) {
                    icon1Elements[i].classList.add('bg-dark');
                }

                for (var i = 0; i < icon2Elements.length; i++) {
                    icon2Elements[i].classList.remove('bg-dark');
                }
            } else if (this.clickCount === 2) {
                // Click lần 2: Cả 4 div đều đen
                for (var i = 0; i < icon1Elements.length; i++) {
                    icon1Elements[i].classList.add('bg-dark');
                }

                for (var i = 0; i < icon2Elements.length; i++) {
                    icon2Elements[i].classList.add('bg-dark');
                }
            } else if (this.clickCount === 3) {
                // Click lần 3: Cả 4 div đều trắng
                for (var i = 0; i < icon1Elements.length; i++) {
                    icon1Elements[i].classList.remove('bg-dark');
                }

                for (var i = 0; i < icon2Elements.length; i++) {
                    icon2Elements[i].classList.remove('bg-dark');
                }

                this.clickCount = 0; // Đặt lại biến đếm về 0
            }
        },
        toggleType() {
            this.isExpandedType = !this.isExpandedType;
        },
        isTypeSelected(selectedTypeIds) {
            return this.selectedTypeIds.includes(selectedTypeIds);
        },
        toggleColor() {
            this.isExpandedColor = !this.isExpandedColor;
        },
        isColorSelected(selectedColorIds) {
            return this.selectedColorIds.includes(selectedColorIds);
        },
        toggleSize() {
            this.isExpandedSize = !this.isExpandedSize;
        },
        isSizeSelected(selectedSizeIds) {
            return this.selectedSizeIds.includes(selectedSizeIds);
        },
        togglePrice() {
            this.isExpandedPrice = !this.isExpandedPrice;
        },
        toggleSort() {
            this.isExpandedSort = !this.isExpandedSort;
        },
        startDrag(event, knob) {
            event.preventDefault();
            window.addEventListener('mousemove', this.handleDrag);
            window.addEventListener('mouseup', this.stopDrag);

            this.knobBeingDragged = knob;
        },
        handleDrag(event) {
            const sliderWidth = this.$refs.slider.offsetWidth;
            const sliderLeft = this.$refs.slider.getBoundingClientRect().left;
            const position = event.clientX - sliderLeft;

            if (this.knobBeingDragged === 'min') {
                this.minKnob = Math.max(0, Math.min(position, this.maxKnob));
            } else if (this.knobBeingDragged === 'max') {
                this.maxKnob = Math.max(this.minKnob, Math.min(position, sliderWidth));
            }

            this.updatePrices();

        },
        stopDrag() {
            window.removeEventListener('mousemove', this.handleDrag);
            window.removeEventListener('mouseup', this.stopDrag);
        },
        updatePrices() {
            const sliderWidth = this.$refs.slider.offsetWidth;
            const priceRange = 150000000 - 3000000;
            this.minPrice = Math.round((this.minKnob / sliderWidth) * priceRange) + 3000000;
            this.maxPrice = Math.round((this.maxKnob / sliderWidth) * priceRange) + 3000000;
        },
        clearFiltered() {
            this.selectedTypeIds = [];
            this.selectedTypeValues = [];
            this.selectedSizeIds = [];
            this.selectedSizeValues = [];
            this.selectedColorIds = [];
            this.selectedColorValues = [];
            this.minPrice = 3000000;
            this.maxPrice = 150000000;
            this.sortId = 1;
            this.minKnob = 0;
            this.maxKnob = 350;
        },
    },
};
</script>
