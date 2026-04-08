import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Download, FileJson } from 'lucide-react'
import { loadModuleFromFile, generateExampleModule } from '@services/moduleLoader'
import { useModuleStore } from '@stores/useModuleStore'
import toast from 'react-hot-toast'

export default function ModuleUploader() {
  const { addCustomModule } = useModuleStore()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        try {
          const module = await loadModuleFromFile(file)
          addCustomModule(module)
          toast.success(`Модуль "${module.name}" установлен`)
        } catch (error) {
          console.error('Ошибка загрузки модуля:', error)
        }
      }
    },
    [addCustomModule],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.gmod', '.json'],
    },
    maxFiles: 1,
  })

  const handleDownloadExample = () => {
    const content = generateExampleModule()
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'example_module.gmod'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Пример модуля скачан')
  }

  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Загрузка пользовательского модуля
      </h3>
      <p className="text-gray-400 text-sm">
        Загрузите файл .gmod (JSON) для добавления нового модуля в систему. Модуль может добавлять вкладки, позиции в прайс, задачи и чек-листы.
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-gold-500 bg-gold-500/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        <input {...getInputProps()} />
        <FileJson className="w-12 h-12 mx-auto text-gray-500 mb-4" />
        {isDragActive ? (
          <p className="text-gold-300">Отпустите файл для загрузки...</p>
        ) : (
          <>
            <p className="text-gray-300">Перетащите файл .gmod сюда или нажмите для выбора</p>
            <p className="text-gray-500 text-sm mt-2">Поддерживается только JSON формат</p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownloadExample}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Скачать пример .gmod
        </button>
        <a
          href="#documentation"
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          📘 Документация по формату
        </a>
      </div>

      <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
        <p className="font-semibold">Требования к файлу модуля:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Формат JSON с полями id, name, version, description, category, icon</li>
          <li>Опционально: priceItems, tasks, checklist, componentCode</li>
          <li>componentCode должен быть валидной React-функцией компонента</li>
          <li>Максимальный размер файла: 1 MB</li>
        </ul>
      </div>
    </div>
  )
}