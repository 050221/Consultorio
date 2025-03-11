<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecepcionistaController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $recepcionistas = User::where('role', 'receptionist')
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

        return Inertia::render('Recepcionista/RecepcionistaIndex', [
            'recepcionistas' => $recepcionistas,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        // Validar los datos enviados desde el formulario
        //dd($request->validated());
        $data = $request->validated();

        // Crear el recepcionista
        $recepcionista = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
            'role' => 'receptionist',
        ]);

        $recepcionista->assignRole('receptionist');

        // Retorna una respuesta exitosa a Inertia
        return redirect()->back()->with('success', 'Recepcionista creado exitosamente');
    }


    public function update(UpdateUserRequest $request, $id)
    {
        try {
           
            $recepcionista = User::findOrFail($id);

            $recepcionista->update($request->validated());
            
            return redirect()->route('recepcionistas.index')->with('success', 'Recepcionista editado exitosamente');
        } catch (\Exception $e) {
            
            return back()->with('error', 'Ocurrió un problema al actualizar el recepcionista.');
        }
    }


    public function destroy($id)
    {
        $recepcionista = User::findOrFail($id);
        $recepcionista->delete();

        return redirect()->back()->with('success', 'El recepcionista fue eliminado exitosamente');
    }
}
