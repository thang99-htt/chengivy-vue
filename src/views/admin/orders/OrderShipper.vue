<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    :lastUpdate="lastUpdate"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                
                <div class="title">
                    <h4>Tổng số đơn bạn đã giao: <span>{{ orders.length }}</span></h4>
                    <h4>Tổng giá trị: <span>{{ formatPrice(totalOrderValue)  }}</span></h4>
                </div>
                <OrderListShipper v-if="orders" :orders="orders"/>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import OrderListShipper from "@/components/admin/orders/OrderListShipper.vue";
import OrderService from "@/services/admin/order.service";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import {mapGetters} from 'vuex';
import { formatPrice } from "../../../utils";

export default {
    components: {
        OrderListShipper,
        StatisticalPicker
    },
    name: 'order',
    data() {
        return {
            orders: [],
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
            lastUpdate: ""
        };
    },
    computed: {
        ...mapGetters(['getAdmin']),
        totalOrderValue() {
            return this.orders.reduce((total, order) => total + order.total_value, 0);
        },
    },
    watch: {
        startDateFormatted: 'handleDatesChange',
        endDateFormatted: 'handleDatesChange',
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
                this.retrieveorders();
                this.datesUpdated = false;
            }
        },
        async retrieveorders() {
            try {
                let data = {
                    shipperId: this.getAdmin.id, 
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                this.orders = await OrderService.getOrdersByShipper(data);
                this.lastUpdate = this.orders[this.orders.length-1].ordered_at;
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
            this.retrieveorders();
        },

    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.option-filter {
    display: flex;
    justify-content: space-between;
}

.option-cancel {
    margin-top: 3px;
    margin-right: 24px;
    color: #fff;
    background-color: #c50000;
    border-color: #fff !important;
}

.option-cancel i {
    color: #fff;
}
.title {
    margin-top: 20px;
    margin-bottom: 30px;

}
.title h4 span {
    color: red;
}
</style>