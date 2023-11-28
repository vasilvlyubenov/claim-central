import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { LogoutFunction } from 'types/LogoutFunction';
import { UserLink } from 'types/UserLink';
import { CloseMobileMenu } from '../../../types/CloseMobileMenu';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function UserNavDisclosure(props: {
    userLinks: UserLink[],
    logout: LogoutFunction,
    closeMenu: CloseMobileMenu
    userEmail: string
}) {

    const handleLogOutClick = () => {
        props.logout();
        props.closeMenu();
    };

    return (
        <Disclosure as="div" className="-mx-3">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-central hover:bg-gray-50">
                        {props.userEmail}
                        <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                        {[...props.userLinks].map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as={Link}
                                to={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-central hover:bg-gray-50"
                                onClick={props.closeMenu}
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                        <Disclosure.Button
                            key={'logout'}
                            as="span"
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-central hover:bg-gray-50 logout-btn"
                            onClick={handleLogOutClick}
                        >
                            Logout
                        </Disclosure.Button>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}