import React from 'react';
import Head from 'next/head';
import Navegacion from '../components/Navegacion';
import { Slider } from '../components/Slider';

function Layout({ children, pagina }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{pagina} - Portafolio</title>
                <meta name="description" content="Portafolio web donde encontrarás diversos proyectos e información de interés." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
            </Head>

            {/* Header/Nav */}
            <header className="flex justify-center items-center flex-wrap w-full sm:h-30 ">
                <Navegacion />
            </header>

                {/* <Slider /> */}

            {/* Main Content */}
            <main className=" flex flex-grow px-4 justify-center items-start overflow-hidden" >
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center py-6 mt-10">
                <p className="text-sm text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum odio ullam quibusdam. Quisquam dolore possimus expedita aspernatur, magnam odio deserunt modi adipisci enim quas nesciunt minima facere libero repellat aliquam.
                </p>
            </footer>
        </div>
    );
}

export default Layout;
