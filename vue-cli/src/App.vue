<template>
  <div id="app">
    <Header />

    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    darkMode: function () { return this.$store.state.darkMode }
  },
  watch: {
    darkMode (newValue) {
      if (newValue === true) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
  }
}
</script>

<style lang="scss">
// https://cssgradient.io/

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
  font-family: sans-serif;
  font-size: 100%;

  &.dark {
    background-color: hsla(235, 5%, 25%, 1);
    color: #ddd;
  }
}

body {
  margin: 0;
}
</style>
