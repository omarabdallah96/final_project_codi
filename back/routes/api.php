<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', ['App\Http\Controllers\AuthController', 'register']);
Route::post('/login', ['App\Http\Controllers\AuthController', 'login']);


//Route::post('/blogs', [\App\Http\Controllers\BlogController::class, 'store']);
//Route::get('/blogs', [\App\Http\Controllers\BlogController::class, 'index']);
//Route::put('/blogs/{id}', [\App\Http\Controllers\BlogController::class, 'update']);
//Route::delete('/blogs/{id}', [\App\Http\Controllers\BlogController::class, 'destroy']);

Route::group(['middleware' => ['jwt.user']], function() {
    Route::post('/logout', ['App\Http\Controllers\AuthController', 'logout']);
    Route::resource('blogs', '\App\Http\Controllers\BlogController');


    Route::resource('orders', '\App\Http\Controllers\OrderController');
    //user post 
    Route::get('userpost/{id}', ['App\Http\Controllers\BlogController', 'userpost']);


});
