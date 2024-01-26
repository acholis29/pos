<?php

namespace App\Http\Controllers;
//use App\Models\Post;
use App\Enums\UserRolesEnum;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\DB;
use Livewire\WithPagination;

class EmployeeApi extends Controller
{
     public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
    }
    
    public function index(Request $request)
    {
       // $rateLimit = Limit::perMinute(10)->by(optional(auth()->user())->id ?: request()->ip());
      //  $queryHiddenData = false;
/*
         if (auth()->check() &&
            (auth()->user()->role->id == UserRolesEnum::Employee->value
                || auth()->user()->role->id == UserRolesEnum::Admin->value)) {
            // No rate limit for Employee or Admin
            $rateLimit = Limit::none();
            $queryHiddenData = true;
        }*/



        $emp = DB::table('ms_employee')->where('full_name', 'like', '%'.$request->get('s').'%')->paginate(20);

        return response()->json($emp, 200);

    }
}
