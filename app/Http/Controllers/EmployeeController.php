<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    //

    public function index(Request $r){

        
        $p= $r['p'] ? $r['p'] : 100;
        $emp = DB::table('ms_employee')->where('full_name', 'like', '%'.$r['s'].'%')
        ->orderBy('full_name', 'asc')
        ->paginate($p);

            return view('bo.employee.index', compact('emp'));
    }

     public function schedule(){
            return view('bo.employee.schedule');
    }
}
