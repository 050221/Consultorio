export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    activo: boolean;
    created_at: string;
    email_verified_at?: string;
}

export interface Cita {
    id: number;
    patient_id: number;
    fecha: string;
    hora: string;
    status: string;
    nota?: string;
    created_at: string;
    users: User; 
}

export interface HistorialPageProps extends PageProps {
    historialC: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    [key: string]: any; 
}


export interface CitasPageProps extends PageProps {
    citas: {
        data: Cita[]; // Datos paginados
        links: PaginationLink[];
    };
    [key: string]: any; 
}




// por defecto
// Extender la propiedad `auth` para incluir roles y permisos
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User; // Información del usuario autenticado
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
    [key: string]: any; 
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

//archivo  create 
type CitaPageProps = PageProps<{
    citas: Cita[];
    users: User[];
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
    [key: string]: any; 
}
//fin citas



//inicio pacientes/users
// index pacientes
export interface PacientesPageProps extends PageProps {
    pacientes: {
        data: User[]; 
        links: PaginationLink[]; 
    };
    [key: string]: any; 
}

//archivo edit y view pacientes
export interface PacienteFormProps {
    paciente: User;  
    onClose: () => void;
}




export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


