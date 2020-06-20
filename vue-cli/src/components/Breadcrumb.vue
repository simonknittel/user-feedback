<template>
  <router-link class="breadcrumb" to="/">&lt; Go to Home</router-link>
</template>

<script>
export default {
  name: 'Breadcrumb'
}
</script>

<style lang="scss">
.breadcrumb {
  color: #777;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
}
</style>
