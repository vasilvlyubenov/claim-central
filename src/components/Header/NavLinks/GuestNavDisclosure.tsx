import { Link } from 'react-router-dom';
import {CloseMobileMenu} from '../../../types/CloseMobileMenu';

export default function GuestNavDisclosure(props: {
    closeMenu: CloseMobileMenu
}) {

    return (
        <div className="py-6">
        <Link
          to="/register"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-central hover:bg-gray-50"
          onClick={props.closeMenu}
        >
          Register
        </Link>
        <Link
          to="/login"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-central hover:bg-gray-50"
          onClick={props.closeMenu}
        >
          Log in
        </Link>
      </div>
    );
}