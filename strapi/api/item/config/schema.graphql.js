module.exports = {
  mutation: `
    upvoteItem(itemId: ID!): Item!
  `,
  resolver: {
    Mutation: {
      upvoteItem: {
        description: 'Upvotes an item',
        resolverOf: 'application::item.item.update',
        resolver: async (obj, options, { context }) => {
          const where = options
          const user = context.state.user

          const [item] = await strapi.services.item
            .find({ id: where.itemId })

          return await strapi.api.item.services.item
            .update({ id: where.itemId }, {
              upvotes: [...item.upvotes, user.id]
            })
        }
      }
    },
  },
};
