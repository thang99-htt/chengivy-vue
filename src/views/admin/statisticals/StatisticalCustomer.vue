<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                    
                    <table class="example1 table dataTable table-striped" v-if="customers">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>Hạng mức</th>
                                <th>Số lượt mua</th>
                                <th>Tổng giá trị</th>
                                <th>Số lượt trả</th>
                                <th>Số lượt hủy đơn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr role="row" v-for="(customer, index) in customers" :key="product">
                                <td>{{ index+1 }}</td>
                                <td>{{ customer.name }}</td>
                                <td>
                                    <span
                                        :class="{'level1': customer.level == 'MEMBER',
                                        'level2': customer.level == 'SILVER', 'level3': customer.level == 'GOLD',
                                        'level4': customer.level == 'PLATINUM', 'level5': customer.level == 'DIAMOND' }"
                                    >
                                        {{ customer.level }}
                                    </span>    
                                </td>
                                <td>{{ (customer.number_of_purchases).toLocaleString() }}</td>
                                <td>{{ formatPrice(customer.total_value) }}</td>
                                <td>{{ (customer.number_of_returns).toLocaleString() }}</td>
                                <td>{{ (customer.total_unreceipt).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </section>
</template>
<script>
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import StatisticalService from "@/services/admin/statistical.service";
import { initializeDataTable, formatPrice } from '../../../utils';
import $ from 'jquery';
import 'datatables.net';

    export default {
        components: {
            StatisticalPicker,
        },
        data() {
            return {
                startDateFormatted: "",
                endDateFormatted: "",
                customers: [],
            };
        },
        watch: {
            startDateFormatted: 'handleDatesChange', 
            endDateFormatted: 'handleDatesChange', 
        },
        computed: {
            
        },
        methods: {
            formatPrice,
            updateStartDate(value) {
                this.startDateFormatted = value;
            },
            updateEndDate(value) {
                this.endDateFormatted = value;
            },
            handleDatesChange() {
                if (this.datesUpdated) {
                    this.retrieveCustomers();
                    this.datesUpdated = false; 
                }
            },
            async retrieveCustomers() {
                const data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                try {
                    this.customers = await StatisticalService.getCustomers(data);
                    if ($.fn.DataTable.isDataTable('.example1')) {
                        $('.example1').DataTable().destroy();
                    }
                    this.$nextTick(() => {
                        initializeDataTable();
                    });
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.handleDatesChange();
        },
    };
</script>

<style>

.level1,
.level12,
.level3,
.level4,
.level5 {
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 4px;
}
.level1 {
    background-color: #16ad02;
}
.level2 {
    background-color: #fc46cc;
}
.level3 {
    background-color: #005eff;
}
.level4 {
    background-color: #da0101;
}
.level5 {
    background-color: #e0be00;
}
</style>