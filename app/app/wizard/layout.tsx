'use client'

import { usePathname } from 'next/navigation'

const steps = [
  { id: 1, name: 'Modo', path: '/app/wizard/mode' },
  { id: 2, name: 'Detalles', path: '/app/wizard/details' },
  { id: 3, name: 'Nichos', path: '/app/wizard/niches' },
  { id: 4, name: 'Búsqueda', path: '/app/wizard/search' },
  { id: 5, name: 'Confirmar', path: '/app/wizard/confirm' },
]

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentStep = steps.find(step => step.path === pathname)?.id || 1

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Crear Nueva Campaña</h1>
        
        {/* Progress Steps */}
        <ul className="steps steps-horizontal w-full">
          {steps.map((step) => (
            <li
              key={step.id}
              className={`step ${currentStep >= step.id ? 'step-primary' : ''}`}
              data-content={currentStep > step.id ? '✓' : step.id}
            >
              <span className="hidden sm:inline">{step.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  )
} 