import {Link, useLocation} from "react-router-dom";
import React from "react";

interface NavLinkProps {
    to: string;
    children: React.ReactNode
}

function NavLink({ to, children }: NavLinkProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`transition-colors hover:text-foreground whitespace-nowrap ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
        >
            {children}
        </Link>
    )
}

export default NavLink;