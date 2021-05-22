import gql from "graphql-tag";
export const REPOSITORIES = gql`
  query ($options: String!) {
    search(query:$options, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            nameWithOwner
            forkCount
            licenseInfo {
              nickname
              url
              name
            }
            description
            name
            stargazerCount
            url
            updatedAt
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                resourcePath
                url
              }
            }
            isFork
          }
        }
      }
    }
  }
`;

 export const PROFILE = gql`
query($user: String!){
  search(query:$user, type: USER, first: 10) {
    edges {
      node {
        ... on User {
          id
          email
          avatarUrl
          bio
          company
          twitterUsername
          url
          followers {
            totalCount
          }
          following {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          status {
            emoji
            emojiHTML
            message
          }
          isViewer
          location
          name
          websiteUrl
          isBountyHunter
          isCampusExpert
          isDeveloperProgramMember
          isEmployee
          isHireable
          isGitHubStar
          isSiteAdmin
          viewerIsFollowing
          viewerIsSponsoring
          isSponsoringViewer
          organizations(first: 10) {
            nodes {
              avatarUrl
              email
              isSponsoringViewer
              isVerified
              location
              name
              twitterUsername
              url
              websiteUrl
            }
          }

        }
      }
    }
  }
}
`;

export const ALL_LANGUAGES = gql`
query ($user: String!) {
  search(query:  $user, type: REPOSITORY, first: 100) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          languages(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
`;
// export{REPOSITORIES,PROFILE}
