<template>
    <div class="detail-image">
        <div class="detail-image__item">
            <div class="d-flex flex-column left-image__container">
                <div v-for="img in isColorSelected.items" :key="img" class="left-image"
                    @mouseover="changPicture(img.image)">
                    <img class="demo" :src="img.image" alt=""
                        :class="{ active: img.image === activeImage ? true : false }">
                </div>
            </div>
        </div>
        <div class="detail-image__item">
            <div class="detail-image_container" @mousemove="handleMouseMove" @mouseleave="resetZoom">
                <div class="mySlides">
                    <img :src="activeImage" :style="zoomStyle" class="img-main">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        product: { type: Object, required: true },
        isColorSelected: { type: Object, required: true },
    },
    data() {
        return {
            activeImage: this.product.image,
            zoomStyle: {
                transform: 'scale(1)', // Tỷ lệ phóng ban đầu
            },
        };
    },
    watch: {
        // Watch for changes in the 'product' prop
        'isColorSelected': {
            immediate: true, // Run the handler immediately on component mount
            handler(newValue) {
                this.activeImage = newValue.items[0].image;
            },
        },
    },
    methods: {
        changPicture(image) {
            this.activeImage = image;
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
    width: 90px;
    height: 120px;
}
.detail-image {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.detail-image__item:first-child {
    width: 20%;
}
.detail-image__item:last-child {
    width: 79%;
}
.img-main {
    height: 700px;
}
.left-image__container {
    height: 700px;
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none; 
}
.left-image__container::-webkit-scrollbar {
    width: 0;
}
</style>
