<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <StatisticalPicker 
                    :startDateFormatted="startDateFormatted" 
                    :endDateFormatted="endDateFormatted"
                    @update:startDateFormatted="updateStartDate"
                    @update:endDateFormatted="updateEndDate"
                />
            </div>
        </div>
    </section>
</template>

<script>
import StatisticalPicker from "@/components/admin/statisticals/StatisticalPicker.vue"
import StatisticalService from "@/services/admin/statistical.service";

export default {
    components: {
        StatisticalPicker
    },
    data() {
        return {
            startDateFormatted: "",
            endDateFormatted: "",
        }
    },
    methods: {
        updateStartDate(value) {
            this.startDateFormatted = value;
        },
        updateEndDate(value) {
            this.endDateFormatted = value;
        },
        
    },
    mounted() {
    }
};
</script>
