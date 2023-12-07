<template>
    <SupplierModal v-if="modalSupplier" :showModal="showModal" @closeModal="closeModal"/>

    <Form
        @submit="submitPayment"
        :validation-schema="paymentFormSchema"
    >
        <div class="form-group">
            <label for="date">Ngày chi
                <span class="error-feedback">*</span>
            </label>
            <input name="date" type="date" class="datepicker d-block" v-model="paymentLocal.date">
            <ErrorMessage name="date" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="city">Nhà cung cấp
                <span class="error-feedback">*</span>
            </label>
            <div class="aselect" :data-value="value" :data-list="suppliers">
                <div class="plus" @click="openModalSupplier">
                    <i class="fa fa-plus" data-bs-toggle="tooltip" data-bs-placement="top" title="Thêm danh mục"></i>
                </div>
                <div class="selector" @click="visible = !visible">
                    <div class="label">
                        <span>{{ selectedSupplier }}</span>
                    </div>
                    <div class="arrow1" :class="{ expanded: visible }"></div>
                    <div :class="{ hidden: !visible, visible }">
                        <div class="selector-container">
                            <ul>
                                <li :class="{ current: supplier.name === selectedSupplier }"
                                    v-for="(supplier, index) in suppliers" :key="supplier.id" :value="supplier.id"
                                    @click.stop="selectOptionSupplier(supplier)">
                                    {{ supplier.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="total_price">Tổng tiền
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="total_price"
                type="text"
                class="form-control"
                v-model="paymentLocal.total_price"
            />
            <ErrorMessage name="total_price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Diễn giải
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="paymentLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <button type="button" class="btnAdd" @click="submitPayment">
                <i class="fa fa-plus"></i>Thực hiện
            </button>
            <button type="button" class="btnBack ms-2" @click="reset">
                <i class="fa fa-refresh"></i>Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import SupplierService from "@/services/admin/supplier.service";
    import SupplierModal from "@/components/admin/suppliers/SupplierModal.vue";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            SupplierModal
        },
        emits: ["submit:payment", "delete:payment"],
        props: {
            payment: { type: Object, required: true }
        },
        watch: {
            'payment'(newValue) {
                this.paymentLocal = newValue;
                this.selectedSupplier = this.paymentLocal.supplier.name;
            },
        },
        data() {
            const paymentFormSchema = yup.object().shape({
                total_price: yup
                .string()
                .required("Vui lòng nhập tổng tiền của phiếu chi."),
            });
            return {
                paymentLocal: this.payment,
                paymentFormSchema,
                visible: false,
                selectedSupplier: "---Chọn nhà cung cấp---",
                showModal: false,
                modalSupplier: false,
            };
        },
        methods: {
            submitPayment() {
                this.$emit("submit:payment", this.paymentLocal);
            },
            deleteSupplier() {
                this.$emit("delete:payment", this.paymentLocal.id);
            },
            async retrieveSuppliers() {
                try {
                    this.suppliers = await SupplierService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            selectOptionSupplier(supplier) {
                this.paymentLocal.supplier_id = supplier.id;
                this.selectedSupplier = supplier.name;
                this.visible = false;
            },
            openModalSupplier() {
                this.showModal = true;
                this.modalSupplier = true;
            },
            closeModal() {
                this.showModal = false;
                this.modalSupplier = false;
                this.retrieveSuppliers();
            },
        },
        mounted() {
            this.retrieveSuppliers();
        },
    };
</script>
<style scoped>
    
</style>
