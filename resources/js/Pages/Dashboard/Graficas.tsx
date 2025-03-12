import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { CalendarDays, TrendingUp, Info, UserCheck, BarChart2, } from 'lucide-react';
import { DentistaMasCitas, TotalCitasPorMes } from "@/types";

type GraficasProps = {
    destistasMasCitas: DentistaMasCitas[];
    totalCitasPorMes: TotalCitasPorMes[];
};

const Graficas: React.FC<GraficasProps> = ({ destistasMasCitas, totalCitasPorMes }) => {
    return (
        <>
            <div className="max-w-5xl mx-auto p-6">
                {/* Título y Descripción */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                        <TrendingUp className="w-7 h-7 text-blue-500" />
                        <span className="text-gray-600  dark:text-gray-50">Estadísticas de Citas</span>

                    </h2>
                    <p className="text-gray-600 text-sm dark:text-gray-100 mt-1">Análisis de la cantidad de citas registradas en los últimos meses.</p>
                </div>

                {/* Contenedor de Gráfico */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Encabezado del Gráfico */}
                    <div className="flex items-center gap-3 mb-4">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Tendencia de Citas 📅</h3>
                            <p className="text-xs text-gray-500">Visualiza cómo varía la cantidad de citas a lo largo del año.</p>
                        </div>
                    </div>

                    {/* Gráfico */}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={totalCitasPorMes}>
                            <XAxis dataKey="mes" tick={{ fill: "#64748b", fontSize: 12 }} />
                            <YAxis
                                tick={{ fill: "#64748b", fontSize: 12 }}
                                allowDecimals={false}
                                tickFormatter={(value) => `${Math.round(value)}`}
                            />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #ddd" }} />
                            <Legend wrapperStyle={{ fontSize: "12px", color: "#555" }} />
                            <Line
                                type="monotone"
                                dataKey="citas"
                                stroke="#0ea5e9"
                                strokeWidth={3}
                                dot={{ fill: "#0ea5e9", r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Beneficio */}
                    <div className="mt-4 flex items-center gap-2 text-gray-600 text-sm">
                        <Info className="w-5 h-5 text-gray-500" />
                        <p>
                            Este gráfico ayuda a identificar <span className="text-blue-600 font-medium">meses con alta o baja demanda</span>
                            para tomar decisiones estratégicas, como promociones en temporadas bajas.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6">
                {/* Título */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                        <UserCheck className="w-7 h-7 text-indigo-500" />
                        <span className="text-gray-600  dark:text-gray-50"> Dentistas con Más Citas</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-100 text-sm mt-1">Análisis de los dentistas más demandados en la clínica.</p>
                </div>

                {/* Contenedor del Gráfico */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Encabezado del Gráfico */}
                    <div className="flex items-center gap-3 mb-4">
                        <BarChart2 className="w-6 h-6 text-indigo-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700  ">Dentistas con Mayor Demanda 👨‍⚕️</h3>
                            <p className="text-xs text-gray-500">Identifica qué dentistas tienen más pacientes y citas asignadas.</p>
                        </div>
                    </div>

                    {/* Gráfico */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={destistasMasCitas} barSize={50}>
                            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #ddd" }} />
                            <Legend wrapperStyle={{ fontSize: "12px", color: "#555" }} />
                            <Bar dataKey="citas" fill="#6366F1" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Beneficio */}
                    <div className="mt-4 flex items-center gap-2 text-gray-600 text-sm">
                        <Info className="w-5 h-5 text-gray-500" />
                        <p>
                            Este gráfico ayuda a visualizar la <span className="text-indigo-600 font-medium">demanda de cada dentista</span>,
                            permitiendo evaluar si es necesario contratar más especialistas o ajustar la distribución de citas.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Graficas;