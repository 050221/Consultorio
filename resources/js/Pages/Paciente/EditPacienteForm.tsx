import { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';
import ButtonCancel from '@/Components/Form/ButtonCancel';
import ReusableButton from '@/Components/Form/ReusableButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

// **Interfaz del modelo Paciente**
// Esta interfaz describe cómo está estructurada la información del paciente que se recibe como propiedad.
// Incluye su ID único, nombre, correo electrónico y la fecha en que fue creado.
interface Paciente {
    id: number; // ID único del paciente en la base de datos.
    name: string; // Nombre completo del paciente.
    email: string; // Correo electrónico del paciente.
    phone: string;
    created_at: string; // Fecha y hora de creación del registro.
}

// **Interfaz para las propiedades del componente EditPacienteForm**
// Este componente espera recibir un objeto `paciente` con la información actual
// del paciente a editar, y una función `onClose` para cerrar el formulario cuando sea necesario.
interface EditPacienteFormProps {
    paciente: Paciente; // Información actual del paciente.
    onClose: () => void; // Función que se ejecuta para cerrar el formulario.
}

// **Interfaz para los errores de validación**
// Describe cómo se espera que el servidor devuelva los errores de validación.
// Los errores son arrays de cadenas que describen el problema de cada campo.
interface ValidationError {
    name?: string[]; // Errores relacionados con el campo `name`.
    email?: string[]; // Errores relacionados con el campo `email`.
    phone?: string[];
}

const EditPacienteForm: React.FC<EditPacienteFormProps> = ({ paciente, onClose }) => {
    const [formData, setFormData] = useState({
        name: paciente.name,
        email: paciente.email,
        phone: paciente.phone,
        // Agrega aquí todos los campos necesarios
    });
    
    // **Estados locales del componente**
    // - `name` y `email` almacenan los valores actuales de los campos que el usuario puede editar.
    // - `errors` es un objeto que contiene posibles errores de validación devueltos por el servidor.
    const [name, setName] = useState(paciente.name); // Inicializa con el nombre actual del paciente.
    const [email, setEmail] = useState(paciente.email); // Inicializa con el correo actual del paciente.
    const [phone, setPhone] = useState(paciente.phone);


    const [errors, setErrors] = useState<any>({}); // Inicializa como un objeto vacío para los errores.

    // **Función que maneja el envío del formulario**
    // Esta función se ejecuta cuando el usuario presiona el botón "Guardar".
    // - Se valida la entrada del usuario.
    // - Se envía una solicitud PUT al servidor para actualizar la información del paciente.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir la recarga de la página al enviar el formulario.

        // **Limpieza previa de errores**
        // Si hubo errores en envíos anteriores, los eliminamos para no mostrar mensajes obsoletos.
        setErrors({});

        // **Validación básica del lado del cliente**
        // Se verifica que los campos `name` y `email` no estén vacíos antes de enviar la solicitud.
        if (!name.trim() || !email.trim() || !phone.trim()) {
            // Mostrar un mensaje de alerta utilizando SweetAlert2 si los campos están vacíos.
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.', // Mensaje claro para el usuario.
                icon: 'error', // Ícono de error para llamar la atención.
                confirmButtonText: 'OK', // Botón de confirmación.
            });
            return; // Finaliza la ejecución para evitar el envío de datos inválidos.
        }

        // **Intentar enviar la solicitud PUT**
        // Se utiliza un bloque `try-catch` para manejar posibles errores al comunicarse con el servidor.
        try {
            // Enviamos los datos del paciente al servidor utilizando Axios.
            const response = await axios.put(`/pacientes/${paciente.id}`, { name, email, phone });

            // Si la respuesta del servidor indica éxito, mostramos una alerta de confirmación.
            if (response.data.success) {
                Swal.fire({
                    title: '¡Guardado!',
                    text: response.data.message, // Mensaje de éxito personalizado desde el backend.
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    onClose(); // Cerrar el formulario tras guardar correctamente.
                });
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                // Guardamos los errores en el estado por si queremos mostrarlos en los inputs
                const errorData: ValidationError = error.response.data.errors || {};
                setErrors(errorData);
        
                // Mostramos un mensaje de error general
                Swal.fire({
                    title: 'Error en el formulario',
                    text: 'Por favor, revisa los datos ingresados y vuelve a intentarlo.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                // Manejo de errores generales, como problemas de conexión al servidor
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al conectarse con el servidor. Por favor, intenta más tarde.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
        
        
    };

    // **Renderizado del formulario**
    // Incluye campos de texto para editar el nombre y el correo electrónico, y botones para guardar o cancelar.
    return (
        <>
            {/* Configuración del título de la página */}
            <Head title="Editar paciente" />

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* **Campo: Nombre** */}
                <div>
                    {/* Etiqueta para el campo nombre */}
                    <InputLabel htmlFor="name" value="Nombre" />
                    {/* Input controlado para editar el nombre */}
                    <TextInput
                        id="name"
                        type="text"
                        value={name} // El valor actual del campo proviene del estado.
                        className="mt-1 block w-full"
                        onChange={(e) => setName(e.target.value)} // Actualiza el estado `name` al escribir.
                    />
                    {/* Si hay errores en el campo `name`, mostramos el primer mensaje */}
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name[0]}</p>
                    )}
                </div>

                {/* **Campo: Correo electrónico** */}
                <div>
                    {/* Etiqueta para el campo email */}
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    {/* Input controlado para editar el correo */}
                    <TextInput
                        id="email"
                        type="email"
                        value={email} // El valor actual del campo proviene del estado.
                        className="mt-1 block w-full"
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado `email` al escribir.
                    />
                    {/* Si hay errores en el campo `email`, mostramos el primer mensaje */}
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>
                    )}
                </div>
                <div>
                    {/* Etiqueta para el campo email */}
                    <InputLabel htmlFor="email" value="Telefono" />
                    {/* Input controlado para editar el correo */}
                    <TextInput
                        id="phone"
                        type="text"
                        value={phone} // El valor actual del campo proviene del estado.
                        className="mt-1 block w-full"
                        onChange={(e) => setPhone(e.target.value)} // Actualiza el estado `email` al escribir.
                    />
                    {/* Si hay errores en el campo `email`, mostramos el primer mensaje */}
                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone[0]}</p>
                    )}
                </div>

                {/* **Botones de acción** */}
                <div className="flex justify-end gap-4">
                    {/* Botón para cancelar la edición */}
                    <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                    {/* Botón para guardar los cambios */}
                    <ReusableButton type="submit">Guardar</ReusableButton>
                </div>
            </form>
        </>
    );
};

export default EditPacienteForm;
