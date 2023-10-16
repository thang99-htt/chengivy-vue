<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                aaa
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import OrderService from "@/services/admin/order.service";

export default {
    components: {
         
    },
    name: 'sold-at-store',
    data() {
        return {
            orders: [],
        };
    },
    computed: {
        
    },
    methods: {

    },
    mounted() {
        
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