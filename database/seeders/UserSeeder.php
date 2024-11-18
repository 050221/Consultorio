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
            'role' => 'Admin',
            'password' => $hashedPassword,
        ]);

        
        $user->assignRole('Admin');

        
        User::factory(12)->create();
    }
}
