<template>
  <li
    :class="{
      comment: true,
      'comment--sticky': comment.sticky,
      'comment--private': comment.private
    }"
  >
    <div class="comment__content">
      {{ comment.message }}
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
    margin-bottom: 1rem;
    padding: 2rem;

    border-left: 2px solid #ddd;
  }

  &--private {
    .comment__content {
      border-left-color: $red;
      background: linear-gradient(180deg, rgba(255, 0, 0, .1) 0, rgba(255, 0, 0, 0) 7rem);
    }
  }
}
</style>
