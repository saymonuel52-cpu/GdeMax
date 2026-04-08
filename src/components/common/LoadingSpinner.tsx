interface LoadingSpinnerProps {
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function LoadingSpinner({
  fullScreen = false,
  size = 'md',
  text = 'Загрузка...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-700 border-t-gold-500 rounded-full animate-spin`}
      />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}