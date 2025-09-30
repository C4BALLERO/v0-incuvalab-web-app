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
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (!acceptTerms || !acceptPrivacy) {
      setError("Debes aceptar los términos y la política de privacidad")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            nombre_usuario: formData.nombreUsuario,
            nombre: formData.nombre,
            apellido: formData.apellido,
          },
        },
      })

      if (error) throw error

      // Create user profile in database
      if (data.user) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
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

      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#66B5CB]">
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-white/90"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#66B5CB]">
          Confirmar Contraseña
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
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
