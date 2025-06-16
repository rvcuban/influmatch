'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  HomeIcon,
  SparklesIcon,
  CubeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MegaphoneIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'

interface AppShellProps {
  user: {
    full_name?: string
    company_name?: string
  } | null
  children: React.ReactNode
}

export default function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
    { name: 'Analizador', href: '/app/business-analyzer', icon: SparklesIcon },
    { name: 'Productos', href: '/app/products', icon: CubeIcon },
    { name: 'Campañas', href: '/app/campaigns', icon: MegaphoneIcon },
    { name: 'Matches', href: '/app/matches', icon: PuzzlePieceIcon },
    { name: 'Creators', href: '/app/creators', icon: UserGroupIcon },
    { name: 'Configuración', href: '/app/settings', icon: Cog6ToothIcon },
  ]

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile sidebar */}
      <div className={`drawer ${sidebarOpen ? 'drawer-open' : ''} lg:hidden`}>
        <input
          id="drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="drawer-content">
          {/* Mobile header */}
          <div className="navbar bg-base-100 shadow-sm lg:hidden">
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1">
              <Link href="/app/dashboard" className="btn btn-ghost text-xl">
                <SparklesIcon className="w-6 h-6 text-primary" />
                InfluMatch
              </Link>
            </div>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="drawer-toggle"
            className="drawer-overlay"
            onClick={() => setSidebarOpen(false)}
          ></label>
          <aside className="w-64 min-h-full bg-base-100">
            <div className="p-4">
              <button
                className="btn btn-square btn-ghost lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent
              navigation={navigation}
              pathname={pathname}
              user={user}
              onLogout={handleLogout}
            />
          </aside>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen bg-base-100 shadow-lg">
          <div className="p-4">
            <Link href="/app/dashboard" className="flex items-center gap-2">
              <SparklesIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">InfluMatch</span>
            </Link>
          </div>
          <SidebarContent
            navigation={navigation}
            pathname={pathname}
            user={user}
            onLogout={handleLogout}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({
  navigation,
  pathname,
  user,
  onLogout,
}: {
  navigation: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }>
  pathname: string
  user: {
    full_name?: string
    company_name?: string
  } | null
  onLogout: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 px-4 pb-4">
        <ul className="menu">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={pathname === item.href ? 'active' : ''}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="text-xl">
                {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.full_name}</p>
            <p className="text-xs text-base-content/70 truncate">
              {user?.company_name}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="btn btn-ghost btn-sm w-full justify-start"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
} 