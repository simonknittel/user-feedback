<template>
  <button @click="click" class="upvote">A</button>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Upvote',
  props: ['itemId'],
  methods: {
    click (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: gql`mutation ($itemId: ID!) {
          upvoteItem(itemId: $itemId) {
            upvotes {
              username
            }
          }
        }`,
        variables: {
          itemId: this.itemId
        }
      })
        .then(data => {
          // TODO: Update upvote count
          console.log(data.data.upvoteItem.upvotes.length)
        })
        .catch(error => {
          console.error('error', error)
        })
    }
  }
}
</script>

<style lang="scss">
.upvote {
  cursor: pointer;

  position: absolute;
  left: 2rem;
  top: 2rem;

  width: 3rem;
  height: 3rem;

  border: 1px solid #ddd;
  border-radius: .5rem;
  background-color: transparent;

  transition: background-color .1s;

  .dark & {
    border-color: #333;
    color: #333;
  }

  &:hover {
    background-color: #eee;

    .dark & {
      background-color: #333;
      color: #444;
    }
  }

  &:active {
    background-color: #ddd;
  }
}
</style>
