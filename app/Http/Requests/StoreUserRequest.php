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
            'phone' => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:doctor,patient,receptionist',
            
        ];

        // Reglas adicionales según el rol
        if ($this->input('role') === 'patient') {
            $rules['birthdate'] = 'nullable|date';
        } elseif ($this->input('role') === 'doctor') {
            $rules['specialty'] = 'required|string|max:50';
            $rules['availability'] = 'nullable|json';
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
            'role.required' => 'El rol es obligatorio.',
            'role.in' => 'El rol seleccionado no es válido.',
            'specialty.required' => 'La especialidad es obligatoria para dentistas.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'availability.json' => 'Los horarios de disponibilidad deben ser un JSON válido.',
        ];
    }
}
