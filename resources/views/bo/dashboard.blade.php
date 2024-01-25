@php
    use App\Enums\UserRolesEnum;
    $role = UserRolesEnum::from(Auth::user()->role_id)->name;
@endphp
<x-admin.apps>
            

    <x-slot name="header">
            {{ __('Dashboard') }}
    </x-slot>
    
</x-admin.apps>