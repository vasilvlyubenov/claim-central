import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <>
            <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center not-found">
                    <p className="text-base font-semibold">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="rounded-md bg-central px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-central-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-central-600"
                        >
                            Go back home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}