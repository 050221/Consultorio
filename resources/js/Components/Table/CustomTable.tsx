interface TableProps {
    headers: string[];
    data: Array<{ [key: string]: any }>;
    renderRow?: (row: { [key: string]: any }, index: number) => React.ReactNode; // Opcional con "?"
}


const CustomTable: React.FC<TableProps> = ({ headers, data, renderRow }) => {
    return (
        <div className="w-full overflow-x-auto  rounded-sm">
            <table className="w-full text-md text-left">
                <thead className="text-gray-700 bg-gray-200">
                    <tr className="border-b border-gray-500 border-opacity-50">
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((row, index) =>
                        renderRow ? (
                            renderRow(row, index)
                        ) : (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                {Object.values(row).map((value, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-1">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable;