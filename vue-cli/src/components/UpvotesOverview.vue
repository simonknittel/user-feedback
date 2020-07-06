<template>
  <div class="upvotes-overview">
    <img
      v-for="user in upvotes"
      :key="user.id"
      :src="`https://www.gravatar.com/avatar/${md5(user.email)}?s=48&d=identicon`"
      width="48"
      height="48"
      :title="user.username"
    >
  </div>
</template>

<script>
import gql from 'graphql-tag'
import md5 from 'md5'

export default {
  name: 'UpvotesOveriew',
  props: ['itemId'],
  apollo: {
    upvotes: {
      query: gql`query ($id: ID!) {
        item (id: $id) {
          id
          upvotes {
            id
            username
            email
          }
        }
      }`,
      variables () {
        return {
          id: this.itemId
        }
      },
      update: ({ item }) => item.upvotes
    }
  },
  methods: {
    md5
  }
}
</script>

<style lang="scss">
.upvotes-overview {
  margin-top: -.2rem;
  padding-left: 1.5rem;

  img {
    vertical-align: middle;
    margin-left: -1.5rem;
    margin-top: .2rem;
    border-radius: 50%;
  }
}
</style>
