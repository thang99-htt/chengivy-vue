<template>
    <Form @submit="submitReview"> 
        <div 
            v-for="(purchase, index) in purchasesList"
            :key="purchase.product_id"
        >
            <div class="d-flex">
                <img class="d-block me-3" width="120" :src="purchase.image" alt="">
                <div>
                    <router-link 
                        :to="{
                            name: 'purchase.detail',
                            params: { id: purchase.id },
                        }" 
                        class="text-dark"
                    >
                        {{ purchase.product_name }}
                    </router-link>
                    <p>Màu sắc: {{ purchase.color }}</p>
                    <p>Size: {{ purchase.size }}</p>
                    <p>{{ purchase.quantity }} x {{ formatPrice(purchase.price) }}</p>
                </div>
            </div>
            <div class="form-group">
                <div class="d-flex align-items-center">
                    <label :for="'fitted_value_' + index">Phù hợp với tổng thể</label>
                    <div class="py-2">
                        <Field
                        class="ms-4"
                        :id="'fitted_value_' + index + '_small'"
                        :name="'fitted_value_' + index"
                        v-model="purchase.fitted_value"
                        type="radio"
                        :value="1"
                        /> Nhỏ
                        <Field
                        class="ms-4"
                        :id="'fitted_value_' + index + '_medium'"
                        :name="'fitted_value_' + index"
                        v-model="purchase.fitted_value"
                        type="radio"
                        :value="2"
                        /> Đúng kích cỡ
                        <Field
                        class="ms-4"
                        :id="'fitted_value_' + index + '_large'"
                        :name="'fitted_value_' + index"
                        v-model="purchase.fitted_value"
                        type="radio"
                        :value="3"
                        /> Lớn
                        </div>
                </div>
                <ErrorMessage name="rate" class="error-feedback" />
            </div>
            <div class="form-group">
                <div class="d-flex align-items-center">
                    <label for="star">Chất lượng sản phẩm</label>
                    <ul class="review ms-3">
                        <li v-for="i in 5" :key="i" @click="setStaring(i, index)">
                            <i v-if="i <= purchase.star" class="bi bi-star-fill"></i>
                            <i v-else class="bi bi-star"></i>
                        </li>
                        <li v-for="(label, idx) in staringLabels" :key="idx">
                            <span v-if="idx + 1 === purchase.star">{{ label }}</span>
                        </li>
                    </ul>
                </div>
                <ErrorMessage name="star" class="error-feedback" />
            </div>
            <div class="form-group text-center">
                <textarea 
                    :id="'conten' + index"
                    :name="'conten' + index"
                    v-model="purchase.content" cols="80" rows="6" 
                    placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                ></textarea>
            </div>
            <div class="form-group">
                <div class="text-center">
                    <label for="image" class="me-2">Thêm hình ảnh</label>
                    <Field 
                        :name="'images' + index"
                        type="file"
                        accept="image/*"
                        @change="handleImageReview(index, $event)"
                        multiple
                        class="d-inline w-25"
                    />
                </div>
                <div v-if="purchase.images" class="text-center mt-3">
                    <span v-for="image in purchase.images" :key="image">
                        <img
                            :src="image.image" 
                            alt="Hình ảnh" class="img-edit img-responsive center-block me-2"
                            width="150">
                    </span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <input type="submit" name="btnSave" value="Thực hiện" class="float-end">
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { formatPrice } from '@/utils';
    import { mapGetters } from "vuex";

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
            return {
                reviewLocal: this.reviews,
                purchasesList: this.selectedPurchase.map(purchase => ({
                    ...purchase,
                    star: 5,
                    fitted_value: 2,
                    content: "",
                    images: []
                })),
                staringLabels: ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'],
            };
        },
        methods: {
            submitReview() {
                this.reviewLocal = [];
                let hasError = false;

                this.purchasesList.forEach(item => {
                    if (!item.content) {
                        hasError = true;
                    } else {
                        this.reviewLocal.push({
                            'user_id': this.getUser.id,
                            'product_id': item.id,
                            'classify': item.color + ", " + item.size,
                            'star': item.star,
                            'fitted_value': item.fitted_value,
                            'content': item.content,
                            'images': item.images
                        });
                    }
                })
                if(hasError) {
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
                    Toast.fire({
                        icon: 'warning',
                        title: "Bạn chưa nhập nội dung đánh giá."
                    });
                } else {
                    this.$emit("submit:reviews", this.reviewLocal);
                }
            },
            handleImageReview(index, event) {
                let files = event.target.files;
                let reader;

                this.purchasesList[index].images = [];
                for (let i = 0; i < files.length; i++) {
                    reader = new FileReader();
                    reader.onload = (e) => {
                        this.purchasesList[index].images.push({
                            image: e.target.result
                        });
                    };
                    
                    reader.readAsDataURL(files[i]);
                }  
            },        
            setStaring(value, index) {
                this.purchasesList[index].star = value;
            },
            formatPrice,
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    };
</script>

<style scoped>
    .review i {
        color: #fecb00;
        font-size: 24px;
        margin-right: 4px;
    }
    .review li {
        display: inline-block;
        margin: 2px;
    }
</style>
