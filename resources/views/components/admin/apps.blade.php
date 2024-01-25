<x-admin-layout>
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

                    {{ $slot }}


                </section>
            </div>
     
</x-admin-layout>