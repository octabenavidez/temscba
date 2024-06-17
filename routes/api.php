<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscotecaController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\ValoracionController;
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


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


Route::get('/boliches', [DiscotecaController::class, 'index']);
Route::get('/boliches/{id}', [DiscotecaController::class, 'show']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users/points', [PointsController::class, 'getUserPoints']);
    Route::get('/', [PointsController::class, 'getUserRating']);

    Route::get('/rewards', [PointsController::class, 'getAllRewards']);
    Route::post('/rewards/claim-reward/{id}', [PointsController::class, 'claimReward']);
    Route::get('/rewards/{id}/boliches', [PointsController::class, 'showRelatedDiscotecas']);
    
    Route::post('/boliches/{discoteca}/valoration/{valorationNumber}', [ValoracionController::class, 'store']);
    Route::get('/boliches/{discoteca}/user-valoration', [ValoracionController::class, 'getUserRating']);
});


Route::group(['middleware' => ['auth:sanctum', 'is_admin']], function () {
    Route::get('/check-auth', function (Request $request) {
        return response()->json(['authenticated' => true], 200);
    });
    
    Route::post('/imagenes-boliches', [ImagenController::class, 'store']);
    Route::delete('/imagenes-boliches/{id}', [ImagenController::class, 'destroy']);
    
    Route::post('/boliches', [DiscotecaController::class, 'store']);
    Route::put('/boliches/{discoteca}', [DiscotecaController::class, 'update']);
    Route::delete('/boliches/{discoteca}', [DiscotecaController::class, 'destroy']);
    Route::post('/boliches/{discoteca}/rewards', [DiscotecaController::class, 'associateRewards']);

    Route::get('/admin/users', [AuthController::class, 'getUsers']);
    Route::get('/admin/users/{user}/rewards', [PointsController::class, 'getUserRewardClaims']);
    Route::get('/admin/users/rewards', [PointsController::class, 'getRecentRewardClaims']);
    Route::post('/admin/update-user-points', [PointsController::class, 'updateUserPoints']);
    
    Route::post('/admin/rewards', [PointsController::class, 'storeReward']);
    Route::put('/admin/rewards/{premio}', [PointsController::class, 'updateReward']);
    Route::get('/admin/rewards/{premio}', [PointsController::class, 'showReward']);
    Route::delete('/admin/rewards/{premio}', [PointsController::class, 'destroyReward']);
});


