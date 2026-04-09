import toast from 'react-hot-toast'
import { ConstructionObject, Act, EstimateItem } from '../types'

/**
 * Имитация экспорта в 1С (CSV/XML)
 */
export function exportTo1C(object: ConstructionObject, items: EstimateItem[]): void {
  // Генерация CSV
  const headers = ['Наименование', 'Количество', 'Ед.изм', 'Цена', 'Сумма']
  const rows = items.map((item) => [
    item.priceItemId,
    item.quantity.toString(),
    'шт',
    item.unitPrice.toString(),
    item.total.toString(),
  ])
  const csvContent = [
    headers.join(';'),
    ...rows.map((row) => row.join(';')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `1C_export_${object.name}_${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  toast.success('Данные экспортированы в CSV для 1С')
}

/**
 * Имитация отправки в Telegram/WhatsApp
 */
export function sendToMessenger(
  object: ConstructionObject,
  act?: Act,
  platform: 'telegram' | 'whatsapp' = 'telegram',
): void {
  const baseUrl = window.location.origin
  const objectUrl = `${baseUrl}/objects/${object.id}`
  const message = act
    ? `Акт ${act.number} по объекту "${object.name}" на сумму ${act.totalAmount} руб. Ссылка: ${objectUrl}`
    : `Объект "${object.name}" (${object.address}). Ссылка: ${objectUrl}`

  if (platform === 'telegram') {
    // Имитация открытия Telegram с предзаполненным сообщением
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(objectUrl)}&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
    toast.success('Открыт Telegram для отправки')
  } else {
    // Имитация WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Открыт WhatsApp для отправки')
  }
}

/**
 * Имитация облачной синхронизации с JSON Server
 */
export async function syncWithCloud(data: any): Promise<boolean> {
  // Заглушка: имитация запроса к серверу
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Синхронизация с облаком:', data)
      const success = Math.random() > 0.2 // 80% успеха
      if (success) {
        toast.success('Данные синхронизированы с облаком')
      } else {
        toast.error('Ошибка синхронизации, работаем офлайн')
      }
      resolve(success)
    }, 1000)
  })
}

/**
 * Генерация QR-кода для объекта (используем внешний сервис)
 */
export function generateObjectQR(objectId: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `${window.location.origin}/objects/${objectId}`,
  )}`
}

/**
 * Имитация отправки email через заглушку
 */
export function sendEmail(to: string, subject: string, body: string): void {
  console.log('Имитация отправки email:', { to, subject, body })
  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoLink
  toast.success('Открыт почтовый клиент')
}

/**
 * Имитация интеграции с Google Calendar
 */
export function addToGoogleCalendar(event: {
  title: string
  description?: string
  start: string
  end: string
  location?: string
}): void {
  const start = event.start.replace(/-/g, '')
  const end = event.end.replace(/-/g, '')
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title,
  )}&details=${encodeURIComponent(event.description || '')}&dates=${start}/${end}&location=${encodeURIComponent(
    event.location || '',
  )}`
  window.open(url, '_blank')
  toast.success('Добавлено в Google Calendar')
}