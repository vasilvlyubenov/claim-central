import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { setUser } from '../../features/user/userSlice';

import { useGetUserInfoQuery, useUserSignOutQuery } from '../../features/user/userApi';
import { logout } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserLink } from '../../types/UserLink';

import UserNavPopover from './NavLinks/UserNavPopover';
import GuestPopover from './NavLinks/GuestNavPopover';
import UserNavDisclosure from './NavLinks/UserNavDisclosure';
import GuestNavDisclosure from './NavLinks/GuestNavDisclosure';

import './Header.css';


const userLinks: UserLink[] = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Change Password', href: '/change-password', icon: PencilSquareIcon },
];



export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoSkip, setInfoSkip] = useState(true);
  const [skip, setSkip] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);
  const { error } = useUserSignOutQuery(null, { skip });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetUserInfoQuery({
    skip: infoSkip
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setInfoSkip(false);

        if (isSuccess) {

          
            dispatch(setUser({
              uid: res.uid,
              email: res.email,
              refreshToken: res.refreshToken,
              userType: res.displayName,
              deadlines: {
                d3: data?.deadlines?.d3,
                d4: data?.deadlines?.d4,
                d5: data?.deadlines?.d5,
                d6: data?.deadlines?.d6,
                d7: data?.deadlines?.d7,
                d8: data?.deadlines?.d8,
              }
            }));
          

        }

      } else {
        return null;
      }
      return () => unsubscribe();
    });
  }, [dispatch, data, isSuccess]);


  useEffect(() => {
    if (user.userType === 'customer') {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    }
  }, [user]);

  const logoutUser = () => {
    setSkip(false);
    dispatch(logout());
    navigate('/');
    window.location.reload();

    if (error) {
      console.error(error);
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
            userEmail={user.email ?? ''}
            isCustomer={isCustomer}
          />}

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


                {isCustomer && <Link
                  to="/new-claim"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                  onClick={handleCloseMobileMenu}
                >
                  New claim
                </Link>}

                {!isCustomer && <Link
                  to="/open-claims"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                  onClick={handleCloseMobileMenu}
                >
                  Open claims
                </Link>}

              </div>

              {!user.uid && <GuestNavDisclosure closeMenu={handleCloseMobileMenu} />}

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}