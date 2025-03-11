<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'), // Asegurar que se guarde encriptada
        ]);
    
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password', // La contraseña en texto plano (coincide con la encriptada)
        ]);
    
        // Agregar para depuración si falla
        dd($response->getContent());
    
        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
    

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
