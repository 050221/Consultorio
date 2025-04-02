<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citas extends Model
{
    /** @use HasFactory<\Database\Factories\CitasFactory> */
    use HasFactory;


    protected $fillable = [
        'patient_id',
        'doctor_id',
        'fecha',
        'hora',
        'status',
        'servicio',
        'nota',
        'is_emergency',  // Si es urgencia o no
    ];



    protected $table = 'citas';

    /**
     * Relación con el usuario paciente.
     */
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    /**
     * Relación con el usuario doctor.
     */
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