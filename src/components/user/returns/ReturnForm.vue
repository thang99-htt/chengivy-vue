<template>
    <Form>
        <div class="form-group">
            <div class="form-group__container">
                <div class="form-group__label">
                    <label for="reason">Lý do:
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <div class="aselect" :data-value="value" :data-list="reasons">
                            <div class="selector" @click="visible = !visible">
                                <div class="label">
                                        <span>{{ selectedReason }}</span>
                                </div>
                                <div class="arrow" :class="{ expanded : visible }"></div>
                                <div :class="{ hidden : !visible, visible }">
                                    <div class="selector-container">
                                        <ul>
                                            <li 
                                                :class="{ current : reason.name === selectedReason }" 
                                                v-for="(reason) in reasons" 
                                                :key="reason" :value="reason" 
                                                @click.stop="selectOptionReason(reason)"
                                            >
                                                {{ reason }}
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
                    <label for="description">Mô tả:
                        <span class="error-feedback">*</span>
                    </label>
                </div>
                <div class="form-group__input">
                    <div class="input-group">
                        <textarea 
                            :name="'conten' + index"
                            v-model="returnLocal.description" cols="80" rows="5" 
                            placeholder="Ghi chú thêm."
                        ></textarea>
                    </div>
                    <ErrorMessage name="description" class="error-feedback" />       
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="return-image">
                <div class="return-image__input" style="width: 100px; height: 100px;">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 14C7.51472 14 5.5 11.9853 5.5 9.5C5.5 7.01472 7.51472 5 10 5C12.4853 5 14.5 7.01472 14.5 9.5C14.5 11.9853 12.4853 14 10 14ZM10 12.5C8.34315 12.5 7 11.1569 7 9.5C7 7.84315 8.34315 6.5 10 6.5C11.6569 6.5 13 7.84315 13 9.5C13 11.1569 11.6569 12.5 10 12.5Z" fill="black" fill-opacity="0.65"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.22243 1.83333L6.88397 0H13.116L14.7776 1.83333H17.3846C18.828 1.83333 20 2.99717 20 4.41667V15.4167C20 16.8362 18.828 18 17.3846 18H2.61538C1.17197 18 0 16.8362 0 15.4167V4.41667C0 2.99717 1.17197 1.83333 2.61538 1.83333H5.22243ZM5.88737 3.33333L7.5489 1.5H12.4511L14.1126 3.33333H17.3846C18.0147 3.33333 18.5 3.84064 18.5 4.41667V15.4167C18.5 15.9927 18.0147 16.5 17.3846 16.5H2.61538C1.98527 16.5 1.5 15.9927 1.5 15.4167V4.41667C1.5 3.84064 1.98527 3.33333 2.61538 3.33333H5.88737Z" fill="black" fill-opacity="0.65"></path></svg>
                    <div class="return-image__text">
                        <div>Thêm Hình ảnh</div>
                        <div>({{ returnLocal.images.length }}/6)</div>
                    </div>
                    <input type="file" 
                            @change="handleImageReturn($event)"
                            multiple
                            accept="image/*" value="" style="width: 100px;height: 100px;">
                </div>
                <div v-if="returnLocal.images" class="return-image__list">
                    <span v-for="image in returnLocal.images" :key="image">
                        <img :src="image" alt="Hình ảnh" class="img-edit img-responsive center-block me-2">
                    </span>
                </div>
            </div>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { formatPrice } from '@/utils';
    import { mapGetters } from "vuex";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            returns: { type: Object, required: true },
        },
        data() {
            return {
                returnLocal: this.returns,
                reasons: [
                    'Thiếu hàng', 
                    'Người bán gửi sai hàng', 
                    'Hàng lỗi', 
                    'Hàng khác với mô tả',
                    'Thùng hàng rỗng', 
                    'Chưa nhận được hàng'
                ],
                visible: false,
                selectedReason: "---Chọn lý do---",

            };
        },
        methods: {
            selectOptionReason(reason) {
                this.returnLocal.reason = reason;
                this.selectedReason = reason;
                this.visible = false;
            },
            handleImageReturn(event) {
                let files = event.target.files;
                let reader;

                // Kiểm tra nếu số lượng ảnh đã chọn vượt quá 6, thì không thêm nữa
                if (files.length > 6) {
                    alert("Chỉ được chọn tối đa 6 ảnh.");
                    return;
                }
                
                this.returnLocal.images = [];

                for (let i = 0; i < 6; i++) {
                    reader = new FileReader();
                    reader.onload = (e) => {
                        this.returnLocal.images.push(e.target.result);
                    };
                    
                    reader.readAsDataURL(files[i]);
                }  
            },   
            formatPrice,
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    };
</script>

<style scoped>
.form-group .form-group__container .form-group__input .input-group .form-control {
    border-right: 1px solid #ccc;
}
textarea {
    border: 1px solid #ccc;
    padding: 6px 12px;
}
.form-group .form-group__container .form-group__label {
    width: unset;
}

.form-group .form-group__container .form-group__label label {
    font-weight: normal;
}

.return-image {
    min-height: 120px;
    height: auto;
    margin-top: 20px;
}
.return-image__input {
    padding: 4px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px dashed rgba(0,0,0,.26);
    border-radius: 4px;
    display: inline-flex;
    vertical-align: middle;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    float: right;
    margin-right: 86px;
}

.return-image__text {
    width: 100%;
    padding: 7px 0 0;
    color: rgba(0,0,0,.4);
    font-size: 12px;
    line-height: 14px;
    word-wrap: break-word;
    text-align: center;
}

.return-image__input>input {
    opacity: 0;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    cursor: pointer;
    font-size: 0;
    line-height: 0;
}
.return-image__list {
    margin-left: 220px;
}
.return-image__list img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>
