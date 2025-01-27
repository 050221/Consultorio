<?php

namespace App\Http\Controllers;

use App\Models\HistorialCitas;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

        $historialC = HistorialCitas::with(['users' => function ($query) {
            $query->select('id', 'name', 'phone', 'email');
        }])
        ->when($search, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('nota', 'like', "%{$search}%")
                      ->orWhereHas('users', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
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

        return Inertia::render('HistorialCitas/Historial', [
            'historialC' => $historialC,
        ]);
    }
}
