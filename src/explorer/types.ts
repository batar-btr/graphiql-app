export type Query = {
  character: {
    name: string;
    description: string;
    type: Character;
    args: [
      {
        name: string;
        description: string;
        type: ID;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  characters: {
    name: string;
    description: string;
    type: Characters;
    args: [
      {
        name: string;
        description: string;
        type: Int;
        extensions: Record<string, unknown>;
      },
      {
        name: string;
        description: string;
        type: FilterCharacter;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  charactersByIds: {
    name: string;
    description: string;
    type: Character[];
    args: [
      {
        name: string;
        description: string;
        type: ID[];
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  location: {
    name: string;
    description: string;
    type: Location;
    args: [
      {
        name: string;
        description: string;
        type: ID;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  locations: {
    name: string;
    description: string;
    type: Locations;
    args: [
      {
        name: string;
        description: string;
        type: Int;
        extensions: Record<string, unknown>;
      },
      {
        name: string;
        description: string;
        type: FilterLocation;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  locationsByIds: {
    name: string;
    description: string;
    type: Location[];
    args: [
      {
        name: string;
        description: string;
        type: ID[];
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  episode: {
    name: string;
    description: string;
    type: Episode;
    args: [
      {
        name: string;
        description: string;
        type: ID;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  episodes: {
    name: string;
    description: string;
    type: Episodes;
    args: [
      {
        name: string;
        description: string;
        type: Int;
        extensions: Record<string, unknown>;
      },
      {
        name: string;
        description: string;
        type: FilterEpisode;
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
  episodesByIds: {
    name: string;
    description: string;
    type: Episode[];
    args: [
      {
        name: string;
        description: string;
        type: ID[];
        extensions: Record<string, unknown>;
      }
    ];
    deprecationReason: null;
    extensions: Record<string, unknown>;
  };
};

type QueryFields =
  | 'character'
  | 'characters'
  | 'charactersByIds'
  | 'location'
  | 'locations'
  | 'locationsByIds'
  | 'episode'
  | 'episodes'
  | 'episodesByIds';

export type RandomQueryField = {
  name: string;
  description: string;
  type: Query[QueryFields]['type'];
  args?: Query[QueryFields]['args'];
};

export type QueryArray = Array<RandomQueryField>;

type Field<T> = {
  name: string;
  description: string;
  type: T;
  args: [];
  deprecationReason: null;
  extensions: Record<string, never>;
};

interface Character {
  id: Field<ID>;
  name: Field<string>;
  status: Field<string>;
  species: Field<string>;
  type: Field<string>;
  gender: Field<string>;
  origin: Field<Location>;
  location: Field<Location>;
  image: Field<string>;
  episode: Field<Array<Episode>>;
  created: Field<string>;
}

export interface Characters {
  info: Info;
  results: Character[];
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string;
}

export interface Episodes {
  info: Info;
  results: Episode[];
}

export interface FilterCharacter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface FilterEpisode {
  name?: string;
  episode?: string;
}

export interface FilterLocation {
  name?: string;
  type?: string;
  dimension?: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface Location {
  id: ID;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  created: string;
}

export interface Locations {
  info: Info;
  results: Location[];
}

export type ID = string | number;
export type Int = string;
export type String = string;
