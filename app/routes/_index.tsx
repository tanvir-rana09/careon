import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { FRONTEND_LINKS } from "~/constants/links";

export default function Index() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/") {
            navigate(FRONTEND_LINKS.auth.login, { replace: true });
        }
    }, [navigate, pathname]);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Icon icon="line-md:loading-loop" fontSize={200} />
        </div>
    );
}
