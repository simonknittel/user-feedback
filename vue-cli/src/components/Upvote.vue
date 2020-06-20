<template>
  <button class="upvote">A</button>
</template>

<style lang="scss">
.upvote {
  cursor: pointer;

  position: absolute;
  left: 2rem;
  top: 2rem;

  width: 3rem;
  height: 3rem;

  border: 1px solid #ddd;
  border-radius: .5rem;
  background-color: transparent;

  transition: background-color .1s;

  .dark & {
    border-color: #333;
    color: #333;
  }

  &:hover {
    background-color: #eee;

    .dark & {
      background-color: #333;
      color: #444;
    }
  }

  &:active {
    background-color: #ddd;
  }
}
</style>
