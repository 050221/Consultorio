<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use App\Models\HistorialCitas;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $citas = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo')
            ->get();

        $citasHoy = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->where('fecha', today())
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo')
            ->paginate(5);

        $totalPacientes = User::whereRole('Patient')->count();
        $totalDentistas = User::whereRole('Doctor')->count();
        $totalCitas = Citas::Where('fecha', today())->count();
        $totalCitasConfirmadas = Citas::where('fecha', today())->where('status', 'Confirmada')->count();
        $totalCitasPendientes = Citas::where('fecha', today())->where('status', 'Pendiente')->count();
        $totalCitasCancelada = Citas::where('fecha', today())->where('status', 'Cancelada')->count();

        $destistasMasCitas = DB::table(DB::raw('(SELECT doctor_id, id FROM citas
        UNION ALL
        SELECT doctor_id, id FROM historial_citas) AS t'))
            ->join('users AS d', 't.doctor_id', '=', 'd.id')
            ->select('d.name', DB::raw('COUNT(t.id) AS citas'))
            ->groupBy('d.id', 'd.name')
            ->get();

        $totalCitasPorMes = HistorialCitas::select(
            DB::raw('MONTHNAME(created_at) as mes'),  // Nombre del mes
            DB::raw('MONTH(created_at) as mes_numero'), // Número del mes para ordenar
            DB::raw('COUNT(id) as citas') // Total de citas
        )
            ->whereYear('created_at', now()->year) // Filtra solo el año actual
            ->groupBy('mes', 'mes_numero')
            ->orderBy('mes_numero') // Ordena por número de mes
            ->get()
            ->map(function ($cita) {
                // Traduce el nombre del mes al español
                $cita->mes = Carbon::create()->month($cita->mes_numero)->locale('es')->translatedFormat('F');
                unset($cita->mes_numero); // Elimina la columna auxiliar
                return $cita;
            });

        // Obtiene el usuario autenticado
        $user = Auth::user();

        $citasUser = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->where('patient_id', $user->id)
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo', 'nota')
            ->get();

        $citasDentista  = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->where('doctor_id', $user->id)
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo')
            ->get();

        $citasDentistaHoy  = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->where('doctor_id', $user->id)
            ->where('fecha', today())
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo')
            ->paginate(5);

        $totalCitasDentista = Citas::where('doctor_id', $user->id)->count();
        $totalCitasConfirmadasDentista = Citas::where('doctor_id', $user->id)->where('status', 'Confirmada')->count();
        $totalCitasPendientesDentista = Citas::where('doctor_id', $user->id)->where('status', 'Pendiente')->count();
        $totalCitasCanceladaDentista = Citas::where('doctor_id', $user->id)->where('status', 'Cancelada')->count();




        return Inertia::render('Dashboard/Dashboard', [
            'citas' => $citas,
            'citasHoy' => $citasHoy,
            'totalPacientes' => $totalPacientes,
            'totalDentistas' => $totalDentistas,
            'totalCitas' => $totalCitas,
            'totalCitasConfirmadas' => $totalCitasConfirmadas,
            'totalCitasPendientes' => $totalCitasPendientes,
            'totalCitasCancelada' => $totalCitasCancelada,
            'destistasMasCitas' => $destistasMasCitas,
            'totalCitasPorMes' => $totalCitasPorMes,
            'citasUser' => $citasUser,
            'citasDentista' => $citasDentista,
            'citasDentistaHoy' => $citasDentistaHoy,
            'totalCitasDentista' => $totalCitasDentista,
            'totalCitasConfirmadasDentista' => $totalCitasConfirmadasDentista,
            'totalCitasPendientesDentista' => $totalCitasPendientesDentista,
            'totalCitasCanceladaDentista' => $totalCitasCanceladaDentista,
        ]);
    }
}
