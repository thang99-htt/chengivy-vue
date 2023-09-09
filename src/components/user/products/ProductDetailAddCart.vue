<template>
    <Form @submit="submitCart">
        <div class="cart">
            <div class="info-size">
                <div class="d-flex justify-content-between">
                    <p class="size">
                        Size
                        <span class="error-feedback">*</span>
                    </p>
                    <p v-if="inventory" class="guide size-available">{{ inventory.total_final }} sản phẩm có sẵn</p>
                    <p v-else class="guide text-danger">Hết hàng</p>
                </div>
                <div class="multi-size-selector multi-size-selector--4-columns filters-panel-group-box__value-selector">
                    <div class="form__column" v-for="size in getUniqueSizes(product.inventories[0].items)" :key="size"
                        @click="sizeProducts(size)">
                        <div class="form-input multi-size-selector__size" :class="{
                            'multi-size-selector__size--is-checked': size.size_id == inventoryLocal.size_id,
                            'multi-size-selector__size--out-stock': getOutStock.includes(size.size_id)
                        }">
                            <div class="form-input__wrapper">
                                <label class="form-input-checkbox">
                                    <div class="form-input-checkbox__input-wrapper">
                                        <input class="form-input-checkbox__input" type="checkbox" name="size_id"
                                            :value="size.size_id" @change="sizeProducts(size)">
                                    </div>
                                    <span class="form-input-checkbox__label">{{ size.size_name }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="size-ruler">
                    <img src="/images/icon/icon-ruler.svg" alt="">
                    <span @click="modalSize = !modalSize">Hướng dẫn kích thước</span>
                </div>
            </div>
            <div class="info-quantity">
                <div class="d-flex align-items-end">
                    <p class="fw-bold">Số lượng</p>
                    <div class="number-input">
                        <a @click="reduce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                        </a>
                        <Field name="quantity" type="number" class="quantity" v-model="cartLocal.quantity" />
                        <a class="plus" @click="increase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="info-add">
                <div class="info-add__item">
                    <button class="btn bag" type="submit">Thêm vào giỏ hàng</button>
                </div>
                <div class="info-add__item">
                    <div class="btn wish" @click="toggleFavorite(product)">
                        <span class="product-item__favorite-item"
                            :class="{ 'product-item__favorite-item-fill': favoriteProductIds.includes(product.id) }">
                            <i class="bi"
                                :class="favoriteProductIds.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                        </span>
                        <span>Yêu thích</span>
                    </div>
                    <div class="btn checkout" @click="goToCheckout">Mua ngay</div>
                </div>
            </div>
        </div>
    </Form>

    <div class="modal d-block" v-if="modalSize">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Hướng dẫn kích thước</h4>
                    <button type="button" class="btn-close" @click="modalSize = !modalSize"></button>
                </div>
                <div class="modal-body">
                    <div class="box box-info">
                        <div class="size-ruler__info">
                            <div class="size-ruler__measure">
                                <h4 
                                    :class="{'active': checkOption == 1}"
                                    @click="checkOption = 1"
                                >Phép đo sản phẩm</h4>
                                <h4
                                    :class="{'active': checkOption == 2}"
                                @click="checkOption = 2"
                                >Phép đo cơ thể</h4>
                            </div>
                            <div class="size-ruler__guide">
                                <table class="table table-bordered" v-if="checkOption==1">
                                    <thead>
                                        <tr role="row">
                                            <th width="16%">Kích thước</th>
                                            <th width="18%">Chiều dài</th>
                                            <th width="22%">Kích thước mông</th>
                                            <th width="20%">Kích thước eo</th>
                                            <th width="24%">Kích thước ngực</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in measureProducts" :key="product">
                                            <td class="text-bold">{{ product.name }}</td>
                                            <td>{{ product.length }}</td>
                                            <td>{{ product.hipSize }}</td>
                                            <td>{{ product.waistSize }}</td>
                                            <td>{{ product.bustSize }}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered" v-if="checkOption==2">
                                    <thead>
                                        <tr role="row">
                                            <th width="20%">Kích thước</th>
                                            <th width="28%">Kích thước mông</th>
                                            <th width="25%">Kích thước eo</th>
                                            <th width="29%">Kích thước ngực</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(body, index) in measureBody" :key="body">
                                            <td class="text-bold">{{ body.name }}</td>
                                            <td>{{ body.hip }}</td>
                                            <td>{{ body.waist }}</td>
                                            <td>{{ body.bust }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="size-ruler__detail">
                                <p class="text-center text-secondary">**Tùy thuộc vào loại cơ thể của bạn và thói quen mặc quần áo, các kích thước trên chỉ mang tính tham khảo.</p>
                                <hr>
                                <div>
                                    <ul>
                                        <h4>Làm sao để đo cơ thể của bạn?</h4>
                                        <li>
                                            <strong><span>1</span> Bust của bạn:</strong> 
                                            <p>Đo chu vi trên phần đầy đủ nhất của bức tượng bán thân của bạn.</p>
                                        </li>
                                        <li>
                                            <strong><span>2</span> Eo của bạn:</strong> 
                                            <p>Đo vòng eo của bạn ở nơi gầy nhất.</p>
                                        </li>
                                        <li>
                                            <strong><span>3</span> Hông của bạn:</strong> 
                                            <p>Đo phần đầy đủ nhất của hông của bạn.</p>
                                        </li>
                                    </ul>
                                    <img src="/images/icon/body.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapGetters } from 'vuex';
import { showAlert } from '@/utils';
import ProductService from "@/services/user/product.service";
import FavoriteService from "@/services/user/favorite.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        product: { type: Object, required: true },
        cart: { type: Object, required: true },
        inventoryLocal: { type: Object, required: true },
        inventory: { type: Object, required: true },
        isColorSelected: { type: Object, required: true },
    },
    emits: ["submit:cart"],
    data() {
        return {
            productLocal: this.product,
            cartLocal: this.cart,
            favorite: {
                'product_id': '',
            },
            favoriteProductIds: [],
            getOutStock: [],
            modalSize: false,
            measureProducts: [
                {
                name: 'XS',
                    length: 118.00,
                    hipSize: 77.50,
                    waistSize: 56.50,
                    bustSize: 69.00
                },
                {
                name: 'S',
                    length: 120.00,
                    hipSize: 81.50,
                    waistSize: 60.50,
                    bustSize: 73.00
                },
                {
                name: 'M',
                    length: 122.00,
                    hipSize: 85.50,
                    waistSize: 64.50,
                    bustSize: 77.00
                },
                {
                name: 'L',
                    length: 124.00,
                    hipSize: 91.50,
                    waistSize: 70.50,
                    bustSize: 83.00
                }
            ],
            measureBody: [
                {
                name: 'XS',
                bust: '82-86',
                waist: '62-66',
                hip: '87-91'
                },
                {
                name: 'S',
                bust: '86-90',
                waist: '66-70',
                hip: '91-95'
                },
                {
                name: 'M',
                bust: '90-94',
                waist: '70-74',
                hip: '95-99'
                },
                {
                name: 'L',
                bust: '94-100',
                waist: '74-80',
                hip: '99-105'
                }
            ],
            checkOption: 1
        };
    },
    async created() {
        this.isFavorite();
        this.updateOutStock();
    },
    watch: {
        isColorSelected: {
            immediate: true, // Call the watcher immediately on component creation
            handler: function (newValue) {
                // Call the function to filter and update out-of-stock sizes whenever isColorSelected changes
                this.updateOutStock();
            },
        },
    },
    methods: {
        submitCart() {
            this.$emit("submit:cart", this.cartLocal);
        },
        reduce() {
            if (this.cartLocal.quantity > 1) this.cartLocal.quantity--;
        },
        increase() {
            this.cartLocal.quantity++;
        },
        async sizeProducts(size) {
            if (!this.getOutStock.includes(size.id)) {
                this.inventoryLocal.size_id = size.size_id;
                this.cartLocal.size_id = size.size_id;
                this.cartLocal.size_name = size.size_name;
            }
        },
        async toggleFavorite(product) {
            this.favorite.product_id = product.id;
            try {
                if (this.getUser) {
                    if (!this.favoriteProductIds.includes(product.id)) {
                        // Thêm vào yêu thích sản phẩm
                        await FavoriteService.create(this.getUser.id, this.favorite).then(async (response) => {
                            showAlert(response);
                            this.$store.commit('addToFavorite', await FavoriteService.getFavorite(this.getUser.id, this.favorite.id));
                        });
                    } else {
                        // Bỏ yêu thích sản phẩm
                        await FavoriteService.delete(this.getUser.id, product.id).then(async (response) => {
                            showAlert(response);
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
        goToCheckout() {
            this.$store.commit('addBuyNow', Object.assign({}, this.cartLocal, this.productLocal));
            this.$router.push({ name: "checkout" });
        },
        getUniqueSizes(sizes) {
            const uniqueSizes = [];
            const sizesSet = new Set();
            const selectedColorId = this.isColorSelected.color_id;

            for (const size of sizes) {
                if (size.color_id === selectedColorId && !sizesSet.has(size.size_name)) {
                    sizesSet.add(size.size_name);
                    uniqueSizes.push(size);
                }
            }

            return uniqueSizes;
        },
        filterByColor(inventories, color_id) {
            return inventories.filter(item => item.color_id === color_id);
        },
        updateOutStock() {
            this.getOutStock = [];
            const desiredColorId = this.isColorSelected.color_id; // Use the value of isColorSelected

            const filteredInventories = this.filterByColor(this.product.inventories[0].items, desiredColorId);

            filteredInventories.forEach(item => {
                if (item.total_final == 0) {
                    this.getOutStock.push(item.size_id);
                }
            });
        },
    },
    computed: {
        ...mapGetters(['getUser', 'productBuyNow']),
    },
};
</script>
<style scoped>
.select {
    appearance: auto;
}

.cart .info-size .multi-size-selector--4-columns .form__column {
    width: calc(14%);
}

.size-ruler {
    margin: 4px 0 20px 0;
}

.size-ruler span {
    margin-left: 8px;
    text-decoration: underline;
    color: #4b4b4b;
    cursor: pointer;
}
.size-ruler__measure {
    display: flex;
    justify-content: center;
}
.size-ruler__measure h4 {
    width: 200px;
    text-align: center;
    font-weight: 600;
    color: #6d6d6d;
    cursor: pointer;
    font-size: 22px;
}
.size-ruler__measure h4.active {
    color: #000;
    text-decoration: underline;
}
.size-ruler__guide {
    padding: 0 80px;
    margin-top: 10px;
}
.size-ruler__detail h4 {
    font-size: 20px;
}
.size-ruler__detail div {
    display: flex;
    justify-content: space-between;
}
.size-ruler__detail img {
    width: 180px;
}
.size-ruler__detail ul span {
    width: 24px;
    height: 24px;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    text-align: center;
}
.size-ruler__detail ul li {
    padding: 20px 20px 10px 20px;
}
</style>
