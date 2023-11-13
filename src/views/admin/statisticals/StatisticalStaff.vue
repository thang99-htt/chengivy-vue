<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                    <table class="example1 table dataTable table-striped" v-if="staffs">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên nhân viên</th>
                                <th>Vai trò</th>
                                <th>Số lượt bán</th>
                                <th>Tổng giá trị</th>
                                <th>Tổng doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr role="row" v-for="(staff, index) in staffs" :key="product">
                                <td>{{ index+1 }}</td>
                                <td>{{ staff.name }}</td>
                                <td>
                                    <div v-for="role in staff.roles" class="btn-staff">
                                        {{ role.name }}
                                    </div>
                                </td>
                                <td>{{ (staff.number_of_sells).toLocaleString() }}</td>
                                <td>{{ formatPrice(staff.total_value) }}</td>
                                <td>{{ formatPrice(staff.revenus) }}</td>
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
                staffs: [],
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
                    this.retrieveStaffs();
                    this.datesUpdated = false; 
                }
            },
            async retrieveStaffs() {
                const data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                try {
                    this.staffs = await StatisticalService.getStaffs(data);
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
.btn-staff {
    color: #363636;
    color: #dc5400;
    font-weight: bold;
    background-color: #ffeed5;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 10px;
    margin-bottom: 6px;
}
</style>