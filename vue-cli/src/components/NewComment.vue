<template>
  <form class="new-comment" @submit="submit">
    <label class="new-comment__title" for="new_comment">New comment</label>
    <textarea
      v-model="message"
      class="new-comment__input"
      name="message"
      id="new_comment"
      rows="4"
      required
    ></textarea>
    <button
      class="new-comment__submit-button"
      :disabled="loading"
    >Submit</button>
  </form>
</template>

<script>
import NEW_COMMENT from '@/queries/NewComment.gql'
import COMMENTS from '@/queries/Comments.gql'

export default {
  name: 'NewComment',
  data: function () {
    return {
      message: '',
      loading: false
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault()
      this.loading = true

      this.$apollo.mutate({
        mutation: NEW_COMMENT,
        variables: {
          input: {
            data: {
              item: this.$route.params.id,
              message: this.message
            }
          }
        },
        update: (store, { data: { createComment } }) => {
          const query = {
            query: COMMENTS,
            variables: { where: { item: { id: this.$route.params.id } } }
          }

          const data = store.readQuery(query)

          // TODO: Update items updated_at as well
          data.comments.push(createComment.comment)

          store.writeQuery({ ...query, data })
        }
      })
        .then(() => {
          this.message = ''
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
</script>

<style lang="scss">
.new-comment {
  &__title {
    display: block;
    margin-top: 1rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;
  }

  &__input {
    resize: vertical;
    vertical-align: middle;

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

    &:disabled {
      opacity: .5;
    }
  }
}
</style>
