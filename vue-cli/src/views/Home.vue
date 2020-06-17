<template>
  <div class="home">
    <div class="sidebar">
      <NewItem />
    </div>

    <main class="type-columns">
      <div class="type-columns__column" v-for="type in itemTypes" :key="type.id">
        <h2 v-if="itemTypes.length >= 2" class="type-columns__title">{{ type.title }}s</h2>

        <ul class="item-card-list" v-if="type.items.length > 0">
          <li
            :class="{
              'item-card': true,
              'item-card--sticky': item.sticky
            }"
            v-for="item in type.items"
            :key="item.id"
          >
            <a href="#">
              <button class="item-card__upvote">A</button>
              <h3 class="item-card__title">{{ item.title }}</h3>
              <p class="item-card__content">{{ item.description }}</p>

              <ul class="item-card__categories" v-if="item.categories">
                <li class="item-card__category" v-for="category in item.categories" :key="category.id">
                  <a href="#">{{ category.title }}</a>
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import NewItem from '@/components/NewItem'

export default {
  name: 'Home',
  components: {
    NewItem
  },
  apollo: {
    itemTypes: gql`query {
      itemTypes {
        id
        title
        items {
          id
          title
          description
          sticky
          upvotes
          categories {
            id
            title
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template:
    'sidebar main' min-content / 20rem auto;

  max-width: 100rem;
  margin-left: auto;
  margin-right: auto;
}

.type-columns {
  display: flex;
  gap: 2rem;

  padding: 0 2rem 2rem 2rem;

  &__column {
    flex: 1;

    &:first-of-type { margin-right: 1rem; }
    &:last-of-type { margin-left: 1rem; }
  }

  &__title {
    margin-top: 0;
  }
}

.item-card-list {
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
}

.item-card {
  margin-top: 1rem;

  &:first-of-type {
    > a {
      margin-top: 0;
    }
  }

  > a {
    display: block;
    position: relative;
    padding: 2rem 2rem 2rem 6rem;
    text-decoration: none;
    color: #222;

    &:hover {
      overflow: hidden;
      box-shadow: 2px 2px 10px 0 rgba(49, 0, 131, .1);
      border-radius: .5rem;
      background-color: #fff;

      &::before {
        content: '';

        position: absolute;
        left: 0;
        bottom: 0;

        width: 100%;
        height: 2px;

        background: linear-gradient(135deg, rgba(133,60,255,1) 0%, rgba(49,0,131,1) 100%);
      }

      .item-card__content {
        color: #222;
      }
    }
  }

  &__upvote {
    cursor: pointer;

    position: absolute;
    left: 2rem;
    top: 2rem;

    width: 3rem;
    height: 3rem;

    border: 2px solid #ddd;
    border-radius: .5rem;
    background-color: transparent;

    transition: background-color .1s;

    &:hover {
      background-color: #eee;
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

      &:hover {
        background-color: #ddd;
      }
    }
  }

  &--sticky {
    margin-bottom: 2rem;

    > a {
      overflow: hidden;
      box-shadow: 2px 2px 10px 0 rgba(49, 0, 131, .1);
      border-radius: .5rem;
      background-color: #fff;

      &::before {
        content: '';

        position: absolute;
        left: 0;
        bottom: 0;

        width: 100%;
        height: 2px;

        background: linear-gradient(135deg, rgba(133,60,255,1) 0%, rgba(49,0,131,1) 100%);
      }

      .item-card__content {
        color: #222;
      }
    }
  }
}
</style>
