<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">
        <router-link to="/">
          User Feedback
        </router-link>
      </h1>

      <div class="header__right">
        <button @click.prevent="toggleDarkMode">Toggle dark/light mode</button>

        <button v-if="$store.state.user === null" @click.prevent="showLogin">Log in</button>
        <button v-if="$store.state.user !== null" @click.prevent="logout">Log out</button>

        <div v-if="$store.state.user !== null" class="header__user">
          <img
            :src="`https://www.gravatar.com/avatar/${md5($store.state.user.email)}?s=48&d=identicon`"
            width="48"
            height="48"
            :title="`Logged in as ${$store.state.user.username} (${$store.state.user.email})`"
          >
        </div>

        <button v-if="$store.state.user === null" @click.prevent="showSignup">Sign up</button>
      </div>
    </div>
  </header>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'Header',
  methods: {
    toggleDarkMode () {
      this.$store.commit('toggleDarkMode')
    },

    showLogin () {
      this.$store.commit('toggleLogin', true)
    },

    logout () {
      this.$store.commit('logout')
    },

    md5,

    showSignup () {
      this.$store.commit('toggleSignup', true)
    }
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
    display: flex;
    justify-content: flex-end;

    button {
      cursor: pointer;

      padding-left: .75rem;
      padding-right: .75rem;

      border: none;
      border-radius: 0;
      background: none;

      color: #777;
      text-transform: uppercase;

      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;

    margin-left: .75rem;

    img {
      vertical-align: middle;
      border-radius: 50%;
    }
  }
}
</style>
