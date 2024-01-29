$(document).ready(function () {
    menuactive_left("li-msemployee");

    $.ajaxSetup({
        headers: {
            // 'X-CSRF-Token': '{{ csrf_token() }}',
            Authorization:
                "Bearer sx2yYMGTSxdyrBWLP7X9TpKyDj0c7D91wxEtdHstb023491e",
        },
    });
    $.ajax({
        url: "api/employee",
        method: "POST",
        data: { page: 1, s: "" },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            // If you got an error code.
        },
    });
});
