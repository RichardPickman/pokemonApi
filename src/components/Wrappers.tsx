import { ReactNode } from 'react';

export const ColumnWrapper = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-2 items-start justify-center gap-2">
        {children}
    </div>
);

export const InputWrapper = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col gap-1">{children}</div>
);
