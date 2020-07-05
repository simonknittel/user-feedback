import Vue from 'vue'

Vue.filter('dateRaw', function (value) {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
