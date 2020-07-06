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

      <Markdown :rawMarkdown="comment.message" />

      <div class="comment__meta">
        <DateTime :value="comment.created_at" />
      </div>
    </div>

    <ul v-if="$store.state.allowNestedComments && comment.children.length > 0">
      <Comment
        v-for="child in comment.children"
        :key="child.id"
        :comment="comments.filter(comment => comment.id === child.id)[0]"
        :comments="comments"
      />
    </ul>

    <div class="comment__buttons">
      <button
        v-if="comment.parent === null && showReply === false"
        class="comment__button"
        @click.prevent="showReply = true"
      >New reply</button>
    </div>

    <NewReply
      v-if="showReply === true"
      :itemId="$route.params.id"
      :commentId="comment.id"
      :hideReply="() => { showReply = false }"
    />
  </li>
</template>

<script>
import md5 from 'md5'

import Markdown from '@/components/Markdown'
import NewReply from '@/components/NewReply'
import DateTime from '@/components/DateTime'

export default {
  name: 'Comment',
  components: {
    Markdown,
    NewReply,
    DateTime
  },
  data () {
    return {
      showReply: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    comments: {
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

    > .markdown {
      grid-area: message;

      padding-left: 1rem;
    }
  }

  &__avatar {
    grid-area: avatar;

    img {
      vertical-align: middle;
      border-radius: 50%;
    }
  }

  &__meta {
    grid-area: meta;

    padding-left: 1rem;
    margin-top: .2rem;
    font-size: .8rem;
    color: #777;
  }

  &__buttons {
    margin-left: 2rem;
    margin-right: .5rem;
    margin-top: -.5rem;

    border-left: 2px solid #ddd;
  }

  &__button {
    margin-left: .5rem;
    padding: 0;

    border-radius: 0;
    border: none;
    background: none;

    text-decoration: underline;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;

    &:hover {
      cursor: pointer;
    }
  }

  &--private {
    .comment__content {
      border-left-color: $red;
      background: linear-gradient(180deg, rgba(255, 0, 0, .1) 0, rgba(255, 0, 0, 0) 7rem);
    }
  }
}
</style>
