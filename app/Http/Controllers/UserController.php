<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;


class UserController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); 
        
        $pacientes = User::where('role', 'Patient')
            ->select( 'id','name', 'email', 'phone', 'created_at')
            ->paginate($perPage);
    
        return Inertia::render('Paciente/PacientesIndex', [
            'pacientes' => $pacientes,
        ]);
    }
    
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
                // Validar los datos enviados desde el formulario
                $data = $request->validated();
        
                // Crear el paciente
                User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                    'password' => bcrypt($data['password']), 
                ]);
        
                // Retorna una respuesta exitosa a Inertia
                return redirect()->back()->with('success', 'Paciente creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {
        // Buscar el paciente
        $paciente = User::findOrFail($id);
        
        // Realizar la actualización del paciente
        $paciente->update($request->validated());
    
        // Si todo está bien, devolver una respuesta de éxito
        return response()->json([
            'success' => true,
            'message' => 'Paciente editado exitosamente',
            'paciente' => $paciente,
        ]);
    }
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $paciente = User::findOrFail($id);
        $paciente->delete();
    
        return redirect()->back()->with('success', 'Paciente creado exitosamente');
    }
}
