<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    
    public function rules()
    {

        $rules =  [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->route('id'), 
            'phone' => 'required|string|size:10|regex:/^[0-9]+$/|unique:users,phone,' . $this->route('id'),
            'activo' => 'required|boolean',
        ];

        // Reglas adicionales según el rol
        if ($this->input('role') === 'Patient') {
            $rules['birthdate'] = 'nullable|date';
        } elseif ($this->input('role') === 'Doctor') {
            $rules['role'] = 'required|string|in:Doctor';
            $rules['specialty'] = 'required|array';
            $rules['availability'] = 'nullable|json';
            $rules['license_number'] = 'required|string|max:255|unique:users,license_number,' . $this->route('id');
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.unique' => 'El teléfono ya está en uso.',
            'phone.size' => 'El número de teléfono debe tener exactamente 10 dígitos.',
            'phone.regex' => 'El número de teléfono solo debe contener dígitos numéricos (0-9).',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'role.required' => 'El rol es obligatorio.',
            'role.in' => 'El rol seleccionado no es válido.',
            'specialty.required' => 'La especialidad es obligatoria para dentistas.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'availability.json' => 'La disponibilidad debe ser un JSON válido.',
            'license_number.required' => 'La cédula profesional es obligatoria.',
            'license_number.string' => 'La cédula profesional debe ser una cadena de texto.',
            'license_number.max' => 'La cédula profesional no puede tener más de 255 caracteres.',
            'license_number.unique' => 'La cédula profesional ya está en uso.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->input('activo') == 0) { // Intento de desactivar al usuario
                $userId = $this->route('id'); // ID del usuario de la ruta

                try {
                    // Verifica si el usuario tiene citas como paciente o doctor
                    $hasCitas = DB::table('citas')
                        ->where('patient_id', $userId)
                        ->orWhere('doctor_id', $userId)
                        ->exists();

                    if ($hasCitas) {
                        $validator->errors()->add('activo', 'No se puede desactivar al usuario porque tiene citas registradas.');
                    }
                } catch (\Exception $e) {
                    Log::error('Error al verificar citas: ' . $e->getMessage());
                    $validator->errors()->add('activo', 'Ocurrió un error al verificar las citas.');
                }
            }
        });
    }

    
}
