export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    activo: boolean;
    created_at: string;
    birthdate: string;
    email_verified_at?:string;
}


export interface Doctor extends User {
    specialty: string;
    availability: string;
}

export type Recepcionista = Omit<User, 'birthdate'>;

export interface Cita {
    id: number;
    patient_id: number;
    doctor_id: number;
    fecha: string;
    hora: string;
    tipo: string;
    status: string;
    nota?: string;
    created_at: string;
    patient: User;  
    doctor: Doctor; 
}


// por defecto
// Extender la propiedad `auth` para incluir roles y permisos
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | Doctor; // Información del usuario autenticado
        roles: string[]; // Roles del usuario
        permissions: string[]; // Permisos del usuario
    };
};

export const hasPermission = (permission: string, permissions: string[]): boolean => {
    return permissions.includes(permission);
};

export const hasRole = (role: string, roles: string[]): boolean => {
    return roles.includes(role);
};


//inicio citas
//archivo citasindex
export interface CitasPageProps extends PageProps {
    citas: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    citasDentista:{
        data: Cita[];
        links: PaginationLink[];
    }
    [key: string]: any; 
}




//archivo  create 
type CitaPageProps = PageProps<{
    citas: Cita[];
    pacientes: User[];
    doctores: Doctor[];
}>;


//archivo view
type CitaViewPageProps = PageProps<{
    cita: Cita;
}>;

//archivo edit citas
export interface EditCitaFormProps {
    cita: Cita;  // Ya tienes esta interfaz definida en tus tipos
    onClose: () => void;
}


//archivo Dashboard
export interface DashboardPageProps extends PageProps {
    citas: Cita[]; // Todas las citas
    citasHoy: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[]; // Links para la paginación
    };
    totalPacientes:number;
    totalDentistas:number;
    totalCitas:number;
    totalCitasConfirmadas:number;
    totalCitasPendientes:number;
    totalCitasCancelada:number;
    destistasMasCitas: DentistaMasCitas[];
    totalCitasPorMes:TotalCitasPorMes[];
    citasUser:Cita[];
    citasDentista:Cita[];
    citasDentistaHoy: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[]; // Links para la paginación
    };
    totalCitasDentista:number;
    totalCitasConfirmadasDentista:number;
    totalCitasPendientesDentista:number;
    totalCitasCanceladaDentista:number;
}

type DentistaMasCitas = {
    name: string;
    citas: number;
  };
  
  type TotalCitasPorMes = {
    mes: string;
    citas: number;
  };

//fin Dashboard 



//inicio pacientes/users
// index pacientes
export interface PacientesPageProps extends PageProps {
    pacientes: {
        data: User[]; 
        links: PaginationLink[]; 
    };
    [key: string]: any; 
}

//archivo edit  pacientes
export interface PacienteFormProps {
    paciente: User;  
    onClose: () => void; 
}

//archivo  view pacientes
export interface PacienteViewProps {
    paciente: User;  
    
}


// inicio dentistas
export interface DentistasPageProps extends PageProps {
    dentistas: {
        data: Doctor[]; 
        links: PaginationLink[]; 
    };
    [key: string]: any; 
}

export interface DentistaFormProps {
    dentista: Doctor;  
}



//inicio Recepcionista
// index Recepcionista
export interface RecepcionistasPageProps extends PageProps {
    recepcionistas: {
        data: Recepcionista[]; 
        links: PaginationLink[]; 
    };
    [key: string]: any; 
}

//archivo edit  Recepcionista
export interface RecepcionistaFormProps {
    recepcionista: Recepcionista;  
    onClose: () => void; 
}

//archivo  view Recepcionista
export interface RecepcionistaViewProps {
    recepcionista: Recepcionista;  
    
}

export interface HistorialPageProps extends PageProps {
    historialC: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    historialCDoctor: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    citasPatient: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    [key: string]: any; 
}




export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
