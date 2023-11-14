import { Link } from "react-router-dom";

export default function GuestPopover() {

    return (
        <>
            <Link to="/register" className="text-sm font-semibold leading-6 text-central">
                Register
            </Link>
            <div className="hidden lg:flex lg:justify-end">
                <Link to="/login" className="text-sm font-semibold leading-6 text-central">
                    Log in
                </Link>
            </div>
        </>
    );
}