"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CrearProyectoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcionCorta: "",
    descripcionGeneral: "",
    categoria: "",
    fechaInicio: "",
    fechaFin: "",
    contribuyenteLimite: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Submit to database
    console.log("[v0] Form data:", formData)

    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard/proyectos")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#880430] mb-2">Crear Nuevo Proyecto</h1>
            <p className="text-lg text-[#8D8D8D]">Completa la información de tu proyecto sostenible</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#880430]">Información del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Proyecto *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Energía Solar Comunitaria"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcionCorta">Descripción Corta *</Label>
                  <Input
                    id="descripcionCorta"
                    name="descripcionCorta"
                    value={formData.descripcionCorta}
                    onChange={handleChange}
                    placeholder="Breve descripción del proyecto"
                    maxLength={255}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcionGeneral">Descripción General *</Label>
                  <Textarea
                    id="descripcionGeneral"
                    name="descripcionGeneral"
                    value={formData.descripcionGeneral}
                    onChange={handleChange}
                    placeholder="Describe detalladamente tu proyecto..."
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, categoria: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energia">Energía Renovable</SelectItem>
                      <SelectItem value="agua">Agua</SelectItem>
                      <SelectItem value="residuos">Gestión de Residuos</SelectItem>
                      <SelectItem value="agricultura">Agricultura Sostenible</SelectItem>
                      <SelectItem value="conservacion">Conservación</SelectItem>
                      <SelectItem value="educacion">Educación Ambiental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                    <Input
                      id="fechaInicio"
                      name="fechaInicio"
                      type="date"
                      value={formData.fechaInicio}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaFin">Fecha de Fin</Label>
                    <Input
                      id="fechaFin"
                      name="fechaFin"
                      type="date"
                      value={formData.fechaFin}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contribuyenteLimite">Límite de Contribuyentes</Label>
                  <Input
                    id="contribuyenteLimite"
                    name="contribuyenteLimite"
                    type="number"
                    value={formData.contribuyenteLimite}
                    onChange={handleChange}
                    placeholder="Número máximo de contribuyentes"
                    min="1"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 border-[#8D8D8D] text-[#8D8D8D]"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#880430] text-white hover:bg-[#880430]/90"
                  >
                    {loading ? "Creando..." : "Crear Proyecto"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
