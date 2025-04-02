<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        
        // Definir las reglas básicas
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|size:10|unique:users|regex:/^[0-9]+$/',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:doctor,patient,receptionist',
            
        ];

        // Reglas adicionales según el rol
        if ($this->input('role') === 'patient') {
            $rules['birthdate'] = 'nullable|date';
        } elseif ($this->input('role') === 'doctor') {
            $rules['specialty'] = 'required|array';
            $rules['availability'] = 'nullable|json';
            $rules['license_number'] = 'required|string|max:255|unique:users';
        }

        return $rules;
    }

    /**
     * Mensajes personalizados para las reglas de validación.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.unique' => 'El teléfono ya está en uso.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
            'phone.required' => 'El número de teléfono es obligatorio.',
            'phone.string' => 'El teléfono debe ser una cadena de texto.',
            'phone.size' => 'El número de teléfono debe tener exactamente 10 dígitos.',
            'phone.unique' => 'Este número de teléfono ya está registrado.',
            'phone.regex' => 'El número de teléfono solo debe contener dígitos numéricos (0-9).',
            'specialty.required' => 'La especialidad es obligatoria para dentistas.',
            'specialty.json' => 'La especialidad debe ser un JSON válido.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'availability.json' => 'Los horarios de disponibilidad deben ser un JSON válido.',
            'license_number.required' => 'La cedula profecional es obligatoria.',
            'license_number.string' => 'La cedula profecional debe ser una cadena de texto.',
            'license_number.max' => 'La cedula profecional no puede tener más de 255 caracteres.',
            'license_number.unique' => 'La cedula profecional ya está en uso.',
        ];
    }
}
