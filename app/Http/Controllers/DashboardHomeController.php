<?php

namespace App\Http\Controllers;

use app\Enums\UserRolesEnum;
use Illuminate\Http\Request;

class DashboardHomeController extends Controller
{
    public function index(){
        if (auth()->user()->role_id !=='99'){
            return view('dashboard.cust');
        }else{
            return view('dashboard.admin-empl');

        };
    }
}
