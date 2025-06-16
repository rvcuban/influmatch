export const CATEGORIES = [
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: '🌟',
    subcategories: ['Moda', 'Belleza', 'Hogar', 'Lujo'],
  },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    icon: '💪',
    subcategories: ['Entrenamiento', 'Nutrición', 'Bienestar', 'Yoga'],
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    subcategories: ['Reviews', 'Móviles', 'Gaming', 'IA'],
  },
  {
    id: 'food-cooking',
    name: 'Food & Cooking',
    icon: '🍳',
    subcategories: ['Recetas', 'Comida Saludable', 'Postres', 'Cocina Regional'],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    subcategories: ['Música', 'Baile', 'Comedia', 'Shows'],
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    subcategories: ['Emprendimiento', 'Marketing', 'Finanzas', 'Productividad'],
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    subcategories: ['Aventuras', 'Turismo', 'Cultura', 'Destinos'],
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    subcategories: ['Tutoriales', 'Consejos', 'Desarrollo Personal'],
  },
  {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    subcategories: ['Parentalidad', 'Niños', 'Vida Familiar'],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    subcategories: ['Deportes específicos', 'Atletas', 'Equipos'],
  },
] as const

export const FOLLOWER_RANGES = [
  { label: 'Nano (1K - 10K)', min: 1000, max: 10000 },
  { label: 'Micro (10K - 100K)', min: 10000, max: 100000 },
  { label: 'Mid-tier (100K - 500K)', min: 100000, max: 500000 },
  { label: 'Macro (500K - 1M)', min: 500000, max: 1000000 },
  { label: 'Mega (1M+)', min: 1000000, max: null },
] as const

export const BUDGET_RANGES = [
  { id: 'low', label: 'Bajo (< €500)', min: 0, max: 500 },
  { id: 'medium', label: 'Medio (€500 - €2000)', min: 500, max: 2000 },
  { id: 'high', label: 'Alto (€2000 - €5000)', min: 2000, max: 5000 },
  { id: 'premium', label: 'Premium (> €5000)', min: 5000, max: null },
] as const

export const LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'Inglés' },
  { code: 'pt', name: 'Portugués' },
  { code: 'fr', name: 'Francés' },
  { code: 'de', name: 'Alemán' },
  { code: 'it', name: 'Italiano' },
] as const

export const COUNTRIES = [
  { code: 'ES', name: 'España' },
  { code: 'MX', name: 'México' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CO', name: 'Colombia' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'BR', name: 'Brasil' },
] as const 