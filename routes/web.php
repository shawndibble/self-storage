<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\StorageUnitController;
use App\Http\Controllers\UserController;
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

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('user', UserController::class)->except(['edit']);
    Route::resource('size', SizeController::class)->except(['edit']);
    Route::resource('storage-unit', StorageUnitController::class)->except(['edit']);
    Route::resource('invoice', InvoiceController::class)->except(['edit']);
    Route::resource('payment', PaymentController::class)->except(['edit']);
});

require __DIR__ . '/auth.php';
