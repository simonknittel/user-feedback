<template>
  <li
    :class="{
      'item-card': true,
      'item-card--sticky': item.sticky
    }"
  >
    <router-link :to="'/item/' + item.id">
      <Upvote
        :itemId="item.id"
        :upvoteCount="item.upvotes.length"
        :active="
          $store.state.user !== null
          && $store.state.user.upvotedItems !== null
          && $store.state.user.upvotedItems.includes(item.id) ? true : false
        "
      />
      <h3 class="item-card__title">
        <span class="item-card__title__inner">{{ item.title }}</span>
        <Status :status="item.status" :simple="true" />
      </h3>
      <p class="item-card__content">{{ item.description }}</p>

      <Categories
        v-if="item.categories.length > 0"
        :categories="item.categories"
      />
    </router-link>
  </li>
</template>

<script>
import Upvote from '@/components/Upvote'
import Categories from '@/components/Categories'
import Status from '@/components/Status'

export default {
  name: 'ItemCard',
  components: {
    Upvote,
    Categories,
    Status
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.item-card {
  > a {
    display: block;
    position: relative;
    padding: 2rem 2rem 2rem 5.5rem;
    text-decoration: none;
    color: #222;

    .dark & {
      color: #ddd;
    }

    &:hover {
      overflow: hidden;
      box-shadow: 2px 2px 10px 0 $shadow--light;
      border-radius: .5rem;

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
          color: #ccc;
        }
      }
    }
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;

    line-height: 1;

    word-break: break-all;

    &__inner {
      margin-right: .5rem;
    }
  }

  &__content {
    margin-top: 1rem;
    margin-bottom: 0;

    color: #777;
    line-height: 1.5;
  }

  .status {
    position: relative;
    top: -.1em;
  }

  &--sticky {
    margin-bottom: 2rem;

    > a {
      overflow: hidden;
      box-shadow: 2px 2px 10px 0 $shadow--light;
      border-radius: .5rem;

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
  }
}
</style>
