<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $dentistas = User::where('role', 'doctor')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('specialty', 'like', "%{$search}%");
                });
            })
            ->select('id', 'name', 'email', 'phone', 'activo', 'created_at', 'specialty', 'availability')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('Dentista/Index', [
            'dentistas' => $dentistas,
        ]);
    }

    public function show($id)
    {
        $dentista = User::where('role', 'Doctor')->findOrFail($id);

        return Inertia::render('Dentista/ShowDentista', [
            'dentista' => $dentista,
        ]);
    }


    public function create()
    {
        return Inertia::render('Dentista/CreateDentista');
    }

    public function store(StoreUserRequest $request)
    {

       
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'role' => 'doctor',
            'specialty' => $data['specialty'],
            'availability' => $data['availability'],
            'password' => bcrypt($data['password']),

        ]);

        $user->assignRole('doctor');

        return redirect()->back()->with('success', 'Dentista creado exitosamente');
    }


    public function edit(User $id)
    {
        $dentista = User::where('role', 'Doctor')->findOrFail($id->id);
        return Inertia::render('Dentista/EditDentista', [
            'dentista' => $dentista,
        ]);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $dentista = User::findOrFail($id);
        $dentista->update($request->validated());
        return redirect()->back()->with('success', 'Dentista editado exitosamente');
    }


    public function destroy($id)
    {

        $dentista = User::findOrFail($id);
        $dentista->delete();

        return redirect()->back()->with('success');
    }
}
