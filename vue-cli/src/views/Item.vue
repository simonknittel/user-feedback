<template>
  <div class="item">
    <main>
      <div v-if="data">
        <div class="item__card">
          <Upvote />
          <h1 class="item__title">{{ data.item.title }}</h1>
          <div class="item__description">{{ data.item.description }}</div>
        </div>

        <Comments v-if="data.comments.length > 0" :allComments="data.comments" />
      </div>
    </main>

    <aside class="item__sidebar">
      <div class="item__sidebar__inner">
        ID: {{ $route.params.id }}
        <button>Edit title or description</button>
      </div>
    </aside>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import Upvote from '../components/Upvote'
import Comments from '../components/Comments'

export default {
  name: 'Item',
  components: {
    Upvote,
    Comments
  },
  apollo: {
    data: {
      query: gql`
        query ($id: ID!, $where: JSON!) {
          item (id: $id) {
            title
            description
          }

          comments (where: $where) {
            id
            message
            parent { id }
            children { id }
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.id,
          where: {
            item: {
              id: this.$route.params.id
            }
          }
        }
      },
      update: data => {
        return { ...data }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.item {
  display: grid;
  grid-template:
    'sidebar main' min-content / 25rem auto;
  grid-column-gap: 2rem;

  max-width: 100rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  main {
    grid-area: main;
  }

  aside {
    grid-area: sidebar;
  }

  &__card {
    overflow: hidden;

    position: relative;
    padding: 2rem 2rem 2rem 6rem;

    box-shadow: 2px 2px 10px 0 $shadow--light;
    border-radius: .5rem;

    text-decoration: none;
    color: #222;

    .dark & {
      box-shadow: 2px 2px 10px 0 $shadow--dark;
    }

    &::before {
      content: '';

      position: absolute;
      left: 0;
      bottom: 0;

      width: 100%;
      height: 2px;

      background: $gradient;
    }

    .item-card__content {
      color: #222;

      .dark & {
        color: #ddd;
      }
    }
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
  }

  &__description {
    max-width: 50rem;
    margin-top: 1rem;
    margin-bottom: 0;

    line-height: 1.5;
  }

  &__sidebar {
    &__inner {
      overflow: hidden;

      position: relative;

      padding: 2rem;

      box-shadow: 2px 2px 10px 0 $shadow--light;
      border-radius: .5rem;

      .dark & {
        box-shadow: 2px 2px 10px 0 $shadow--dark;
      }

      &::before {
        content: '';

        position: absolute;
        left: 0;
        top: 0;

        width: 4px;
        height: 100%;

        background: $gradient;
      }
    }
  }
}
</style>
