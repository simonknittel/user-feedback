<template>
  <div class="markdown" v-html="convertedHTML"></div>
</template>

<script>
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import sanitize from 'rehype-sanitize'
import gh from 'hast-util-sanitize/lib/github'

export default {
  name: 'Markdown',
  props: ['rawMarkdown'],
  data () {
    return {
      convertedHTML: ''
    }
  },
  created () {
    const sanitizeOptions = gh

    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(html)
      .use(sanitize, sanitizeOptions)
      .process(this.rawMarkdown, (err, file) => {
        if (err) {
          console.error(err)
          return
        }

        this.convertedHTML = file
      })
  }
}
</script>

<style lang="scss">
.markdown {
  line-height: 1.4;
  // font-size: .9rem;

  > :first-child {
    margin-top: 0;
    margin-bottom: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  p {
    max-width: 50rem;
  }
}
</style>
