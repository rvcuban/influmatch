import { createClient } from '@/lib/supabase/server'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CubeIcon, 
  MegaphoneIcon,
  ArrowTrendingUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get stats
  const [
    { count: productsCount },
    { count: campaignsCount },
    { count: matchesCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('campaigns').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('matches').select('*', { count: 'exact', head: true })
      .eq('campaigns.user_id', user!.id),
  ])

  const stats = [
    {
      name: 'Productos',
      value: productsCount || 0,
      icon: CubeIcon,
      href: '/app/products',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Campañas Activas',
      value: campaignsCount || 0,
      icon: MegaphoneIcon,
      href: '/app/campaigns',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      name: 'Matches Totales',
      value: matchesCount || 0,
      icon: UserGroupIcon,
      href: '/app/matches',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      name: 'ROI Promedio',
      value: '3.2x',
      icon: ArrowTrendingUpIcon,
      href: '#',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/70">
          Bienvenido de vuelta. Aquí está el resumen de tu actividad.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/70">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">
              <SparklesIcon className="w-6 h-6 text-primary" />
              Acciones Rápidas
            </h2>
            <div className="space-y-3">
              <Link href="/app/wizard/mode" className="btn btn-primary btn-block">
                Nueva Campaña
              </Link>
              <Link href="/app/products/new" className="btn btn-outline btn-block">
                Agregar Producto
              </Link>
              <Link href="/app/business-analyzer" className="btn btn-outline btn-block">
                Analizar mi Negocio
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">
              <ChartBarIcon className="w-6 h-6 text-secondary" />
              Rendimiento Reciente
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tasa de Respuesta</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <progress className="progress progress-primary" value="68" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Conversión</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <progress className="progress progress-secondary" value="24" max="100"></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Engagement</span>
                  <span className="text-sm font-medium">4.2%</span>
                </div>
                <progress className="progress progress-accent" value="42" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {productsCount === 0 && campaignsCount === 0 ? (
              <div className="text-center py-8">
                <p className="text-base-content/70 mb-4">
                  No hay actividad reciente. ¡Comienza creando tu primera campaña!
                </p>
                <Link href="/app/wizard/mode" className="btn btn-primary">
                  Crear Primera Campaña
                </Link>
              </div>
            ) : (
              <p className="text-base-content/70">
                Aquí aparecerán tus actividades recientes...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 