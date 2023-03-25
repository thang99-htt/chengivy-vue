<template>
    <Form
        @submit="submitContact"
        :validation-schema="contactFormSchema"
    > 
        <div class="form-group">
            <label for="name">Họ Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="contactLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="phone"
                type="text"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ cụ thể
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="address"
                type="text"
                class="form-control"
                v-model="contactLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address_city">Tỉnh/Thành
                <span class="error-feedback">*</span>
            </label>       
            <Field    
                @change="changeCity($event)"
                name="address_city" as="select"
                class="form-control select" id="address_city"
            >
                <option disabled value="">Chọn Tỉnh/Thành phố</option>
                <option v-for="(city, index) in citiesList"
                    :key="city" 
                    :value="city.id"
                >
                    {{ city.name }}
                </option>
            </Field>  
            <ErrorMessage name="address_city" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address_district">Quận/Huyện
                <span class="error-feedback">*</span>
            </label>      
            <Field
                @change="changeDistrict($event)"
                name="address_district" as="select"
                class="form-control select" id="address_district"
            >
            </Field> 
            <ErrorMessage name="address_district" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address_ward">Phường/Xã
                <span class="error-feedback">*</span>
            </label>      
            <Field 
                v-slot="{ changeWard }"
                @change="changeWard($event)"
                name="address_ward" as="select"
                class="form-control select" id="address_ward"
            >
            </Field>  
            <ErrorMessage name="address_ward" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                class="btn btn-primary"
                @click="reset"
            >
                <i class="fas fa-redo"></i> Hủy
            </button>
        </div>
    </Form>
    
</template>
<script>
    import $ from 'jquery'
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:contact"],
        props: {
            cities: { type: Object, required: true },
            contact: { type: Object, required: true },
        },
        data() {
            const contactFormSchema = yup.object().shape({
                address_city: yup
                .string()
                .required("Tỉnh/Thành phố phải được chọn."),
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
                address: yup
                .string()
                .required("Địa chỉ phải có giá trị."),
            });
            return {
                contactFormSchema,
                citiesList: this.cities,
                contactLocal: this.contact,
                activeCity: "",
                activeDistrict: "",
                activeWard: "",
            };
        },
        methods: {
            submitContact() {
                this.$emit("submit:contact", this.contactLocal);
            },
            reset () {
                this.contactLocal.phone = "";
                this.contactLocal.address = "";
            },
            changeCity(event) {
                this.activeCity = event.target.value
                var address_city = $("#address_city").val();
                var url = 'http://localhost:8000/api/addresses/get-districts/'+address_city;

                $('#address_district').html('');

                $.ajax({
                    url: url,
                    method:'POST',
                    dataType: 'json',
                    data:{address_city:address_city, url:url},
                    success:function(data) {
                        $('#address_district').html('<option value="">Chọn Quận/Huyện</option>');
                        $.each(data, function (key, value) {
                            $("#address_district").append('<option value="' + value.id + '">' + value.name + '</option>');                           
                        });
                    }
                });
            },
            changeDistrict(event) {
                this.activeDistrict = event.target.value
                var address_district = $("#address_district").val();
                var url = 'http://localhost:8000/api/addresses/get-wards/'+address_district;

                $('#address_ward').html('');
                
                $.ajax({
                    url: url,
                    method:'POST',
                    dataType: 'json',
                    data:{address_district:address_district, url:url},
                    success:function(data) {
                        $('#address_ward').html('<option value="">Chọn/Phường Xã</option>');
                        $.each(data, function (key, value) {
                            $("#address_ward").append('<option value="' + value.id + '">' + value.name + '</option>');
                        });
                    }
                });
            },
            changeWard(event) {
                this.contactLocal.ward_id = event.target.value
                this.activeWard = event.target.value
            }
        },
    };
</script>

