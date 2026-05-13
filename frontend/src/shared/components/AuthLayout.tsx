function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda — gradiente animado */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-deep) 50%, var(--color-bg) 100%)' }}>

        {/* Orbes animados */}
        <div className="absolute inset-0">
          <div
            className="absolute rounded-full opacity-30 blur-3xl"
            style={{
              width: '500px', height: '500px',
              background: 'radial-gradient(circle, var(--color-border-focus), transparent)',
              top: '-100px', left: '-100px',
              animation: 'drift1 12s ease-in-out infinite alternate',
            }}
          />
          <div
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              width: '400px', height: '400px',
              background: 'radial-gradient(circle, var(--color-primary), transparent)',
              bottom: '-80px', right: '-80px',
              animation: 'drift2 15s ease-in-out infinite alternate',
            }}
          />
          <div
            className="absolute rounded-full opacity-15 blur-2xl"
            style={{
              width: '250px', height: '250px',
              background: 'radial-gradient(circle, var(--color-primary-end), transparent)',
              top: '50%', left: '40%',
              animation: 'drift3 10s ease-in-out infinite alternate',
            }}
          />
        </div>

        {/* Estrellas */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 60% 15%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.35) 0%, transparent 100%), radial-gradient(1px 1px at 40% 75%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />

        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <style>{`
          @keyframes drift1 {
            0%   { transform: translate(0px, 0px) scale(1); }
            100% { transform: translate(80px, 60px) scale(1.15); }
          }
          @keyframes drift2 {
            0%   { transform: translate(0px, 0px) scale(1.1); }
            100% { transform: translate(-60px, -80px) scale(1); }
          }
          @keyframes drift3 {
            0%   { transform: translate(0px, 0px) scale(1); }
            100% { transform: translate(-40px, 50px) scale(1.2); }
          }
        `}</style>
      </div>

      {/* Columna derecha — formulario */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg"
      >
        <div
        className="w-full max-w-md rounded-2xl p-8 bg-card border border-border/50"
        style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 80px rgba(124,58,237,0.05)' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout