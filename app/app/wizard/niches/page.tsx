'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store/use-store'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import { CATEGORIES } from '@/lib/constants'

export default function WizardNichesPage() {
  const router = useRouter()
  const { wizard, setSelectedNiches, setCurrentStep } = useStore()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    if (wizard.selectedNiches.length > 0) {
      setSelectedCategories(wizard.selectedNiches)
    }
    setCurrentStep(3)
  }, [wizard.selectedNiches, setCurrentStep])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      }
      if (prev.length < 5) {
        return [...prev, categoryId]
      }
      return prev
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategories.length > 0) {
      setSelectedNiches(selectedCategories)
      router.push('/app/wizard/search')
    }
  }

  const handleBack = () => {
    router.push('/app/wizard/details')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-2">Selecciona los Nichos de Influencers</h2>
          <p className="text-base-content/70 mb-6">
            Elige hasta 5 categorías que mejor representen tu producto
          </p>

          {/* Selected count */}
          <div className="alert alert-info mb-6">
            <span>
              {selectedCategories.length} de 5 categorías seleccionadas
            </span>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              return (
                <div
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`
                    card cursor-pointer transition-all
                    ${isSelected 
                      ? 'bg-primary text-primary-content shadow-lg scale-105' 
                      : 'bg-base-200 hover:bg-base-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2">
                          <span className="text-2xl">{category.icon}</span>
                          {category.name}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm opacity-80">
                            {category.subcategories.slice(0, 3).join(', ')}
                            {category.subcategories.length > 3 && '...'}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckIcon className="w-6 h-6 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recommendations based on product category */}
          {wizard.productDetails?.category && (
            <div className="mt-6 p-4 bg-base-200 rounded-lg">
              <p className="text-sm font-semibold mb-2">
                💡 Recomendación basada en tu producto:
              </p>
              <p className="text-sm">
                Para productos de la categoría &ldquo;{CATEGORIES.find(c => c.id === wizard.productDetails?.category)?.name}&rdquo;, 
                también podrías considerar influencers de categorías relacionadas.
              </p>
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
          disabled={selectedCategories.length === 0}
        >
          Continuar
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  )
} 