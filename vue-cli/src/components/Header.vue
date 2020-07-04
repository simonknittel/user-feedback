<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">
        <router-link to="/">
          User Feedback
        </router-link>
      </h1>

      <div class="header__right">
        <button @click="toggleDarkMode">DARK</button>

        <button v-if="$store.state.user === null" @click="showLogin">Login</button>
        <button v-if="$store.state.user !== null" @click="logout">Log out</button>

        <div v-if="$store.state.user !== null" class="header__user">
          {{ $store.state.user.username }}
          <img
            :src="`https://www.gravatar.com/avatar/${md5($store.state.user.email)}?s=48&d=identicon`"
            width="48"
            height="48"
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'Header',
  methods: {
    toggleDarkMode: function () {
      this.$store.commit('toggleDarkMode')
    },

    showLogin (e) {
      e.preventDefault()
      this.$store.commit('toggleLogin', true)
    },

    logout (e) {
      e.preventDefault()
      this.$store.commit('logout')
    },
    md5
  }
}
</script>

<style lang="scss">
.header {
  position: relative;

  margin-bottom: 2rem;

  border-bottom: 1px solid #ddd;

  .dark & {
    border-color: #333;
  }

  &__inner {
    display: flex;
  justify-content: space-between;

    max-width: 100rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
    line-height: 1;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &__right {

  }

  &__user {
    display: flex;
    align-items: center;

    img {
      margin-left: 1rem;
      border-radius: .5rem;
    }
  }
}
</style>
