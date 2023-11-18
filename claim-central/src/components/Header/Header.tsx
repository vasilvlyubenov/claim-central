import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useUserSignOutQuery } from '../../features/user/userApi';
import { logout } from '../../features/user/userSlice';
import './Header.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserLink } from '../../types/UserLink';
import UserNavPopover from './NavLinks/UserNavPopover';
import GuestPopover from './NavLinks/GuestNavPopover';
import UserNavDisclosure from './NavLinks/UserNavDisclosure';
import GuestNavDisclosure from './NavLinks/GuestNavDisclosure';


const userLinks: UserLink[] = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Change Password', href: '/change-password', icon: PencilSquareIcon },
];



export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const { error, isSuccess } = useUserSignOutQuery(null, { skip });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const logoutUser = () => {
    setSkip(false);
    dispatch(logout());

    if (error) {
      console.error(error);
    }

    if (isSuccess) {
      setSkip(true);
    }
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Claim central</span>
            <img className="h-8 w-auto" src="/src/assets/icon.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-central"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          <Link to="/dashboard" className="text-sm font-semibold leading-6 text-central">
            Dashboard
          </Link>

          {user.uid && <UserNavPopover
            userLinks={userLinks}
            logout={logoutUser}
            userEmail={user.email ?? ''} />}

          {!user.uid && <GuestPopover />}

        </Popover.Group>

      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={handleCloseMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">


                {user.uid && <UserNavDisclosure
                  userLinks={userLinks}
                  logout={logoutUser}
                  closeMenu={handleCloseMobileMenu}
                  userEmail={user.email ?? ''}
                />}

                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                  onClick={handleCloseMobileMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/new-claim"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                  onClick={handleCloseMobileMenu}
                >
                  New claim
                </Link>

              </div>

              {!user.uid && <GuestNavDisclosure closeMenu={handleCloseMobileMenu} />}

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}