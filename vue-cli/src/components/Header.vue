<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">User Feedback</h1>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: relative;

  margin-bottom: 2rem;

  border-bottom: 1px solid #ddd;

  // &::before {
  //   content: '';

  //   position: absolute;
  //   left: 0;
  //   bottom: 0;

  //   width: 100%;
  //   height: 2px;

  //   background: linear-gradient(135deg, rgba(133,60,255,1) 0%, rgba(49,0,131,1) 100%);
  // }

  .dark & {
    border-color: #333;
  }

  &__inner {
    max-width: 100rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
    line-height: 1;
  }
}
</style>
