<x-app-layout>

  <div class="py-12">
        <x-slot name="header">
            @isset($header)
                {{ $header }}
            @endisset

        </x-slot>


        {{-- Nav links should be passed from here  --}}
        <x-slot name="navlinks">
            <x-dashboard.navlinks />
        </x-slot>

        <div id="dashboard-grid" style="display: grid; grid-template-columns: 1fr 4fr;">
            {{-- Sidebar --}}
        </div>
  </div>
</x-app-layout>
