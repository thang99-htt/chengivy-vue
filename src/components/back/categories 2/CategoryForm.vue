<template>
    <Form
        @submit="submitCategory"
        :validation-schema="categoryFormSchema"
    > 
        <div class="form-group">
            <label for="parent_id">Danh mục cha
                <span class="error-feedback">*</span>
            </label>       
            <Field 
                name="parent_id" as="select"
                 class="form-control"
                v-model="categoryLocal.parent_id"
            >
                <option value="0">NULL</option>
                <option v-for="(category, index) in categories"
                    :key="category" 
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </Field>  
            <ErrorMessage name="parent_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên
                <span class="error-feedback">*</span>
            </label>
            <Field 
                name="name"
                type="text"
                class="form-control"
                v-model="categoryLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <Field 
                name="image"
                type="file"
                class="form-control frm-file"
                accept="image/*"
                @change="onFileChange"
                v-model="categoryLocal.image"
            />
            <img v-if="image" :src="getImage(image)"
                 alt="Image" class="img-edit img-responsive center-block">
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="categoryLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="url">Đường dẫn
                <span class="error-feedback">*</span>
            </label>
            <Field
                name="url"
                type="text"
                class="form-control"
                v-model="categoryLocal.url"
            />
            <ErrorMessage name="url" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="me-2 btn btn-success">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button
                v-if="categoryLocal.id"
                type="button"
                class="btn btn-danger"
                @click="deleteCategory"
            >
                <i class="fas fa-trash"></i> Xóa
            </button>
            <button
                v-else
                class="btn btn-primary"
                @click="reset"
            >
                <i class="fas fa-redo"></i> Hủy
            </button>
        </div>
    </Form> 
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import CategoryService from "@/services/back/category.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:category", "delete:category"],
        props: {
            category: { type: Object, required: true }
        },
        mounted() {
            CategoryService.getAdd().then((response) => {
                this.categories = response;
            });
        },
        data() {
            const categoryFormSchema = yup.object().shape({
                parent_id: yup
                .string()
                .required("Danh mục cha phải được chọn."),
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
                url: yup
                .string()
                .required("Đường dẫn phải có giá trị."),
            });
            return {
                // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
                // categoryLocal để liên kết với các input trên form
                categoryLocal: this.category,
                categoryFormSchema,
                categories: [],
                image: this.category.image,
            };
        },
        methods: {
            onFileChange(event){
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.categoryLocal.image = reader.result;
                }
                console.log(file);
                reader.readAsDataURL(file);
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/categories/'+image;
            },
            submitCategory() {
                this.$emit("submit:category", this.categoryLocal);
            },
            deleteCategory() {
                this.$emit("delete:category", this.categoryLocal._id);
            },
            reset () {
                this.categoryLocal.parent_id = "";
                this.categoryLocal.name = "";
                this.categoryLocal.description = "";
                this.categoryLocal.url = "";
            },
        },
    };
</script>

<style scoped>
    .img-edit {
        width: 100px;
        margin: 10px 0 0 0;
    }
</style>
