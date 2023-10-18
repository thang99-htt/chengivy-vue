<template>
    <section class="content mt-2">
        <div class="box-body">
            <div class="liveAlert"></div>
            <SoldAtStoreForm :soldAtStore="soldAtStore" @submit:soldAtStore="submitSoldAtStore" :reset="reset"/>
        </div>
    </section>
</template>
<script>
import SoldAtStoreForm from "@/components/admin/orders/SoldAtStoreForm.vue";
import OrderService from "@/services/admin/order.service";
import { mapGetters } from "vuex";

export default { 
    components: {
        SoldAtStoreForm,
    },
    data() {
        return {
            soldAtStore: {
                'staff_id': "",
                'user_id': "",
                'name_receiver': "",
                'phone_receiver': "",
                'voucher_id': "",
                'receipted_at': new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
                'total_price': 0,
                'total_discount': 0,
                'total_value': 0,
                'payment_method': "",
                'items': [],
            },
        };
    },
    methods: {
        async submitSoldAtStore(data) {
            this.soldAtStore.staff_id = this.getAdmin.id;
            
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
            
            try {
                await OrderService.soldAtStore(data)
                .then(res => {
                        Toast.fire({
                            icon: res.success,
                            title: res.message
                        });
                    });

            } catch (error) {
                console.log(error);
            }
            // this.reset();
        },
        reset () {
            this.soldAtStore.staff_id = "";
            this.soldAtStore.user_id = "";
            this.soldAtStore.name_receiver = "";
            this.soldAtStore.phone_receiver = "";
            this.soldAtStore.voucher_id = "";
            this.soldAtStore.receipted_at = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
            this.soldAtStore.total_discount = 0;
            this.soldAtStore.value_added = 0;
            this.soldAtStore.total_price = 0;
            this.soldAtStore.total_value = 0;
            this.soldAtStore.payment_method = "";
            this.soldAtStore.items = [];
        },
    },
    computed: {
        ...mapGetters(['getAdmin'])
    }
};
</script>
