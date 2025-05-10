import { gql } from '@apollo/client'

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query getPokemonDetailQuery($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      weight
      height
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        has_gender_differences
        name
        gender_rate
        capture_rate
        hatch_counter
        growth_rate_id
        pokemon_v2_growthrate {
          name
        }
      }
      pokemon_v2_pokemonstats {
        effort
        pokemon_v2_stat {
          name
        }
        base_stat
      }
      pokemon_v2_pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`
