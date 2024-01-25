<?php
use App\Enums\UserRolesEnum;
use app\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::prefix('employee')->group(function () {
        Route::middleware([
                'validateRole:Admin'
            ])->group(function () {
                Route::get('/', function () { return view('bo.employee.index'); })->name('list');
                Route::get('schedule', function () { return view('bo.employee.schedule'); })->name('schedule');
            });
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('/',[\App\Http\Controllers\DashboardHomeController::class,'index'])->name('dashboard');
       
        //----- khusus admin
            Route::middleware([
                'validateRole:Admin'
            ])->group(function () {
                
                Route::resource('users', App\Http\Controllers\UserController::class)->name('index', 'manageusers');

               
            });

        //---- khusus admin, employee
        Route::middleware([
            'validateRole:Admin,Employee'
        ])->group(function () {
            Route::middleware([
                        'validateRole:Admin,Employee'
                    ])->group(function () {
                        

                        Route::prefix('bo')->group( function () {
                            

                            Route::get('deals', function () {
                                return view('dashboard.manage-deals.index');
                            })->name('managedeals');

                            Route::get('categories', function () {
                                return view('dashboard.manage-categories.index');
                            })->name('managecategories' );

                            Route::get('categories/create', function () {
                                return view('dashboard.manage-categories.index');
                            })->name('managecategories.create');

                            Route::get('appointments', function () {
                                return view('dashboard.manage-appointments.index');
                            })->name('manageappointments');
                        } );




                    });

        });


        //---- khusus Customer
        Route::middleware([
            'validateRole:Customer'
        ])->group(function () {
            Route::prefix('cart')->group( function () {
                Route::get('/', [App\Http\Controllers\CartController::class, 'index'])->name('cart');
                //Route::post('/', [App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
                //Route::delete('/item/{cart_service_id}', [App\Http\Controllers\CartController::class, 'removeItem'])->name('cart.remove-item');
                //Route::delete('/{id}', [App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');
                //Route::post('/checkout', [App\Http\Controllers\CartController::class, 'checkout'])->name('cart.checkout');
            });
        });


    });
    /*
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
    */


});
