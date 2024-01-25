@php
    use App\Enums\UserRolesEnum;
    $role = UserRolesEnum::from(Auth::user()->role_id)->name;
@endphp


<x-admin.dashboard>
    <x-admin.navleft />
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                @if (isset($header))
                    <section class="content-header">
                    <h1>
                        {{ $header }}
                    </h1>
                       

                  
                    
                </section>
                @endif
                
                <!-- Main content -->
                <section class="content">



                </section>
            </div>

    
</x-admin.dashboard>