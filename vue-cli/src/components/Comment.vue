<template>
  <li
    :class="{
      comment: true,
      'comment--sticky': comment.sticky,
      'comment--private': comment.private
    }"
  >
    <div class="comment__content">
      <div class="comment__avatar">
        <img
          :src="`https://www.gravatar.com/avatar/${md5(comment.user.email)}?s=48&d=identicon`"
          width="48"
          height="48"
        >
      </div>

      <div class="comment__message">
        {{ comment.message }}
      </div>

      <div class="comment__meta">
        <!-- Convert date via vue filter in a more readable format -->
        {{ comment.created_at }}
      </div>
    </div>

    <ul v-if="$store.state.allowNestedComments && comment.children.length > 0">
      <Comment
        v-for="child in comment.children"
        :key="child.id"
        :comment="allComments.filter(comment => comment.id === child.id)[0]"
        :allComments="allComments"
      />
    </ul>
  </li>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    allComments: {
      type: Array,
      required: true
    }
  },
  methods: {
    md5
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.comment {
  ul {
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2rem;
  }

  &__content {
    display: grid;
    grid:
      'min-content auto'
      'min-content auto' / min-content auto;
    grid-template-areas:
      'avatar message'
      'avatar meta';

    margin-bottom: 1rem;
    padding: 2rem;

    border-left: 2px solid #ddd;
  }

  &__avatar {
    grid-area: avatar;

    img {
      border-radius: .5rem;
      vertical-align: middle;
    }
  }

  &__message {
    grid-area: message;

    padding-left: 1rem;
  }

  &__meta {
    grid-area: meta;

    margin-top: 1rem;
    padding-left: 1rem;
    font-size: .9rem;
    color: #777;
  }

  &--private {
    .comment__content {
      border-left-color: $red;
      background: linear-gradient(180deg, rgba(255, 0, 0, .1) 0, rgba(255, 0, 0, 0) 7rem);
    }
  }
}
</style>
