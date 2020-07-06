export function dateRaw (value) {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function date (value) {
  if (!value) return ''
  const date = new Date(value)
  const now = new Date()
  const difference = now.getTime() - date.getTime()
  const age = difference / 1000 // in seconds

  // TODO: Add "Yesterday, 10:30"

  if (age <= 30) return 'Few seconds ago'
  else if (age >= 31 && age <= 90) return 'About a minute ago'
  else if (age >= 91 && age <= 3600) return Math.round(age / 60) + ' minutes ago'
  else if (age >= 3601 && age <= 86400) return `${Math.round(age / 60 / 60)} hour${Math.round(age / 60 / 60) > 1 ? 's' : ''} ago`
  else {
    return date.toLocaleString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
