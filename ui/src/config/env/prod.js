export default (host) => ({
  env: 'production',
  host,
  api: { url: `${ host }/graphql` },
})