<template>
  <div class="comments">
    <h2 class="comments__title">Comments</h2>

    <ul class="comments">
      <Comment
        v-for="comment in allComments.filter(comment => !comment.parent)"
        :key="comment.id"
        :comment="comment"
        :allComments="allComments"
      />
    </ul>
  </div>
</template>

<script>
import Comment from './Comment'

export default {
  name: 'Comments',
  components: {
    Comment
  },
  props: {
    allComments: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.comments {
  margin-top: 2rem;

  &__title {
    margin-bottom: 0;
  }

  > ul {
    list-style: none;
    margin-top: 1rem;
    margin-bottom: 0;
    padding-left: 0;

    > .comment {
      margin-top: 2rem;

      &:first-of-type {
        margin-top: 0;
      }

      > .comment__content {
        box-shadow: 2px 2px 10px 0 $shadow--light;
        border-radius: .5rem;
        border-left: none;
      }

      &--private {
        > .comment__content {
          overflow: hidden;

          position: relative;

          background: linear-gradient(180deg, rgba(255, 0, 0, .1) 0, rgba(255, 0, 0, 0) 7rem);

          &::before {
            content: '';

            position: absolute;
            left: 0;
            bottom: 0;

            width: 100%;
            height: 2px;

            background: $red;
          }
        }
      }
    }
  }
}
</style>
