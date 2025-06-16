'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store/use-store'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { FOLLOWER_RANGES, BUDGET_RANGES, LANGUAGES, COUNTRIES } from '@/lib/constants'

export default function WizardSearchPage() {
  const router = useRouter()
  const { wizard, setSearchCriteria, setCurrentStep } = useStore()
  
  const [formData, setFormData] = useState({
    minFollowers: '',
    maxFollowers: '',
    minEngagement: '',
    location: '',
    language: '',
    budgetRange: '',
  })

  useEffect(() => {
    if (wizard.searchCriteria) {
      setFormData({
        minFollowers: wizard.searchCriteria.minFollowers?.toString() || '',
        maxFollowers: wizard.searchCriteria.maxFollowers?.toString() || '',
        minEngagement: wizard.searchCriteria.minEngagement?.toString() || '',
        location: wizard.searchCriteria.location || '',
        language: wizard.searchCriteria.language || '',
        budgetRange: wizard.searchCriteria.budgetRange || '',
      })
    }
    setCurrentStep(4)
  }, [wizard.searchCriteria, setCurrentStep])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRangeSelect = (range: typeof FOLLOWER_RANGES[number]) => {
    setFormData(prev => ({
      ...prev,
      minFollowers: range.min.toString(),
      maxFollowers: range.max ? range.max.toString() : '',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setSearchCriteria({
      minFollowers: formData.minFollowers ? parseInt(formData.minFollowers) : null,
      maxFollowers: formData.maxFollowers ? parseInt(formData.maxFollowers) : null,
      minEngagement: formData.minEngagement ? parseFloat(formData.minEngagement) : null,
      location: formData.location,
      language: formData.language,
      budgetRange: formData.budgetRange,
    })
    
    router.push('/app/wizard/confirm')
  }

  const handleBack = () => {
    router.push('/app/wizard/niches')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Criterios de Búsqueda Avanzada</h2>
          
          {/* Follower Ranges */}
          <div className="space-y-4">
            <h3 className="font-semibold">Rango de Seguidores</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FOLLOWER_RANGES.map((range) => (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => handleRangeSelect(range)}
                  className={`btn btn-sm ${
                    formData.minFollowers === range.min.toString() 
                      ? 'btn-primary' 
                      : 'btn-outline'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mínimo de seguidores</span>
                </label>
                <input
                  type="number"
                  name="minFollowers"
                  className="input input-bordered"
                  placeholder="1000"
                  value={formData.minFollowers}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Máximo de seguidores</span>
                </label>
                <input
                  type="number"
                  name="maxFollowers"
                  className="input input-bordered"
                  placeholder="1000000"
                  value={formData.maxFollowers}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Engagement Rate */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tasa de Engagement Mínima (%)</span>
            </label>
            <input
              type="number"
              name="minEngagement"
              className="input input-bordered"
              placeholder="2.5"
              value={formData.minEngagement}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="100"
            />
            <label className="label">
              <span className="label-text-alt">
                Recomendado: 2.5% o más para mejor calidad
              </span>
            </label>
          </div>

          <div className="divider"></div>

          {/* Location and Language */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">País/Ubicación</span>
              </label>
              <select
                name="location"
                className="select select-bordered"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Todos los países</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Idioma del contenido</span>
              </label>
              <select
                name="language"
                className="select select-bordered"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Todos los idiomas</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="divider"></div>

          {/* Budget Range */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rango de Presupuesto por Influencer</span>
            </label>
            <select
              name="budgetRange"
              className="select select-bordered"
              value={formData.budgetRange}
              onChange={handleChange}
            >
              <option value="">Selecciona un rango</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
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