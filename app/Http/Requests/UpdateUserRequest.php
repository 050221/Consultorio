<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
    
}
