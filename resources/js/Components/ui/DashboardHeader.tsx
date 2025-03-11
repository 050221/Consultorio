
interface DashboardHeaderProps {
    icon: JSX.Element;
    title: string;
    subtitle: string;
}
const DashboardHeader:React.FC<DashboardHeaderProps> = ({ icon, title, subtitle }) => {
    return (
        <div className="space-y-1">
            <div className="flex items-center space-x-2">
                {icon}
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    );
};

export default DashboardHeader;
