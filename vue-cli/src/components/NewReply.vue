<template>
  <form class="new-reply" @submit="submit">
    <label class="new-reply__title" :for="'new_reply' + commentId">New reply</label>
    <textarea
      v-model="message"
      class="new-reply__input"
      name="message"
      :id="'new_reply' + commentId"
      rows="4"
      required
    ></textarea>

    <div class="new-reply__button-row">
      <button type="submit" class="new-reply__submit-button">Submit</button>
      <button
        type="reset"
        class="new-reply__cancel-button"
        @click.prevent="hideReply"
      >cancel</button>
    </div>
  </form>
</template>

<script>
import CREATE_REPLY from '@/queries/CreateReply.gql'
import COMMENTS from '@/queries/Comments.gql'

export default {
  name: 'NewReply',
  props: ['itemId', 'commentId', 'hideReply'],
  data: function () {
    return {
      message: ''
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: CREATE_REPLY,
        variables: {
          input: {
            data: {
              item: this.itemId,
              parent: this.commentId,
              message: this.message
            }
          }
        },
        update: (store, { data: { createComment } }) => {
          const query = {
            query: COMMENTS,
            variables: { where: { item: { id: this.itemId } } }
          }

          const data = store.readQuery(query)

          // TODO: Update items updated_at as well
          data.comments.push(createComment.comment)

          store.writeQuery({ ...query, data })
        }
      })
        .then(() => {
          this.hideReply()
        })
        .catch(error => {
          console.error('error', error)
        })
    }
  }
}
</script>

<style lang="scss">
.new-reply {
  margin-left: 2rem;
  margin-top: -.4rem;
  margin-bottom: 2rem;

  &__title {
    display: block;
    margin-bottom: .5rem;
    padding-left: .5rem;

    border-left: 2px solid #ddd;

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

  &__button-row {
    display: flex;
    flex-direction: row-reverse;
  }

  &__submit-button {
    cursor: pointer;
    display: block;

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

  &__cancel-button {
    cursor: pointer;
    display: block;

    margin-right: 1rem;
    margin-top: 1rem;
    padding: 1rem .5rem;

    border-radius: .5rem;
    border: none;
    background-color: transparent;

    color: #777;
    font-size: .9rem;
    font-family: sans-serif;
    text-transform: uppercase;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
