'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


const menu = [
    {
        text: 'Página principal',
        href: '/'
    },
    {
        text: 'pacientes-db',
        href: '/pacientes-db'
    },
    {
        text: 'pacientes-api',
        href: '/pacientes-api'
    },
    {
        text: 'medicos-db',
        href: '/medicos-db'
    },


    {
        text: 'medicos-api',
        href: '/medicos-api'
    }
]

function Menu() {
    const pathname = usePathname()

    return (
        <nav className="font-bold flex items-center gap-4 text-blue-500 ">
            {menu.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`hover:underline text-blue-500 ${isActive ? 'text-black font-bold no-underline' : ''
                            }`}
                    >
                        {item.text}
                    </Link>
                )
            }
            
            )}

        </nav>
    );
}

export default Menu;