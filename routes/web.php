<?php

use App\Http\Controllers\CitasController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Ruta del dashboard protegida por rol
Route::middleware(['auth', 'role:Admin|Doctor|Patient'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Rutas protegidas para gestión de pacientes (Admin y Doctor)
Route::middleware(['auth', 'role:Admin|Doctor'])->group(function () {
    Route::get('/pacientes', [UserController::class, 'index'])->name('pacientes');
    Route::post('/pacientes', [UserController::class, 'store'])->name('pacientes.store');
    Route::get('/pacientes/{id}/edit', [UserController::class, 'edit'])->name('pacientes.edit');
    Route::put('/pacientes/{id}', [UserController::class, 'update'])->name('pacientes.update');
    Route::delete('/pacientes/{id}', [UserController::class, 'destroy'])->name('pacientes.destroy');
});

// Rutas protegidas para gestión de citas (Admin y Doctor)
Route::middleware(['auth', 'role:Admin|Doctor'])->group(function () {
    Route::get('/citas', [CitasController::class, 'index'])->name('citas');
    Route::get('/cita/{id}', [CitasController::class, 'show'])->name('cita.show');
    Route::get('/agendar-cita', [CitasController::class, 'create'])->name('citas.create');
    Route::post('/cita', [CitasController::class, 'store'])->name('citas.store');
    Route::get('/cita/{id}/edit', [CitasController::class, 'edit'])->name('citas.edit');
    Route::put('/cita/{id}', [CitasController::class, 'update'])->name('citas.update');
    Route::delete('/cita/{id}', [CitasController::class, 'destroy'])->name('citas.destroy');
    Route::get('/historial_citas', [CitasController::class, 'historial_citas'])->name('historial_citas');
});

Route::middleware(['auth', 'role:Admin|Doctor|Patient'])->group(function () {
    Route::get('/historial_citas', [CitasController::class, 'historial_citas'])->name('historial_citas');
});


// Rutas para perfil del usuario (accesibles por cualquier usuario autenticado)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Autenticación
require __DIR__.'/auth.php';
