import axios from "axios";
import { ListParams, Pokemon, PokemonDetails, PokemonEvolution, PokemonSpecies } from "../models";

 class PokemonServiceImpl {
  async getPokemons({ limit = 20, offset = 0 }: ListParams): Promise<Pokemon[]> {
    const response =
      await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );

    return response.data.results;
  }

  async getPokemonDetails(id: string): Promise<PokemonDetails> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  }

  async getPokemonSpecies(id: string): Promise<PokemonSpecies> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return response.data;
  }

  async getPokemonEvolution(url: string): Promise<PokemonEvolution> {
    const response = await axios.get(url);
    return response.data;
  }
}

export const PokemonService = new PokemonServiceImpl();
