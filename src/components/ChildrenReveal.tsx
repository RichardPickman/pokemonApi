import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';

export const ChildrenReveal = ({ children }: { children: ReactNode }) => {
    return (
        <AnimatePresence>
            <m.div
                key="from-main"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.7,
                    },
                }}
                exit={{
                    opacity: 0,
                }}
                className={`flex min-h-screen flex-col items-center justify-between`}
            >
                {children}
            </m.div>
        </AnimatePresence>
    );
};
