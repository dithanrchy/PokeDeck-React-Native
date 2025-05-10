import { RawPokemon } from '@/types/pokemon'
import { dmToCm, formatString, hmToKg } from './function'

export function normalizePokemon(item: RawPokemon | null) {
  if (!item) return null

  const imageUrl = item.pokemon_v2_pokemonsprites?.[0]?.sprites ?? null
  const types = item.pokemon_v2_pokemontypes.map(t => t.pokemon_v2_type.name)
  const stats = item.pokemon_v2_pokemonstats.map(stat => ({
    name: stat.pokemon_v2_stat.name,
    value: stat.base_stat,
  }))

  const abilitiesString = item.pokemon_v2_pokemonabilities
    .map((a: any) => formatString(a.pokemon_v2_ability.name))
    .join(', ')

  const catchRate = item.pokemon_v2_pokemonspecy?.capture_rate ?? 0

  const growthRate = item.pokemon_v2_pokemonspecy?.pokemon_v2_growthrate?.name ?? ''
  const genderRate = item.pokemon_v2_pokemonspecy?.gender_rate ?? -1

  const hatchCounter = item.pokemon_v2_pokemonspecy?.hatch_counter ?? 0
  const hatchSteps = typeof hatchCounter === 'number' ? hatchCounter * 255 : 0

  return {
    id: item.id,
    name: item.name,
    height: dmToCm(item.height),
    weight: hmToKg(item.weight),
    imageUrl,
    types,
    stats,
    growthRate: formatString(growthRate),
    genderRate,
    hatchSteps,
    catchRate,
    abilities: abilitiesString,
    effortValues: getEffortValues(item.pokemon_v2_pokemonstats),
  }
}

function getEffortValues(stats: any[]): string {
  return (
    stats
      .filter(s => s.effort > 0)
      .map(s => `${s.effort} ${formatString(s.pokemon_v2_stat.name)}`)
      .join(', ') || '-'
  )
}
