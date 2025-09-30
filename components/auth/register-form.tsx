"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface RegisterFormProps {
  onLogin: () => void
}

export function RegisterForm({ onLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    nombre: "",
    apellido: "",
    email: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    if (!acceptTerms || !acceptPrivacy) {
      setError("Debes aceptar los términos y la política de privacidad")
      setLoading(false)
      return
    }

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            nombre_usuario: formData.nombreUsuario,
            nombre: formData.nombre,
            apellido: formData.apellido,
          },
        },
      })

      if (authError) throw authError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-white/10 border border-[#66B5CB]/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#66B5CB] mb-2">¡Revisa tu correo!</h3>
          <p className="text-[#66B5CB]/90">
            Te hemos enviado un enlace de verificación a <strong>{formData.email}</strong>
          </p>
          <p className="text-[#66B5CB]/80 text-sm mt-2">Haz clic en el enlace para completar tu registro</p>
        </div>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
          className="w-full bg-white/10 text-[#66B5CB] border-[#66B5CB]/20 hover:bg-white/20"
        >
          Enviar otro enlace
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombreUsuario" className="text-[#66B5CB]">
          Nombre de Usuario
        </Label>
        <Input
          id="nombreUsuario"
          name="nombreUsuario"
          type="text"
          placeholder="usuario123"
          value={formData.nombreUsuario}
          onChange={handleChange}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombre" className="text-[#66B5CB]">
          Nombre
        </Label>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Juan"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apellido" className="text-[#66B5CB]">
          Apellido
        </Label>
        <Input
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Pérez"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#66B5CB]">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-[#66B5CB] leading-tight">
            Acepto los términos del servicio y condiciones de uso
          </label>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="privacy"
            checked={acceptPrivacy}
            onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
          />
          <label htmlFor="privacy" className="text-sm text-[#66B5CB] leading-tight">
            Acepto la Política de privacidad publicada en Cookies y uso de datos
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>

      <div className="text-center">
        <button type="button" onClick={onLogin} className="text-sm text-[#66B5CB] hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </button>
      </div>
    </form>
  )
}
