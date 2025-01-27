import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { useState } from "react";
import { Filter } from "lucide-react";
import TextInput from "../TextInput";
import ReusableSelect from "./ReusableSelect";
import ReusableButton from "../Form/ReusableButton";
import InputLabel from "../InputLabel";

interface FiltrosPopoverProps {
    date: string;
    status: string;
    handleDateChange: (value: string) => void;
    handleStatusChange: (value: string) => void;
}

const FiltrosPopover: React.FC<FiltrosPopoverProps> = ({ date, status, handleDateChange, handleStatusChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                    <Filter className="w-5 h-5" />
                    <span>Filtros</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white shadow-lg rounded-lg">
                <div className="space-y-4">
                    <div>
                        <InputLabel htmlFor="date" value="Fecha" />
                        <TextInput
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-full cursor-pointer"
                        />

                    </div>
                    <div>
                        <InputLabel htmlFor="status" value="Estado" />
                        <ReusableSelect
                            id="status"
                            value={status}
                            onChange={(e) => handleStatusChange(String(e.target.value))}
                            options={[
                                { value: '', label: 'Todos los estados' },
                                { value: 'Pendiente', label: 'Pendiente' },
                                { value: 'Confirmada', label: 'Confirmada' },
                                { value: 'Cancelada', label: 'Cancelada' },
                            ]}
                            placeholder=""
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <ReusableButton
                            onClick={() => {
                                setOpen(false);
                            }}

                        >
                            Cerrar
                        </ReusableButton>

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FiltrosPopover;
