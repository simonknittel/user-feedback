<template>
  <div class="display-options-comments">
    <div class="display-options-comments__order">
      Display

      <div class="display-options-comments__order__select-container">
        <select @change="change" v-if="order">
          <option value="newest">newest first</option>
          <option value="oldest">oldest first</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayOptionsComments',
  data: function () {
    return {
      order: 'newest'
    }
  },
  methods: {
    change: function (e) {
      console.log('order changed')
    }
  }
}
</script>

<style lang="scss">
.display-options-comments {
  margin-top: 2rem;

  &__order {
    display: block;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-size: .9rem;
    color: #777;

    &__select-container {
      display: inline-block;

      position: relative;

      &::after {
        content: '';
        pointer-events: none;

        position: absolute;
        right: .5rem;
        top: 50%;
        transform: translateY(-50%);

        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #495057;
      }

      select {
        cursor: pointer;

        padding-right: 1.2rem;

        appearance: none;
        border: none;
        border-radius: 0;
        background: none;

        font-size: inherit;
        text-decoration: underline;
        text-transform: uppercase;
        color: inherit;
      }
    }
  }
}
</style>
