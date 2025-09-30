import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar, Users, Target } from "lucide-react"

// Mock data - replace with actual database query
const projectData = {
  id: 1,
  nombre: "Energía Solar Comunitaria",
  descripcion_general:
    "Este proyecto tiene como objetivo instalar paneles solares en comunidades rurales que actualmente no tienen acceso a electricidad confiable. La energía solar proporcionará una fuente de energía limpia, sostenible y económica que mejorará la calidad de vida de los residentes. El proyecto incluye la instalación de paneles solares, sistemas de almacenamiento de energía y capacitación para el mantenimiento local.",
  descripcion_corta: "Energía solar para comunidades",
  imagen: "/solar-panels-in-rural-community.jpg",
  categoria: "Energía Renovable",
  estado: "Activo",
  fecha_inicio: "2024-01-15",
  fecha_fin: "2024-12-31",
  contribuyente_limite: 100,
  contribuyentes_actuales: 45,
}

export default async function ProyectoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // TODO: Fetch project from database using id

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={projectData.imagen || "/placeholder.svg"}
                  alt={projectData.nombre}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-[#66B5CB] text-white">{projectData.categoria}</Badge>
                  <Badge className="bg-green-500 text-white">{projectData.estado}</Badge>
                </div>
                <h1 className="text-4xl font-serif text-[#880430] mb-4">{projectData.nombre}</h1>
                <p className="text-lg text-[#8D8D8D] leading-relaxed">{projectData.descripcion_general}</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-[#880430] mb-4">Objetivos del Proyecto</h2>
                  <ul className="space-y-3 text-[#8D8D8D]">
                    <li className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-[#66B5CB] mt-0.5 flex-shrink-0" />
                      <span>Proporcionar energía limpia y sostenible a comunidades rurales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-[#66B5CB] mt-0.5 flex-shrink-0" />
                      <span>Reducir la dependencia de combustibles fósiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-[#66B5CB] mt-0.5 flex-shrink-0" />
                      <span>Capacitar a la comunidad en mantenimiento de sistemas solares</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-[#66B5CB] mt-0.5 flex-shrink-0" />
                      <span>Mejorar la calidad de vida y oportunidades económicas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#8D8D8D] mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm">Fecha de Inicio</span>
                    </div>
                    <p className="text-lg font-medium text-[#880430]">
                      {new Date(projectData.fecha_inicio).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[#8D8D8D] mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm">Fecha de Fin</span>
                    </div>
                    <p className="text-lg font-medium text-[#880430]">
                      {new Date(projectData.fecha_fin).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[#8D8D8D] mb-2">
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Contribuyentes</span>
                    </div>
                    <p className="text-lg font-medium text-[#880430]">
                      {projectData.contribuyentes_actuales} / {projectData.contribuyente_limite}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-[#66B5CB] h-2 rounded-full"
                        style={{
                          width: `${(projectData.contribuyentes_actuales / projectData.contribuyente_limite) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full bg-[#880430] text-white hover:bg-[#880430]/90 py-6 text-lg">
                Contribuir al Proyecto
              </Button>

              <Card className="bg-[#66B5CB]/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#880430] mb-2">¿Necesitas más información?</h3>
                  <p className="text-sm text-[#8D8D8D] mb-4">
                    Contáctanos para conocer más detalles sobre este proyecto
                  </p>
                  <Button variant="outline" className="w-full border-[#880430] text-[#880430] bg-transparent">
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
