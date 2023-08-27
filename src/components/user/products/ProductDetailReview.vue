<template>
    <div class="product-review">
        <h3>Khách Hàng Đánh Giá ( {{ totalReviews }} )</h3>
        <div class="review-overview">
            <div class="review-item review">
                <p>Đánh giá trung bình</p>
                <ul>
                    <li><span>{{ productLocal.reviews.average_star_rating }}</span></li>
                    <li>
                        <template v-for="n in Math.min(Math.floor(productLocal.reviews.average_star_rating), 5)">
                            <i class="bi bi-star-fill"></i>
                        </template>
                        <template v-if="productLocal.reviews.average_star_rating - Math.floor(productLocal.reviews.average_star_rating) >= 0.5 && Math.floor(productLocal.reviews.average_star_rating) < 5">
                            <i class="bi bi-star-half"></i>
                        </template>
                        <template v-if="productLocal.reviews.average_star_rating - Math.floor(productLocal.reviews.average_star_rating) < 0.5 && Math.floor(productLocal.reviews.average_star_rating) < 5">
                            <i class="bi bi-star"></i>
                        </template>
                    </li>
                </ul>
            </div>
            <div class="review-item">
                <p>Hàng có vừa không?</p>
                <ul>
                    <li>
                        <span>Nhỏ</span>
                        <div>
                            <span></span>
                            <span :style="{ width: productLocal.reviews.fitted_value_distribution.value_1 + '%' }"></span>
                        </div>
                        <span>{{ productLocal.reviews.fitted_value_distribution.value_1 }}%</span>
                    </li>
                    <li>
                        <span>Đúng kích thước</span>
                        <div>
                            <span></span>
                            <span :style="{ width: productLocal.reviews.fitted_value_distribution.value_2 + '%' }"></span>
                        </div>
                        <span>{{ productLocal.reviews.fitted_value_distribution.value_2 }}%</span>
                    </li>
                    <li>
                        <span>Lớn</span>
                        <div>
                            <span></span>
                            <span :style="{ width: productLocal.reviews.fitted_value_distribution.value_3 + '%' }"></span>
                        </div>
                        <span>{{ productLocal.reviews.fitted_value_distribution.value_3 }}%</span>
                    </li>
                </ul>
            </div>
        </div>
        <p v-if="productLocal.reviews.items.length==0" class="fw-bold text-black my-3">Chưa có đánh giá nào.</p>

        <div class="review-option">
            <span
                :class="{ 'active': checkOption==1 }"
                @click="checkOption=1"
            >
                Tất cả ({{ totalReviews }})
            </span>
            <span
                :class="{ 'active': checkOption==2 }"
                @click="checkOption=2"
            >
                Hình ảnh ({{ totalReviewImages }})
            </span>
            <span>
                Xếp hạng
                <span class="review-filter">
                    {{ selectedStar }}
                    <i class="bi bi-chevron-down"></i>
                </span>
                <ul>
                    <li v-for="star in stars" :key="star" @click="changeStar(star)"
                        :class="{ 'active': star.star === selectedStar }">
                        {{ star.star }}
                    </li>
                </ul>
            </span>
            <span>
                Màu sắc
                <span class="review-filter">
                    {{ selectedColor }}
                    <i class="bi bi-chevron-down"></i>
                </span>
                <ul>
                    <li v-for="(color, index) in colors" :key="color" :class="{ 'active': color.color_name === selectedColor }"
                        @click="changeColor(color)">
                        <span v-if="color.color_name !== 'Tất cả'"
                            class="filters-panel-group-item__item-box circle" 
                            :class="{'active': color.color_name === selectedColor}"
                            :style="`background-color: ${color.color}`"
                        >
                        </span>
                        <span :class="{'ms-5': color.color_name === 'Tất cả'}">{{ color.color_name }}</span>
                    </li>
                </ul>
            </span>
            <span>
                Kích cỡ
                <span class="review-filter">
                    {{ selectedSize }}
                    <i class="bi bi-chevron-down"></i>
                </span>
                <ul>
                    <li v-for="size in getUniqueSizes(productLocal.inventories[0].items)" :key="size"
                        @click="changeSize(size)"
                        :class="{ 'active': size.size_name === selectedSize }">
                        <span v-if="size.size_name == 'Tất cả'"> {{ size.size_name }}</span>
                        <span v-else>Size: {{ size.size_name }}</span>
                    </li>
                </ul>
            </span>
        </div>
        <div class="accordion mt-3" v-if="paginatedReviews.length>0">
            <div 
                v-for="(review, index) in paginatedReviews"
                :key="review.id"
            >
                <div 
                    class="accordion-item py-3"
                    v-if="review.status==1"
                >
                    <div class="accordion-content">
                        <div class="row">
                            <div class="col-2 user">
                                <img class="d-block me-3" width="40" src="/images/user.jpg" alt="">
                                <p>{{ review.user }}</p>
                            </div>
                            <div class="col-10">
                                <div class="d-flex flex-column">
                                    <div class="star">
                                        <ul>
                                            <li v-for="i in 5" :key="i">
                                                <i v-if="i <= review.star" class="fa fa-star"></i>
                                                <i v-else class="bi bi-star"></i>
                                            </li>
                                        </ul>
                                    </div>
                                    <p class="text-secondary">{{ new Date(review.date).toISOString().replace('T', ' ').substr(0, 16) }}</p>
                                    <p class="text-secondary">Phân loại: {{ review.classify }}</p>
                                    <p>{{ review.content }}</p>
                                    <div class="d-flex review-image" v-if="review.images.length>0">
                                        <img 
                                            v-for="(image, index) in review.images"
                                            :key="index"
                                            :class="{'active': index === currentImageIndex}"
                                            class="d-block me-3" width="100" 
                                            :src="image.image" alt=""
                                            @click="openImageModal(index, review.id)"
                                        >
                                    </div>
                                    <div v-if="review.reply" class="review-reply">
                                        <p>Phản Hồi Từ Người Bán</p>
                                        <p>{{ review.reply }}</p>
                                    </div>
                                    <div v-show="reviewID == review.id" class="image-modal">
                                        <div class="container">
                                            <div v-for="(image, index) in review.images" :key="index" class="mySlides" 
                                                v-show="index === currentImageIndex" @click="openImageNext(review.images)">
                                                <img :src="image.image" width="400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="mt-5">Không tìm thấy đánh giá theo lựa chọn của bạn.</p>

        <div class="me-3">
            <div class="d-flex justify-content-end">
                <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(1)">
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                    </a>
                </li>
                <li v-if="currentPage > maxVisibleButtons / 2 + 1" class="page-item disabled">
                    <a class="page-link">...</a>
                </li>
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                    :class="{ active: currentPage === pageNumber }">
                    <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
                </li>
                <li v-if="currentPage < totalPages - maxVisibleButtons / 2" class="page-item disabled">
                    <a class="page-link">...</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPages)">
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                    </a>
                </li>
                </ul>
            </div>
        </div>
    </div>    
