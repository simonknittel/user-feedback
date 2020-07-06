<template>
  <span :title="raw">{{ formatted }}</span>
</template>

<script>
import { date, dateRaw } from '@/utils/utils'

export default {
  name: 'DateTime',
  props: ['value'],
  data () {
    return {
      raw: dateRaw(this.value),
      formatted: date(this.value),
      interval: null
    }
  },
  watch: {
    value: function (newValue) {
      this.raw = dateRaw(newValue)
      this.formatted = date(newValue)
    }
  },
  created () {
    /**
     * Create a random interval for each DateTime component to prevent spikes
     * each X seconds
     */
    const randomInterval = Math.random() * (50 - 70) + 70

    this.interval = setInterval(() => {
      this.formatted = date(this.value)
    }, 1000 * randomInterval)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
