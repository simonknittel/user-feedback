<template>
  <div class="item__sidebar">
    <dl>
      <dt>Submitted by</dt>
      <dd>Simon</dd>

      <dt>Created at</dt>
      <dd>12th June 2020</dd>

      <dt>Updated at</dt>
      <dd>3 days ago</dd>

      <dt>ID</dt>
      <dd>{{ $route.params.id }}</dd>
    </dl>

    <!-- TODO: Add icon (pencil) -->
    <button class="item__sidebar__link">Edit title, description or categories</button>

    <div v-if="$store.state.userIsAdmin" class="item__sidebar__admin">
      <!-- TODO: Add icon (warning sign) -->
      <span class="item__sidebar__admin__title">Admin area</span>

      <!-- TODO: Add icon (trash can) -->
      <button class="item__sidebar__link">Delete permanently</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemViewSidebar',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.item__sidebar {
  overflow: hidden;

  position: relative;

  padding: 2rem 2rem 2rem 2rem;

  box-shadow: 2px 2px 10px 0 $shadow--light;
  border-radius: .5rem;

  .dark & {
    box-shadow: 2px 2px 10px 0 $shadow--dark;
  }

  &::before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;

    width: 2px;
    height: 100%;

    background: $gradient;
  }

  dl {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  dt {
    display: block;
    margin-top: 1rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;

    &:first-of-type {
      margin-top: 0;
    }
  }

  dd {
    margin-left: 0;
  }

  &__link {
    cursor: pointer;

    padding: .5rem;

    border: 1px solid #aaa;
    border-radius: .2rem;
    background: white;

    font-size: .9rem;
    color: #333;
  }

  &__admin {
    margin-left: -2rem;
    margin-right: -2rem;
    margin-top: 2rem;
    margin-bottom: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 2rem;

    border-top: 1px solid $red;
    background: linear-gradient(180deg, rgba(255, 0, 0, .1) 0, rgba(255, 0, 0, 0) 7rem);

    .item__sidebar__link {
      border-color: $red;
      background: $red--light;

      color: $red;
    }

    &__title {
      display: block;

      margin-bottom: 1rem;

      color: $red;
    }
  }
}
</style>
