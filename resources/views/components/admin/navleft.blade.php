@php
    $userRole = Auth::User()?->role()->first()->name;
@endphp

<script>
    function menuactive_left(id) {
        $('#ul-leftmainmenu li').removeClass('active');
        $('#' + id).addClass('active');
        $('#' + id).parent().parent().addClass('active');
    }

</script>

<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="/img/avatar04.png" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>{{$userRole }}
            </p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
    </div>
    <!-- search form -->
    <form action="#" method="get" class="sidebar-form hide">
        <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                    <i class="fa fa-search"></i>
                </button>
            </span>
        </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul id="ul-leftmainmenu" class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li class="active treeview">
            <a href="/">
                <i class="fa fa-dashboard"></i> <span>Dashboard</span>
            </a>
        </li>
        <li class="treeview">
            <a href="#">
                <i class="fa fa-users"></i>
                <span>Employee</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
                <li id='li-msemployee'><a href="/employee/"><i class="fa fa-circle-o"></i> Employee</a></li>
                <li id='li-msschedule'><a href="/employee/schedule"><i class="fa fa-circle-o"></i> Schedule</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Deposit</a></li>
            </ul>
        </li>
        
        <li class="treeview">
            <a href="#">
                <i class="fa fa-cubes"></i>
                <span>Sales</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
                <li id='li-mssales'>
                    <a href="#"><i class="fa fa-circle-o"></i> Master</a>
                    <ul class="treeview-menu">
                        <li id='li-msroom'><a href="/Sales/#!/room"><i class="fa fa-circle-o"></i>Room</a></li>
                        <li id='li-msnationality'><a href="/Sales/#!/nationality"><i class="fa fa-circle-o"></i>Nationality</a></li>
                        <li id='li-msprodcate'><a href="/Sales/#!/category"><i class="fa fa-circle-o"></i>Product Category</a></li>
                    </ul>
                </li>
                <li id='li-msprod'>
                    <a href="/Sales/MSProduct/#!/"><i class="fa fa-circle-o"></i> Product</a>
                    <!--<ul class="treeview-menu">
        <li id='li-msprodlist'><a href=""><i class="fa fa-circle-o"></i>List Product</a></li>
    </ul>-->
                </li>
                <li id='li-msagent'>
                    <a href="/Agent/MsAgent/#!/"><i class="fa fa-circle-o"></i> Agent</a>
                    <!--<ul class="treeview-menu">
                        <li id='li-custList'><a href="/Agent/MsAgent/#!/"><i class="fa fa-circle-o"></i> List Agent</a></li>
                        <li id='li-agncontract'><a href="/Agent/Contract/#!/"><i class="fa fa-circle-o"></i> Contract</a></li>
                    </ul>-->
                </li>

            </ul>
        </li>

        <li class="treeview">
            <a href="#">
                <i class="fa fa-area-chart"></i>
                <span>Accounting</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">

                <li id='li-custList'><a href="/Customer/"><i class="fa fa-circle-o"></i> Invoice</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> History</a></li>
                <li id='li-msacct'>
                    <a href="#"><i class="fa fa-circle-o"></i> Master</a>
                    <ul class="treeview-menu">
                        <li id='li-msgrpitem'><a href="#"><i class="fa fa-circle-o"></i>Account Number</a></li>
                    </ul>
                </li>
            </ul>
        </li>

        <li class="treeview">
            <a href="#">
                <i class="fa fa-print"></i>
                <span>Reports</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
                <li><a href="/Reports/Booking"><i class="fa fa-circle-o"></i> List Customers</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> History</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Deposit</a></li>
            </ul>
        </li>

        <li class="treeview">
            <a href="#">
                <i class="fa fa-database"></i>
                <span>Master</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
                <li id='li-msitems'>
                    <a href="/Master/Items/#!/"><i class="fa fa-circle-o"></i>Items</a>
                    <ul class="treeview-menu">
                        <li id='li-msgrpitem'><a href="/Master/Items/#!/msgroup"><i class="fa fa-circle-o"></i>Master Group</a></li>
                        <li id='li-msitem'><a href="/Master/Items/#!/"><i class="fa fa-circle-o"></i>Master Items SKU</a></li>
                    </ul>
                </li>
                <li id='li-room'><a href="/Sales/Default/#!/room"><i class="fa fa-circle-o"></i> Room and bed</a></li>

            </ul>
        </li>

        <li class="treeview">
            <a href="javascript:void(0)">
                <i class="fa fa-gear"></i>
                <span>Config</span>
                <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
                <li id='li-confgeneral'><a href="/config/#!/"><i class="fa fa-circle-o"></i>General</a></li>
                <li id='li-confaccounts'><a href="/config/#!/accounts"><i class="fa fa-circle-o"></i>Accounts</a></li>
                <li id='li-confmsgeo'><a href="/config/#!/msgeography"><i class="fa fa-circle-o"></i>Geography</a></li>
                <li id='li-confsystem'><a href="/config/#!/system"><i class="fa fa-circle-o"></i>System</a></li>

            </ul>
        </li>
        <li id='li-website'>
            <a href="/">
                <i class="fa fa-globe"></i>
                <span>Website</span>
            </a>
        </li>
        <li><a href="#"><i class="fa fa-book"></i> <span>Documentation</span></a></li>

    </ul>
</section>
<!-- /.sidebar -->
</aside>