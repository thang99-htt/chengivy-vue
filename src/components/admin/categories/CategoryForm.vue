<template>
    <Form 
        @submit="submitCategory" 
        :validation-schema="categoryFormSchema"
    >
        <div class="form-group">
            <label for="name">Danh mục cha
                <span class="error-feedback">*</span>
            </label>
            <div class="aselect" :data-value="value" :data-list="categories">
                <div class="selector" @click="visible = !visible">
                    <div class="label">
                        <span>{{ valueSelect }}</span>
                    </div>
                    <div class="arrow" :class="{ expanded : visible }"></div>
                    <div :class="{ hidden : !visible, visible }">
                        <div class="selector-container">
                            <ul>
                                <li 
                                    :class="{ current : category.id == valueSelect }" 
                                    v-for="(category, index) in categories" 
                                    :key="category.id" :value="category.id" 
                                    @click.stop="selectOption(category)"
                                >
                                    {{ category.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="name">Tên danh mục
                <span class="error-feedback">*</span>
            </label>
            <Field name="name" type="text" class="form-control" v-model="categoryLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <div>
                <Field name="image" type="file" class="frm-file" accept="image/*" @change="onFileChange"
                    v-model="categoryLocal.image" id="my-file" />
            </div>
            <div>
                <img :src="(this.category.image)" alt="Hình ảnh" class="img-edit img-responsive center-block">
            </div>
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả
                <span class="error-feedback">*</span>
            </label>
            <Field class="form-control" as="textarea" name="description" v-model="categoryLocal.description" rows="4" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <button type="button" class="btnAdd" @click="submitCategory">
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
import CategoryService from "@/services/admin/category.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:category", "delete:category"],
    props: {
        category: { type: Object, required: true },
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(1000, "Mô tả có nhiều nhất 1000 ký tự."),
        });
        return {
            categoryLocal: this.category,
            categoryFormSchema,
            categories: [],
            valueSelect: 'NULL',
            visible: false
        };
    },
    watch: {
        'category'(newValue) {
            this.categoryLocal = newValue;
            if (this.categoryLocal) {
                const selectedCategory = this.categories.find(category => category.id == this.categoryLocal.parent_id);
                this.valueSelect = selectedCategory ? selectedCategory.name : 'NULL';
            }
        },
    },
    mounted() {
        CategoryService.getAdd().then((response) => {
            const nullCategory = { id: 0, name: 'NULL' };
            this.categories = [nullCategory, ...response];
            this.checkCategoryLocal();
        });
    },
    methods: {
        onFileChange(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.categoryLocal.image = reader.result;
            }
            // console.log(file);
            reader.readAsDataURL(file);
        },
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/categories/' + image;
        },
        submitCategory() {
            this.categoryLocal.url = this.categoryLocal.name.toLowerCase().replace(/\s+/g, '-');
            this.$emit("submit:category", this.categoryLocal);
        },
        deleteCategory() {
            this.$emit("delete:category", this.categoryLocal.id);
        },
        reset() {
            this.categoryLocal.parent_id = "";
            this.categoryLocal.name = "";
            this.categoryLocal.description = "";
            this.categoryLocal.url = "";
        },
		selectOption(category) {
            this.valueSelect = category.name;
            this.categoryLocal.parent_id = category.id;
            this.visible = false;
		}
    },
};
</script>
<style scoped>
.img-edit {
    width: 100px;
    margin: 10px 0 0 0;
}

.select {
    appearance: auto;
}</style>
