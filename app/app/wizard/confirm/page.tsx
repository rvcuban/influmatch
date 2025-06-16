'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store/use-store'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeftIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { CATEGORIES, BUDGET_RANGES, COUNTRIES, LANGUAGES } from '@/lib/constants'

export default function WizardConfirmPage() {
  const router = useRouter()
  const { wizard, setCurrentStep, resetWizard } = useStore()
  const [loading, setLoading] = useState(false)
  const [campaignName, setCampaignName] = useState('')

  useEffect(() => {
    setCurrentStep(5)
    // Generate default campaign name
    if (wizard.productDetails?.name) {
      setCampaignName(`Campaña ${wizard.productDetails.name} - ${new Date().toLocaleDateString()}`)
    }
  }, [wizard.productDetails, setCurrentStep])

  const handleSubmit = async () => {
    if (!campaignName.trim()) return
    
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Create product if not exists
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          user_id: user.id,
          name: wizard.productDetails!.name,
          description: wizard.productDetails!.description,
          price: wizard.productDetails!.price,
          category: wizard.productDetails!.category,
          image_url: wizard.productDetails!.imageUrl,
          target_audience: wizard.productDetails!.targetAudience,
          key_message: wizard.productDetails!.keyMessage,
        })
        .select()
        .single()

      if (productError) throw productError

      // Create campaign
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          product_id: product.id,
          name: campaignName,
          mode: wizard.mode!,
          selected_niches: wizard.selectedNiches,
          min_followers: wizard.searchCriteria?.minFollowers,
          max_followers: wizard.searchCriteria?.maxFollowers,
          min_engagement: wizard.searchCriteria?.minEngagement,
          location: wizard.searchCriteria?.location,
          language: wizard.searchCriteria?.language,
          budget_range: wizard.searchCriteria?.budgetRange,
          status: 'active',
        })
        .select()
        .single()

      if (campaignError) throw campaignError

      // Reset wizard and redirect
      resetWizard()
      router.push(`/app/campaigns/${campaign.id}`)
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Error al crear la campaña. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/app/wizard/search')
  }

  const getSelectedCategories = () => {
    return wizard.selectedNiches
      .map(id => CATEGORIES.find(c => c.id === id))
      .filter(Boolean)
  }

  const getBudgetRange = () => {
    return BUDGET_RANGES.find(r => r.id === wizard.searchCriteria?.budgetRange)
  }

  const getCountry = () => {
    return COUNTRIES.find(c => c.code === wizard.searchCriteria?.location)
  }

  const getLanguage = () => {
    return LANGUAGES.find(l => l.code === wizard.searchCriteria?.language)
  }

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6">Confirma tu Campaña</h2>
          
          {/* Campaign Name */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Nombre de la campaña</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Nombre de tu campaña"
              required
            />
          </div>

          {/* Summary */}
          <div className="space-y-6">
            {/* Mode */}
            <div>
              <h3 className="font-semibold mb-2">Modo de Selección</h3>
              <div className="badge badge-lg badge-primary">
                {wizard.mode === 'automatic' ? '🚀 Automático' : '🎯 Manual'}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="font-semibold mb-2">Producto</h3>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="font-medium">{wizard.productDetails?.name}</p>
                <p className="text-sm text-base-content/70 mt-1">
                  {wizard.productDetails?.description}
                </p>
                {wizard.productDetails?.price && (
                  <p className="text-sm mt-2">
                    Precio: €{wizard.productDetails.price}
                  </p>
                )}
              </div>
            </div>

            {/* Selected Niches */}
            <div>
              <h3 className="font-semibold mb-2">Nichos Seleccionados</h3>
              <div className="flex flex-wrap gap-2">
                {getSelectedCategories().map((cat) => (
                  <div key={cat!.id} className="badge badge-lg gap-1">
                    <span>{cat!.icon}</span>
                    {cat!.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Criteria */}
            <div>
              <h3 className="font-semibold mb-2">Criterios de Búsqueda</h3>
              <div className="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                {wizard.searchCriteria?.minFollowers && (
                  <p>
                    <span className="font-medium">Seguidores:</span>{' '}
                    {wizard.searchCriteria.minFollowers.toLocaleString()} - {' '}
                    {wizard.searchCriteria.maxFollowers 
                      ? wizard.searchCriteria.maxFollowers.toLocaleString() 
                      : '∞'}
                  </p>
                )}
                {wizard.searchCriteria?.minEngagement && (
                  <p>
                    <span className="font-medium">Engagement mínimo:</span>{' '}
                    {wizard.searchCriteria.minEngagement}%
                  </p>
                )}
                {getCountry() && (
                  <p>
                    <span className="font-medium">País:</span> {getCountry()!.name}
                  </p>
                )}
                {getLanguage() && (
                  <p>
                    <span className="font-medium">Idioma:</span> {getLanguage()!.name}
                  </p>
                )}
                {getBudgetRange() && (
                  <p>
                    <span className="font-medium">Presupuesto:</span>{' '}
                    {getBudgetRange()!.label}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="alert alert-success">
        <CheckCircleIcon className="w-6 h-6" />
        <span>
          ¡Todo listo! Al confirmar, nuestro algoritmo comenzará a buscar los mejores influencers para tu campaña.
        </span>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-outline"
          disabled={loading}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Atrás
        </button>
        <button
          onClick={handleSubmit}
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading || !campaignName.trim()}
        >
          {loading ? 'Creando campaña...' : 'Lanzar Campaña'}
          {!loading && <SparklesIcon className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  )
} 