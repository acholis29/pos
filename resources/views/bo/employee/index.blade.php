@php
    $userRole = Auth::User()?->role()->first()->name;
@endphp

<x-admin.apps>
            

    <x-slot name="header">
            {{ __('Employee') }}
    </x-slot>
    
        <div class="row-fluid">
                <div class="box box-info">
                        <div class="box-header with-border">
                                <h3 class="box-title">Employee </h3>
                                <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" title="Create Employee" ng-click="add()"><i class="fa fa-plus"></i></button>
                                </div>
                        </div>
                </div>
        </div>

</x-admin.apps>

<script>
        var formData = new FormData();
   
        menuactive_left('li-msemployee');

        $.ajaxSetup({
        headers: {
               // 'X-CSRF-Token': '{{ csrf_token() }}',
                'Authorization': 'Bearer sx2yYMGTSxdyrBWLP7X9TpKyDj0c7D91wxEtdHstb023491e'
                },
        });
        /*
        $.ajax({
                
        url: "api/tokens/create",
        method: 'POST',
        data:{ user: "{{$userRole}}"},
        success: function(data) {
           console.log(data)
        }});
        */

        $.ajax({
        
        url: "api/employee",
        method: 'POST',
        data: {page:1,s:'cholis'},
        success: function(data) {
           console.log(data)
        },
        error: function(data) {
            // If you got an error code.
        }
    }); 
</script>