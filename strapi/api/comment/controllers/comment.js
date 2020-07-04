'use strict'

const { parseMultipartData, sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      data.user = ctx.state.user.id
      entity = await strapi.services.comment.create(data, { files })
    } else {
      ctx.request.body.user = ctx.state.user.id
      entity = await strapi.services.comment.create(ctx.request.body)
    }

    return sanitizeEntity(entity, { model: strapi.models.comment })
  },

  async update(ctx) {
    const { id } = ctx.params

    const [comment] = await strapi.services.comment.find({
      id: ctx.params.id,
      'user.id': ctx.state.user.id,
    })

    if (!comment) {
      return ctx.unauthorized(`You can't update this entry`)
    }

    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.comment.update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services.comment.update({ id }, ctx.request.body)
    }

    return sanitizeEntity(entity, { model: strapi.models.comment })
  },
}
