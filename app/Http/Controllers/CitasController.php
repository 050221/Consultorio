<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use App\Http\Requests\StoreCitasRequest;
use App\Http\Requests\UpdateCitasRequest;
use App\Models\HistorialCitas;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $citas = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'servicio', 'nota', 'is_emergency')
            ->when($search, function ($query, $search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                    ->orWhereHas('doctor', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->when($status, function ($query, $statusFilter) {
                $query->where('status', $statusFilter); // Filtro exacto por estado
            })
            ->when($date, function ($query, $dateFilter) {
                $query->whereDate('fecha', $dateFilter); // Filtro exacto por fecha
            })
            //->orderBy('fecha', 'desc')
            ->orderBy('fecha', 'asc')
            ->orderBy('hora', 'asc')
            ->paginate($perPage);



            $user = Auth::user(); // Obtiene el usuario autenticado (doctor)

            $citasDentista = Citas::with([
                'patient:id,name',  // Relación con el paciente
                'doctor:id,name,specialty' // Relación con el doctor
            ])
            ->where('doctor_id', $user->id) // Filtrar por el doctor autenticado
            ->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'servicio', 'nota','is_emergency')
            ->when(!empty($search), function ($query) use ($search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('doctor', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($date, function ($query) use ($date) {
                $query->whereDate('fecha', $date);
            })
            ->whereNotNull('fecha') // Evita problemas con `orderBy`
            ->orderBy('fecha', 'asc')
            ->orderBy('hora', 'asc') // Ordenar por hora ascendente dentro del mismo día
            ->paginate($perPage);
            
            //dd($citasDentista);

        


        return Inertia::render('Cita/CitasIndex', [
            'citas' => $citas, 
            'citasDentista' =>$citasDentista
        ]);
    }

    public function show($id)
    {
        // Busca la cita por ID con las relaciones necesarias
        $cita = Citas::with([
            'patient:id,name,phone',
            'doctor:id,name'
        ])->findOrFail($id);

        return Inertia::render('Cita/CitaView', [
            'cita' => $cita,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtén los pacientes con rol 'Patient'
        $pacientes = User::where('role', 'patient')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // Obtén los doctores con rol 'Doctor'
        $doctores = User::where('role', 'doctor')
            ->select('id', 'name', 'specialty')
            ->get();

        // Obtén las citas con información de paciente y doctor
        $citas = Citas::with([
            'patient:id,name',
            'doctor:id,name,specialty'
        ])->select('id', 'patient_id', 'doctor_id', 'fecha', 'hora', 'status', 'servicio','is_emergency')
            ->get();

        // Retorna la vista con los datos
        return Inertia::render('Cita/CitasCreateForm', [
            'pacientes' => $pacientes,
            'doctores' => $doctores,
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
            'doctor_id' => $cita['doctor_id'],
            'fecha' => $cita['fecha'],
            'hora' => $cita['hora'],
            'status' => $cita['status'],
            'servicio' => $cita['servicio'],
            'nota' => $cita['nota'],
            'is_emergency' => $cita['is_emergency'] ?? false, 
        ]);

        return redirect()->back()->with('success', 'Cita agendada exitosamente');
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
}
