import { buildASTSchema } from 'graphql';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    characters(page: Int, filter: FilterCharacter): CharacterResponse!
    character(id: ID!): Character
    locations(page: Int, filter: FilterLocation): LocationResponse!
    location(id: ID!): Location
    episodes(page: Int, filter: FilterEpisode): EpisodeResponse!
    episode(id: ID!): Episode
  }

  input FilterCharacter {
    name: String
    status: String
    species: String
    type: String
    gender: String
  }

  type CharacterResponse {
    info: Info!
    results: [Character!]!
  }

  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: Location!
    location: Location!
    image: String!
    episode: [Episode!]!
    created: String!
  }

  type Info {
    count: Int!
    pages: Int!
    next: Int
    prev: Int
  }

  input FilterLocation {
    name: String
    type: String
    dimension: String
  }

  type LocationResponse {
    info: Info!
    results: [Location!]!
  }

  type Location {
    id: ID!
    name: String!
    type: String!
    dimension: String!
    residents: [Character!]!
    created: String!
  }

  input FilterEpisode {
    name: String
    episode: String
  }

  type EpisodeResponse {
    info: Info!
    results: [Episode!]!
  }

  type Episode {
    id: ID!
    name: String!
    air_date: String!
    episode: String!
    characters: [Character!]!
    created: String!
  }
`;

export const schema = buildASTSchema(typeDefs);
