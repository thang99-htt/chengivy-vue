<template>
    <ReturnModal v-if="showModal" :showModal="showModal" @closeModal="closeModal" :returnID="returnID" />

    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    :lastUpdate="lastUpdate"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />

                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <ReturnList v-if="filteredReturnsCount > 0" :returns="filteredReturns" :selectedIds="selectedIds"
                            :showModal="showModal" @update-modal="updateShowModal" :returnID="returnID"
                            @update-returnID="updateReturn" />
                        <p v-else class="mt-5">Chưa có Yêu cầu Trả hàng/Hoàn tiền nào.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ReturnList from "@/components/admin/orders/ReturnList.vue";
import ReturnModal from "@/components/admin/orders/ReturnModal.vue";
import ReturnService from "@/services/admin/return.service";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";

export default {
    components: {
        ReturnList,
        ReturnModal,
        StatisticalPicker
    },
    name: 'return.admin',
    data() {
        return {
            returns: [],
            selectedIds: [],
            returnID: null,
            showModal: false,
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
            lastUpdate: ""
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
                this.lastUpdate = this.returns[this.returns.length-1].requested_at;
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