<template>
    <div class="statistical-range">
        <div>
            <span>Lần cập nhật cuối: <span>{{ lastUpdate }}</span></span>
            <span>Giữa các ngày: 
                <span v-if="startDateFormatted && endDateFormatted">
                {{ startDateFormatted }} - {{ endDateFormatted }}
                </span>
            </span>
        </div>

        <div class="picker-container">
            <input type="text" class="picker">
            <button><i class="fa fa-refresh"></i></button>
        </div>
    </div>
</template>

<script>
import 'daterangepicker/daterangepicker.js';
import StatisticalService from "@/services/admin/statistical.service";

export default {
    props: {
        startDateFormatted: { type: String, required: true },
        endDateFormatted: { type: String, required: true },
        lastUpdate: { type: String, required: true },
    },
    data() {
        return {
            startDate: "",
            endDate: "",
        }
    },
    methods: {
        formatDates() {
            this.$emit('update:startDateFormatted', this.startDate);
            this.$emit('update:endDateFormatted', this.endDate);
            this.$parent.datesUpdated = true;
        },
    },
    async mounted() {
        if(this.startDate=="" && this.endDate=="") {
            await StatisticalService.getRangeDate().then(res => {
                this.startDate = res.start;
                this.endDate = res.end;
            });
        }
        $('.picker').daterangepicker({
            "timePickerSeconds": true,
            "autoApply": true,
            ranges: {
                'Hôm nay': [moment(), moment()],
                'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '7 ngày trước': [moment().subtract(6, 'days'), moment()],
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            "alwaysShowCalendars": true,
            "startDate": this.startDate,
            "endDate": this.endDate,
            "locale": {
                "separator": " - ",
                "applyLabel": "Áp dụng",
                "cancelLabel": "Hủy bỏ",
                "fromLabel": "Từ",
                "toLabel": "Đến",
                "customRangeLabel": "Tùy chỉnh",
                "weekLabel": "Tuần",
                "daysOfWeek": ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                "monthNames": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                "firstDay": 1,
                "format": "DD/MM/YYYY",
            }
        }, (start, end, label) => {
            this.startDate = start.format("DD/MM/YYYY");
            this.endDate = end.format("DD/MM/YYYY");
            this.formatDates(); // Format the dates when they change
        });

        this.formatDates(); // Format the initial dates
    }
};
</script>
