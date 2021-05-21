import gql from 'graphql-tag'
export const REPOSITORIES = gql`
query($options: String!){
  search(query:$options, type: REPOSITORY, first: 20) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          nameWithOwner
          createdAt
          forkCount
          homepageUrl
          licenseInfo {
            nickname
            url
          }
        }
      }
    }
  }
}`


// export const PROFILE = gql`
// query($user: String!){
//   search(query: user:$user, type: USER, first: 10) {
//     edges {
//       node {
//         ... on User {
//           id
//           email
//           avatarUrl
//           bio
//           company
//           twitterUsername
//           url
//           followers {
//             totalCount
//           }
//           following {
//             totalCount
//           }
//           starredRepositories {
//             totalCount
//           }
//           status {
//             emoji
//             message
//           }
//           isViewer
//           location
//           name
//           websiteUrl
//           isBountyHunter
//           isCampusExpert
//           isDeveloperProgramMember
//           isEmployee
//           isHireable
//           isGitHubStar
//           isSiteAdmin
//           viewerIsFollowing
//           viewerIsSponsoring
//           isSponsoringViewer
//           organizations(first: 10) {
//             nodes {
//               avatarUrl
//               email
//               isSponsoringViewer
//               isVerified
//               location
//               name
//               twitterUsername
//               url
//               websiteUrl
//             }
//           }
          
//         }
//       }
//     }
//   }
// }
// `
