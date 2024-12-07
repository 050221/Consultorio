<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $citas = Citas::with(['users' => function ($query) {
            $query->select('id', 'name');
        }])
            ->select('id', 'patient_id', 'fecha', 'hora', 'status')
            ->get();

        return Inertia::render('Dashboard', [
            'citas' => $citas,
        ]);
    }
}
