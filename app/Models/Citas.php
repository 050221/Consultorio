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
        'fecha',
        'hora',
        'status',
        'nota'
    ];



    protected $table = 'citas';

    public function users()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
