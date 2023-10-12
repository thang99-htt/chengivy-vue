<template>
    <ReturnModal v-if="showModal" :showModal="showModal" @closeModal="closeModal" :returnID="returnID" />

    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />

                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <ReturnList v-if="filteredReturnsCount > 0" :returns="filteredReturns" :selectedIds="selectedIds"
                            :showModal="showModal" @update-modal="updateShowModal" :returnID="returnID"
                            @update-returnID="updateReturn" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ReturnList from "@/components/admin/returns/ReturnList.vue";
import ReturnService from "@/services/admin/return.service";
import ReturnModal from "@/components/admin/returns/ReturnModal.vue";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";

export default {
    components: {
        ReturnList,
        ReturnModal,
        StatisticalPicker
    },
    name: 'return.adim',
    data() {
        return {
            returns: [],
            selectedIds: [],
            returnID: null,
            showModal: false,
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
        };
    },
    computed: {
        filteredReturns() {
            return this.returns;
        },
        filteredReturnsCount() {
            return this.filteredReturns.length;
        },
    },
    watch: {
        startDateFormatted: 'handleDatesChange',
        endDateFormatted: 'handleDatesChange',
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
            try {
                let data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                this.returns = await ReturnService.getAll(data);
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
        closeModal() {
            this.showModal = false;
            this.returnID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateReturn(value) {
            this.returnID = value;
        },
    },
    mounted() {
        this.retrieveReturns();
    },
};
</script>