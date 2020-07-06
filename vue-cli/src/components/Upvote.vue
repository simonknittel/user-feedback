<template>
  <button
    @click.prevent="click"
    :class="{
      'upvote': true,
      'upvote--active': active,
    }"
    :title="active ? 'Click to remove your upvote' : 'Click to upvote'"
  >
    <span class="upvote__arrow"></span>
    <span class="upvote__count">{{ upvoteCount }}</span>
  </button>
</template>

<script>
import UPVOTE_ITEM from '@/queries/UpvoteItem.gql'

export default {
  name: 'Upvote',
  props: ['itemId', 'upvoteCount', 'active'],
  methods: {
    click () {
      this.$apollo.mutate({
        mutation: UPVOTE_ITEM,
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
@import '../variables.scss';

.upvote {
  cursor: pointer;

  position: absolute;
  left: 2rem;
  top: 2rem;

  width: 2.5rem;
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

  &__arrow {
    display: inline-block;

    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);

    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;

    border-bottom: 8px solid #555;
  }

  &__count {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
  }

  &--active {
    .upvote__arrow {
      border-bottom-color: $violet--light;
    }
  }
}
</style>
