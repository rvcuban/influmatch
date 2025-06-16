# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar InfluMatch en Vercel

### 1. Crear el repositorio en GitHub

Primero necesitas crear el repositorio en tu cuenta de GitHub [https://github.com/rvcuban](https://github.com/rvcuban):

1. Ve a [https://github.com/new](https://github.com/new)
2. Nombre del repositorio: `influmatch`
3. Descripción: "Plataforma de matching inteligente entre marcas e influencers"
4. Configuración: **Público** o **Privado** (según prefieras)
5. **NO** inicialices con README, .gitignore o licencia
6. Crea el repositorio

### 2. Subir el código a GitHub

En tu terminal (ya está configurado):

```bash
git branch -M main
git push -u origin main
```

### 3. Configurar Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com/dashboard/project/dqdzkoqblpfsouborbwh)
2. En el SQL Editor, ejecuta el siguiente código:

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

-- Trigger para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, company_name, company_type)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'company_type'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. En Authentication > Providers:
   - Habilita **Email** authentication
   - Si quieres, habilita **Google** OAuth:
     - Necesitarás crear un proyecto en Google Cloud Console
     - Obtener Client ID y Client Secret
     - Configurar las URLs de callback

4. En Authentication > URL Configuration:
   - Site URL: `https://tu-app.vercel.app` (la obtendrás después del deploy)
   - Redirect URLs: Añade `https://tu-app.vercel.app/auth/callback`

### 4. Desplegar en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Click en "Add New..." → "Project"
4. Importa el repositorio `influmatch`
5. Configura las variables de entorno:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://dqdzkoqblpfsouborbwh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZHprb3FibHBmc291Ym9yYndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTI0NDIsImV4cCI6MjA2NTY2ODQ0Mn0.tqQ_uC_vUXwPSc5ot039sjMhTO0JeOuIvAIvQ-pQpUg
   NEXT_PUBLIC_APP_URL=https://[tu-proyecto].vercel.app
   ```

6. Click en "Deploy"

### 5. Post-despliegue

1. Una vez desplegado, obtendrás una URL como: `https://influmatch.vercel.app`
2. Actualiza en Supabase:
   - Authentication > URL Configuration > Site URL
   - Authentication > URL Configuration > Redirect URLs
3. Actualiza la variable de entorno en Vercel:
   - `NEXT_PUBLIC_APP_URL` con tu URL de producción

### 6. Configurar dominio personalizado (Opcional)

Si tienes un dominio:
1. En Vercel, ve a tu proyecto > Settings > Domains
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

## 🎉 ¡Listo!

Tu aplicación estará disponible en la URL de Vercel. Los usuarios podrán:
- Registrarse y hacer login
- Analizar su negocio
- Crear campañas
- Ver matches con influencers

## 📝 Notas importantes

- Las credenciales de Supabase ya están configuradas en el código
- El proyecto está optimizado para Vercel
- La base de datos necesita ser inicializada con el SQL proporcionado
- Para producción, considera actualizar las políticas de seguridad según tus necesidades

## 🐛 Solución de problemas

Si algo no funciona:
1. Verifica que las variables de entorno estén correctamente configuradas en Vercel
2. Revisa los logs en Vercel Dashboard
3. Asegúrate de que las tablas de Supabase se crearon correctamente
4. Verifica que las URLs de callback estén configuradas en Supabase

## 📧 Soporte

Si necesitas ayuda, puedes:
- Revisar la documentación de [Next.js](https://nextjs.org/docs)
- Consultar la documentación de [Supabase](https://supabase.com/docs)
- Revisar la documentación de [Vercel](https://vercel.com/docs) 