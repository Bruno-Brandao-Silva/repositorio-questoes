import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import DefaultHead from '../components/DefaultHead';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <DefaultHead />
            <Header />
            <Component {...pageProps} />
        </SessionProvider >
    );
}

export default MyApp