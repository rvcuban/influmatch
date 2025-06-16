import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WizardState {
  mode: 'automatic' | 'manual' | null
  productDetails: {
    name: string
    description: string
    price: number | null
    category: string
    imageUrl: string
    targetAudience: string
    keyMessage: string
  } | null
  selectedNiches: string[]
  searchCriteria: {
    minFollowers: number | null
    maxFollowers: number | null
    minEngagement: number | null
    location: string
    language: string
    budgetRange: string
  } | null
  currentStep: number
}

interface AppState {
  // User state
  user: {
    id: string
    email: string
    fullName: string
    companyName: string
    companyType: string
  } | null
  
  // Wizard state
  wizard: WizardState
  
  // Actions
  setUser: (user: AppState['user']) => void
  clearUser: () => void
  
  // Wizard actions
  setWizardMode: (mode: 'automatic' | 'manual') => void
  setProductDetails: (details: WizardState['productDetails']) => void
  setSelectedNiches: (niches: string[]) => void
  setSearchCriteria: (criteria: WizardState['searchCriteria']) => void
  setCurrentStep: (step: number) => void
  resetWizard: () => void
}

const initialWizardState: WizardState = {
  mode: null,
  productDetails: null,
  selectedNiches: [],
  searchCriteria: null,
  currentStep: 1,
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      wizard: initialWizardState,
      
      // Actions
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      
      // Wizard actions
      setWizardMode: (mode) => 
        set((state) => ({ 
          wizard: { ...state.wizard, mode } 
        })),
      
      setProductDetails: (productDetails) => 
        set((state) => ({ 
          wizard: { ...state.wizard, productDetails } 
        })),
      
      setSelectedNiches: (selectedNiches) => 
        set((state) => ({ 
          wizard: { ...state.wizard, selectedNiches } 
        })),
      
      setSearchCriteria: (searchCriteria) => 
        set((state) => ({ 
          wizard: { ...state.wizard, searchCriteria } 
        })),
      
      setCurrentStep: (currentStep) => 
        set((state) => ({ 
          wizard: { ...state.wizard, currentStep } 
        })),
      
      resetWizard: () => 
        set({ wizard: initialWizardState }),
    }),
    {
      name: 'influencer-app-storage',
      partialize: (state) => ({ 
        wizard: state.wizard 
      }),
    }
  )
) 