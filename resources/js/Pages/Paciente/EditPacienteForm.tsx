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
        birthdate: paciente.birthdate,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.id as keyof typeof data, e.target.value);
    };

    const handleToggle = (checked: boolean) => {
        setData('activo', checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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
                    customClass: {
                        confirmButton: 'bg-sky-500 text-white font-semibold py-2 px-6 rounded hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out cursor-pointer border-2 border-sky-300 shadow-md hover:shadow-lg active:scale-95 mr-2',
                    },
                    buttonsStyling: false,
                });
            },
        });
    };

    return (
        <>
            <Head title="Edición de Paciente" />
            <hr className=" border border-sky-500" />

            <form onSubmit={handleSubmit} >
                <div className="grid gap-4 mt-6 ">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre completo" />
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
                            <p id="name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Correo electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full "
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                        />
                        {errors.email && (
                            <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                            <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <InputLabel htmlFor="birthdate" value="Fecha de nacimiento" />
                        <TextInput
                            id="birthdate"
                            type="date"
                            value={data.birthdate}
                            className="mt-1 block w-full "
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.birthdate}
                            aria-describedby="birthdate-error"
                        />
                        {errors.birthdate && (
                            <p id="birthdate-error" className="mt-2 text-sm text-red-600">{errors.birthdate}</p>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <InputLabel htmlFor="activo" value="Activo" />
                            <ToggleSwitch checked={data.activo} onChange={handleToggle} />
                        </div>
                        {errors.activo && (
                            <p id="activo-error" className="text-sm text-red-600 mt-1">{errors.activo}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-8 gap-4">
                    <ButtonCancel onClick={onClose}>
                        Cancelar
                    </ButtonCancel>
                    <ReusableButton
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 rounded-lg text-white `}
                    >
                        {processing ? "Guardando..." : "Guardar"}
                    </ReusableButton>
                </div>
            </form>

        </>
    );
};

export default EditPacienteForm;
