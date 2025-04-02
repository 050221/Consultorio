<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialCitas extends Model
{

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'fecha',
        'hora',
        'status',
        'servicio',
        'nota',
        'is_emergency'
    ];

    /** @use HasFactory<\Database\Factories\HistorialCitasFactory> */
    use HasFactory;

    // Relación con el modelo User (un historial de cita pertenece a un usuario)
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    protected function casts(): array
    {
        return [
            'servicio' => 'array',
        ];
    }
}
