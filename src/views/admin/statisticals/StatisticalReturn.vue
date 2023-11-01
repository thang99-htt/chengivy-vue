<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                    
                <div class="d-flex align-items-center justify-content-end mt-3 mb-4">
                    <button type="button" class="btnAdd" @click="reImportIntoInventory">
                        <i class="fa fa-plus"></i>Nhập lại vào kho
                    </button>
                </div>
                <ReturnList v-if="returns" :returns="returns" :selectedIds="selectedIds" />
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import ReturnList from "@/components/admin/returns/ReturnList.vue";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import StatisticalService from "@/services/admin/statistical.service";
import { initializeDataTable } from '../../../utils';

    export default {
        components: {
            StatisticalPicker,
            ReturnList,

        },
        data() {
            return {
                startDateFormatted: "",
                endDateFormatted: "",
                datesUpdated: false,
                returns: [],
                selectedIds: [],

            };
        },
        watch: {
            startDateFormatted: 'handleDatesChange', 
            endDateFormatted: 'handleDatesChange', 
        },
        computed: {
            
        },
        methods: {
            updateStartDate(value) {
                this.startDateFormatted = value;
            },
            updateEndDate(value) {
                this.endDateFormatted = value;
            },
            handleDatesChange() {
                if (this.datesUpdated) {
                    this.retrieveReturns();
                    this.datesUpdated = false; 
                }
            },
            async retrieveReturns() {
                const data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                try {
                    this.returns = await StatisticalService.getReturns(data);
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
            refreshList() {
                this.retrieveReturns();
                this.selectedIds = [];
            },
            async reImportIntoInventory() {
                const result = await StatisticalService.reImportInventory(this.selectedIds);;
                console.log(result);
            }
        },
        mounted() {
            this.handleDatesChange();
            this.retrieveReturns();
        },
    };
</script>