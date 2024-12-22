<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

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

        //Log::info('ID recibido en la ruta: ' . $this->route('id'));

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->route('id'), 
            'phone' => 'required|string|unique:users,phone,' . $this->route('id'),
            'activo' => 'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.unique' => 'El teléfono ya está registrado.',
        ];
    }

    public function withValidator($validator)
{
    $validator->after(function ($validator) {
        // Verifica si el usuario tiene citas
        if ($this->input('activo') == 0) { // Intento de desactivar al usuario
            $userId = $this->route('id'); // ID del usuario de la ruta
            $hasCitas = DB::table('citas')->where('patient_id', $userId)->exists();

            if ($hasCitas) {
                $validator->errors()->add('activo', 'No se puede desactivar al usuario porque tiene una citas registrada.');
            }
        }
    });
}

    
}
