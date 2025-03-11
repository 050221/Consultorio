<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => $this->faker->randomElement([ 'admin', 'doctor', 'receptionist', 'patient']),
            'activo' => $this->faker->boolean(90), // 90% de usuarios activos
            'birthdate' => $this->faker->date('Y-m-d', '2003-12-31'), // Fechas entre 1900 y 2003
            'specialty' => null, // Solo para doctores
            'availability' => null, // Solo para doctores
            'remember_token' => Str::random(10),
        ];
    }

    public function doctor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'doctor',
            'specialty' => $this->faker->randomElement(['Ortodoncia', 'Endodoncia', 'Periodoncia']),
            'availability' => json_encode([
                'lunes' => ['09:00-13:00', '15:00-18:00'],
                'martes' => ['10:00-14:00'],
            ]),
        ]);
    }

     /**
     * Estado para usuarios pacientes.
     */
    public function paciente(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'patient',
            'specialty' => null,
            'availability' => null,
        ]);
    }

    public function receptionist(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'receptionist',
            'specialty' => null,
            'availability' => null,
        ]);
    }

     /**
     * Estado para usuarios admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'specialty' => null,
            'availability' => null,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
