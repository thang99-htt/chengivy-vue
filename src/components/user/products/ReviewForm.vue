<template>
    <Form
        @submit="submitReview"
        :validation-schema="reviewFormSchema"
    > 
        <div 
            v-for="(product, index) in productsList"
            :key="product.product_id"
            @click="setCurrentProductIndex(index)"
        >
            <div class="d-flex">
                <img class="d-block me-3" width="70" :src="getImage(product.product_image)" alt="">
                <div>
                    <router-link 
                        :to="{
                            name: 'product.detail',
                            params: { id: product.product_id },
                        }" 
                        class="text-dark"
                    >
                        {{ product.product_name }}
                    </router-link>
                    <p>Size: {{ product.product_size }}</p>
                    <p>x{{ product.product_quantity }}</p>
                    <p>{{ formatPrice(product.product_price) }}</p>
                </div>
            </div>
            <div class="form-group">
                <div class="d-flex align-items-center">
                    <label for="rate">Chất lượng sản phẩm</label>
                    <ul class="review ms-3">
                        <li v-for="i in 5" :key="i" @click="setRating(i, index)">
                            <i v-if="i <= rates[index]" class="fa fa-star"></i>
                            <i v-else class="bi bi-star"></i>
                        </li>
                        <li v-for="(label, index) in ratingLabels" :key="index">
                            <span v-if="index + 1 === rating">{{ label }}</span>
                        </li>
                    </ul>
                </div>
                <ErrorMessage name="rate" class="error-feedback" />
            </div>
            <div class="form-group text-center">
                <textarea 
                    id="contents" name="contents" @change="handleTextInput" cols="80" rows="6" 
                    placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                ></textarea>
            </div>
            <div class="form-group">
                <div class="d-flex justify-content-center">
                    <label for="image" class="me-2">Thêm hình ảnh</label>
                    <input type="file" id="images" name="images[]" multiple @change="handleFileInput">
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success float-end">Hoàn thành</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import {mapGetters} from 'vuex';
    import { formatPrice, getImage } from '@/utils';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:reviews"],
        props: {
            reviews: { type: Object, required: true },
            selectedPurchase: { type: Object, required: true },
        },
        data() {
            const reviewFormSchema = yup.object().shape({
                // address_city: yup
                // .string()
                // .required("Tỉnh/Thành phố phải được chọn."),
                // phone: yup
                // .string()
                // .required("Số điện thoại phải có giá trị.")
                // .matches(
                //     /((09|03|07|08|05)+([0-9]{8})\b)/g,
                //     "Số điện thoại không hợp lệ."
                // ),
                // address: yup
                // .string()
                // .required("Địa chỉ phải có giá trị."),
            });
            return {
                reviewFormSchema,
                reviewLocal: this.reviews,
                productsList: this.selectedPurchase,
                rating: 0,
                ratingLabels: ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'],
                review: {
                    'product_id': "",
                    'user_id': "",
                    'content': "",
                    'rate': 0,
                    'images': []
                },
                contents: [],
                images: [],
                rates: [],
                currentProductIndex: null,
            };
        },
        methods: {
            submitReview() {
                this.reviewLocal.review = [];
                const minLen = Math.min(this.productsList.length, this.contents.length, this.rates.length, this.images.length);
                console.log(this.images)
                for (let i = 0; i < minLen; i++) {
                    const review = {
                    'product_id': this.productsList[i].product_id,
                    'user_id': this.getUser.id,
                    'content': this.contents[i],
                    'rate': this.rates[i],
                    'images': this.images[i]
                    };
                    this.reviewLocal.review.push(review);
                }

                this.$emit("submit:reviews", this.reviewLocal);
            },
            handleFileInput(event) {
                this.images[this.currentProductIndex] = [];
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    this.images[this.currentProductIndex].push(file.name);

                    // const reader = new FileReader();
                    // reader.readAsDataURL(file);
                    // reader.onload = () => {
                    //     this.images[this.currentProductIndex].push(reader.result);
                    // };
                }
            },
            handleTextInput(event) {
                const inputElement = event.target;
                const inputValue = inputElement.value;
                this.contents.push(inputValue);    

            },            
            setRating(rating, index) {
                this.rating = rating;
                this.rates.push(rating);

            },
            getImage,
            formatPrice,
            setCurrentProductIndex(index) {
                this.currentProductIndex = index;
            },
        },
        created() {
            this.productsList.forEach(product => {
                const images = [];
                product.images = images;
                // this.images[product.product_id] = images;
            });
        },
        computed: {
            ...mapGetters(['getUser']),
        }
    };
</script>

<style scoped>
    .review i {
        color: #fecb00;
        font-size: 24px;
    }
    .review li {
        display: inline-block;
        margin: 2px;
    }
</style>
