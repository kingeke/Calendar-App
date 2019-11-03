<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return response()->json([
        'status' => 'online',
        'version' => '1.0'
    ]);
});

//profile routes
Route::group(['prefix' => 'profile', 'middleware' => 'auth:users'], function () {
    require base_path('routes/api/profile.php');
});

//auth routes
Route::group(['prefix' => 'auth'], function () {
    require base_path('routes/api/auth.php');
});

//appointment routes
Route::group(['middleware' => 'auth:users'], function () {
    require base_path('routes/api/appointments.php');
});
