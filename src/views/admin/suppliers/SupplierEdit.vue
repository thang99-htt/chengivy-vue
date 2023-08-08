<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="supplier" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/payment-vouchers">
                            <input type="button" name="btnBack" value="Trở về">
                        </router-link>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <SupplierForm
                            :supplier="supplier"
                            @submit:supplier="updateSupplier"
                            @delete:supplier="deleteSupplier"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import SupplierForm from "@/components/admin/suppliers/SupplierForm.vue";
    import SupplierService from "@/services/admin/supplier.service";
    
    export default {
        components: {
            SupplierForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                supplier: null,
            };
        },
        methods: {
            async getRole(id) {
                try {
                    this.supplier = await SupplierService.get(id);
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
            async updateSupplier(data) {
                try {
                    await SupplierService.update(this.supplier.id, data);
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
                        icon: 'success',
                        title: 'Nhà cung cấp được cập nhật thành công.'
                    })

                    this.$router.push({ name: "supplier" });

                } catch (error) {
                    console.log(error);
                }
            },
            async deleteSupplier() {
                if (confirm("Bạn muốn xóa Vai trò này?")) {
                    try {
                        await SupplierService.delete(this.supplier.id);
                        this.$router.push({ name: "supplier" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getRole(this.id);
        },
    };
</script>
