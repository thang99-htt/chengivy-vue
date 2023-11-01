<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />

                <div class="option-filter" v-if="!hasRole6">
                    <div>
                        <a @click="selectedOption = 0" :class="{ active: selectedOption == 0 }"> Tất cả
                        </a>
                        <a @click="selectedOption = 1" :class="{ active: selectedOption == 1 }"> Chờ xử lý ({{ orderWaiting }})
                        </a>
                        <a @click="selectedOption = 6" :class="{ active: selectedOption == 6 }"> Đang giao ({{ orderShipping }})
                        </a>
                        <a @click="selectedOption = 9" :class="{ active: selectedOption == 9 }"> Hoàn thành ({{ orderCompleted
                        }})
                        </a>
                        <a @click="selectedOption = 10" :class="{ active: selectedOption == 10 }"> Đã hủy ({{ orderCanceled }})
                        </a>
                        <a @click="selectedOption = 11" :class="{ active: selectedOption == 11 }"> Bán tại cửa hàng ({{ orderSoldAtStore }})
                        </a>
                    </div>
                    <button type="button" class="btnDelete option-cancel" @click="cancelOrder">
                        <i class="fa fa-close"></i>Hủy đơn
                    </button>
                </div>
                <OrderList v-if="filteredOrders" :orders="filteredOrders" :selectedIds="selectedIds" :getAdmin="getAdmin"/>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import OrderList from "@/components/admin/orders/OrderList.vue";
import OrderService from "@/services/admin/order.service";
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue";
import {mapGetters} from 'vuex';

export default {
    components: {
        OrderList,
        StatisticalPicker
    },
    name: 'order',
    data() {
        return {
            orders: [],
            selectedIds: [],
            selectedOption: 0,
            orderWaiting: 0,
            orderShipping: 0,
            orderCompleted: 0,
            orderCanceled: 0,
            orderSoldAtStore: 0,
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
        };
    },
    computed: {
        ...mapGetters(['getAdmin']),
        hasRole6() {
            return this.getAdmin.roleIDs && this.getAdmin.roleIDs.some(id => id === 6);
        },
        filteredOrders() {
            let filtered = [...this.orders];
            if (this.selectedOption != 0) {
                filtered = filtered.filter(item =>
                    item.status.id == this.selectedOption
                );
            }

            return filtered;
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
                this.retrieveorders();
                this.datesUpdated = false;
            }
        },
        async retrieveorders() {
            try {
                let data = {
                    startDate: this.startDateFormatted,
                    endDate: this.endDateFormatted
                };
                this.orderWaiting = 0;
                this.orderShipping = 0;
                this.orderCompleted = 0;
                this.orderCanceled = 0;
                this.orderSoldAtStore = 0;
                this.orders = await OrderService.getAll(data);
                this.orders.forEach(order => {
                    if (order.status.id == 1) this.orderWaiting = this.orderWaiting + 1;
                    if (order.status.id == 6) this.orderShipping = this.orderShipping + 1;
                    if (order.status.id == 9) this.orderCompleted = this.orderCompleted + 1;
                    if (order.status.id == 10) this.orderCanceled = this.orderCanceled + 1;
                    if (order.status.id == 11) this.orderSoldAtStore = this.orderSoldAtStore + 1;
                });
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
            this.selectedIds = [];
        },
        cancelOrder() {
            try {
                OrderService.cancelOrder(this.selectedIds)
                    .then(async (res) => {
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
                            icon: res.success,
                            title: res.message
                        })
                        console.log(res)
                        this.refreshList();

                    })

            } catch (error) {
                console.log(error);
            }
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
</style>