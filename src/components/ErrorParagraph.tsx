import { m } from 'framer-motion';
import { ReactNode } from 'react';

export const ErrorParagraph = ({ children }: { children: ReactNode }) => (
    <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-wrap text-xs text-red-600"
    >
        {children}
    </m.p>
);
