'use client'

import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store/use-store'
import { SparklesIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'

export default function WizardModePage() {
  const router = useRouter()
  const { setWizardMode } = useStore()

  const handleModeSelection = (mode: 'automatic' | 'manual') => {
    setWizardMode(mode)
    router.push('/app/wizard/details')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">¿Cómo quieres encontrar influencers?</h2>
        <p className="text-base-content/70">
          Elige el modo que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Automatic Mode */}
        <div 
          className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
          onClick={() => handleModeSelection('automatic')}
        >
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <SparklesIcon className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="card-title justify-center text-xl mb-2">
              Modo Automático
            </h3>
            <p className="text-base-content/70 mb-4">
              Nuestro algoritmo selecciona automáticamente los mejores influencers para tu campaña
            </p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Resultados instantáneos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Optimizado por IA</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Ahorra tiempo</span>
              </div>
            </div>
            <div className="card-actions justify-center mt-6">
              <button className="btn btn-primary">
                Seleccionar Automático
              </button>
            </div>
          </div>
        </div>

        {/* Manual Mode */}
        <div 
          className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
          onClick={() => handleModeSelection('manual')}
        >
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-secondary/10 rounded-full">
                <CursorArrowRaysIcon className="w-12 h-12 text-secondary" />
              </div>
            </div>
            <h3 className="card-title justify-center text-xl mb-2">
              Modo Manual
            </h3>
            <p className="text-base-content/70 mb-4">
              Revisa y aprueba cada influencer antes de contactar
            </p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-start gap-2">
                <span className="text-secondary">✓</span>
                <span>Control total</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-secondary">✓</span>
                <span>Revisión detallada</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-secondary">✓</span>
                <span>Selección personalizada</span>
              </div>
            </div>
            <div className="card-actions justify-center mt-6">
              <button className="btn btn-secondary">
                Seleccionar Manual
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>
          <strong>Consejo:</strong> Si es tu primera campaña, te recomendamos el modo automático para obtener resultados más rápidos.
        </span>
      </div>
    </div>
  )
} 