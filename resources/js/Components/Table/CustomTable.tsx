import React from 'react';
import { ChevronDown, ChevronUp, Eye, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useSortableData } from '../hooks/useSortableData';
import RoleGuard from '../auth/RoleGuard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';


interface TableColumn {
    key: string;
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
    actionLabels?: { view?: string; edit?: string; delete?: string };
}

const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : 'N/A', obj);
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
    actionLabels = { view: 'Detalles', edit: 'Editar', delete: 'Eliminar' },
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
                                                className={`h-3.5 w-3.5 cursor-pointer ${sortOptions.key === header.key && sortOptions.order === 'asc' ? 'text-sky-600' : ''}`}
                                                onClick={() => requestSort(header.key)}
                                            />
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 cursor-pointer ${sortOptions.key === header.key && sortOptions.order === 'desc' ? 'text-sky-600' : ''}`}
                                                onClick={() => requestSort(header.key)}
                                            />
                                        </div>
                                    </div>
                                </th>
                            ))}
                        {showActions && <th className="px-4 py-2 text-center">Acciones</th>}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sortedData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b even:bg-gray-50 hover:bg-gray-100">
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
                                <td className="px-4 py-3 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition shadow-sm">
                                            <MoreVertical size={18} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white border border-gray-300 rounded-lg shadow-md p-2">
                                            {onView && (
                                                <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => onView(row.id)}>
                                                    <Eye className="w-5 h-5 text-blue-500" /> {actionLabels.view}
                                                </DropdownMenuItem>
                                            )}
                                            {onEdit && (
                                                <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => onEdit(row.id)}>
                                                    <Pencil className="w-5 h-5 text-orange-500" /> {actionLabels.edit}
                                                </DropdownMenuItem>
                                            )}
                                            {onDelete && (
                                                <RoleGuard allowedRoles={['admin']}>
                                                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-100 rounded-md cursor-pointer" onClick={() => onDelete(row.id)}>
                                                        <Trash2 className="w-5 h-5 text-red-500" /> {actionLabels.delete}
                                                    </DropdownMenuItem>
                                                </RoleGuard>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
