interface SearchBarProps {
    placeHolder: string;
    onSearch: (value: string) => void;
}

const SearchBar = ({ placeHolder, onSearch }: SearchBarProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value); 
    };

    return (
        <input
            type="text"
            className=" w-full text-base rounded-md border border-gray-300 hover:bg-gray-200 focus:ring-offset-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300"
            placeholder={placeHolder}
            onChange={handleChange}
        />
    );
};

export default SearchBar;
