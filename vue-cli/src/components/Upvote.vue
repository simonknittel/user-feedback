<template>
  <button
    @click.prevent="click"
    :class="{
      'upvote': true,
      'upvote--active': active,
    }"
    :title="title"
    :disabled="!upvotes || loading"
  >
    <span class="upvote__arrow"></span>
    <span class="upvote__count" v-if="upvotes">{{ upvotes.length }}</span>
    <span class="upvote__count" v-if="!upvotes">-</span>
  </button>
</template>

<script>
import UPVOTES from '@/queries/Upvotes.gql'
import UPVOTE_ITEM from '@/queries/UpvoteItem.gql'
import DOWNVOTE_ITEM from '@/queries/DownvoteItem.gql'

export default {
  name: 'Upvote',
  props: ['itemId'],
  data () {
    return {
      active: this.$store.state.user !== null && this.$store.state.user.upvotedItems !== null && this.$store.state.user.upvotedItems.includes(this.itemId),
      loading: false
    }
  },
  computed: {
    title () {
      let string = ''

      string += this.active ? 'Click to remove your upvote' : 'Click to upvote'

      if (this.upvotes && this.upvotes.length > 0) {
        string += '\n\nUpvoted by ' + this.upvotes.map(upvote => upvote.username).join(', ')
      }

      return string
    }
  },
  apollo: {
    upvotes: {
      query: UPVOTES,
      variables () {
        return {
          id: this.itemId
        }
      },
      update: ({ item }) => item.upvotes
    }
  },
  methods: {
    click () {
      this.loading = true

      // Downvote
      if (this.active) {
        this.$apollo.mutate({
          mutation: UPVOTE_ITEM,
          variables: {
            itemId: this.itemId
          },
          update: (store, { data: { upvoteItem } }) => {
            const query = {
              query: UPVOTES,
              variables: { id: this.itemId }
            }

            const data = store.readQuery(query)

            data.item.upvotes = upvoteItem.upvotes

            store.writeQuery({ ...query, data })
          }
        })
          .catch(error => {
            console.error('error', error)
          })
          .finally(() => {
            this.loading = false
          })

      // Upvote
      } else {
        this.$apollo.mutate({
          mutation: DOWNVOTE_ITEM,
          variables: {
            itemId: this.itemId
          },
          update: (store, { data: { downvoteItem } }) => {
            const query = {
              query: UPVOTES,
              variables: { id: this.itemId }
            }

            const data = store.readQuery(query)

            data.item.upvotes = downvoteItem.upvotes

            store.writeQuery({ ...query, data })
          }
        })
          .catch(error => {
            console.error('error', error)
          })
          .finally(() => {
            this.loading = false
          })
      }
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

  &:disabled {
    opacity: .5;
  }

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
