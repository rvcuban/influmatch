'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/lib/store/use-store'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { CATEGORIES } from '@/lib/constants'

export default function WizardDetailsPage() {
  const router = useRouter()
  const { wizard, setProductDetails, setCurrentStep } = useStore()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    targetAudience: '',
    keyMessage: '',
  })

  useEffect(() => {
    if (wizard.productDetails) {
      setFormData({
        ...wizard.productDetails,
        price: wizard.productDetails.price?.toString() || '',
      })
    }
    setCurrentStep(2)
  }, [wizard.productDetails, setCurrentStep])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setProductDetails({
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
    })
    
    router.push('/app/wizard/niches')
  }

  const handleBack = () => {
    router.push('/app/wizard/mode')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Detalles del Producto o Servicio</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre del producto</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered"
                  placeholder="Ej: Crema Hidratante Natural"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Categoría</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Precio (€)</span>
                </label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered"
                  placeholder="29.99"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">URL de imagen</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="input input-bordered"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
                <label className="label">
                  <span className="label-text-alt">Opcional: URL de la imagen principal del producto</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Descripción</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                  placeholder="Describe tu producto o servicio..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Audiencia objetivo</span>
                </label>
                <textarea
                  name="targetAudience"
                  className="textarea textarea-bordered h-24"
                  placeholder="Ej: Mujeres de 25-40 años interesadas en cuidado natural de la piel..."
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mensaje clave</span>
                </label>
                <textarea
                  name="keyMessage"
                  className="textarea textarea-bordered"
                  placeholder="¿Qué mensaje quieres transmitir?"
                  value={formData.keyMessage}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {formData.imageUrl && (
            <div className="mt-6">
              <p className="text-sm text-base-content/70 mb-2">Vista previa de imagen:</p>
              <div className="w-full max-w-xs mx-auto">
                <div className="relative w-full h-48">
                  <Image
                    src={formData.imageUrl}
                    alt="Vista previa"
                    fill
                    className="rounded-lg shadow-md object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-outline"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Atrás
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Continuar
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  )
} 