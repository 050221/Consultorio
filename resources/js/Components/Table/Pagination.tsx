import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { PaginationLink } from '@/types';

interface PaginationProps {
    links: PaginationLink[]; // Enlaces de paginación
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    if (!links || links.length === 0) return null; // No renderizar si no hay enlaces

    const handleClick = (url: string | null) => {
        if (url) {
            Inertia.get(url); // Navegación usando Inertia.js
        }
    };

    return (
        <nav aria-label="Paginación" className="flex justify-center mt-4">
            <ul className="inline-flex space-x-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <button
                            className={`px-3 py-1 border rounded ${link.active
                                ? 'bg-sky-500 text-white'
                                : link.url
                                    ? 'bg-white text-gray-700 hover:bg-gray-100'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!link.url}
                            onClick={() => handleClick(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            aria-label={`Ir a la página ${link.label}`}
                        ></button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
