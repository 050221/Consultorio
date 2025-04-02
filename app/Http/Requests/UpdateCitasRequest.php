<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCitasRequest extends FormRequest
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
        return [
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'fecha' => 'required|date', 
            'hora' => 'required',
            'status' => 'required|string',
            'servicio' => 'required|array',
            'nota' => 'nullable',
            'is_emergency' => 'nullable|boolean',
        ];
    }

    public function messages()
    {
        return [
            'patient_id.required' => 'El paciente es obligatorio',
            'doctor_id.required' => 'El médico es obligatorio',
            'fecha.required' => 'La fecha es obligatoria.',
            'hora.required' => 'La hora es obligatoria.',
            'fecha.date' => 'La fecha debe ser válida.',
            'status.required' => 'El estado es obligatorio.',
            'servicio.required' => 'El servicio de la cita es obligatorio.',
            'servicio.array' => 'El servicio de la cita debe ser un arreglo.',
            'is_emergency.boolean' => 'El campo de urgencia debe ser verdadero o falso.',
        ];
    }
}
