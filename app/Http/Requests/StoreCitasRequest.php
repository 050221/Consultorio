<?php

namespace App\Http\Requests;

use App\Models\Citas;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Log;



class StoreCitasRequest extends FormRequest
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
            'fecha' => 'required|date', // Usa date en lugar de string
            'hora' => 'required|date_format:H:i', // Valida el formato de hora
            'tipo' => 'required|string',
            'status' => 'required|string',
            'nota' => 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'patient_id.required' => 'El nombre del paciente es obligatorio',
            'patient_id.exists' => 'El nombre del paciente no es válido',
            'doctor_id.required' => 'El nombre del médico es obligatorio',
            'doctor_id.exists' => 'El nombre del médico no es válido',
            'fecha.required' => 'La fecha es obligatoria.',
            'hora.required' => 'La hora es obligatoria.',
            'tipo.required' => 'El tipo de cita es obligatorio.',
            'fecha.date' => 'La fecha debe ser válida.',
            'hora.date_format' => 'La hora debe tener un formato válido (HH:mm).',
            'status.required' => 'El estado es obligatorio.',
        ];
    }
}
