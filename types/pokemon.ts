// types/pokemon.ts
export type PokemonType = {
  pokemon_v2_type: { name: string }
}

export type PokemonStat = {
  base_stat: number
  pokemon_v2_stat: { name: string }
}

export type PokemonSprites = {
  sprites: string
}

export type PokemonSpecies = {
  gender_rate: number
  capture_rate: number
  hatch_counter: number
  pokemon_v2_growthrate: { name: string }
}

export type PokemonAbility = {
  pokemon_v2_ability: { name: string }
}

export type RawPokemon = {
  id: number
  name: string
  height: number
  weight: number
  pokemon_v2_pokemontypes: PokemonType[]
  pokemon_v2_pokemonsprites: PokemonSprites[]
  pokemon_v2_pokemonabilities: PokemonAbility[]
  pokemon_v2_pokemonstats: PokemonStat[]
  pokemon_v2_pokemonspecy: PokemonSpecies
}

export type NormalizedPokemon = {
  id: number
  name: string
  height: number // in cm
  weight: number // in kg
  imageUrl: string | null
  types: string[]
  stats: {
    name: string
    value: number
  }[]
  growthRate: string
  genderRate: number
  hatchSteps: number
  catchRate: number
  abilities: string
  effortValues: string
}
