import React from 'react';

import { ChevronDown, ChevronUp,Eye, Pencil, Trash2 } from 'lucide-react';
import { useSortableData } from '../hooks/useSortableData';
import ReusableButton from '../Form/ReusableButton';

interface TableColumn {
    key: string; // Clave del objeto en 'data', puede ser anidada como 'users.name'
    label: string;
    format?: (value: any) => React.ReactNode;
}

interface TableProps {
    headers: TableColumn[];
    data: Array<{ [key: string]: any }>;
    onView?: (id: any) => void;
    onEdit?: (id: any) => void;
    onDelete?: (id: any) => void;
    omitKeys?: string[];
    className?: string;
    showActions?: boolean;
    actionLabels?: {view?: string; edit?: string; delete?: string };
}

// Función para obtener valores anidados
const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) =>
        acc && acc[part] !== undefined ? acc[part] : 'N/A',
        obj
    );
};

const CustomTable: React.FC<TableProps> = ({
    headers,
    data,
    onEdit,
    onDelete,
    onView,
    omitKeys = [],
    className,
    showActions = true,
    actionLabels = {view: 'Detalles', edit: 'Editar', delete: 'Eliminar' },
}) => {

    const { sortedData, sortOptions, requestSort } = useSortableData(data);

    return (
        <div className={`w-full overflow-x-auto rounded-sm ${className || ''}`}>
            <table className="w-full text-md text-left">
                <thead className="text-gray-700 bg-gray-200">
                    <tr className="border-b border-gray-500 border-opacity-50">
                        {headers
                            .filter(header => !omitKeys.includes(header.key))
                            .map((header, index) => (
                                <th key={index} className="px-4 py-2">
                                    <div className="flex justify-between items-center">
                                        <div>{header.label}</div>
                                        <div className="flex flex-col items-center">
                                            <ChevronUp
                                                className={`h-3.5 w-3.5 cursor-pointer ${sortOptions.key === header.key && sortOptions.order === 'asc' ? 'text-sky-600' : ''
                                                    }`}
                                                onClick={() => requestSort(header.key)}
                                            />
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 cursor-pointer ${sortOptions.key === header.key && sortOptions.order === 'desc' ? 'text-sky-600' : ''
                                                    }`}
                                                onClick={() => requestSort(header.key)}
                                            />
                                        </div>
                                    </div>
                                </th>
                            ))}
                        {showActions && <th className="px-4 py-2">Acciones</th>}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b even:bg-gray-50 hover:bg-gray-100"
                        >
                            {headers
                                .filter(header => !omitKeys.includes(header.key))
                                .map((header, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2">
                                        {header.format
                                            ? header.format(getNestedValue(row, header.key))
                                            : getNestedValue(row, header.key)}
                                    </td>
                                ))}
                            {showActions && (
                                <td className="px-4 py-2 flex gap-2">
                                    {onView && (
                                        <ReusableButton
                                            onClick={() => onView(row.id)}
                                            className=" tooltip"
                                            title="Detalles"
                                        >
                                            <Eye className="h-5 w-4 mr-1" />
                                            {actionLabels.view}
                                        </ReusableButton>
                                    )}
                                    {onEdit && (
                                        <ReusableButton
                                            onClick={() => onEdit(row.id)}
                                            className=" tooltip"
                                            color="orange"
                                            title="Editar"
                                        >
                                            <Pencil className="h-5 w-4 mr-1" />
                                            {actionLabels.edit}
                                        </ReusableButton>
                                    )}
                                    {onDelete && (
                                        <ReusableButton
                                            onClick={() => onDelete(row.id)}
                                            color="red"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="h-5 w-4 mr-1" />
                                            {actionLabels.delete}
                                        </ReusableButton>
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