<template>
    <table class="example1 table dataTable">
        <thead>
            <tr role="row">
                <th width="6%">#</th>
                <th width="29%">Sản phẩm</th>
                <th width="18%">Giá</th>
                <th width="18%">Số lượng hoàn trả</th>
                <th width="24%">Tổng giá trị</th>
                <th width="5%">Chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(ret, index) in returnsList" :key="ret">
                <td>{{ index+1 }}</td>
                <td>
                    <img :src="ret.image" alt="" width="80">
                    {{ ret.product.name }}
                </td>
                <td>{{ formatPrice(ret.price) }}</td>
                <td>{{ ret.quantity }}</td>
                <td>{{ formatPrice(ret.price*ret.quantity) }}</td>
                <td class="text-center">
                    <input type="checkbox" @change="idSelected(ret.id)" :checked="selectedIds.includes(ret.id)">
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
import { formatPrice } from "../../../utils";
import {mapGetters} from 'vuex';

export default {
    name: 'ReturnList',
    props: {
        returns: { type: Array, default: [] },
        selectedIds: { type: Array, default: [] },
    },
    computed: {
        returnsList() {
            return this.returns;
        },
        ...mapGetters(['getAdmin'])
    },
    data() {
        return {
            
        };
    },
    methods: {
        formatPrice,
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
            if(this.selectedIds.length == this.returnsList.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if(this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.returns.forEach(ret => {
                    this.selectedIds.push(ret.id);
                });
            } else {
                this.returns.forEach(ret => {
                    this.selectedIds.push(ret.id);
                });
            }
        },
    },
    mounted() {
        
    }

};
</script>
