import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'

export function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " đ";
}

export function getImageCat(image){
    return 'http://127.0.0.1:8000/storage/uploads/categories/'+image;
}

export function getImage(image){
    return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
}

export function initializeDataTable() {
    $(".example1").DataTable({
      "language": {
        "search": "Tìm kiếm:",
        "loadingRecords": "Đang tải...",
        "zeroRecords": "Không tìm thấy kết quả",
        "lengthMenu": "Hiển thị _MENU_ dòng",
        "info": "<b>Tổng số:</b> _TOTAL_ dòng",
        "infoEmpty": "Không có dòng nào",
        "infoFiltered": "(được lọc từ tổng số _MAX_ dòng)",
        "paginate": {
          "first": "Đầu tiên",
          "last": "Cuối",
          "next": "Tiếp",
          "previous": "Trước"
        }
      }
    });
  }
  
  
  
  
  