</template>
<script>
    
    export default {
        props: {
            product: { type: Object, required: true },
        },
        data() {
            return {
                productLocal: this.product,
                checkOption: 1,
                stars: [
                    {star: 'Tất cả'},
                    {star: '5 Ngôi sao'},
                    {star: '4 Ngôi sao'},
                    {star: '3 Ngôi sao'},
                    {star: '2 Ngôi sao'},
                    {star: '1 Ngôi sao'},
                ],
                selectedColor: 'Tất cả',
                selectedSize: 'Tất cả',
                selectedStar: 'Tất cả',
                colors: [
                    {color_name: 'Tất cả', color: null}
                ],
                currentPage: 1,
                itemsPerPage: 5,
                maxVisibleButtons: 2,
                reviewID: 0,
                currentImageIndex: -1,
            };
        },
        computed: {
            totalReviews() {
                return this.filteredReviews.length;
            },
            totalReviewImages() {
                const items = this.filteredReviews;
                let count = 0;

                for (const item of items) {
                    if (item.images.length>0) { 
                        count++;
                    }
                }

                return count;
            },
            filteredReviews() {
                let filtered = [...this.productLocal.reviews.items];
                if (this.selectedStar != 'Tất cả') {
                    filtered = filtered.filter(item => {
                        if (this.selectedStar == '5 Ngôi sao')
                            return item.star == 5;
                        else if (this.selectedStar == '4 Ngôi sao')
                            return item.star == 4;
                        else if (this.selectedStar == '3 Ngôi sao')
                            return item.star == 3;
                        else if (this.selectedStar == '2 Ngôi sao')
                            return item.star == 2;
                        else
                            return item.star == 1;
                    });
                }
                if (this.selectedColor != 'Tất cả') {
                    filtered = filtered.filter(item =>
                        item.classify.toLowerCase().includes(this.selectedColor.toLowerCase())
                    );
                } 
                if (this.selectedSize != 'Tất cả') {
                    filtered = filtered.filter(item => {
                        const sizePart = item.classify.split(',')[1]; // Lấy phần sau dấu phẩy
                        return sizePart.toLowerCase().trim() === this.selectedSize.toLowerCase();
                    });
                }

                if(this.checkOption == 2) {
                    filtered = filtered.filter(item => {
                        return item.images.length>0;
                    });
                }
                return filtered;
            },
            paginatedReviews() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.filteredReviews.slice(startIndex, endIndex);
            },
            totalPages() {
                return Math.ceil(this.filteredReviews.length / this.itemsPerPage);
            },
            paginatedReviews() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.filteredReviews.slice(startIndex, endIndex);
            },
        },
        methods: {
            getUniqueSizes(sizes) {
                const uniqueSizes = [{'size_name': 'Tất cả'}];
                const sizesSet = new Set();
                for (const size of sizes) {
                    if (!sizesSet.has(size.size_name)) {
                        sizesSet.add(size.size_name);
                        uniqueSizes.push(size);
                    }
                }
                return uniqueSizes;
            },
            getColors() {
                const colorsSet = this.productLocal.images;
                for (const color of colorsSet) { 
                    this.colors.push({
                        color_name: color.color_name,
                        color: color.color
                    });
                }
            },
            changeStar(star) {
                this.selectedStar = star.star;
            },
            changeColor(color) {
                this.selectedColor = color.color_name;
            },
            changeSize(size) {
                this.selectedSize = size.size_name;
            },
            changePage(pageNumber) {
                if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
                }
            },
            openImageModal(index, id) {
                if(this.reviewID == id) {
                    this.reviewID = 0;
                } else {
                    this.reviewID = id;
                }
                if(this.currentImageIndex == index) {
                    this.currentImageIndex = -1;
                } else {
                    this.currentImageIndex = index;
                }
            },
            openImageNext(images) {
                this.currentImageIndex++;
                if(this.currentImageIndex == images.length) {
                    this.currentImageIndex = 0;
                }
            },
            plusSlides(n) {
                this.currentImageIndex = (this.currentImageIndex + n + this.images.length) % this.images.length;
            },
            currentSlide(index) {
                this.currentImageIndex = index;
            }
        },
        mounted() {
            this.getColors();
        }
    };
