<template>
    <section class="content">
        
        <div class="box">
            <div class="box-body">
                <StatisticalPicker :startDateFormatted="startDateFormatted" :endDateFormatted="endDateFormatted"
                            @update:startDateFormatted="updateStartDate" @update:endDateFormatted="updateEndDate" />
                            
                <div class="option-filter">
                    <a 
                        @click="selectedOption=0"
                        :class="{ active: selectedOption==0 }"    
                    >   Tất cả
                    </a>  
                    <a 
                        @click="selectedOption=1"
                        :class="{ active: selectedOption==1 }"    
                    >   Chờ xử lý ({{ orderWaiting }})
                    </a> 
                    <a 
                        @click="selectedOption=6"
                        :class="{ active: selectedOption==6 }"   
                    >   Đang giao ({{ orderShipping }})
                    </a>
                    <a 
                        @click="selectedOption=9"
                        :class="{ active: selectedOption==9 }"   
                    >   Hoàn thành ({{ orderCompleted }})
                    </a>
                    <a 
                        @click="selectedOption=10"
                        :class="{ active: selectedOption==10 }"   
                    >   Đã hủy ({{ orderCancled }})
                    </a>
                    <a 
                        @click="selectedOption=11"
                        :class="{ active: selectedOption==11 }"   
                    >   Bán tại cửa hàng
                    </a>
                </div>
                <OrderList 
                    v-if="filteredOrders" 
                    :orders="filteredOrders"
                    :selectedIds="selectedIds" 
                />
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
            orderCancled: 0,
            startDateFormatted: "",
            endDateFormatted: "",
            datesUpdated: false,
        };
    },
    computed: {
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
                this.orders = await OrderService.getAll(data);
                this.orders.forEach(order => {
                    if(order.status.id == 1) this.orderWaiting = this.orderWaiting+1;
                    if(order.status.id == 6) this.orderShipping = this.orderShipping+1;
                    if(order.status.id == 9) this.orderCompleted = this.orderCompleted+1;
                    if(order.status.id == 10) this.orderCancled = this.orderCancled+1;
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
        deleteorder() {
            this.$swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    OrderService.delete(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
                    this.$swal.fire('Đã xóa thành công!', '', 'success')
                }
            })
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
