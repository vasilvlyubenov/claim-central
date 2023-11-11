import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  XCircleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const userLinks = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Change Password', href: '/change-password', icon: PencilSquareIcon },
  { name: 'Logout', href: '/logout', icon: XCircleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
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
          <Link to="/new-claim" className="text-sm font-semibold leading-6 text-central">
            New claim
          </Link>
          <Link to="/register" className="text-sm font-semibold leading-6 text-central">
            Register
          </Link>
          <div className="hidden lg:flex lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-central">
              Log in
            </Link>
          </div>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-central">
              User
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {userLinks.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-central-2"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link to={item.href} className="block font-semibold text-central">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

              </Popover.Panel>
            </Transition>
          </Popover>
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
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-central hover:bg-gray-50">
                        User
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...userLinks].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-central hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                >
                  Features
                </Link>
                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                >
                  Company
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/register"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-central hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}