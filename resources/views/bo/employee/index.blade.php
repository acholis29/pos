@php
    $userRole = Auth::User()?->role()->first()->name;
     $confirmingServiceDeletion = false;
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
                        <div class="box-body">
                                 <div class="col-lg-12 margin-bottom">
                                        <!-- Check all button -->
                                        <div class="btn-group ">
                                                <button type="button" class="btn btn-default btn-sm" ng-click="add()" title="Create new"><i class="fa fa-file-o"></i></button>
                                                <button type="button" id="btn-delete" class="btn btn-default btn-sm" ng-click="delete()" title="Delete"><i class="fa fa-trash-o"></i></button>
                                        </div>
                                        <!-- /.btn-group -->
                                        <button type="button" class="btn btn-default btn-sm" ng-click="refresh()" title="refresh"><i class="fa fa-refresh"></i></button>
                                </div>
                            <div class=" col-lg-12">

                               
                                <div class="table-responsive">
                                        <table class="table no-margin table-hover table-condensed">
                                                <thead>
                                                <tr>
                                                        <th style="width:30px;"><input type="checkbox" id="chk_selectemp" onclick="toggleChecked(this.checked, this.id, '')" /></th>
                                                        <th style="width:100px;">NIK</th>
                                                        <th>Full Name</th>
                                                        <th>Email</th>
                                                        <th>Mobile</th>
                                                        <th style="width:60px;">Status</th>
                                                </tr>
                                                </thead>
                                                <tbody id="tb_emp">
                                                @foreach ($emp as $a)

                                                <tr ng-repeat="a in dtlist_employee">
                                                        <td><input type="checkbox" class="chk_selectemp" name="chk_selectemp" value="'{{$a->idx_employee}}'" /></td>
                                                        <td>
                                                        {{$a->nik}}

                                                        </td>
                                                        <td><a href="javascript:void(0);" ng-click="edit($even,this)">{{$a->full_name}}</a></td>
                                                        <td><a href="mailto:{{$a->email}}">{{$a->email}}</a></td>
                                                        <td>{{$a->mobile}}</td>
                                                        <td>
                                                        @if ($a->sts_active==1 || $a->sts_active=='true')
                                                                <span class="label label-success" title="Active">A</span>
                                                        @else
                                                                <span  class="label label-danger" title="Deactive">D</span>
                                                        @endif
                                                        @if ($a->sts_freelance==1 || $a->sts_freelance=='true')
                                                        <span ng-if="a.==1 || a.sts_freelance=='true'" class="label label-warning" title="Freelance">F</span>
                                                        @else
                                                        <span ng-if="a.sts_freelance==0 || a.sts_freelance=='false'" class="label label-success" title="Staff">S</span>
                                                        @endif
                                                        @if ($a->sts_handelbooking==1 || $a->sts_handelbooking=='true')
                                                        <span ng-if="a.sts_handelbooking==1 || a.sts_handelbooking=='true'" class="label label-info" title="Therapist">T</span>
                                                        @endif
                                                        </td>
                                                </tr>
                                                @endforeach

                                                </tbody>
                                        </table>
                                </div>
                                <!-- /.table-responsive -->



                            </div>
                        <!-- /.table-responsive -->
                        </div>
                </div>
                
                <!-- /.box-body -->


        </div>

        
</x-admin.apps>

<script src="{{asset('scripts/apps/bo/employee/list.js')}}"></script>