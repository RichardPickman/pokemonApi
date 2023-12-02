import { ChildrenReveal } from '@/components/ChildrenReveal';
import { JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';

const inter = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
        >
            <ChildrenReveal>
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
            </ChildrenReveal>
        </main>
    );
}
