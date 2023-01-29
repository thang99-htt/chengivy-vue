<template>
    <Form
    :validation-schema="productFormSchema"
    >
        <div class="detail">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-8">
                        <div class="detail-image">
                            <div class="row">
                                <div class="col-2">
                                    <div class="d-flex flex-column">
                                        <div class="left-image">
                                            <img class="demo" :src="getImage(product.image)" alt=""
                                                @mouseover="changPicture(product.image)"
                                                :class="{ active: product.image === activeIndex ? true : false}"
                                            >
                                        </div>
                                        <div 
                                            v-for="(image, index) in product.images"
                                            :key="image"
                                            class="left-image"
                                            @mouseover="changPicture(image.image)"
                                        >
                                            <img class="demo" :src=getImage(image.image) alt=""
                                                :class="{ active: image.image === activeIndex ? true : false}"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-10">
                                    <div class="mySlides">
                                        <img :src="getImage(image)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="detail-info">
                            <input type="hidden" name="product_id" id="" value="">
                            <Field 
                                name="id"
                                type="text"
                                class="form-control"
                                v-model="productLocal.id"
                                hidden
                            />
                            <div class="info-name">
                                <h3>{{ product.name }}</h3>
                            </div>
                            <div class="info-category">
                                <p>{{ product.category.name }}</p>
                            </div>
                            <div class="info-price">
                                <p>{{ product.price }}</p>
                            </div>
                            <hr>
                            <div class="info-des">
                                <p>{{ product.description }}</p>
                            </div>
                            <div class="info-size">
                                <div class="d-flex justify-content-between">
                                    <p>
                                        Size
                                        <span class="error-feedback">*</span>
                                    </p>
                                    <p class="guide">Hướng dẫn</p>
                                </div>
                                <div class="form-group">
                                    <Field 
                                        name="size_id" as="select"
                                        class="form-control"
                                        v-model="productLocal.size_id"
                                    >
                                        <option v-for="(size, index) in product.sizes"
                                            :key="size" 
                                            :value="size.id"
                                        >
                                            {{ size.name }} - {{ size.pivot.quantity }}
                                        </option>
                                    </Field>      
                                    <ErrorMessage name="size_id" class="error-feedback" />
                                </div>
                            </div>
                            <div class="info-quantity">
                                <div class="d-flex align-items-end">
                                    <p>Số lượng</p>
                                    <div class="number-input">
                                        <a onclick="this.parentNode.querySelector('input[type=number]').stepDown()" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                            </svg>
                                        </a>
                                        <input class="quantity" min="1" name="product_quantity" value="1" type="number">
                                        <a onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="info-add">
                                <div class="row">
                                    <div class="d-grid gap-2">
                                        <button class="btn bag" type="submit">Add to Bag</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        props: {
            product: { type: Object, required: true },
        },
        data() {
            const productFormSchema = yup.object().shape( {
                size_id: yup
                .string()
                .required("Size phải được chọn.")
            });
            return {
                productLocal: this.product,
                productFormSchema,
                products: [],
                image: this.product.image,
                activeIndex: this.product.image,
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            changPicture(image) {
                this.image = image;
                this.activeIndex = image;
            },
            submitRole() {
                this.$emit("submit:role", this.roleLocal);
            },
        },
    };
</script>
<style scoped>
    .img-edit {
        width: 100px;
        margin: 10px 0 0 0;
    }
    
    .active {
        opacity: 1;
    }
</style>
