<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $hashedPassword = Hash::make('admin');

        $user = User::create([
            'name' => 'administrador',
            'email' => 'administrador@gmail.com',
            'phone' => '777-789-5894',
            'role' => 'admin',
            'password' => $hashedPassword,
        ]);
        
        $user->assignRole('admin');

        /*

        User::factory(7)->doctor()->create();
        User::factory(50)->paciente()->create();
        User::factory(4)->receptionist()->create();

        */
    }
}
