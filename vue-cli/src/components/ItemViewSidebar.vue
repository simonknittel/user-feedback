<template>
  <div class="item__sidebar">
    <dl>
      <dt>Submitted by</dt>
      <dd class="item__sidebar__user">
        <img
          :src="`https://www.gravatar.com/avatar/${md5(item.user.email)}?s=48&d=identicon`"
          width="48"
          height="48"
        >
        {{ item.user.username }}
      </dd>

      <dt>Created at</dt>
      <dd>{{ item.created_at }}</dd>

      <dt>Updated at</dt>
      <dd>{{ item.updated_at }}</dd>

      <dt>ID</dt>
      <dd>{{ item.id }}</dd>
    </dl>

    <!-- TODO: Add icon (pencil) -->
    <button
      v-if="
        $store.state.user !== null
        && (
          item.user.id === $store.state.user.id
          || $store.state.user.role.type === 'moderator'
        )
      "
      class="item__sidebar__link"
    >Edit title, description or categories</button>

    <div
      v-if="$store.state.user !== null && $store.state.user.role.type === 'moderator'"
      class="item__sidebar__admin"
    >
      <!-- TODO: Add icon (warning sign) -->
      <span class="item__sidebar__admin__title">Admin area</span>

      <!-- TODO: Add icon (trash can) -->
      <button class="item__sidebar__link" @click="deleteItem">Delete permanently</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import md5 from 'md5'

export default {
  name: 'ItemViewSidebar',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteItem: function (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: gql`mutation ($input: deleteItemInput!) {
          deleteItem(input: $input) {
            item {
              id
            }
          }
        }`,
        variables: {
          input: {
            where: {
              id: this.$route.params.id
            }
          }
        }
      })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(error => {
          console.error('error', error)
        })
    },
    md5
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

    &:last-child {
      margin-bottom: 0;
    }
  }

  dt {
    display: block;
    margin-top: 2rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .8rem;
    color: #777;

    &:first-of-type {
      margin-top: 0;
    }
  }

  dd {
    margin-left: 0;
  }

  &__user {
    display: flex;
    align-items: center;

    img {
      margin-right: 1rem;
      border-radius: .5rem;
    }
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
