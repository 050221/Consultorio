
export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-sky-100 dark:bg-gray-800 text-sky-900">
            <h1 className="text-9xl font-extrabold text-sky-500 tracking-widest">404</h1>
            <p className="text-xl md:text-2xl font-semibold mt-4">Página no encontrada</p>
            <p className="text-gray-500 mt-2 text-center max-w-md">
                Lo sentimos, la página que buscas no existe o ha sido movida.  
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
