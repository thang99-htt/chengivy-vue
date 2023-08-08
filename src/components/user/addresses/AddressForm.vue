<template>
    <Form
        @submit="submitAddress"
        :validation-schema="addressFormSchema"
    >
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__input2">
                    <label for="name">Họ Tên
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="addressLocal.name"
                    />
                    <ErrorMessage name="name" class="error-feedback" />     
                </div>
                <div class="form-group__input2">
                    <label for="phone">Số điện thoại
                        <span class="error-feedback">*</span>
                    </label>
                    <Field 
                        name="phone"
                        type="text"
                        class="form-control"
                        v-model="addressLocal.phone"
                    />
                    <ErrorMessage name="phone" class="error-feedback" />     
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container2">
                <label for="address">Địa chỉ cụ thể
                    <span class="error-feedback">*</span>
                </label>
                <Field 
                    name="address"
                    type="text"
                    class="form-control"
                    v-model="addressLocal.address_detail"
                />
                <ErrorMessage name="address" class="error-feedback" /> 
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container2">
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
        </div>
        <div class="form-group text-center">
            <input type="button" name="btnBack" value="Hủy" @click="reset">
            <input type="submit" name="btnSave" value="Thực hiện">
        </div>
    </Form>
    
</template>
<script>
    import $ from 'jquery'
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AddressService from "@/services/user/address.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:accountAddress"],
        props: {
            accountAddress: { type: Object, required: true },
            reset: { type: Function, required: true }
        },
        data() {
            const addressFormSchema = yup.object().shape({
                phone: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
                name: yup
                .string()
                .required("Vui lòng nhập họ tên."),
            });
            return {
                addressFormSchema,
                addressLocal: this.accountAddress,
                cities: [],
                districts: [],
                wards: [],
                valueSelect: '',
                visible: false,
                addressStatus: 1
            };
        },
        methods: {
            submitAddress() {
                this.$emit("submit:accountAddress", this.addressLocal);
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
                this.addressLocal.address =  this.valueSelect;
            },
            async updateAddress() {
                this.valueSelect = this.addressLocal.address;
            }
         },
        mounted() {
            this.retrieveCities();
            this.updateAddress();
        },
    };
</script>