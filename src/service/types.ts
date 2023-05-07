interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<Character>;
  created: string;
}

interface Origin {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<Character>;
  created: string;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: Array<Episode>;
  created: string;
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<Character>;
  created: string;
}
