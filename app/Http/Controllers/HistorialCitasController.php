<?php

namespace App\Http\Controllers;

use App\Models\HistorialCitas;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistorialCitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $perPage = $request->input('per_page', 10); // Número de elementos por página
        $search = $request->input('search', ''); // Búsqueda
        $status = $request->input('status', ''); // Filtro de estado
        $date = $request->input('date', ''); // Filtro de fecha

        $historialC = HistorialCitas::with(['patient', 'doctor' => function ($query) {
            $query->select('id', 'name', 'phone', 'email');
        }])
            ->when($search, function ($query, $search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                    ->orWhereHas('doctor', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })

            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($date, function ($query, $date) {
                $query->whereDate('fecha', $date);
            })
            ->orderBy('fecha', 'desc')
            ->paginate($perPage);



        // Obtiene el usuario autenticado
        $user = Auth::user();



        $historialCDoctor = HistorialCitas::with(['patient' => function ($query) {
            $query->select('id', 'name', 'phone', 'email');
        }])
            ->where('doctor_id', $user->id) // Filtrar por el doctor autenticado
            ->when($search, function ($query, $search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                ->orWhere('tipo', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($date, function ($query, $date) {
                $query->whereDate('fecha', $date);
            })
            ->orderBy('fecha', 'desc')
            ->paginate($perPage);


        $citasPatient = HistorialCitas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->where('patient_id', $user->id)
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'tipo','nota')
            ->orderBy('fecha', 'desc')
            ->orderBy('hora', 'desc')
            ->paginate($perPage);

        return Inertia::render('HistorialCitas/Historial', [
            'historialC' => $historialC,
            'citasPatient' => $citasPatient,
            'historialCDoctor' => $historialCDoctor
        ]);
    }
}
