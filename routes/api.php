<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    
    Route::prefix('employee')->group( function () {
            // Route::get('/', [\App\Http\Controllers\ServicesAPI::class, 'index'])->name('api-services.index');
                //Route::get('/{id}', [\App\Http\Controllers\ServicesAPI::class, 'show'])->name('api-services.show');
                //Route::put('/{id}', [\App\Http\Controllers\ServicesAPI::class, 'update'])->name('api-services.update');
                //Route::delete('/{id}', [\App\Http\Controllers\ServicesAPI::class, 'destroy'])->name('api-services.destroy');
                Route::post('/', [\App\Http\Controllers\EmployeeApi::class, 'index'])->name('api-list');
            
            });
});


 