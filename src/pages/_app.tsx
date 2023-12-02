import { store } from '@/store/store';
import '@/styles/globals.css';
import { LazyMotion, domAnimation } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <LazyMotion features={domAnimation}>
                <Component {...pageProps} />
            </LazyMotion>
        </Provider>
    );
}
