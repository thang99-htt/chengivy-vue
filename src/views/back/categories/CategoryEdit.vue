<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="category" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/categories">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Hiệu chỉnh Danh mục</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <CategoryForm
                            :category="category"
                            @submit:category="updateCategory"
                            @delete:category="deleteCategory"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import CategoryForm from "@/components/back/categories/CategoryForm.vue";
    import CategoryService from "@/services/back/category.service";
    
    export default {
        components: {
            CategoryForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                category: null,
            };
        },
        methods: {
            async getCategory(id) {
                try {
                    this.category = await CategoryService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateCategory(data) {
                try {
                    await CategoryService.update(this.category.id, data);
                    this.$router.push({ name: "category" });
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Danh mục được cập nhật thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteCategory() {
                if (confirm("Bạn muốn xóa Danh mục này?")) {
                    try {
                        await CategoryService.delete(this.category.id);
                        this.$router.push({ name: "category" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getCategory(this.id);
        },
    };
</script>
