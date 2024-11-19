interface Props {
    name: string;
    label: string;
    type?: string;
    error?: string;
}

const InputForm = ({ name, label, type, }: Props) => {
    return (
        <div className="relative space-y-1 min-h-[70px] mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <input
                id={name}
                type={type}
                className={`
                  w-full
                  px-3
                  py-2
                  rounded-lg
                  border
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  transition
                  duration-200
                `}
                placeholder={label}
              />
        </div>
    )
}

export default InputForm;