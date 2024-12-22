<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $patient_id
 * @property string $fecha
 * @property string $hora
 * @property string $status
 * @property string|null $nota
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $users
 * @method static \Database\Factories\CitasFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereFecha($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereHora($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereNota($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Citas whereUpdatedAt($value)
 */
	class Citas extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $patient_id
 * @property string $fecha
 * @property string $hora
 * @property string $status
 * @property string|null $nota
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $users
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereFecha($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereHora($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereNota($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Historial_Citas whereUpdatedAt($value)
 */
	class Historial_Citas extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @method \Illuminate\Support\Collection getRoleNames()
 * @method \Illuminate\Database\Eloquent\Collection getAllPermissions()
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property int $activo
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Citas> $citas
 * @property-read int|null $citas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Historial_Citas> $historialCitas
 * @property-read int|null $historial_citas_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereActivo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 */
	class User extends \Eloquent {}
}

