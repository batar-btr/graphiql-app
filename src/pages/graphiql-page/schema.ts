import { buildASTSchema } from 'graphql';
import gql from 'gql-tag';

const typeDefs = gql`
  type Query {
    characters(page: Int, filter: FilterCharacter): CharacterPage!
    character(id: ID!): Character
    episodes(page: Int, filter: FilterEpisode): EpisodePage!
    episode(id: ID!): Episode
    locations(page: Int, filter: FilterLocation): LocationPage!
    location(id: ID!): Location
  }

  type CharacterPage {
    info: PageInfo!
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

  type EpisodePage {
    info: PageInfo!
    results: [Episode!]!
  }

  type Episode {
    id: ID!
    name: String!
    air_date: String!
    episode: String!
    characters(page: Int): CharacterPage!
    created: String!
  }

  type LocationPage {
    info: PageInfo!
    results: [Location!]!
  }

  type Location {
    id: ID!
    name: String!
    type: String!
    dimension: String!
    residents(page: Int): CharacterPage!
    created: String!
  }

  type PageInfo {
    count: Int!
    pages: Int!
    next: String
    prev: String
  }

  input FilterCharacter {
    name: String
    status: String
    species: String
    type: String
    gender: String
  }

  input FilterEpisode {
    name: String
    episode: String
  }

  input FilterLocation {
    name: String
    type: String
    dimension: String
  }
`;

export const schema = buildASTSchema(typeDefs);
