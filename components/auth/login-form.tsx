"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface LoginFormProps {
  onForgotPassword: () => void
  onRegister: () => void
}

export function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/90"
        />
      </div>

      {error && <p className="text-sm text-red-200">{error}</p>}

      <button type="button" onClick={onForgotPassword} className="text-sm text-white hover:underline">
        ¿Olvidaste tu contraseña?
      </button>

      <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </Button>

      <div className="text-center">
        <button type="button" onClick={onRegister} className="text-sm text-white hover:underline">
          ¿No tienes una cuenta? Regístrate
        </button>
      </div>
    </form>
  )
}
