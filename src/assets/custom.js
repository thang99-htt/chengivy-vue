$(document).ready(function() {
    

    // Update Category Status
    $('.updateCategoryStatus').click(function() {
        var status = $(this).children("svg").attr("status");
        var category_id = $(this).attr("category_id");
        $.ajax({
            headers: { 
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
            },
            method:'POST',
            url:'/admin/update-category-status',
            data:{status:status, category_id:category_id},
            success:function(resp) {
                if(resp['status']==1) {
                    $("#category-"+category_id).html('<svg status="Inactive" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/></svg>');
                } else if(resp['status']==0) {
                    $("#category-"+category_id).html('<svg status="Active" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>');
                }
            }, error:function() {
                // url:'all';
                alert("Error");
            }
        });
    });
    
});