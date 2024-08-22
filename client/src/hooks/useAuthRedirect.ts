import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {LOGIN} from "@/constants/constants.ts";

export function useAuthRedirect () {
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!user.id) navigate(LOGIN);
        setIsChecking(false)
    }, [user.id, navigate]);

    return isChecking;
}