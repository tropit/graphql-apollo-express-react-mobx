export default (host) => ({
  location: 'local',
  api: { url: `${ host }:5000/graphql` },
})