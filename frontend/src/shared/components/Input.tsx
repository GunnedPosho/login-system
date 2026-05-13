import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

function Input({ label, error, id, ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-text-soft">
        {label}
      </label>
      <input
        id={inputId}
        {...rest}
        className={`w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 bg-bg text-text ${error ? 'border border-error' : 'border border-border-input'}`}
        onFocus={e => {
          e.currentTarget.style.border = `1px solid ${error ? 'var(--color-error)' : 'var(--color-border-focus)'}`
          e.currentTarget.style.boxShadow = error ? '0 0 0 3px rgba(239,68,68,0.15)' : '0 0 0 3px rgba(124,58,237,0.15)'
        }}
        onBlur={e => {
          e.currentTarget.style.border = `1px solid ${error ? 'var(--color-error)' : 'var(--color-border-input)'}`
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      {error && (
        <p className="text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default Input