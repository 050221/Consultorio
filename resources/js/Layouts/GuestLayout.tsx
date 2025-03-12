import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-50 to-sky-100 dark:bg-gray-800 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-8 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <div className='flex justify-center my-10'>
                    <Link href="/">
                        {/* <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />*/}
                        <img src="/images/imgG.png" className="h-22 w-20 fill-current text-gray-500" alt="Logo" />
                    </Link>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
