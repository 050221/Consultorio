<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $citas = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
        ->select('id', 'patient_id', 'fecha', 'hora', 'status', 'nota')
        ->get();
        

        $perPage =  5;
        $citasHoy = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
        ->where('fecha', today()) 
        ->select('id', 'patient_id', 'fecha', 'hora', 'status', 'nota')
        ->paginate($perPage);

        $nuevosPacientesMes = User::whereMonth('created_at', now()->month)
        ->whereYear('created_at', now()->year)
        ->count();
    

        return Inertia::render('Dashboard', [
            'citas' => $citas,
            'citasHoy'=> $citasHoy,
            'perPage' => $perPage,
            'nuevosPacientesMes' => $nuevosPacientesMes,
        ]);
    }
}
