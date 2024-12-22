import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ToggleSwitch from '@/Components/ui/ToggleSwitch';
import { PacienteFormProps } from '@/types';



const EditPacienteForm: React.FC<PacienteFormProps> = ({ paciente, onClose }) => {
    const { data, setData, put, errors, processing } = useForm({
        name: paciente.name,
        email: paciente.email,
        phone: paciente.phone,
        activo: paciente.activo,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.id as keyof typeof data, e.target.value);
    };

    const handleToggle = (checked: boolean) => {
        setData('activo', checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Datos enviados al backend:", data);

        put(`/pacientes/${paciente.id}`, {
            onSuccess: () => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Guardado!',
                    text: 'Paciente actualizado exitosamente.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => onClose());
            },
            onError: () => {
                Swal.fire({
                    title: 'Error en el formulario',
                    text: 'Por favor, revisa los datos ingresados y vuelve a intentarlo.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            },
        });
    };

    return (
        <>
            <Head title="Editar paciente" />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        type="text"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                    />
                    {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Teléfono" />
                    <TextInput
                        id="phone"
                        type="text"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.phone}
                        aria-describedby="phone-error"
                    />
                    {errors.phone && (
                        <p id="phone-error" className="mt-2 text-sm text-red-600">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="activo" value="Activo" />
                    <ToggleSwitch
                        checked={data.activo}
                        onChange={handleToggle} />
                                          {errors.activo && (
                        <p id="phone-error" className="mt-2 text-sm text-red-600">
                            {errors.activo}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                    <ReusableButton type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </ReusableButton>
                </div>
            </form>
        </>
    );
};

export default EditPacienteForm;
