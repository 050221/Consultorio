<?php

use App\Http\Controllers\CitasController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HistorialCitasController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecepcionistaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return to_route(auth()->check() ? 'dashboard' : 'login');
});

/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// RUTA DEL DASHBOARD (Accesible para todos los roles con permisos)
Route::middleware(['auth', 'can:ver_dashboard'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// RUTAS DE PACIENTES (Sólo Admin y Recepcionista)
Route::middleware(['auth', 'can:gestionar_pacientes'])->group(function () {
    Route::get('/pacientes', [UserController::class, 'index'])->name('pacientes');
    Route::post('/pacientes', [UserController::class, 'store'])->name('pacientes.store');
    Route::get('/pacientes/{id}/edit', [UserController::class, 'edit'])->name('pacientes.edit');
    Route::put('/pacientes/{id}', [UserController::class, 'update'])->name('pacientes.update');
    Route::delete('/pacientes/{id}', [UserController::class, 'destroy'])->name('pacientes.destroy');
});

// RUTAS DE CITAS (Admin, Recepcionista y Dentista)
Route::middleware(['auth'])->group(function () {
    Route::get('/citas', [CitasController::class, 'index'])->name('citas')->middleware('can:ver_citas');
    Route::get('/cita/{id}', [CitasController::class, 'show'])->name('cita.show')->middleware('can:ver_citas');
    Route::get('/agendar-cita', [CitasController::class, 'create'])->name('citas.create')->middleware('can:gestionar_citas');
    Route::post('/cita', [CitasController::class, 'store'])->name('citas.store')->middleware('can:gestionar_citas');
    Route::get('/cita/{id}/edit', [CitasController::class, 'edit'])->name('citas.edit')->middleware('can:editar_citas');
    Route::put('/cita/{id}', [CitasController::class, 'update'])->name('citas.update')->middleware('can:editar_citas');
    Route::delete('/cita/{id}', [CitasController::class, 'destroy'])->name('citas.destroy')->middleware('can:cancelar_citas');
});

// RUTAS DE DENTISTAS (Sólo Admin)
Route::middleware(['auth', 'can:gestionar_dentistas'])->group(function () {
    Route::get('/dentistas', [DoctorController::class, 'index'])->name('dentistas');
    Route::get('/dentista/{id}', [DoctorController::class, 'show'])->name('dentista.show');
    Route::get('/dentista-create', [DoctorController::class, 'create'])->name('dentista.create');
    Route::post('/dentista', [DoctorController::class, 'store'])->name('dentista.store');
    Route::get('/dentista/{id}/edit', [DoctorController::class, 'edit'])->name('dentista.edit');
    Route::put('/dentista/{id}', [DoctorController::class, 'update'])->name('dentista.update');
    Route::delete('/dentista/{id}', [DoctorController::class, 'destroy'])->name('dentista.destroy');
});

// RUTAS DE RECEPCIONISTAS (Sólo Admin)
Route::middleware(['auth', 'can:gestionar_pacientes'])->group(function () {
    Route::get('/recepcionista', [RecepcionistaController::class, 'index'])->name('recepcionistas');
    Route::get('/recepcionista/{id}', [RecepcionistaController::class, 'show'])->name('recepcionista.show');
    Route::get('/recepcionista-create', [RecepcionistaController::class, 'create'])->name('recepcionista.create');
    Route::post('/recepcionista', [RecepcionistaController::class, 'store'])->name('recepcionista.store');
    Route::get('/recepcionista/{id}/edit', [RecepcionistaController::class, 'edit'])->name('recepcionista.edit');
    Route::put('/recepcionista/{id}', [RecepcionistaController::class, 'update'])->name('recepcionista.update');
    Route::delete('/recepcionista/{id}', [RecepcionistaController::class, 'destroy'])->name('recepcionista.destroy');
});

// RUTA DE HISTORIAL CLÍNICO (Dentista y Paciente)
Route::middleware(['auth', 'can:ver_expedientes'])->group(function () {
    Route::get('/historial', [HistorialCitasController::class, 'index'])->name('historial');
});




// Autenticación
require __DIR__ . '/auth.php';
