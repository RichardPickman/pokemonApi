import { m, useMotionTemplate, useSpring } from 'framer-motion';
import { MouseEvent, useEffect } from 'react';

interface Props {
    isChecked: boolean;
    onClick: (val: boolean) => void;
    id?: string;
}

const config = {
    stiffness: 200,
    damping: 15,
    mass: 0.1,
};

export const InputRadio = ({ isChecked, id, onClick }: Props) => {
    const r = useSpring(0, config);
    const g = useSpring(0, config);
    const b = useSpring(0, config);
    const left = useSpring(0, config);
    const backgroundColor = useMotionTemplate`rgb(${r} ${g} ${b})`;

    useEffect(() => {
        const colors = [
            [115, 115, 115],
            [38, 38, 38],
        ];

        if (isChecked) {
            r.set(colors[0][0]);
            g.set(colors[0][1]);
            b.set(colors[0][2]);
        } else {
            r.set(colors[1][0]);
            g.set(colors[1][1]);
            b.set(colors[1][2]);
        }
    }, [b, g, isChecked, r]);

    useEffect(() => {
        if (isChecked) {
            left.set(32);
        } else {
            left.set(0);
        }
    }, [isChecked, left]);

    const _onChange = (event: MouseEvent<HTMLInputElement>) => {
        onClick(event.currentTarget.checked);
    };

    return (
        <div
            onClick={_onChange}
            id={id}
            className="relative h-8 w-16 cursor-pointer rounded-full"
        >
            <m.div
                className="absolute h-full w-full rounded-full shadow-inner"
                style={{ backgroundColor }}
            />
            <m.input
                id={id}
                type="radio"
                className="absolute h-8 w-8 cursor-pointer appearance-none rounded-full bg-neutral-300 outline-1"
                style={{ left }}
                checked={isChecked}
            />
        </div>
    );
};
