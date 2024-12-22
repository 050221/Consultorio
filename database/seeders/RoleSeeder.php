<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Admin =Role::create(['name'=>'Admin']);   
        $Doctor =Role::create(['name'=>'Doctor']);
        $Patient=Role::create(['name'=>'Patient']);

        Permission::create(['name'=>'dashboard'])->syncRoles([$Admin,$Doctor,$Patient]);

        Permission::create(['name'=>'pacientes'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'pacientes.store'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'pacientes.edit'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'pacientes.update'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'pacientes.delete'])->syncRoles([$Admin, $Doctor]);

        Permission::create(['name'=>'citas'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.show'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.create'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.store'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.edit'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.update'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'citas.delete'])->syncRoles([$Admin, $Doctor]);
        Permission::create(['name'=>'historial_citas'])->syncRoles([$Admin, $Doctor]);


    }
}