</script>
<style scoped>
    .product-review .review {
        padding: 30px 20px;
        width: 300px;
    }
    .product-review .review i,
    .product-review .star i {
        color: #fecb00;
        font-size: 24px;
        margin-right: 6px;
    }
    .product-review .review li,
    .product-review .star li {
        display: inline-block;
        margin: 2px;
    }

    .product-review .review-item p {
        font-size: 18px;
        color: #000;
    }
    .product-review .review li span {
        font-size: 40px;
        font-weight: 600;
        margin-right: 10px;
        color: #3872b2;
    }
    .product-review p {
        color: #000;
    }
    .product-review h3 {
        color: #000;
        font-weight: 600;
    }
    .review-overview {
        display: flex;
        align-items: center;
        background-color: #f0f2f5;
    }
    .review-overview .review-item:last-child ul li span {
        font-size: 15px;
    }
    .review-overview .review-item:last-child ul li span:first-child {
        width: 110px;
    }
    .review-overview .review-item:last-child ul li div {
        display: inline-block;
        width: 200px;
        height: 8px;
        margin-right: 10px;
        position: relative;
    }
    .review-overview .review-item:last-child ul li div span {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .review-overview .review-item:last-child ul li div span:first-child {
        width: 100%;
        background-color: #c1c1c1;
        z-index: 1;
    }
    .review-overview .review-item:last-child ul li div span:last-child {
        background-color: #000;
        z-index: 2;
    }
    
    .review-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #ccc;
        height: 56px;
    }
    .review-option > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 100%;
        cursor: pointer;
        font-size: 18px;
        text-transform: capitalize;
        position: relative;
    }
    .review-option span.active {
        font-weight: 600;
    }
    .review-option > span.active::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 2px;
        background-color: #000;
        bottom: -2px;
        left: 0;
    }
    .review-option .review-filter {
        border: 1px solid #bcbcbc;
        width: 120px;
        margin-left: 10px;
        height: 36px;
        line-height: 36px;
        font-weight: 600;
        text-transform: none;
        font-size: 16px;
        text-align: center;
    }
    .review-option .review-filter i {
        font-size: 12px;
    }
    .review-option > span:hover ul {
        opacity: 1;
        visibility: visible;
    }
    .review-option ul {
        position: absolute;
        content: "";
        top: 50px;
        right: 36px;
        height: auto;
        width: auto;
        min-width: 125px;
        background-color: #fff;
        box-shadow: 0 5px 5px 10px rgba(0, 0, 0, .03);
        padding: 16px 24px;
        opacity: 0;
        visibility: hidden;
    }
    
    .review-option ul::after {
        position: absolute;
        content: "";
        width: 100px;
        height: 20px;
        background: transparent;
        top: -10px;
        right: 0;
    }
    .review-option ul li {
        font-size: 16px;
        margin-bottom: 6px;
        text-align: left;
        display: flex;
        align-items: center;
        text-transform: none;
    }
    .review-option ul li.active {
       font-weight: 600;
    }

    .product-review .accordion {
        height: auto;
    }

    .product-review .accordion .user {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
    }
    .product-review .accordion .star i {
        font-size: 18px;
        margin-right: 2px;
    }
    .product-review .accordion p,
    .product-review .accordion ul {
        margin-bottom: 0;
    }
    .product-review .accordion .accordion-content p:nth-child(4) {
        margin-top: 6px;
    }
    .product-review .accordion .review-image {
        height: 80px;
    }
    .product-review .accordion .review-image img:hover,
    .product-review .accordion .review-image img.active {
        border: 2px solid #3872b2;
        padding: 2px;
    }

    .product-review .accordion .container {
        position: relative;
    }

    .product-review .accordion .container .mySlides {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 400px;
        height: 600px;
        margin-top: 10px;
    }

    .product-review .accordion .container .mySlides::after {
        cursor: pointer;
        position: absolute;
        content: "\f054";
        font-family: "FontAwesome";
        top: 50%;
        right: 10px;
        width: 30px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        transform: translateY(-50%);
    }
    .product-review .accordion .container .mySlides::before {
        cursor: pointer;
        position: absolute;
        content: "\f053";
        font-family: "FontAwesome";
        top: 50%;
        left: 10px;
        width: 30px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        transform: translateY(-50%);
    }

    .image-modal {
        height: 600px;
    }

    .review-reply {
        padding: 10px;
        background-color: #fff5e5;
        margin-top: 10px;
    }
    .review-reply p:last-child {
        color: #555;
    }
</style>