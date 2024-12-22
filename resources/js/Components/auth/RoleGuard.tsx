import React from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';


interface RoleGuardProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const { auth } = usePage<PageProps>().props;
    const userRoles = auth.roles || [];
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    return hasAccess ? <>{children}</> : null;
};

export default RoleGuard;
