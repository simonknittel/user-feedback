<template>
  <div class="item">
    <main>
      <Breadcrumb />

      <div class="item__main-content" v-if="item">
        <div class="item__card">
          <Upvote
            :itemId="item.id"
            :upvoteCount="item.upvotes.length"
            :active="
              $store.state.user !== null
              && $store.state.user.upvotedItems !== null
              && $store.state.user.upvotedItems.includes(item.id) ? true : false
            "
          />
          <h1 class="item__title">{{ item.title }}</h1>

          <div class="item__description">
            <Markdown :rawMarkdown="item.description" />
          </div>

          <Categories
            v-if="item.categories.length > 0"
            :categories="item.categories"
          />
        </div>

        <Comments :allComments="item.comments" />
      </div>
    </main>

    <aside>
      <ItemViewSidebar v-if="item" :item="item" />
    </aside>
  </div>
</template>

<script>
import Upvote from '@/components/Upvote'
import Comments from '@/components/Comments'
import Categories from '@/components/Categories'
import Breadcrumb from '@/components/Breadcrumb'
import ItemViewSidebar from '@/components/ItemViewSidebar'
import Markdown from '@/components/Markdown'

import ITEM from '@/queries/Item.gql'

export default {
  name: 'Item',
  components: {
    Upvote,
    Comments,
    Categories,
    Breadcrumb,
    ItemViewSidebar,
    Markdown
  },
  apollo: {
    item: {
      query: ITEM,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      update: ({ item }) => item
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

  &__main-content {
    margin-top: 1rem;
  }

  &__card {
    overflow: hidden;

    position: relative;
    padding: 2rem 2rem 2rem 5.5rem;

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

    word-break: break-all;
  }

  &__description {
    margin-top: 1rem;
  }
}
</style>
