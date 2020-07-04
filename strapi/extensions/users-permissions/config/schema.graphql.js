module.exports = {
  definition: `
    type Self {
      id: ID
      username: String
      email: String
      role: UsersPermissionsRole
      upvotedItems: [Item]
    }
  `,
  query: `
    self: Self
  `,
  resolver: {
    Query: {
      self: {
        resolver: 'plugins::users-permissions.user.me'
      },
    },
  }
}
