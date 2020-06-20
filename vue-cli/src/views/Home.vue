<template>
  <div class="home">
    <main class="type-columns">
      <div
        class="type-columns__column"
        v-for="type in $store.state.homeItems"
        :key="type.id"
      >
        <h2
          v-if="$store.state.homeItems.length >= 2"
          class="type-columns__title"
        >{{ type.title }}s</h2>

        <ul class="item-card-list" v-if="type.items.length > 0">
          <ItemCard
            v-for="item in type.items"
            :key="item.id"
            :item="item"
          />
        </ul>
      </div>
    </main>

    <aside class="sidebar">
      <NewItem />
    </aside>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import NewItem from '../components/NewItem'
import ItemCard from '../components/ItemCard'

export default {
  name: 'Home',
  components: {
    NewItem,
    ItemCard
  },
  beforeCreate () {
    this.$apollo.query({
      query: gql`query {
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
      }`,
      fetchPolicy: 'no-cache'
    })
      .then(response => {
        this.$store.commit('updateHomeItems', response.data.itemTypes)
      })
  }
}
</script>

<style lang="scss">
.home {
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
}

.type-columns {
  display: flex;
  gap: 2rem;

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
</style>
