<template>
    <div class="detail-image">
        <div class="d-flex">
            <div class="d-flex flex-column">
                <div class="left-image">
                    <img class="demo" :src="getImage(product.image)" alt="" @mouseover="changPicture(product.image)"
                        :class="{ active: product.image === activeIndex ? true : false }">
                </div>
                <div v-for="(image, index) in product.images" :key="image" class="left-image"
                    @mouseover="changPicture(image.image)">
                    <img class="demo" :src=getImage(image.image) alt=""
                        :class="{ active: image.image === activeIndex ? true : false }" width="100">
                </div>
            </div>
            <div class="container" @mousemove="handleMouseMove" @mouseleave="resetZoom">
                <div class="mySlides">
                    <img :src="getImage(image)" :style="zoomStyle" class="img-main">
                </div>
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
            image: this.product.image,
            activeIndex: this.product.image,
            zoomStyle: {
                transform: 'scale(1)', // Tỷ lệ phóng ban đầu
            },
        };
    },
    methods: {
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
        },
        changPicture(image) {
            this.image = image;
            this.activeIndex = image;
        },
        handleMouseMove(event) {
            const container = event.currentTarget;
            const rect = container.getBoundingClientRect();

            // Tính toán vị trí chuột trong container
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Tính toán tỷ lệ phóng to
            const zoomLevel = 3; // Tỷ lệ phóng tùy chọn

            // Áp dụng tỷ lệ phóng to vào ảnh
            this.zoomStyle.transform = `scale(${zoomLevel})`;

            // Di chuyển ảnh để điều chỉnh vị trí hiển thị ảnh phóng to
            this.zoomStyle.transformOrigin = `${mouseX}px ${mouseY}px`;
        },
        resetZoom() {
            this.zoomStyle.transform = 'scale(1)'; // Trả lại kích thước ban đầu
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

.demo {
    width: 70px;
    height: 100px;
}

.img-main {
    width: 500px !important;
    height: 700px;
}
</style>
