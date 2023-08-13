<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="4%">#</th>
                <th width="20%">Tên</th>
                <th width="44%">Mô tả</th>
                <th width="20%">Hình ảnh</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(brand, index) in brandsList" :key="brand">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>{{ brand.name }}</td>
                <td>{{ brand.description }}</td>
                <td>
                    <img v-if="brand.image" :src="getImage(brand.image)" alt="Image"
                        class="img-responsive center-block">

                </td>
                <td class="text-center">
                    <button type="button" class="btn"  @click="showModalEdit(brand.id)">                        
                        <img src="/images/icon/iconedit.png" alt="">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(brand.id)" :checked="selectedIds.includes(brand.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="5" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import BrandService from "@/services/admin/brand.service";

export default {
    name: 'BrandList',
    props: {
        brands: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
        brandID: { type: Number, required: true },
        showModal: { type: Boolean, required: true },
    },
    computed: {
        brandsList() {
            return this.brands;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        statusUpdate(brand) {
            try {
                BrandService.updateStatus(brand.id, brand.status).then(() => {
                    this.$parent.refreshList();
                })
            } catch (error) {
                console.log(error);
            }
        },
        idSelected(id) {
            const index = this.selectedIds.indexOf(id);
            if (index === -1) {
                // Nếu id chưa tồn tại trong mảng, thêm nó vào
                this.selectedIds.push(id);
            } else {
                // Ngược lại, loại bỏ id khỏi mảng
                this.selectedIds.splice(index, 1);
            }
        },
        idAllSelected() {
            if(this.selectedIds.length == this.brandsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.brands.forEach(brand => {
                    this.selectedIds.push(brand.id);
                });
            } else {
                this.brands.forEach(brand => {
                    this.selectedIds.push(brand.id);
                });
            }
        },
        showModalEdit(brandID) {
            this.$emit('update-modal', true);
            this.$emit('update-brandID', brandID);
        },
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/brands/' + image;
        },
    },

};
</script>
