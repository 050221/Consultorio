<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use App\Http\Requests\StoreCitasRequest;
use App\Http\Requests\UpdateCitasRequest;
use App\Models\Historial_Citas;
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

        $citas = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
            ->select('id', 'patient_id', 'fecha', 'hora', 'status','nota')
            ->paginate($perPage);

        return Inertia::render('Cita/CitasIndex', [
            'citas' => $citas,
            'perPage' => $perPage,
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
    public function edit(Citas $citas)
    {
        
    }

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

    public function historial_citas(Request $request)
    {

        $perPage = $request->input('per_page', 10);
        
        $citas = Historial_Citas::with(['users' => function ($query) {
            $query->select('id', 'name', 'phone', 'email'); // Limita las columnas que quieres obtener
        }]) ->paginate($perPage);
    
        return Inertia::render('Cita/Historial_citas', [
            'citas' => $citas,
            'perPage' => $perPage,
        ]);
    }
    
}
