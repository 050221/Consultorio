import React from 'react';
import ButtonAdd from '../ui/ButtonAdd';
import { Pencil, Trash2 } from 'lucide-react';


interface TableColumn {
    key: string; // Clave del objeto en 'data'
    label: string; // Título de la columna
    format?: (value: any) => React.ReactNode; // Formateador opcional para los datos
}

interface TableProps {
    headers: TableColumn[]; // Columnas dinámicas
    data: Array<{ [key: string]: any }>; // Datos dinámicos
    onEdit?: (id: any) => void; // Acción de editar
    onDelete?: (id: any) => void; // Acción de eliminar
    omitKeys?: string[]; // Claves a omitir
    className?: string; // Clases personalizadas
    showActions?: boolean; // Mostrar columna de acciones
    actionLabels?: { edit?: string; delete?: string }; // Etiquetas de acciones
}

const CustomTable: React.FC<TableProps> = ({
    headers,
    data,
    onEdit,
    onDelete,
    omitKeys = [], // Por defecto, no se omite ninguna clave
    className,
    showActions = true,
    actionLabels = { edit: 'Editar', delete: 'Eliminar' },
}) => {
    return (
        <div className={`w-full overflow-x-auto rounded-sm ${className || ''}`}>
            <table className="w-full text-md text-left">
                <thead className="text-gray-700 bg-gray-200">
                    <tr className="border-b border-gray-500 border-opacity-50">
                        {headers
                            .filter(header => !omitKeys.includes(header.key)) 
                            .map((header, index) => (
                                <th key={index} className="px-6 py-2">
                                    {header.label}
                                </th>
                            ))}
                        {showActions && <th className="px-6 py-2">Acciones</th>}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b even:bg-gray-50 hover:bg-gray-100"
                        >
                            {headers
                                .filter(header => !omitKeys.includes(header.key)) 
                                .map((header, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2">
                                        {header.format
                                            ? header.format(row[header.key])
                                            : row[header.key]}
                                    </td>
                                ))}
                            {showActions && (
                                <td className="px-4 py-2 flex gap-2">
                                    {onEdit && (
                                        <ButtonAdd
                                            onClick={() => onEdit(row.id)}
                                            className="bg-orange-500 hover:bg-orange-700 text-white px-2 py-1 rounded"
                                        >
                                            <Pencil className="h-5 w-4 m-auto" />
                                            {actionLabels.edit}
                                        </ButtonAdd>
                                    )}
                                    {onDelete && (
                                        <ButtonAdd
                                            onClick={() => onDelete(row.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            <Trash2 className="h-5 w-4 m-auto" />
                                            {actionLabels.delete}
                                        </ButtonAdd>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
