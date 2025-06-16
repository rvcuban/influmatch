# InfluMatch - Plataforma de Matching de Influencers

Sistema integral para conectar marcas con influencers de TikTok mediante análisis inteligente y matching automatizado.

## 🚀 Características Principales

- **Matching Inteligente**: Algoritmo avanzado que evalúa compatibilidad basándose en categorías, audiencia, engagement y presupuesto
- **Análisis de Negocio con IA**: Sistema que analiza tu negocio y recomienda estrategias personalizadas
- **Wizard de Campañas**: Proceso guiado paso a paso para crear campañas efectivas
- **Dashboard Completo**: Métricas en tiempo real y gestión centralizada
- **Importación de Creators**: Sistema para agregar y categorizar influencers automáticamente

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **UI**: DaisyUI, Tailwind CSS, Heroicons
- **Backend**: Supabase (Auth, Database, Storage)
- **Estado**: Zustand
- **Validación**: Zod
- **Formularios**: React Hook Form

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone [tu-repositorio]
cd mynewinfluv2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configurar base de datos en Supabase**

Ejecuta el siguiente SQL en el editor de Supabase:

```sql
-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  company_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT,
  image_url TEXT,
  target_audience TEXT,
  key_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de creators/influencers
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  full_name TEXT,
  bio TEXT,
  followers_count INTEGER NOT NULL,
  engagement_rate DECIMAL(5,2),
  country TEXT,
  categories TEXT[],
  hashtags TEXT[],
  tiktok_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de campañas
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  mode TEXT NOT NULL CHECK (mode IN ('automatic', 'manual')),
  selected_niches TEXT[],
  budget_range TEXT,
  min_followers INTEGER,
  max_followers INTEGER,
  min_engagement DECIMAL(5,2),
  location TEXT,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  creator_id UUID NOT NULL REFERENCES creators(id),
  score DECIMAL(5,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'accepted', 'rejected')),
  match_reasons JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_matches_campaign_id ON matches(campaign_id);
CREATE INDEX idx_creators_categories ON creators USING GIN(categories);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own products" ON products
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own campaigns" ON campaigns
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view matches for their campaigns" ON matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = matches.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );
```

5. **Configurar autenticación en Supabase**

- Habilita autenticación por email en el dashboard de Supabase
- Configura Google OAuth si deseas login social
- Configura las URLs de redirección

## 🚀 Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Despliegue en Vercel

1. **Conecta tu repositorio con Vercel**

2. **Configura las variables de entorno en Vercel**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (tu dominio de producción)

3. **Deploy**

## 🔑 Funcionalidades Principales

### Para Empresas/Marcas:
1. **Registro y Análisis de Negocio**: Sistema inteligente que analiza tu negocio
2. **Wizard de Campaña**: Proceso guiado de 5 pasos
3. **Dashboard**: Métricas y gestión centralizada
4. **Gestión de Productos**: Biblioteca de productos/servicios
5. **Sistema de Matches**: Resultados ordenados por compatibilidad
6. **Gestión de Campañas**: Control total sobre todas las campañas

### Para Administradores:
1. **Importación de Influencers**: Por URL o manual
2. **Categorización Automática**: Sistema de IA para categorizar
3. **Dashboard de Estadísticas**: Métricas del sistema

## 🎯 Algoritmo de Matching

El sistema evalúa la compatibilidad basándose en:
- **Alineación de Categoría** (35%)
- **Compatibilidad de Audiencia** (25%)
- **Calidad de Engagement** (20%)
- **Compatibilidad de Presupuesto** (15%)
- **Bonus de Ubicación** (5%)

## 📱 Responsive Design

La plataforma está optimizada para:
- Desktop (1920x1080 y superiores)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔒 Seguridad

- Autenticación con Supabase Auth
- Row Level Security (RLS) en todas las tablas
- Validación de datos con Zod
- Sanitización de inputs

## 📄 Licencia

[Tu licencia aquí]

## 👥 Contribuir

[Instrucciones para contribuir]

## 📞 Soporte

[Información de contacto/soporte]
