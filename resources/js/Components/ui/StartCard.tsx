interface StatCardProps {
    icon: JSX.Element;
    value: number;
    label: string;
    bgColor: string;
    iconColor: string;
}

const StartCard: React.FC<StatCardProps> = ({ icon, value, label, bgColor, iconColor }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
            <div className={`p-3 ${bgColor} rounded-full`}>
                <div className={iconColor}>{icon}</div>
            </div>
            <div>
                <p className="text-lg font-semibold text-gray-700">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );
};

export default StartCard;