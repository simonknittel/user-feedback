<template>
  <form class="new-item" @submit="submit">
    <h2 class="new-item__title">New suggestion or bug</h2>

    <label for="new-item-title-input">Title</label>
    <input
      v-model="title"
      class="new-item__title-input"
      type="text"
      name="title"
      id="new-item-title-input"
      placeholder="Some descriptive title ..."
      required
      maxlength="144"
    >

    <label for="new-item-description-input">Description</label>
    <textarea
      v-model="description"
      class="new-item__description-input"
      name="description"
      rows="7"
      id="new-item-description-input"
      placeholder="Further details ..."
      required
    ></textarea>

    <div class="new-item__bottom-row">
      <select class="new-item__type-input" v-model="type" required>
        <option
          v-for="type in $store.state.homeItems"
          :key="type.id"
          :value="type.id"
        >
          {{ type.title }}
        </option>
      </select>

      <button
        class="new-item__submit-button"
        :disabled="loading"
      >Submit</button>
    </div>
  </form>
</template>

<script>
import CREATE_ITEM from '@/queries/CreateItem.gql'

export default {
  name: 'NewItem',
  data: function () {
    return {
      title: '',
      description: '',
      type: 1, // TODO: Change to first availableItem type
      loading: false
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault()
      this.loading = true

      this.$apollo.mutate({
        mutation: CREATE_ITEM,
        variables: {
          input: {
            data: {
              title: this.title,
              description: this.description,
              type: this.type,
              upvotes: [this.$store.state.user.id]
            }
          }
        }
      })
        .then(createItemResponse => {
          this.$router.push({ name: 'Item', params: { id: createItemResponse.data.createItem.item.id } })
        })
        .catch(error => {
          this.loading = false
          console.error('error', error)
        })
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.new-item {
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

    width: 2px;
    height: 100%;

    background: $gradient;
  }

  &__title {
    margin-top: 0;

    font-size: 1.4rem;
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;
  }

  &__title-input,
  &__description-input,
  &__type-input {
    padding: 1rem;

    border-radius: .5rem;
    border: none;
    background-color: #eee;

    font-size: 1rem;
    font-family: sans-serif;

    .dark & {
      background-color: #333;
      color: #ddd;
    }
  }

  &__title-input,
  &__description-input {
    width: 100%;
  }

  &__title-input {

  }

  &__description-input {
    resize: vertical;
    vertical-align: middle;
  }

  &__bottom-row {
    display: flex;
    justify-content: space-between;
  }

  &__type-input {
    cursor: pointer;
    margin-top: 1rem;
  }

  &__submit-button {
    cursor: pointer;
    display: block;

    margin-top: 1rem;
    padding: 1rem 2rem;

    border-radius: .5rem;
    border: none;
    background-color: #222;

    color: #ddd;
    font-size: .9rem;
    font-family: sans-serif;
    text-transform: uppercase;
  }
}
</style>
