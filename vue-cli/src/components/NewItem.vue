<template>
  <form class="new-item">
    <h2 class="new-item__title">New suggestion or bug</h2>

    <input type="text" name="title">
    <textarea name="description" rows="10"></textarea>
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  name: 'NewItem'
}
</script>

<style lang="scss">
.new-item {
  padding: 2rem;

  box-shadow: 5px 5px 10px 0 rgba(49, 0, 131, .2);
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(133,60,255,1) 0%, rgba(49,0,131,1) 100%);

  color: #fff;

  &__title {
    margin-top: 0;

    font-size: 2rem;
  }
}
</style>
