<template>
  <li
    :class="{
      'item-card': true,
      'item-card--sticky': item.sticky
    }"
  >
    <router-link :to="'/item/' + item.id">
      <Upvote />
      <h3 class="item-card__title">{{ item.title }}</h3>
      <p class="item-card__content">{{ item.description }}</p>

      <ul class="item-card__categories" v-if="item.categories">
        <li
          class="item-card__category"
          v-for="category in item.categories"
          :key="category.id"
        >
          <a href="#">{{ category.title }}</a>
        </li>
      </ul>
    </router-link>
  </li>
</template>

<script>
import Upvote from './Upvote'

export default {
  name: 'ItemCard',
  components: {
    Upvote
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
    padding: 2rem 2rem 2rem 6rem;
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
  }

  &__content {
    margin-top: 1rem;
    margin-bottom: 0;

    color: #777;
    line-height: 1.5;
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    margin-left: -.2rem;
    margin-right: -.2rem;
    margin-top: 1rem;
    margin-bottom: 0;
    padding-left: 0;
  }

  &__category {
    > a {
      display: inline-block;

      margin-left: .2rem;
      margin-right: .2rem;
      padding: .25rem .3rem .2rem .3rem;

      border-radius: 2px;
      background-color: #eee;

      transition: background-color .1s;

      font-size: .8rem;
      text-decoration: none;
      color: inherit;

      .dark & {
        background-color: #333;
      }

      &:hover {
        background-color: #ddd;

        .dark & {
          background-color: #444;
        }
      }
    }
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
