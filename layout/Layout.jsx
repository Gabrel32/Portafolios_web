import React from 'react';
import Head from 'next/head';
import Navegacion from '../components/Navegacion';

function Layout({ children, pagina }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Portafolio - {pagina}</title>
                <meta name='description' content='Portafolio web donde encontrarás diversos proyectos e información de interés.' />
            </Head>
            <aside className='flex justify-around items-center h-20 bg-CompletColor options'>
                <Navegacion />
            </aside>
            <main className='flex-grow options mt-14'>
                {children}
            </main>
            <footer className="bg-gray-200 text-center p-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum odio ullam quibusdam. Quisquam dolore possimus expedita aspernatur, magnam odio deserunt modi adipisci enim quas nesciunt minima facere libero repellat aliquam.
            </footer>
        </div>
    );
}

export default Layout;