<template>
    <Form
        @submit="submitSupplier"
        :validation-schema="supplierFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên nhà cung cấp
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="supplierLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ cụ thể
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="supplierLocal.address_detail"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="city">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã
                <span class="error-feedback">*</span>
            </label>
            <div class="aselect" :data-value="value" :data-list="cities">
                <div class="selector" @click="visible = !visible">
                    <div class="label">
                            <span>{{ valueSelect }}</span>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }"></div>
                    <div :class="{ hidden : !visible, visible }">
                        <div class="selector-container">
                            <div class="selector-item" @click.stop>
                                <span :class="{'active': addressStatus === 1}">Tỉnh/Thành phố</span>
                                <span :class="{'active': addressStatus === 2}">Quận/Huyện</span>
                                <span :class="{'active': addressStatus === 3}">Phường/Xã</span>
                            </div>
                            <ul v-if="addressStatus === 1">
                                <li 
                                    :class="{ current : city === value }" 
                                    v-for="(city, index) in cities" 
                                    :key="city.id" :value="city.id" 
                                    @click.stop="selectOptionCity(city)"
                                >
                                    {{ city.name }}
                                </li>
                            </ul>
                            <ul v-if="addressStatus === 2">
                                <li 
                                    :class="{ current : district === value }" 
                                    v-for="(district, index) in districts" 
                                    :key="district.id" :value="district.id" 
                                    @click.stop="selectOptionDistrict(district)"
                                >
                                    {{ district.name }}
                                </li>
                            </ul>
                            <ul v-if="addressStatus === 3">
                                <li 
                                    :class="{ current : ward === value }" 
                                    v-for="(ward, index) in wards" 
                                    :key="ward.id" :value="ward.id" 
                                    @click.stop="selectOptionWard(ward)"
                                >
                                    {{ ward.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="supplierLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="supplierLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="bank_account">Số tài khoản
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="bank_account"
                type="text"
                class="form-control"
                v-model="supplierLocal.bank_account"
            />
            <ErrorMessage name="bank_account" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tax_code">Mã số thuế
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="tax_code"
                type="text"
                class="form-control"
                v-model="supplierLocal.tax_code"
            />
            <ErrorMessage name="tax_code" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="date_cooperate">Ngày bắt đầu hợp tác
                <span class="error-feedback">*</span>
            </label>
            <div class="py-1">
                <input type="date" v-model="supplierLocal.date_cooperate" class="p-1">
            </div>
            <ErrorMessage name="date_cooperate" class="error-feedback" />
        </div>
        <div class="form-group">
            <button type="button" class="btnAdd" @click="submitSupplier">
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
    import AddressService from "@/services/user/address.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            },
        emits: ["submit:supplier", "delete:supplier"],
        props: {
            supplier: { type: Object, required: true }
        },
        watch: {
            'supplier'(newValue) {
                this.supplierLocal = newValue;
                this.valueSelect = this.supplierLocal.address;
            },
        },
        data() {
            const supplierFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Địa chỉ email không hợp lệ."),
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
            });
            return {
                supplierLocal: this.supplier,
                supplierFormSchema,
                cities: [],
                districts: [],
                wards: [],
                valueSelect: "",
                visible: false,
                addressStatus: 1,
            };
        },
        methods: {
            submitSupplier() {
                this.$emit("submit:supplier", this.supplierLocal);
            },
            deleteSupplier() {
                this.$emit("delete:supplier", this.supplierLocal.id);
            },
            async retrieveCities() {
                try {
                    this.cities = await AddressService.getCities();
                } catch (error) {
                    console.log(error);
                }
            },
            async selectOptionCity(city) {
                this.valueSelect = city.name;
                this.districts = await AddressService.getDistricts(city.id);
                this.addressStatus = 2;
            },
            async selectOptionDistrict(district) {
                this.valueSelect = district.name + ", " + this.valueSelect
                this.wards = await AddressService.getWards(district.id);
                this.addressStatus = 3;
            },
            async selectOptionWard(ward) {
                this.valueSelect = ward.name + ", " + this.valueSelect;
                this.visible = false;
                this.addressStatus = 1;
                this.supplierLocal.address =  this.valueSelect;
            },
        },
        mounted() {
            this.retrieveCities();
        },
    };
</script>
<style scoped>
    
</style>
