<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialCitas extends Model
{

    protected $fillable = [
        'patient_id',
        'fecha',
        'hora',
        'status',
        'nota'
    ];

    /** @use HasFactory<\Database\Factories\HistorialCitasFactory> */
    use HasFactory;

    // Relación con el modelo User (un historial de cita pertenece a un usuario)
    public function users()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
