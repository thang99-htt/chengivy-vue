<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import 'datatables.net'
    import 'datatables.net-bs'

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            roles: { type: Array, default: [] },
        },
        data() {
            return {
                resouces: [
                    {id: 1, name: 'Vai trò'},
                    {id: 2, name: 'Quyền'},
                    {id: 3, name: 'Nhân viên'},
                    {id: 4, name: 'Thể loại'},
                    {id: 5, name: 'Sản phẩm'},
                    {id: 6, name: 'Đơn hàng'},
                ],
            };
        },
    }
</script>
<template>
    <div class="row mb-5 ms-2">
        <div class="col-2">
            <Field 
                name="staff" as="select"
                class="form-control select"
            >
                <option disabled value="">Chọn vai trò</option>
                <option v-for="role in this.roles"
                    :key="role" 
                    :value="role.id"
                >
                    {{ role.name }}
                </option>
                
            </Field>  
            <ErrorMessage name="staff" class="error-feedback" />
        </div>
    </div>

    <table
        aria-describedby="example1_info" role="grid" 
        class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tài nguyên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Đọc</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tạo mới</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Cập nhật</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(index) in resouces"
        >
            <td class="sorting_1" >
               {{ index.id }}
            </td>
            <td>{{ index.name }}</td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
        </tr>
      </tbody>
    </table>
</template>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');
    .btn-permisison,
    .btn-staff {
        width: 140px;
        background-color: #1ed085;
        margin: 6px 4px;
        border-radius: 4px;
        display: inline-block;
        padding: 0 4px;
    }
    
</style>