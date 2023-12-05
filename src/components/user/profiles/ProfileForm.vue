<template>
    <Form
        @submit="submitProfile"
        :validation-schema="profileFormSchema"
    >
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="name">Họ Tên
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <Field 
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.name"
                    />
                    <ErrorMessage name="name" class="error-feedback" />     
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="phone">Số điện thoại
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <Field 
                        name="phone"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.phone"
                    />
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="gender">Giới tính
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <ErrorMessage name="new_password" class="error-feedback" />    
                    <Field name="gender" type="radio" value="Nam" v-model="profileLocal.gender" :checked="profileLocal.gender === 'Nam'"/>
                    <span class="text-dark ms-2">Nam</span>
                    <Field name="gender" type="radio" value="Nữ" v-model="profileLocal.gender" :checked="profileLocal.gender === 'Nữ'" class="ms-4"/>
                    <span class="text-dark ms-2">Nữ</span>           
                </div>
            </div>
            <div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="birth_date">Ngày sinh
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <input type="date" v-model="profileLocal.birth_date" class="p-1">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="reason">Ngân hàng:
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <div class="aselect" :data-value="value" :data-list="banks">
                            <div class="selector" @click="visible = !visible">
                                <div class="label">
                                    <span v-if="profileLocal.bank_account">{{ profileLocal.bank_account }}</span>
                                    <span v-else>{{ selectedBank }}</span>
                                </div>
                                <div class="arrow" :class="{ expanded : visible }"></div>
                                <div :class="{ hidden : !visible, visible }">
                                    <div class="selector-container">
                                        <ul>
                                            <li 
                                                :class="{ current : bank === selectedReason }" 
                                                v-for="(bank) in banks" 
                                                :key="bank" :value="bank" 
                                                @click.stop="selectOptionBank(bank)"
                                            >
                                                {{ bank }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                    <ErrorMessage name="reason" class="error-feedback" />       
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="bank_number">Số tài khoản
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">  
                    <Field 
                        name="bank_number"
                        type="text"
                        class="form-control"
                        v-model="profileLocal.bank_number"
                    />
                    <ErrorMessage name="bank_number" class="error-feedback" />
                </div>
            </div>
        </div>
        <div class="form-group mt-5 text-center">
            <button type="button" class="btnAdd" @click="submitProfile">
                <i class="fa fa-plus"></i>Thực hiện
            </button>
            <button type="button" class="btnBack ms-2" @click="reset">
                <i class="fa fa-refresh"></i>Hủy
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
        emits: ["submit:accountProfile"],
        props: {
            accountProfile: { type: Object, required: true },
        },
        data() {
            const profileFormSchema = yup.object().shape({
                phone: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
                name: yup
                .string()
                .required("Họ tên phải có giá trị."),
            });
            return {
                profileFormSchema,
                profileLocal: this.accountProfile,
                banks: [
                    'Ngân hàng ngoại thương Việt Nam(VietcomBank)', 
                    'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)', 
                    'Ngân hàng Công thương Việt Nam (Vietinbank)', 
                    'Ngân hàng Ngoại thương Việt Nam (Vietcombank)',
                    'Ngân hàng Việt Nam Thịnh Vượng (VPBank)',
                    'Ngân hàng Kỹ Thương Việt Nam (Techcombank)',
                    'Ngân hàng Nông nghiệp & Phát triển Nông thôn (Agribank)',
                    'Ngân hàng TMCP Sài gòn Thương Tín (Sacombank)', 
                    'Ngân hàng TMCP phát triển Tp HCM (HD Bank)'
                ],
                visible: false,
                selectedBank: "---Chọn ngân hàng---",
            };
        },
        methods: {
            submitProfile() {
                this.$emit("submit:accountProfile", this.profileLocal);
            },
            selectOptionBank(bank) {
                this.profileLocal.bank_account = bank;
                this.selectedBank = bank;
                this.visible = false;
            },
            reset () {
                this.profileLocal.phone = "";
                this.profileLocal.name = "";
                this.profileLocal.bank_number = "";
                this.profileLocal.bank_account = "";
            },
        },
    };
</script>