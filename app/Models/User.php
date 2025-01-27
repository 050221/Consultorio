<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
     * @method \Illuminate\Support\Collection getRoleNames()
     * @method \Illuminate\Database\Eloquent\Collection getAllPermissions()
     */

class User extends Authenticatable
{

    use Notifiable;
    use HasRoles;
    
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'activo'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function citas()
    {
        return $this->hasMany(Citas::class, 'patient_id');

        // uno a muchos: un usuario puede tener muchas citas
    }

    // Relación con el modelo HistorialCita (un usuario puede tener muchas citas)
    public function historialCitas()
    {
        return $this->hasMany(HistorialCitas::class, 'patient_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
