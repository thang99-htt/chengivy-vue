<template>
    <div class="container-fluid">
        <div class="row">
            <div class="d-flex justify-content-end align-items-center pe-4">
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
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedSort = !isExpandedSort">
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
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedCategory = !isExpandedCategory">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">Danh
                                                    mục</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedCategory" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedCategory" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item d-block">
                                            <div class="form-input filters-panel-group-item__value w-100"
                                                v-for="(category, index) in categories" :key="category"
                                                :class="{ 'filters-panel-group-item__value--checked': isCategorySelected(category.name) }"
                                                @click.stop="categoryProducts(category)">
                                                <div class="form-input__wrapper d-flex justify-content-between">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper checkbox-type">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" :value="category.id"
                                                                @change="categoryProducts(category)">
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__text">{{ category.name
                                                            }}</span>
                                                        </span>
                                                        <span
                                                            class="zds-accordion-item__icon-wrapper zds-accordion-item__icon-child-category"
                                                            v-if="category.childs.length > 0"
                                                            @click="category.isExpandedChild = !category.isExpandedChild">
                                                            <i v-if="category.isExpandedChild" class="bi bi-dash-lg"></i>
                                                            <i v-else class="bi bi-plus-lg"></i>
                                                        </span>
                                                    </label>
                                                </div>
                                                <ul v-show="category.isExpandedChild" class="inner-sub-category"
                                                    v-if="category.childs.length > 0">
                                                    <li v-for="(child, index) in category.childs" :key="child"
                                                        :class="{ 'filters-panel-group-item__value--checked': isCategorySelected(child.name) }"
                                                        @click.stop="categoryProducts(child); $event.stopPropagation()">
                                                        <div>
                                                            <div class="form-input-checkbox__input-wrapper checkbox-type">
                                                                <input class="form-input-checkbox__input" type="checkbox"
                                                                    id="color-146" name="colorPrinted"
                                                                    data-qa-input-qualifier="colorPrinted" :value="child.id"
                                                                    @change="categoryProducts(child)">
                                                            </div>
                                                            <span v-if="child.status == 1">
                                                                {{ child.name }}
                                                            </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedBrand = !isExpandedBrand">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">
                                                    Thương hiệu
                                                </span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedBrandIds.length
                                                }}</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedBrand" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedBrand" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item d-block">
                                            <div class="form-input filters-panel-group-item__value w-100"
                                                v-for="brand in brands" :key="brand"
                                                :class="{ 'filters-panel-group-item__value--checked': isBrandSelected(brand.id) }"
                                                @click="brandProducts(brand)">
                                                <div class="form-input__wrapper">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper checkbox-type">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" :value="brand.id"
                                                                @change="brandProducts(brand)">
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__text">{{
                                                                brand.name }}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedColor = !isExpandedColor">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">MÀU
                                                    SẮC</span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedColorIds.length
                                                }}</span>
                                            </span>
                                        </span>
                                        <span class="zds-accordion-item__icon-wrapper">
                                            <i v-if="isExpandedColor" class="bi bi-dash-lg"></i>
                                            <i v-else class="bi bi-plus-lg"></i>
                                        </span>
                                    </button>
                                    <div v-show="isExpandedColor" class="zds-accordion-item__panel">
                                        <fieldset class="filters-panel-group-item">
                                            <div class="form-input filters-panel-group-item__value" v-for="color in colors"
                                                :key="color"
                                                :class="{ 'filters-panel-group-item__value--checked': isColorSelected(color.id) }"
                                                @click="colorProducts(color)">
                                                <div class="form-input__wrapper">
                                                    <label class="form-input-checkbox">
                                                        <div class="form-input-checkbox__input-wrapper">
                                                            <input class="form-input-checkbox__input" type="checkbox"
                                                                id="color-146" name="colorPrinted"
                                                                data-qa-input-qualifier="colorPrinted" :value="color.id"
                                                                @change="colorProducts(color)">
                                                        </div>
                                                        <span class="form-input-checkbox__label">
                                                            <span class="filters-panel-group-item__item-box"
                                                                :style="`background-color: ${color.color}`"></span>
                                                            <span class="filters-panel-group-item__text">{{ color.name
                                                            }}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedSize != isExpandedSize">
                                        <span class="zds-accordion-item__title-text">
                                            <span>
                                                <span
                                                    class="filters-panel__filter-name filters-panel__filter-name--highlight">KÍCH
                                                    CỠ</span>
                                                <span class="filters-panel__filter-count ms-2">{{ selectedSizeIds.length
                                                }}</span>
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
                                                <div class="form__column" v-for="size in sizes" :key="size"
                                                    @click="sizeProducts(size)">
                                                    <div class="form-input multi-size-selector__size"
                                                        :class="{ 'multi-size-selector__size--is-checked': isSizeSelected(size.id) }">
                                                        <div class="form-input__wrapper">
                                                            <label class="form-input-checkbox">
                                                                <div class="form-input-checkbox__input-wrapper">
                                                                    <input class="form-input-checkbox__input"
                                                                        type="checkbox" id="zds-165" name="size"
                                                                        data-qa-input-qualifier="size" :value="size.id"
                                                                        @change="sizeProducts(size)" checked="">
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
                                <div class="zds-accordion-item">
                                    <button class="zds-accordion-item__trigger" id="color-145"
                                        @click="isExpandedPrice = !isExpandedPrice">
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
                                <button class="filters-panel__buttons-results" data-bs-dismiss="offcanvas"
                                    aria-label="Close">
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
                <div class="row mt-5">
                    <div :class="[{ 'col-lg-2 col-md-3 col-6': clickCount === 2 },
                    { 'col-lg-3 col-md-4 col-12': clickCount === 1 || clickCount === 0 }]"
                        v-for="(product, index) in displayedProducts" :key="product">
                        <div class="single-product" :class="{ 'disabled': product.deleted_at }">
                            <div class="product-image">
                                <router-link :to="{
                                    name: 'product.detail',
                                    params: { id: product.id },
                                }">
                                    <img :src="product.image" alt="#" />
                                </router-link>
                                <div class="product-item__favorite" @click="toggleFavorite(product)">
                                    <span class="product-item__favorite-item"
                                        :class="{ 'product-item__favorite-item-fill': favoriteProductIds.includes(product.id) }">
                                        <i class="bi"
                                            :class="favoriteProductIds.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                                    </span>
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
                                    <span class="category">{{ product.brand }}</span>
                                    <h4 class="title">
                                        <a href="#">{{ product.name }}</a>
                                    </h4>
                                    <div class="price">
                                        <span class="text-decoration-line-through text-secondary me-3"
                                            v-if="product.discount_percent > 0">
                                            {{ formatPrice(product.price) }}
                                        </span>
                                        <span :class="{ 'text-danger': product.discount_percent > 0 }">
                                            {{ formatPrice(product.price_final) }}
                                        </span>
                                    </div>
                                    <div class="color">
                                        <span v-for="(color, index) in getUniqueColors((product.images))" :key="color">
                                            <span
                                            class="filters-panel-group-item__item-box circle"
                                            :style="`background-color: ${color.color}`"
                                            >
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </router-link>
                            <div class="product-item__sale">
                                <span v-if="product.discount_percent > 0">GIẢM {{ product.discount_percent }}%</span>
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
    <div class="me-3">
        <div class="d-flex justify-content-end">
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
</template>

