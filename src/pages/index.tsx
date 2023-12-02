import { ChildrenReveal } from '@/components/ChildrenReveal';
import { RootState } from '@/store/store';
import { JetBrains_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const inter = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
    const { users } = useSelector((state: RootState) => state.users);

    return (
        <ChildrenReveal>
            <main
                className={`flex w-screen flex-col items-center ${inter.className}`}
            >
                <div className="flex gap-2 p-24">
                    <Link href={'/uncontrolled-form'}>
                        <button className="rounded bg-slate-600 px-4 py-2">
                            Uncontrolled Form
                        </button>
                    </Link>
                    <Link href={'/controlled-form'}>
                        <button className="rounded bg-slate-600 px-4 py-2">
                            React Hook Form
                        </button>
                    </Link>
                </div>

                <div className="min-w-2xl pointer-events-none grid w-full max-w-3xl grid-cols-3 gap-4">
                    {users.map((item) => (
                        <div
                            className="relative aspect-square w-full overflow-hidden rounded"
                            key={item.picture?.name}
                        >
                            <div className="absolute aspect-square w-full opacity-80">
                                {item.picture && (
                                    <Image
                                        fill
                                        src={URL.createObjectURL(item.picture)}
                                        alt="image"
                                    />
                                )}
                            </div>
                            <div className="absolute bottom-0 h-1/3 w-full">
                                <div className="h-full w-full bg-white/40 text-xs text-black backdrop-blur">
                                    <div className="mx-2 my-1 grid h-full grid-cols-2 justify-center">
                                        <div className="flex items-center justify-start">
                                            <p
                                                id="name"
                                                className="text-base font-bold capitalize"
                                            >
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <p id="age">{item.age} y.o.</p>
                                        </div>
                                        <div className="flex items-start justify-start">
                                            <p id="email">{item.email}</p>
                                        </div>
                                        <div className="flex items-start justify-end">
                                            <p id="gender">{item.gender}</p>
                                        </div>
                                        <div className="flex items-start justify-end">
                                            <p id="gender">{item.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </ChildrenReveal>
    );
}
