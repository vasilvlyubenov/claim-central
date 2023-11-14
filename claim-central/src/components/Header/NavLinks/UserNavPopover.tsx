import { Fragment, } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { UserLink } from 'types/UserLink';
import { LogoutFunction } from "../../../types/LogoutFunction";


export default function UserNavPopover(props: {
    userLinks: UserLink[],
    logout: LogoutFunction,
}) {

    return (
        <>
            <Link to="/new-claim" className="text-sm font-semibold leading-6 text-central">
                New claim
            </Link>
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
                  {props.userLinks.map((item: UserLink) => (
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
                  <div
                    key={'logout'}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-central-2"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <XCircleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="flex-auto">
                      <button className="inline font-semibold text-central" onClick={props.logout}>
                        Logout
                        <span className="absolute inset-0" />
                      </button>
                    </div>
                  </div>
                </div>

              </Popover.Panel>
            </Transition>
          </Popover>
        </>
    );
}