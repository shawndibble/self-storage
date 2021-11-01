<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SettingsController;
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
    Route::resource('users', UserController::class)->except(['edit']);
    Route::resource('sizes', SizeController::class)->except(['edit']);
    Route::resource('storage-units', StorageUnitController::class)->except(['edit']);
    Route::resource('invoices', InvoiceController::class)->except(['edit']);
    Route::resource('payments', PaymentController::class)->except(['edit']);
    Route::resource('settings', SettingsController::class);
});

require __DIR__ . '/auth.php';
