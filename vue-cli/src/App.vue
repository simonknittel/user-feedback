<template>
  <div id="app">
    <Header />
    <Login />

    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Login from '@/components/Login'

export default {
  name: 'App',
  components: {
    Header,
    Login
  },
  computed: {
    darkMode: function () { return this.$store.state.darkMode }
  },
  watch: {
    darkMode (newValue) {
      if (newValue === true) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
  },
  created: function () {
    fetch('http://localhost:1337/users/me', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.id) return
        this.$store.commit('updateUser', data)
      })
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
