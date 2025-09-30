"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useRouter()

  return (
    <header className="bg-[#8D8D8D] text-white py-4 px-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-serif">
          Incuva Lav
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Inicio
          </Link>
          <Link href="/proyectos" className="hover:text-white/80 transition-colors">
            Catálogo de Proyectos
          </Link>
          <Link href="/preguntas" className="hover:text-white/80 transition-colors">
            Preguntas frecuentes
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/login")}
            className="bg-white text-[#880430] hover:bg-white/90 transition-colors"
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => router.push("/register")}
            className="bg-[#880430] text-white hover:bg-[#880430]/90 transition-colors"
          >
            Registrarse
          </Button>
        </div>
      </nav>
    </header>
  )
}
