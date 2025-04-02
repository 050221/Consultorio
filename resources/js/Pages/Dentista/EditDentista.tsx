import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';
import ButtonCancel from "@/Components/Form/ButtonCancel";
import ReusableButton from "@/Components/Form/ReusableButton";
import InputLabel from "@/Components/InputLabel";
import ReusableSelect from "@/Components/Table/ReusableSelect";
import TextInput from "@/Components/TextInput";
import { DentistaFormProps, Specialty } from "@/types";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import ToggleSwitch from "@/Components/ui/ToggleSwitch";
import useAvailability, { diasSemana } from "@/Components/hooks/useAvailability";
import MultiSelectArray from '@/Components/ui/MultiSelectArray';


const EditDentistaForm: React.FC<DentistaFormProps> = ({ dentista }) => {

   // console.log(dentista);
    

    const { data, setData, put, processing, errors } = useForm({
        name: dentista.name,
        email: dentista.email,
        phone: dentista.phone,
        activo: dentista.activo,
        role: "Doctor",
        specialty: dentista.specialty,
        availability: dentista.availability,
        license_number: dentista.license_number,

    });

    const handleChange2 = (field: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    
    const { availabilityData, handleAvailabilityChange } = useAvailability(
        data.availability,
        setData
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.id as keyof typeof data, e.target.value);
    };

    const handleToggle = (checked: boolean) => {
        setData('activo', checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/dentista/${dentista.id}`, {
            onSuccess: () => {
                Swal.fire({

                    icon: 'success',
                    title: '¡Guardado!',
                    text: 'Dentista actualizado exitosamente.',
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    Inertia.visit('/dentistas');

                });
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


    const cancel = () => {
        Inertia.visit('/dentistas');
    }


    return (
        <AuthenticatedLayout

        >
            <Head title="Editar Dentista " />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-6  ">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Edición de Dentista</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="flex flex-wrap ">

                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <InputLabel htmlFor="name" value="Nombre" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
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

                                    <div className='w-full md:w-1/2 grid grid-cols-1 gap-6 md:gap-2 md:grid-cols-2 my-3 px-2'>
                                        <div className="w-full">
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
                                        <div className="w-full">
                                            <InputLabel htmlFor="license_number" value="Cédula profesional" />
                                            <TextInput
                                                id="license_number"
                                                type="text"
                                                value={data.license_number}
                                                className="mt-1 block w-full"
                                                onChange={handleChange}
                                                required
                                                aria-invalid={!!errors.license_number}
                                                aria-describedby="phone-error"
                                            />
                                            {errors.phone && (
                                                <p id="phone-error" className="mt-2 text-sm text-red-600">
                                                    {errors.license_number}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='w-full md:w-1/2 my-3 px-2'>
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


                                    <div className='w-full md:w-1/2 my-3 px-2'>
                                        <InputLabel htmlFor="specialty" value="Especialidad(s)" />
                                        <MultiSelectArray
                                            name="specialty"
                                            value={data.specialty || []} // Asegurar que sea un array
                                            onChange={(value) => handleChange2("specialty", value)}
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

                                        {errors.specialty && (
                                            <p id="birthdate-error" className="mt-2 text-sm text-red-600">
                                                {errors.specialty}
                                            </p>
                                        )}
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
                                                                className="w-1/2 text-xs md:text-sm  lg:w-full  p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                                                            />
                                                            <span className="text-gray-500 mt-2 md:mt-1 text-xs md:text-base">a</span>
                                                            <input
                                                                type="time"
                                                                value={availabilityData[key].end}
                                                                onChange={(e) => handleAvailabilityChange(key, 'end', e.target.value)}
                                                                disabled={!availabilityData[key].active}
                                                                className="w-1/2 text-xs md:text-sm lg:w-full  p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.availability && (
                                                <p id="phone-error" className="mt-2 text-sm text-red-600">
                                                    {errors.availability}
                                                </p>
                                            )}
                                        </div>
                                    </div>



                                    <div className='w-full md:w-1/2 my-3 px-2'>
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

                                </div>

                                <div className="flex justify-end gap-4 mt-4 mx-2">
                                    <ButtonCancel
                                        onClick={cancel}
                                    >
                                        Salir
                                    </ButtonCancel>
                                    <ReusableButton type="submit" disabled={processing}>
                                        {processing ? 'Guardando...' : 'Guardar'}
                                    </ReusableButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );

};
export default EditDentistaForm;