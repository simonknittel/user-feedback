<template>
  <form class="new-item">
    <h2 class="new-item__title">New suggestion or bug</h2>

    <label for="new-item-title-input">Title</label>
    <input class="new-item__title-input" type="text" name="title" id="new-item-title-input">

    <label for="new-item-description-input">Description</label>
    <textarea class="new-item__description-input" name="description" rows="7" id="new-item-description-input"></textarea>

    <button class="new-item__submit-button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'NewItem'
}
</script>

<style lang="scss">
.new-item {
  overflow: hidden;

  position: relative;

  padding: 2rem;

  box-shadow: 2px 2px 10px 0 rgba(49, 0, 131, .1);
  border-radius: .5rem;
  background-color: #fff;

  .dark & {
    background-color: #222;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, .2);
  }

  &::before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;

    width: 4px;
    height: 100%;

    background: linear-gradient(135deg, rgba(133,60,255,1) 0%, rgba(49,0,131,1) 100%);
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
  }

  &__title-input,
  &__description-input {
    width: 100%;
    padding: 1rem;

    border-radius: .5rem;
    border: none;
    background-color: #eee;

    font-size: 1rem;
    font-family: sans-serif;

    .dark & {
      background-color: #1e1e1e;
      color: #ddd;
    }
  }

  &__title-input {

  }

  &__description-input {
    resize: vertical;
    vertical-align: middle;
  }

  &__submit-button {
    cursor: pointer;
    display: block;

    margin-left: auto;
    margin-top: 1rem;
    padding: 1rem 2rem;

    border-radius: .5rem;
    border: none;
    background-color: #333;

    color: #ddd;
    font-size: .9rem;
    font-family: sans-serif;
    text-transform: uppercase;
  }
}
</style>
