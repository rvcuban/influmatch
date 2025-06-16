import Link from "next/link";
import { ArrowRightIcon, SparklesIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            <SparklesIcon className="w-6 h-6 text-primary" />
            InfluMatch
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/login" className="btn btn-ghost">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="btn btn-primary">
            Empezar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold animate-fade-in">
              Creator Marketing en <span className="text-primary">Auto-Pilot</span>
            </h1>
            <p className="py-6 text-xl animate-slide-up">
              🔍 Encuentra y 🚀 Conecta con influencers virales en tu nicho
              <br />— consigue 100&apos;s de nuevos clientes mientras duermes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/register" className="btn btn-primary btn-lg">
                Encontrar Creators
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link href="#features" className="btn btn-outline btn-lg">
                Ver cómo funciona
              </Link>
            </div>
            <p className="mt-4 text-sm text-base-content/70">
              50% de descuento para miembros fundadores
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-12">
                    <div className="bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <div className="bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                      MR
                    </div>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <div className="bg-accent rounded-full flex items-center justify-center text-white font-bold">
                      AS
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm">Únete a 350+ marcas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Todo lo que necesitas para escalar con influencers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <SparklesIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Matching Inteligente</h3>
                <p>
                  Nuestro algoritmo analiza miles de influencers para encontrar
                  los que mejor se alinean con tu marca y audiencia objetivo.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <ChartBarIcon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="card-title">Análisis en Tiempo Real</h3>
                <p>
                  Obtén métricas detalladas de engagement, audiencia y rendimiento
                  para tomar decisiones informadas sobre tus colaboraciones.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <UserGroupIcon className="w-12 h-12 text-accent mb-4" />
                <h3 className="card-title">Gestión Simplificada</h3>
                <p>
                  Administra todas tus campañas, comunicaciones y pagos desde
                  una única plataforma intuitiva y fácil de usar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Analiza tu negocio",
                description: "Cuéntanos sobre tu marca y objetivos",
              },
              {
                step: "2",
                title: "Define tu campaña",
                description: "Configura tu producto y audiencia objetivo",
              },
              {
                step: "3",
                title: "Encuentra influencers",
                description: "Nuestro algoritmo busca los mejores matches",
              },
              {
                step: "4",
                title: "Lanza y escala",
                description: "Conecta, colabora y mide resultados",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-base-content/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Empieza a crecer con influencer marketing hoy
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a cientos de marcas que ya están escalando con InfluMatch
          </p>
          <Link href="/register" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
            Comenzar Gratis
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <SparklesIcon className="w-10 h-10 text-primary" />
          <p>
            InfluMatch
            <br />
            Conectando marcas con influencers desde 2024
          </p>
        </div>
        <div>
          <span className="footer-title">Producto</span>
          <a className="link link-hover">Características</a>
          <a className="link link-hover">Precios</a>
          <a className="link link-hover">Casos de éxito</a>
        </div>
        <div>
          <span className="footer-title">Empresa</span>
          <a className="link link-hover">Sobre nosotros</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Contacto</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Términos de uso</a>
          <a className="link link-hover">Política de privacidad</a>
          <a className="link link-hover">Cookies</a>
        </div>
      </footer>
    </div>
  );
}
