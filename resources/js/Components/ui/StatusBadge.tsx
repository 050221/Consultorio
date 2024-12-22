interface StatusBadgeProps {
    value: boolean | number;
  }
  
  const StatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
    if (value === true || value === 1) {
      return <span className="rounded-md bg-green-100 text-green-700 px-2 py-1 font-semibold">Activo</span>;
    } else if (value === false || value === 0) {
      return <span className="rounded-md bg-red-100 text-red-700 px-2 py-1 font-semibold">Inactivo</span>;
    }
    return <span className="rounded-md bg-gray-100 text-gray-700 px-2 py-1 font-semibold">Desconocido</span>;
  };
  
  export default StatusBadge;