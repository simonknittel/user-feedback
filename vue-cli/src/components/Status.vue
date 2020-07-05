<template>
  <span
    :class="{
      'status': true,
      'status--simple': simple || false,
    }"
    :style="'background-color:' + status.colour"
  >{{ status.title }}</span>
</template>

<script>
export default {
  name: 'Status',
  props: ['status', 'simple']
}
</script>

<style lang="scss">
.status {
  display: inline-block;

  padding: .2em .5em .1em .5em;

  border-radius: .2em;

  color: white;
  font-weight: 400;

  &--simple {
    padding: .1em .4em .1em .4em;

    border: 1px solid #ddd;
    background-color: transparent !important;

    color: #aaa;
    font-size: .9rem;
  }
}
</style>
