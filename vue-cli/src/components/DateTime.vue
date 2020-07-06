<template>
  <span :title="raw">{{ formatted }}</span>
</template>

<script>
export default {
  name: 'DateTime',
  props: ['value'],
  data () {
    return {
      raw: this.$options.filters.dateRaw(this.value),
      formatted: this.$options.filters.date(this.value),
      interval: null
    }
  },
  watch: {
    value: function (newValue) {
      this.raw = this.$options.filters.dateRaw(newValue)
      this.formatted = this.$options.filters.date(newValue)
    }
  },
  created () {
    /**
     * Create a random interval for each DateTime component to prevent spikes
     * each X seconds
     */
    const randomInterval = Math.random() * (50 - 70) + 70

    this.interval = setInterval(() => {
      this.formatted = this.$options.filters.date(this.value)
    }, 1000 * randomInterval)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
