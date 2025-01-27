<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use App\Http\Requests\StoreCitasRequest;
use App\Http\Requests\UpdateCitasRequest;
use App\Models\HistorialCitas;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $status = $request->input('status', ''); // Filtro por estado
        $date = $request->input('date', ''); // Filtro por fecha

        $citas = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
            ->select('id', 'patient_id', 'fecha', 'hora', 'status', 'nota')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('patient_id', 'like', "%{$search}%")
                        ->orWhereHas('users', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })
                        ->orWhere('fecha', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhere('nota', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $statusFilter) {
                $query->where('status', $statusFilter); // Filtro exacto por estado
            })
            ->when($date, function ($query, $dateFilter) {
                $query->whereDate('fecha', $dateFilter); // Filtro exacto por fecha
            })
            ->orderBy('fecha', 'desc')
            ->paginate($perPage)
            ->appends([
                'search' => $search,
                'status' => $status,
                'date' => $date,
                'per_page' => $perPage
            ]); // Mantener parámetros en la URL para paginación

        // Retorna la vista con los datos necesarios para Inertia
        return Inertia::render('Cita/CitasIndex', [
            'citas' => $citas, // Datos paginados
            'perPage' => $perPage, // Valor de registros por página
            'search' => $search, // Término de búsqueda actual
            'status' => $status, // Filtro de estado actual
            'date' => $date, 
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtén los IDs de los pacientes que ya tienen citas
        $patientIdsWithCitas = Citas::pluck('patient_id')->toArray();

        // Filtra los pacientes excluyendo los IDs que ya tienen citas
        $users = User::where('role', 'Patient')
            ->whereNotIn('id', $patientIdsWithCitas)
            ->select('id', 'name')
            ->get();

        // Obtén las citas con los usuarios relacionados
        $citas = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
            ->select('id', 'patient_id', 'fecha', 'hora', 'status')
            ->get();

        return Inertia::render('Cita/CitasCreateForm', [
            'users' => $users,
            'citas' => $citas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCitasRequest $request)
    {
        // Si hay errores, Laravel no llegará a este punto
        $cita = $request->validated();

        // Crear la cita
        Citas::create([
            'patient_id' => $cita['patient_id'],
            'fecha' => $cita['fecha'],
            'hora' => $cita['hora'],
            'status' => $cita['status'],
            'nota' => $cita['nota'],
        ]);

        return redirect()->back()->with('success', 'Cita agendada exitosamente');
    }


    /**
     * Display the specified resource.
     * 
     *  public function show($id)
    {
        try {
            $cita = Citas::with('users')->findOrFail($id);
            
            // Añade esto para ver qué está pasando
            Log::info('Cita encontrada', ['cita' => $cita]);
            
            return Inertia::render('Cita/CitaView', [
                'cita' => $cita,
            ]);
        } catch (\Exception $e) {
            // Registra cualquier error
            Log::error('Error en show de Citas', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
     * 
     */
    public function show($id)
    {

        // Busca la cita por ID con los datos relacionados, si es necesario
        $cita = Citas::with(['users' => function ($query) {
            $query->select('id', 'name', 'phone');
        }])
            ->findOrFail($id);

        // Log::info($cita);

        // Retorna una vista de Inertia con los datos
        return Inertia::render('Cita/CitaView', [
            'cita' => $cita,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Citas $citas) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCitasRequest $request, $id)
    {
        try {
            // Buscar la cita por ID
            $cita = Citas::findOrFail($id);

            // Actualizar la cita con los datos validados
            $cita->update($request->validated());

            // Retornar respuesta exitosa
            return redirect()->route('citas.index')->with('success', 'Cita actualizada exitosamente.');
        } catch (\Exception $e) {
            // Manejo de errores (por ejemplo, si algo falla en la actualización)
            return back()->with('error', 'Ocurrió un problema al actualizar la cita.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cita = Citas::findOrFail($id);
        $cita->delete();

        return redirect()->back()->with('success', 'La cita fue eliminada exitosamente');
    }




    /**
     * Muestra el historial de citas
     
    public function historial_citas(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Define el número de elementos por página con un valor predeterminado de 10.
        $search = $request->input('search', '');
    
        // Registro de los parámetros en los logs
        Log::info('Historial Citas - Parámetros recibidos:', [
            'per_page' => $perPage,
            'search' => $search,
        ]);
    
        // Consulta simplificada solo con paginación
        $citas = HistorialCitas::with(['users' => function ($query) {
            $query->select('id', 'name', 'phone', 'email'); // Selecciona solo las columnas necesarias.
        }])
        ->select('id', 'patient_id', 'fecha', 'hora', 'status', 'nota')
        ->when($search, function ($query, $search) {
            $query->where(function ($query1) use ($search) {
                $query1->where('patient_id', 'like', "%{$search}%")
                    ->orWhereHas('users', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('fecha', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('nota', 'like', "%{$search}%");
            });
        })
        
            ->paginate($perPage); // Aplica la paginación.
    
        // Retorna los datos a la vista Inertia
        return Inertia::render('Cita/Historial_citas', [
            'citas' => $citas,
        ]);
    }
    */
    
    
}
