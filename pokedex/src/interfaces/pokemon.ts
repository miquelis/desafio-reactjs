export interface PokemonPage {
  count: number;
  next: string;
  previous: string;
  results: PokemonSimple[];
}

export interface PokemonSimple {
  id: number;
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: Ability[];
  base_experience: number;
  location_area_encounters: string;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: [];
  is_default: boolean;
  moves: [];
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: Sprites;
  stats: Stat[];
  weight: number;
  types: Type[];
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    "official-artwork": {
      front_default: string;
      front_female: string;
    };
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface GameIndice {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface CaughtPokemon {
  id: number;
  name: string;
  customPhoto: string;
}
