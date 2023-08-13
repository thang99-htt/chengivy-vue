<template>
    <Form
        @submit="submitStaff"
        :validation-schema="staffFormSchema"
    >
        <div class="form-group">
            <label for="name">Họ tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="staffLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="staffLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="staffLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="indentity_card">CCCD/CMT
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="indentity_card"
                type="text"
                class="form-control"
                v-model="staffLocal.identity_card"
            />
            <ErrorMessage name="indentity_card" class="error-feedback" />
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="py-2">
                        <Field name="gender" v-model="staffLocal.gender" type="radio" value="Nam"/> Nam
                        <Field name="gender" v-model="staffLocal.gender" type="radio" value="Nữ" class="ms-4" /> Nữ
                    </div>
                    <ErrorMessage name="gender" class="error-feedback" />
                </div>
                <div class="col-6">
                    <label for="birth_date">Ngày sinh
                        <span class="error-feedback">*</span>
                    </label>
                    <div class="py-1">
                        <input type="date" v-model="staffLocal.birth_date" class="p-1">
                    </div>
                    <ErrorMessage name="birth_date" class="error-feedback" />
                </div>
                
            </div>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ cụ thể
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="staffLocal.address_detail"
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
            <label for="role_id">Vai trò
                <span class="error-feedback">*</span>
            </label>     
            <div
                v-for="role in roles"
                :key="role" 
            >
                <input 
                    v-model="staffLocal.role_id" 
                    :id="role.id" name="role_id" 
                    type="checkbox" :value="role.id"
                    class="me-2"
                /> 
                <label for="role_id">{{ role.name }}</label>
            </div>
            <ErrorMessage name="role_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <input type="submit" name="btnSave" value="Thực hiện">
            <input type="button" name="btnDelete" value="Xóa" v-if="staffLocal.id">
            <input type="button" name="btnBack" value="Hủy" v-else @click="emitReset">
        </div>
    </Form>
    
</template>
<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AddressService from "@/services/user/address.service";
    import RoleService from "@/services/admin/role.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:staff", "delete:staff"],
        props: {
            staff: { type: Object, required: true },
            reset: { type: Function, required: true },
        },
        watch: {
            'staff'(newValue) {
                this.staffLocal = newValue;
                this.valueSelect = this.staffLocal.address;
            },
        },
        data() {
            const staffFormSchema = yup.object().shape({
                name: yup
                .string()
                .required("Vui lòng nhập họ tên.")
                .min(2, "Họ tên phải ít nhất 2 ký tự.")
                .max(50, "Họ tên có nhiều nhất 50 ký tự."),
                email: yup
                .string()
                .required("Vui lòng nhập Email.")
                .email("Địa chỉ email không hợp lệ."),
                phone: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
                address: yup
                .string()
                .required("Vui lòng nhập địa chỉ cụ thể."),
                indentity_card: yup
                .string()
                .required("Vui lòng nhập CCCD/CMT."),

            });
            return {
                staffLocal: this.staff,
                staffFormSchema,
                activeCity: "",
                activeDistrict: "",
                activeWard: "",
                cities: [],
                districts: [],
                wards: [],
                valueSelect: "",
                visible: false,
                addressStatus: 1,
                roles: [],
            };
        },
        methods: {
            submitStaff() {
                this.$emit("submit:staff", this.staffLocal);
            },
            deleteStaff() {
                this.$emit("delete:staff", this.staffLocal.id);
            },
            async retrieveCities() {
                try {
                    this.cities = await AddressService.getCities();
                } catch (error) {
                    console.log(error);
                }
            },
            async retrieveRoles() {
                try {
                    this.roles = await RoleService.getAll();
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
                this.staffLocal.address =  this.valueSelect;
            },
            emitReset() {
                this.reset();
                console.log('a')
            }
        },
        mounted() {
            this.retrieveCities();
            this.retrieveRoles();
        },
    };
</script>
