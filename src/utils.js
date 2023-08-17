import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'

export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
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
      },
    },
    "order": [],
    pagination: true,
    lengthMenu: [10, 20, 50, 100],
    pageLength: 10,
  });
  // var table = $(".example1").DataTable({
  //   "language": {
  //     "search": "Tìm kiếm:",
  //     "loadingRecords": "Đang tải...",
  //     "zeroRecords": "Không tìm thấy kết quả",
  //     "lengthMenu": "Hiển thị _MENU_ dòng",
  //     "info": "<b>Tổng số:</b> _TOTAL_ dòng",
  //     "infoEmpty": "Không có dòng nào",
  //     "infoFiltered": "(được lọc từ tổng số _MAX_ dòng)",
  //     "paginate": {
  //       "first": "Đầu tiên",
  //       "last": "Cuối",
  //       "next": "Tiếp",
  //       "previous": "Trước"
  //     }
  //   },
  //   pagination: true,
  //   lengthMenu: [10, 20, 50, 100],
  //   pageLength: 10,
  // });
  // $('#exportExcelBtn').on('click', function () {
  //   exportTableToExcel(table);
  // });
  // $('#exportPrintBtn').on('click', function () {
  //   window.print();
  // });
}
function exportTableToExcel(table) {
  // Lấy các thông tin cần thiết từ DataTable
  var data = table.rows().data().toArray();
  var header = table.columns().header().toArray().map(function (el) {
    return $(el).text();
  });

  // Chỉ lấy các giá trị văn bản từ dữ liệu và bỏ qua hai cột cuối
  var textData = data.map(function (row) {
    return row.slice(0, -2).map(function (cell) {
      if (typeof cell === 'object' && cell !== null && cell.hasOwnProperty('textContent')) {
        // Kiểm tra nếu ô là một nút button
        var button = $(cell).find('button');
        if (button.length > 0) {
          return button.text();
        }
        return cell.textContent.trim();
      }
      return cell.toString();
    });
  });

  // Tạo một workbook mới
  var workbook = XLSX.utils.book_new();

  // Tạo một worksheet mới và đưa dữ liệu vào
  var worksheetData = [header.slice(0, -2)].concat(textData);
  var worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  // Xuất file Excel
  var today = new Date();
  var fileName = "data_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
  XLSX.writeFile(workbook, fileName);
}

export function showAlert(response) {
  const alertPlaceholder = document.getElementsByClassName('liveAlert')[0];
  const message = response.message;
  const type = response.success;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  alertPlaceholder.appendChild(wrapper);

  setTimeout(function() {
    wrapper.style.transition = 'opacity 1s';
    wrapper.style.opacity = '0';
    setTimeout(function() {
      wrapper.remove();
    }, 1000);
  }, 3000);
}




