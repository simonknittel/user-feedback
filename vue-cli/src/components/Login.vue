<template>
  <form
    @submit.prevent="submit"
    class="login"
    @click.self="$store.commit('toggleLogin', false)"
  >
    <div class="login__inner">
      <span class="login__title">Login</span>

      <label for="email">E-mail address or username</label>
      <input v-model="identifier" id="email" name="email" type="email" required autocomplete="email">
      <label for="password">Password</label>
      <input v-model="password" id="password" name="password" type="password" required autocomplete="current-password">
      <button class="login__submit-button">Log in</button>

      <button @click.prevent="showSignup" class="login__signup-button">Click here to sign up.</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      identifier: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('login', {
        identifier: this.identifier,
        password: this.password
      })
      this.password = ''
    },
    showSignup () {
      this.$store.commit('toggleLogin', false)
      this.$store.commit('toggleSignup', true)
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.login {
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, .3);

  &__inner {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 20rem;
    max-width: 100%;
    padding: 2rem;

    box-shadow: 2px 2px 10px 0 $shadow--light;
    border-radius: .5rem;
    background-color: #fff;
  }

  &__title {
    margin-top: 0;

    font-size: 1.4rem;
    font-weight: 700;
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;
  }

  input {
    width: 100%;
    padding: 1rem;

    border-radius: .5rem;
    border: none;
    background-color: #eee;

    font-size: 1rem;
    font-family: sans-serif;

    .dark & {
      background-color: #1e1e1e;
      color: #ddd;
    }
  }

  &__submit-button {
    cursor: pointer;
    display: block;

    margin-left: auto;
    margin-top: 1rem;
    padding: 1rem 2rem;

    border-radius: .5rem;
    border: none;
    background-color: #333;

    color: #ddd;
    font-size: .9rem;
    font-family: sans-serif;
    text-transform: uppercase;
  }

  &__signup-button {
    cursor: pointer;
    display: block;
    width: calc(100% + 4rem);

    margin-left: -2rem;
    margin-bottom: -2rem;
    margin-top: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;

    border: none;
    border-top: 1px solid #eee;
    border-radius: 0;
    background: none;

    text-align: center;
    color: #777;
    text-decoration: none;
    text-transform: uppercase;
    font-size: .9rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
