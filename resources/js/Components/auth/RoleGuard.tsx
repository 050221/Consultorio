import React from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface GuardProps {
    allowedRoles?: string[];
    allowedPermissions?: string[];
    children: React.ReactNode;
}

const Guard: React.FC<GuardProps> = ({ allowedRoles = [], allowedPermissions = [], children }) => {
    const { auth } = usePage<PageProps>().props;
    const userRoles = auth.roles || [];
    const userPermissions = auth.permissions || [];

    const hasRoleAccess = allowedRoles.length === 0 || allowedRoles.some((role) => userRoles.includes(role));
    const hasPermissionAccess = allowedPermissions.length === 0 || allowedPermissions.some((perm) => userPermissions.includes(perm));

    return hasRoleAccess && hasPermissionAccess ? <>{children}</> : null;
};

export default Guard;
