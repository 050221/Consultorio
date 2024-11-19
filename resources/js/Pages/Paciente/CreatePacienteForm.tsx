import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';
import ButtonVisibility from '@/Components/Form/ButtonVisibility';
import ReusableButton from '@/Components/Form/ReusableButton';
import ButtonCancel from '@/Components/Form/ButtonCancel';


export default function CreatePacienteForm({ onClose }: { onClose: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });


    const [showPassword, setShowPassword] = useState(false);


    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('pacientes.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: '¡Guardado!',
                    text: 'El paciente se ha registrado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                reset();
                onClose();
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema al registrar el paciente.',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                });
            },
        });
    };



    return (
        <>
            <Head title="Nuevo paciente" />
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="relative">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <ButtonVisibility
                        onToggle={() => setShowPassword((prev) => !prev)}
                        isPasswordVisible={showPassword}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex justify-end gap-4">
                    <ButtonCancel
                        onClick={onClose}
                    >
                        Cancelar
                    </ButtonCancel>
                    <ReusableButton
                        type="submit"
                        processing={processing}
                    >
                        Guardar
                    </ReusableButton>
                </div>
            </form>
        </>
    );
}
