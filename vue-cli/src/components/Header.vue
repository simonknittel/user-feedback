<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">User Feedback</h1>

      <div class="header__right">
        <button @click="toggleDarkMode">DARK</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleDarkMode: function () {
      this.$store.commit('toggleDarkMode')
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
  }

  &__right {

  }
}
</style>
