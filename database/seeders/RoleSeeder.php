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
        // Definir permisos
        $permissions = [
            'ver_dashboard',
            'gestionar_dentistas',
            'gestionar_pacientes',
            'gestionar_citas',
            'ver_citas',
            'editar_citas',
            'cancelar_citas',
            'ver_expedientes',
            'editar_expedientes',
        ];

        // Crear permisos si no existen
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Crear roles con nombres en minúscula
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $receptionist = Role::firstOrCreate(['name' => 'receptionist']);
        $doctor = Role::firstOrCreate(['name' => 'doctor']);
        $patient = Role::firstOrCreate(['name' => 'patient']);

        // Asignar permisos asegurando que no haya duplicados
        $admin->syncPermissions($permissions);
        $receptionist->syncPermissions([
            'ver_dashboard',
            'gestionar_pacientes',
            'gestionar_citas',
            'ver_citas',
            'editar_citas',
            'cancelar_citas',
            'ver_expedientes',
        ]);
        $doctor->syncPermissions([
            'ver_dashboard',
            'ver_citas',
            'ver_expedientes',
            'editar_expedientes'
        ]);
        $patient->syncPermissions([
            'ver_dashboard',
            'ver_expedientes'
        ]);

        /*
        $Admin =Role::create(['name'=>'Admin']);   
        $Doctor =Role::create(['name'=>'Doctor']);
        $Patient=Role::create(['name'=>'Patient']);
        $Receptionist=Role::create(['name'=>'Receptionist']);

        Permission::create(['name'=>'dashboard'])->syncRoles([$Admin,$Doctor,$Patient ,$Receptionist]);

        Permission::create(['name'=>'pacientes'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'pacientes.store'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'pacientes.edit'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'pacientes.update'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'pacientes.delete'])->syncRoles([$Admin, $Doctor]);

        Permission::create(['name'=>'citas'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.show'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.create'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.store'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.edit'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.update'])->syncRoles([$Admin, $Doctor, $Receptionist]);
        Permission::create(['name'=>'citas.delete'])->syncRoles([$Admin]);
      

        Permission::create(['name'=>'historial_citas'])->syncRoles([$Admin, $Doctor, $Patient]);
*/
    }
}
