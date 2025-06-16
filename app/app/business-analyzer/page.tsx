'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SparklesIcon, LightBulbIcon, ChartBarIcon, RocketLaunchIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { CATEGORIES } from '@/lib/constants'

export default function BusinessAnalyzerPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessDescription: '',
    targetAudience: '',
    mainGoals: '',
    currentChallenges: '',
  })
  const [analysis, setAnalysis] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const analyzeBusinessWithAI = async () => {
    setLoading(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock analysis based on input
    const mockAnalysis = {
      businessType: detectBusinessType(formData.businessDescription),
      recommendedCategories: suggestCategories(formData.businessDescription, formData.targetAudience),
      influencerStrategy: {
        type: formData.targetAudience.includes('joven') ? 'micro-influencers' : 'macro-influencers',
        reason: 'Basado en tu audiencia objetivo y tipo de negocio',
      },
      estimatedBudget: {
        min: 500,
        max: 2000,
        currency: 'EUR',
      },
      keyRecommendations: [
        'Enfócate en influencers con alta tasa de engagement (>3%)',
        'Prioriza creadores que compartan los valores de tu marca',
        'Comienza con campañas pequeñas para testear resultados',
        'Mide el ROI constantemente y ajusta tu estrategia',
      ],
      successProbability: 85,
    }
    
    setAnalysis(mockAnalysis)
    setLoading(false)
    setStep(2)
  }

  const detectBusinessType = (description: string): string => {
    const desc = description.toLowerCase()
    if (desc.includes('ropa') || desc.includes('moda')) return 'Moda y Accesorios'
    if (desc.includes('comida') || desc.includes('restaurante')) return 'Alimentación'
    if (desc.includes('software') || desc.includes('app')) return 'Tecnología'
    if (desc.includes('belleza') || desc.includes('cosmético')) return 'Belleza y Cuidado Personal'
    return 'General'
  }

  const suggestCategories = (description: string, audience: string): string[] => {
    const suggestions = []
    const desc = (description + ' ' + audience).toLowerCase()
    
    if (desc.includes('moda') || desc.includes('ropa')) suggestions.push('lifestyle')
    if (desc.includes('deporte') || desc.includes('fitness')) suggestions.push('health-fitness')
    if (desc.includes('tecnología') || desc.includes('app')) suggestions.push('technology')
    if (desc.includes('comida') || desc.includes('cocina')) suggestions.push('food-cooking')
    if (desc.includes('viaje') || desc.includes('turismo')) suggestions.push('travel')
    
    // Add default suggestions if none found
    if (suggestions.length === 0) {
      suggestions.push('lifestyle', 'entertainment')
    }
    
    return suggestions.slice(0, 3)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-primary" />
          Analizador de Negocio con IA
        </h1>
        <p className="text-base-content/70 mt-2">
          Descubre la estrategia de influencer marketing perfecta para tu negocio
        </p>
      </div>

      {step === 1 && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-6">Cuéntanos sobre tu negocio</h2>
            
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Describe tu negocio</span>
                </label>
                <textarea
                  name="businessDescription"
                  className="textarea textarea-bordered h-24"
                  placeholder="Ej: Vendemos ropa deportiva sostenible para mujeres activas..."
                  value={formData.businessDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">¿Quién es tu audiencia objetivo?</span>
                </label>
                <textarea
                  name="targetAudience"
                  className="textarea textarea-bordered h-24"
                  placeholder="Ej: Mujeres de 25-40 años, interesadas en fitness y sostenibilidad..."
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">¿Cuáles son tus objetivos principales?</span>
                </label>
                <textarea
                  name="mainGoals"
                  className="textarea textarea-bordered h-24"
                  placeholder="Ej: Aumentar ventas online, mejorar reconocimiento de marca..."
                  value={formData.mainGoals}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">¿Qué desafíos enfrentas actualmente?</span>
                </label>
                <textarea
                  name="currentChallenges"
                  className="textarea textarea-bordered h-24"
                  placeholder="Ej: Baja visibilidad en redes sociales, competencia fuerte..."
                  value={formData.currentChallenges}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={analyzeBusinessWithAI}
                className={`btn btn-primary btn-lg w-full ${loading ? 'loading' : ''}`}
                disabled={loading || !formData.businessDescription || !formData.targetAudience || !formData.mainGoals}
              >
                {loading ? 'Analizando con IA...' : 'Analizar mi Negocio'}
                {!loading && <SparklesIcon className="w-5 h-5 ml-2" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Success Alert */}
          <div className="alert alert-success">
            <SparklesIcon className="w-6 h-6" />
            <span>¡Análisis completado! Hemos generado una estrategia personalizada para tu negocio.</span>
          </div>

          {/* Business Type */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">
                <LightBulbIcon className="w-6 h-6 text-primary" />
                Tipo de Negocio Detectado
              </h3>
              <p className="text-lg">{analysis.businessType}</p>
            </div>
          </div>

          {/* Recommended Categories */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">
                <ChartBarIcon className="w-6 h-6 text-secondary" />
                Categorías Recomendadas
              </h3>
              <div className="flex flex-wrap gap-3">
                {analysis.recommendedCategories.map((catId: string) => {
                  const category = CATEGORIES.find(c => c.id === catId)
                  return category ? (
                    <div key={catId} className="badge badge-lg badge-primary gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </div>

          {/* Strategy */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">
                <RocketLaunchIcon className="w-6 h-6 text-accent" />
                Estrategia Recomendada
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Tipo de Influencers:</p>
                  <p className="capitalize">{analysis.influencerStrategy.type}</p>
                  <p className="text-sm text-base-content/70">{analysis.influencerStrategy.reason}</p>
                </div>
                <div>
                  <p className="font-semibold">Presupuesto Estimado:</p>
                  <p>€{analysis.estimatedBudget.min} - €{analysis.estimatedBudget.max} por campaña</p>
                </div>
                <div>
                  <p className="font-semibold">Probabilidad de Éxito:</p>
                  <div className="flex items-center gap-3">
                    <progress 
                      className="progress progress-success w-full" 
                      value={analysis.successProbability} 
                      max="100"
                    ></progress>
                    <span className="text-lg font-bold">{analysis.successProbability}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Recommendations */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Recomendaciones Clave</h3>
              <ul className="space-y-2">
                {analysis.keyRecommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/app/wizard/mode')}
              className="btn btn-primary btn-lg flex-1"
            >
              Crear Primera Campaña
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStep(1)}
              className="btn btn-outline btn-lg flex-1"
            >
              Analizar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 