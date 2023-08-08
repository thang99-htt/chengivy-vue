<template>
    <table class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th width="4%">#</th>
                <th width="11%">Danh mục cha</th>
                <th width="12%">Tên</th>
                <th width="16%">Hình ảnh</th>
                <th width="16%">Mô tả</th>
                <th width="8%">Đường dẫn</th>
                <th width="8%">Trạng thái</th>
                <th width="7%">Tùy chọn</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(category, index) in categoriesList" :key="category">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>
                    <span v-if="category.parent">
                        {{ category.parent.name }}
                    </span>
                    <span v-else>
                        NULL
                    </span>
                </td>
                <td>{{ category.name }}</td>
                <td>
                    <img v-if="category.image" :src="getImageCat(category.image)" alt="Image"
                        class="img-responsive center-block">

                </td>
                <td>{{ category.description }}</td>
                <td>{{ category.url }}</td>
                <td>
                    <button :class="[category.status == 1 ? 'btn-show' : 'btn-hide']" @click="statusUpdate(category)">
                        {{ category.status == 1 ? 'Hiện' : 'Ẩn' }}
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn">
                        <router-link :to="{
                            name: 'category.edit',
                            params: { id: category.id },
                        }">
                            <img src="/images/icon/iconedit.png" alt="">
                        </router-link>
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(category.id)" :checked="selectedIds.includes(category.id)">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="8" class="text-center text-bold">Chọn tất cả</th>
                <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import CategoryService from "@/services/admin/category.service";
import { getImageCat } from '../../../utils';

export default {
    name: 'CategoryList',
    props: {
        categories: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        categoriesList() {
            return this.categories;
        },
    },
    data() {
        return {
            status: 0,
        };
    },
    methods: {
        getImageCat,
        statusUpdate(category) {
            try {
                CategoryService.updateStatus(category.id, category.status).then(() => {
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
            if(this.selectedIds.length == this.categoriesList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.categories.forEach(category => {
                    this.selectedIds.push(category.id);
                });
            } else {
                this.categories.forEach(category => {
                    this.selectedIds.push(category.id);
                });
            }
        }
    },

};
</script>