<script>
import CartService from "@/services/user/cart.service";
import FavoriteService from "@/services/user/favorite.service";
import CategoryService from "@/services/user/category.service";
import ProductService from "@/services/admin/product.service";
import BrandService from "@/services/admin/brand.service";
import { mapGetters } from 'vuex';
import { formatPrice } from '@/utils';

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
            selectedCategoryValues: [],
            selectedBrandIds: [],
            selectedBrandValues: [],
            selectedSizeIds: [],
            selectedSizeValues: [],
            selectedColorIds: [],
            selectedColorValues: [],
            cart: {
                'product_id': '',
                'quantity': 1,
            },
            favorite: {
                'product_id': '',
            },
            maxVisibleButtons: 2,
            clickCount: 0,
            isExpandedBrand: false,
            isExpandedColor: true,
            isExpandedSize: true,
            isExpandedPrice: true,
            isExpandedSort: false,
            isExpandedCategory: false,
            isExpandedChild: false,
            sorts: [
                { 'id': 1, 'value': 'Mới nhất' },
                { 'id': 2, 'value': 'Cũ nhất' },
                { 'id': 3, 'value': 'Tên A đến Z' },
                { 'id': 4, 'value': 'Tên Z đến A' },
                { 'id': 5, 'value': 'Giá thấp đến cao' },
                { 'id': 6, 'value': 'Giá cao đến thấp' },
            ],
            brands: [],
            colors: [],
            sizes: [],
            categories: [],
            minPrice: 0,
            maxPrice: 40000000,
            minKnob: 0,
            maxKnob: 340,
            category: this.$route.query.category,
            favoriteProductIds: []
        };
    },
    async created() {
        this.categories = await CategoryService.getCategory();
        this.sizes = await ProductService.getSizeAll();
        this.brands = await BrandService.getAll();
        this.colors = await ProductService.getColorAll();
        this.isFavorite();
    },
    watch: {
        $route(to, from) {
            const category = to.query.category || '';
            if (category !== this.category) {
                this.category = category;
                const index = this.selectedCategoryValues.indexOf(category.name);
                this.selectedCategoryValues.splice(index, 1);
            }
        }
    },
    computed: {
        ...mapGetters(['getUser']),
        filteredProducts() {
            this.currentPage = 1;

            let filtered = [...this.products];

            if (this.category) {
                this.selectedCategoryValues.push(this.category);
            }

            if (this.selectedCategoryValues.length != 0) {
                filtered = filtered.filter(item =>
                    (this.selectedCategoryValues).some(value =>
                        item.category.toLowerCase().includes(value.toLowerCase()) ||
                        (item.category_parent && item.category_parent.toLowerCase().includes(value.toLowerCase()))
                    )
                );
            }

            // Lọc thương hiệu sản phẩm
            if (this.selectedBrandValues.length != 0) {
                filtered = filtered.filter(item =>
                    (this.selectedBrandValues).some(value =>
                        item.brand.toLowerCase().includes(value.toLowerCase())
                    )
                );
            }

            if (this.selectedSizeValues.length != 0) {
                filtered = filtered.filter(item => {
                    return (item.inventories).some(index =>
                        (this.selectedSizeValues).some(value =>
                            index.items.some(item => 
                                item.size_name.toLowerCase().includes(value.toLowerCase())
                            )
                        )
                    )
                }
                );
            }

            if (this.selectedColorValues.length != 0) {
                filtered = filtered.filter(item =>
                    (item.images).some(index =>
                        (this.selectedColorValues).some(value =>
                            index.color_name.toLowerCase().includes(value.toLowerCase())
                        )
                    )
                );
            }

            // Lọc theo minPrice và maxPrice
            filtered = filtered.filter(item =>
                item.price_final >= this.minPrice && item.price_final <= this.maxPrice
            );
            return filtered;
        },
        sortedProducts() {
            let sorted = [...this.filteredProducts];
            if (this.sortId === 2) {
                sorted.sort((a, b) => a.created_at.localeCompare(b.created_at));
            } else if (this.sortId === 3) {
                sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortId === 4) {
                sorted.sort((a, b) => b.name.localeCompare(a.name));
            } else if (this.sortId === 5) {
                sorted.sort((a, b) => a.price_final - b.price_final);
            } else if (this.sortId === 6) {
                sorted.sort((a, b) => b.price_final - a.price_final);
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
        formatPrice,
        sortProducts(sort) {
            this.sortId = sort.id;
        },
        brandProducts(brand) {
            const index = this.selectedBrandIds.indexOf(brand.id);
            if (index === -1) {
                // Nếu brand.id chưa tồn tại trong mảng, thêm nó vào
                this.selectedBrandIds.push(brand.id);
                this.selectedBrandValues.push(brand.name);
            } else {
                // Ngược lại, loại bỏ brand.id khỏi mảng
                this.selectedBrandIds.splice(index, 1);
                this.selectedBrandValues.splice(index, 1);
            }
        },
        sizeProducts(size) {
            const index = this.selectedSizeIds.indexOf(size.id);
            if (index === -1) {
                // Nếu size.id chưa tồn tại trong mảng, thêm nó vào
                this.selectedSizeIds.push(size.id);
                this.selectedSizeValues.push(size.name);
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
                this.selectedColorValues.push(color.name);
            } else {
                // Ngược lại, loại bỏ color.id khỏi mảng
                this.selectedColorIds.splice(index, 1);
                this.selectedColorValues.splice(index, 1);
            }
        },
        categoryProducts(category) {
            const index = this.selectedCategoryValues.indexOf(category.name);
            if (index === -1) {
                // Nếu category chưa tồn tại trong mảng, thêm nó vào
                this.selectedCategoryValues.push(category.name);
            } else {
                // Ngược lại, loại bỏ category khỏi mảng
                this.selectedCategoryValues.splice(index, 1);
            }

            // Xóa giá trị truy vấn 'category' nếu danh sách danh mục đã chọn là rỗng
            if (this.selectedCategoryValues.length === 0) {
                this.$router.replace({ query: { ...this.$route.query, category: undefined } });
            }
        },
        isCategorySelected(selectedId) {
            const category = this.$route.query.category;
            return this.selectedCategoryValues.includes(selectedId) || category === selectedId;
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        async toggleFavorite(product) {
            this.favorite.product_id = product.id;
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
                    if (!this.favoriteProductIds.includes(product.id)) {
                        // Thêm vào yêu thích sản phẩm
                        await FavoriteService.create(this.getUser.id, this.favorite).then(async (response) => {
                            Toast.fire({
                                icon: response.success,
                                title: response.message
                            });
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id, this.favorite.id));
                        });
                    } else {
                        // Bỏ yêu thích sản phẩm
                        await FavoriteService.delete(this.getUser.id, product.id).then(async (response) => {
                            Toast.fire({
                                icon: response.success,
                                title: response.message
                            });
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id));
                        });
                    }

                    // Cập nhật trạng thái yêu thích
                    this.isFavorite();
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Bạn phải là thành viên.'
                    });
                    this.$router.push({ name: "login" });
                }

            } catch (error) {
                console.log(error);
            }

        },
        async addToCart(product) {
            this.cart.product_id = product.id;
            
            const getProduct = await ProductService.getDetail(product.id);
            const inventories = (getProduct.inventories)[0];
            const color = (getProduct.images)[0].color_id;
            let firstValidInventory = null;
            inventories.items.forEach((inventory) => {
                if (inventory.total_final > 0 && inventory.color_id == color && !firstValidInventory) {
                    firstValidInventory = inventory;
                }
            });
            
            this.cart.color_id = firstValidInventory.color_id;
            this.cart.size_id = firstValidInventory.size_id;

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
                        Toast.fire({
                            icon: response.success,
                            title: response.message
                        });
                        this.$store.commit('addToCart', await CartService.getCart(this.getUser.id, this.cart.id));
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
        isBrandSelected(selectedBrandIds) {
            return this.selectedBrandIds.includes(selectedBrandIds);
        },
        isColorSelected(selectedColorIds) {
            return this.selectedColorIds.includes(selectedColorIds);
        },
        isSizeSelected(selectedSizeIds) {
            return this.selectedSizeIds.includes(selectedSizeIds);
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
            const priceRange = 40000000 - 0;
            this.minPrice = Math.round((this.minKnob / sliderWidth) * priceRange) + 0;
            this.maxPrice = Math.round((this.maxKnob / sliderWidth) * priceRange) + 0;
        },
        clearFiltered() {
            this.selectedBrandIds = [];
            this.selectedBrandValues = [];
            this.selectedSizeIds = [];
            this.selectedSizeValues = [];
            this.selectedColorIds = [];
            this.selectedColorValues = [];
            this.minPrice = 0;
            this.maxPrice = 40000000;
            this.sortId = 1;
            this.minKnob = 0;
            this.maxKnob = 340;

            // Xóa giá trị truy vấn 'category'
            this.$router.replace({ query: { ...this.$route.query, category: undefined } });
            this.selectedCategoryValues = [];
        },
        async isFavorite() {
            if (this.getUser) {
                try {
                    let favoriteList = await FavoriteService.getFavorite(this.getUser.id);
                    this.favoriteProductIds = favoriteList.getFavoriteItems.map(item => item.product_id);
                    return true;
                } catch (error) {
                    console.error(error);
                }
            }
            return false;
        },
        getUniqueColors(images) {
            const uniqueColors = [];
            const colorsSet = new Set();
            for (const image of images) {
                if (!colorsSet.has(image.color)) {
                colorsSet.add(image.color);
                uniqueColors.push(image);
                }
            }
            return uniqueColors;
        },
    },
};
</script>
<style>
#offcanvasRight {
    overflow-y: scroll;
}
</style>