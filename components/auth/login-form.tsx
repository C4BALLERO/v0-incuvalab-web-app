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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Error al enviar el enlace de verificación")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-white/10 border border-white/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">¡Revisa tu correo!</h3>
          <p className="text-white/90">
            Te hemos enviado un enlace de verificación a <strong>{email}</strong>
          </p>
          <p className="text-white/80 text-sm mt-2">Haz clic en el enlace para iniciar sesión</p>
        </div>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
          className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          Enviar otro enlace
        </Button>
      </div>
    )
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

      {error && <p className="text-sm text-red-200">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
        {loading ? "Enviando..." : "Enviar enlace de verificación"}
      </Button>

      <div className="text-center">
        <button type="button" onClick={onRegister} className="text-sm text-white hover:underline">
          ¿No tienes una cuenta? Regístrate
        </button>
      </div>
    </form>
  )
}
