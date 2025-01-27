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
        $search = $request->input('search', '');

        $pacientes = User::where('role', 'Patient')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->select('id', 'name', 'email', 'phone', 'activo', 'created_at')
            ->orderBy('created_at', 'desc')
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
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
        ]);

        $user->assignRole('Patient');

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
        try {
            // Buscar el paciente
            $paciente = User::findOrFail($id);

            // Realizar la actualización del paciente
            $paciente->update($request->validated());
            // Retornar respuesta exitosa
            return redirect()->route('pacientes.index')->with('success', 'Paciente editado exitosamente');
        } catch (\Exception $e) {
            // Manejo de errores (por ejemplo, si algo falla en la actualización)
            return back()->with('error', 'Ocurrió un problema al actualizar el paciente.');
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $paciente = User::findOrFail($id);
        $paciente->delete();

        return redirect()->back()->with('success', 'El paciente fue eliminado exitosamente');
    }
}
