import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';
import ButtonVisibility from '@/Components/Form/ButtonVisibility';
import ReusableButton from '@/Components/Form/ReusableButton';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import { Inertia } from '@inertiajs/inertia';
import useAvailability, { diasSemana } from '@/Components/hooks/useAvailability';
import MultiSelectArray from '@/Components/ui/MultiSelectArray';


const CreateDentistaForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'doctor',
        password_confirmation: '',
        specialty: [],
        availability: JSON.stringify({
            monday: { active: false, start: '09:00', end: '18:00' },
            tuesday: { active: false, start: '09:00', end: '18:00' },
            wednesday: { active: false, start: '09:00', end: '18:00' },
            thursday: { active: false, start: '09:00', end: '18:00' },
            friday: { active: false, start: '09:00', end: '18:00' },
            saturday: { active: false, start: '09:00', end: '14:00' },
            sunday: { active: false, start: '09:00', end: '14:00' },
        }),
        license_number: '',
    });



    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);


    const handleChange = (field: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const { availabilityData, handleAvailabilityChange } = useAvailability(
        data.availability,
        setData
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
       // console.log(data);
        post(route('dentista.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: '¡Guardado!',
                    text: 'El dentista se ha registrado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'bg-sky-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out cursor-pointer border-2 border-sky-300 shadow-md hover:shadow-lg active:scale-95',
                    },
                    buttonsStyling: false,
                }).then(() => {
                    Inertia.visit('/dentistas');

                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema al registrar al dentista.',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'bg-sky-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out cursor-pointer border-2 border-sky-300 shadow-md hover:shadow-lg active:scale-95',
                    },
                    buttonsStyling: false,
                });
            },
        });
    };

    const cancel = () => {
        Inertia.visit('/dentistas');
    }

    return (


        <AuthenticatedLayout

        >
            <Head title="Nuevo Dentista" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">

                        <div className="p-6  ">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Dentista</h2>
                            <form onSubmit={submit} >
                                <div className="flex flex-wrap ">

                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <InputLabel htmlFor="name" value="Nombre completo" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full "
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className='w-full md:w-1/2 grid grid-cols-1 gap-6 md:gap-2 md:grid-cols-2 my-3 px-2'>
                                        <div className='w-full'>
                                            <InputLabel htmlFor="phone" value="Teléfono" />
                                            <TextInput
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                        <div className='w-full'>
                                            <InputLabel htmlFor="license_number" value="Cédula profesional" />
                                            <TextInput
                                                id="license_number"
                                                type="text"
                                                name="license_number"
                                                value={data.license_number}
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('license_number', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.license_number} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <InputLabel htmlFor="specialty" value="Especialidad" />
                                        <MultiSelectArray
                                            name="specialty"
                                            value={data.specialty}
                                            onChange={(value) => handleChange("specialty", value)}
                                            options={[
                                                { value: "odontologia_general", label: "Odontología General" },
                                                { value: "ortodoncia", label: "Ortodoncia y Ortopedia Maxilofacial" },
                                                { value: "endodoncia", label: "Endodoncia" },
                                                { value: "periodoncia", label: "Periodoncia" },
                                                { value: "cirugia_oral", label: "Cirugía Oral y Maxilofacial" },
                                                { value: "odontopediatria", label: "Odontopediatría" },
                                                { value: "prostodoncia", label: "Prostodoncia (Rehabilitación Oral)" },
                                                { value: "estetica", label: "Odontología Estética" },
                                                { value: "implantologia", label: "Implantología Oral" },
                                                { value: "radiologia", label: "Radiología Oral y Maxilofacial" },
                                                { value: "odontogeriatria", label: "Odontogeriatría" },
                                                { value: "patologia_bucal", label: "Patología Bucal y Maxilofacial" },
                                                { value: "odontologia_forense", label: "Odontología Forense" },
                                            ]}
                                            className="w-full"
                                        />
                                        <InputError message={errors.specialty} className="mt-2" />
                                    </div>

                                    <div className='w-full md:w-1/2 my-3 px-2'>
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

                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <div className="relative ">
                                            <InputLabel htmlFor="password" value="Contraseña" />
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <ButtonVisibility
                                                onToggle={() => setShowPassword((prev) => !prev)}
                                                isPasswordVisible={showPassword}
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <div className="relative">
                                            <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                                            <TextInput
                                                id="password_confirmation"
                                                type={showPasswordConfirmation ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="mt-1 block w-full "
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <ButtonVisibility
                                                onToggle={() => setShowPasswordConfirmation((prev) => !prev)}
                                                isPasswordVisible={showPasswordConfirmation}
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className='w-full my-4 px-2'>
                                        <div className="col-span-2">
                                            <InputLabel value="Disponibilidad" />
                                            <div className="grid gap-4 p-4 border rounded-lg bg-gray-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                                {diasSemana.map(({ key, label }) => (
                                                    <div key={key} className="flex flex-col gap-2 p-3 bg-white rounded shadow-sm">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`${key}-active`}
                                                                checked={availabilityData[key].active}
                                                                onChange={(e) => handleAvailabilityChange(key, 'active', e.target.checked)}
                                                                className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                                                            />
                                                            <label htmlFor={`${key}-active`} className="text-sm font-medium text-gray-700">
                                                                {label}
                                                            </label>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="time"
                                                                value={availabilityData[key].start}
                                                                onChange={(e) => handleAvailabilityChange(key, 'start', e.target.value)}
                                                                disabled={!availabilityData[key].active}
                                                                className="w-1/2 text-xs md:text-sm  lg:w-full  p-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                                                            />
                                                            <span className="text-gray-500 mt-2 md:mt-1 text-xs md:text-base">a</span>
                                                            <input
                                                                type="time"
                                                                value={availabilityData[key].end}
                                                                onChange={(e) => handleAvailabilityChange(key, 'end', e.target.value)}
                                                                disabled={!availabilityData[key].active}
                                                                className="w-1/2 text-xs md:text-sm lg:w-full  p-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <InputError message={errors.availability} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-4 mx-2">
                                    <ButtonCancel onClick={cancel}>Salir</ButtonCancel>
                                    <ReusableButton type="submit" processing={processing}>Guardar</ReusableButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
};

export default CreateDentistaForm;

