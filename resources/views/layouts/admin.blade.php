

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">


            
        <!-- Bootstrap 3.3.6 -->
        <link href="{{asset('Content/bootstrap/css/bootstrap.css')}}" rel="stylesheet" />
        <!-- Font Awesome
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
        -->
        <!-- Ionicons
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
            -->
        <link href="{{asset('Content/icons/font-awesome.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/icons/ionicons.css')}}" rel="stylesheet" />
        <!-- Theme style -->
        <link href="{{asset('Content/dist/css/styles.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/dist/css/skins/_all-skins.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/prelodr.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/jquery.pnotify.default.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/jquery-confirm.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/bootstrap/daterangepicker.css')}}" rel="stylesheet" />
        <link href="{{asset('Content/bootstrap/bootstrap-datepicker.css')}}" rel="stylesheet" />

        <link href="{{asset('Scripts/Plugins/iCheck/all.css')}}" rel="stylesheet" />
        <link href="{{asset('Scripts/Plugins/select2/select2 3.3.2.css')}}" rel="stylesheet" />

        <script src="{{asset('Scripts/Plugins/jquery.js')}}"></script>
        <script src="{{asset('Scripts/jquery/jquery-ui-1.12.js')}}"></script>
        <script src="{{asset('Scripts/Plugins/bootstrap.js')}}"></script>
        <script src="{{asset('Scripts/Plugins/slimScroll/jquery.slimscroll.min.js')}}"></script>
            <script src="{{asset('Scripts/Plugins/jquery.tukangcoding.js')}}"></script>


        <script src="{{asset('Scripts/Apps/app.js')}}"></script>
        <script src="{{asset('Scripts/_references.js')}}"></script>
        <script src="{{asset('Scripts/_vararray.js')}}"></script>
    </head>
    
   
    <body class="hold-transition sidebar-mini skin-l-gradient fixed ">
        <x-admin.navtop />

                {{ $slot }}
            <div class="wrapper">
                <footer class="main-footer">
                    <div class="pull-right hidden-xs">
                        <b>Version</b> {{app()->version();}}
                    </div>
                    <strong>Copyright &copy; <?php echo Date('Y');?> <a href="http://tukangcoding.net">tukangCoding.net</a></strong> All rights
                    reserved.
                </footer>
            </div>
    </body>

</html>


<script>
    function menuactive_left(id) {
        $('#ul-leftmainmenu li').removeClass('active');
        $('#' + id).addClass('active');
        $('#' + id).parent().parent().addClass('active');
    }

</script>