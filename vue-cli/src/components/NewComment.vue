<template>
  <form class="new-comment" @submit="submit">
    <label class="new-comment__title" for="new_comment">New comment</label>
    <textarea
      v-model="content"
      class="new-comment__input"
      name="content"
      id="new_comment"
      rows="4"
      required
    ></textarea>
    <button class="new-comment__submit-button">Submit</button>
  </form>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'NewComment',
  data: function () {
    return {
      content: ''
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: gql`mutation ($input: createCommentInput!) {
          createComment(input: $input) {
            comment {
              id
            }
          }
        }`,
        variables: {
          input: {
            data: {
              item: this.$route.params.id,
              message: this.content
            }
          }
        }
      })
        .then(() => {
          // TODO: Refresh comments

          this.content = ''
        })
        .catch(error => {
          console.error('error', error)
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
  }
}
</style>
