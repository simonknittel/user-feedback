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
      const settings = await strapi.services.settings.find()
      data.status = settings.defaultStatus.id
      entity = await strapi.services.item.create(data, { files })
    } else {
      ctx.request.body.user = ctx.state.user.id
      const settings = await strapi.services.settings.find()
      ctx.request.body.status = settings.defaultStatus.id
      entity = await strapi.services.item.create(ctx.request.body)
    }

    return sanitizeEntity(entity, { model: strapi.models.item })
  },

  async update(ctx) {
    const { id } = ctx.params

    let allowed = false
    if (ctx.state.user.role.type === 'moderator') {
      const [item] = await strapi.services.item.find({
        id: ctx.params.id
      })
      if (item) allowed = true
    } else {
      const [item] = await strapi.services.item.find({
        id: ctx.params.id,
        'user.id': ctx.state.user.id,
      })
      if (item) allowed = true
    }

    if (!allowed) {
      return ctx.unauthorized(`You can't update this entry`)
    }

    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.item.update({ id }, data, {
        files,
      })
    } else {
      entity = await strapi.services.item.update({ id }, ctx.request.body)
    }

    return sanitizeEntity(entity, { model: strapi.models.item })
  },
}
