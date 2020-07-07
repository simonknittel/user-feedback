<template>
  <form
    @submit.prevent="submit"
    class="signup"
    @click.self="$store.commit('toggleSignup', false)"
  >
    <div class="signup__inner">
      <span class="signup__title">Signup</span>

      <label for="username">Username</label>
      <input v-model="username" id="username" name="username" type="username" required autocomplete="username">
      <label for="email">E-mail address</label>
      <input v-model="email" id="email" name="email" type="email" required autocomplete="email">
      <label for="password">Password</label>
      <input v-model="password" id="password" name="password" type="password" required autocomplete="current-password">
      <button class="signup__submit-button">Sign up</button>

      <button @click.prevent="showLogin" class="signup__login-button">Already got an account?</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('signup', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.password = ''
    },
    showLogin () {
      this.$store.commit('toggleSignup', false)
      this.$store.commit('toggleLogin', true)
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.signup {
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

  &__login-button {
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
