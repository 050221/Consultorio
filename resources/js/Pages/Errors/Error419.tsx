export default function Error419() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 text-sky-900">
            <h1 className="text-9xl font-extrabold text-purple-500 tracking-widest">419</h1>
            <p className="text-xl md:text-2xl font-semibold mt-4">Sesión expirada</p>
            <p className="text-gray-500 mt-2 text-center max-w-md">
                Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
            </p>
            <a
                href="/login"
                className="mt-6 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition"
            >
                Iniciar sesión
            </a>
        </div>
    );
}
