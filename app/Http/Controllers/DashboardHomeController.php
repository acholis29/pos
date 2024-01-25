<?php

namespace App\Http\Controllers;

use app\Enums\UserRolesEnum;
use Illuminate\Http\Request;

class DashboardHomeController extends Controller
{
    public function index(){
        $role=auth()->user()->role_id;
       

        switch ($role) {
       
        case '1':
            return view('dashboard.cust');
            break;
        default:
            return view('bo.dashboard');
        }
    }
}
