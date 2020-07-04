<template>
  <div id="app">
    <Header />
    <Login />

    <router-view/>
  </div>
</template>

<script>
import gql from 'graphql-tag'

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
  apollo: {
    data: {
      query: gql`
        query {
          self {
            id
            username
            email
            role {
              type
            }
            upvotedItems {
              id
            }
          }
        }
      `,
      update (data) {
        if (!data.self.id) return
        console.log(data.self.upvotedItems)
        this.$store.commit('updateUser', data.self)
        return { ...data }
      }
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
