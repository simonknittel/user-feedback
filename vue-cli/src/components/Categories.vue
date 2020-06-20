<template>
  <ul class="categories">
    <li
      class="category"
      v-for="category in categories"
      :key="category.id"
    >
      <router-link
        :to="'/category/' + category.id"
      >
        {{ category.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Categories',
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.categories {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  margin-left: -.2rem;
  margin-right: -.2rem;
  margin-top: 1rem;
  margin-bottom: 0;
  padding-left: 0;
}

.category {
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
</style>
