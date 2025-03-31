export default function Error500() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 text-sky-900">
            <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">500</h1>
            <p className="text-xl md:text-2xl font-semibold mt-4">Error interno del servidor</p>
            <p className="text-gray-500 mt-2 text-center max-w-md">
                Ocurrió un problema inesperado. Intenta nuevamente más tarde.
            </p>
            <a
                href="/"
                className="mt-6 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition"
            >
                Volver al inicio
            </a>
        </div>
    );
}
