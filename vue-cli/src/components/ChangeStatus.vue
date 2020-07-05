<template>
  <form class="change-status" @submit.prevent="submit">
    <label for="change_status">Change status to</label>
    <select v-if="data" v-model="newStatus" id="change_status" required>
      <option
        v-for="status in data.itemStatuses"
        :key="status.id"
        :value="status.id"
      >{{ status.title }}</option>
    </select>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ChangeStatus',
  props: ['itemId', 'submitted', 'currentStatus'],
  data () {
    return {
      newStatus: this.currentStatus
    }
  },
  apollo: {
    data: {
      query: gql`
        query {
          itemStatuses {
            id
            title
          }
        }
      `,
      update (data) {
        return { ...data }
      }
    }
  },
  methods: {
    submit () {
      // TODO: Run GraphQL mutation for changing the status
      this.$apollo.mutate({
        mutation: gql`mutation ($input: updateItemInput) {
          updateItem(input: $input) {
            item {
              id
            }
          }
        }`,
        variables: {
          input: {
            where: {
              id: this.itemId
            },
            data: {
              status: this.newStatus
            }
          }
        }
      })
        .then(data => {
          // TODO: Update item status
        })
        .catch(error => {
          console.error('error', error)
        })

      this.submitted()
    }
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.change-status {
  display: flex;
  flex-wrap: wrap;

  position: absolute;
  bottom: calc(100% + .2rem);
  left: 0;
  right: 0;

  padding: 1rem;

  box-shadow: 2px 2px 10px 0 $shadow--light;
  border-radius: .5rem;
  background-color: white;

  animation-name: slideUp;
  animation-duration: .3s;
  animation-iteration-count: 1;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(1rem)
    }

    to {
      opacity: 1;
      transform: translateY(0)
    }
  }

  label {
    display: block;
    width: 100%;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;
  }

  select {
    cursor: pointer;

    flex: 1;
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

  button {
    cursor: pointer;
    display: block;

    width: 6rem;
    margin-left: .5rem;

    padding: 1rem 0;

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
