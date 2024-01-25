@php
    use App\Enums\UserRolesEnum;
    $role = UserRolesEnum::from(Auth::user()->role_id)->name;
@endphp
<x-admin.apps>
            

    <x-slot name="header">
            {{ __('Schedule') }}
    </x-slot>
    
</x-admin.apps>