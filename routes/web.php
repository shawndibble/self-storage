<?php

use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('users', UserController::class)->except(['edit']);
    Route::resource('size', App\Http\Controllers\SizeController::class);
    Route::resource('storage-unit', App\Http\Controllers\StorageUnitController::class);
    Route::resource('invoice', App\Http\Controllers\InvoiceController::class);
    Route::resource('payment', App\Http\Controllers\PaymentController::class);
});

require __DIR__ . '/auth.php';
