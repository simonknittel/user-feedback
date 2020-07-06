<template>
  <form class="change-status" @submit.prevent="submit">
    <label for="change_status">Change status to</label>
    <select v-if="itemStatuses" v-model="newStatus" id="change_status" required>
      <option
        v-for="status in itemStatuses"
        :key="status.id"
        :value="status.id"
      >{{ status.title }}</option>
    </select>
    <button
      type="submit"
      :disabled="loading"
    >Save</button>
  </form>
</template>

<script>
import ITEM_STATUSES from '@/queries/ItemStatuses.gql'
import CHANGE_STATUS from '@/queries/ChangeStatus.gql'
import ITEM from '@/queries/Item.gql'

export default {
  name: 'ChangeStatus',
  props: ['itemId', 'submitted', 'currentStatus'],
  data () {
    return {
      newStatus: this.currentStatus,
      loading: false
    }
  },
  apollo: {
    itemStatuses: {
      query: ITEM_STATUSES,
      update: ({ itemStatuses }) => itemStatuses
    }
  },
  methods: {
    submit () {
      this.loading = true

      this.$apollo.mutate({
        mutation: CHANGE_STATUS,
        variables: {
          input: {
            where: {
              id: this.itemId
            },
            data: {
              status: this.newStatus
            }
          }
        },
        update: (store, { data: { updateItem } }) => {
          const query = {
            query: ITEM,
            variables: { id: this.$route.params.id }
          }

          const data = store.readQuery(query)

          data.item.status = updateItem.item.status
          data.item.updated_at = updateItem.item.updated_at

          store.writeQuery({ ...query, data })
        }
      })
        .then(() => {
          this.submitted()
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

    &:disabled {
      opacity: .5;
    }
  }
}
</style>
