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
  font-family: sans-serif;
  font-size: 100%;

  &.dark {
    background-color: #222;
    color: #ddd;
  }
}

body {
  margin: 0;
}
</style>
