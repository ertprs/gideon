import axios, { AxiosInstance } from 'axios';
import { iStarWarsFilms } from '../../common/types';

class StarWars {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: 'https://swapi.dev/api',
    });
  }

  /**
   * getPlanet by Name
   * @param name string
   */
  getPlanet = async (name?: string) => name

  /**
   * getPlanets
   */
  getPlanets = async () => {
    this.apiInstance.get('/planets/');
  }

  /**
   * getFilms
   */
  getFilms = async () => {
    let text: string = '';

    const response = await this.apiInstance.get('/films/');
    const films: Array<iStarWarsFilms> = response.data.results;

    films.forEach((film) => {
      text += `ID:${film.episode_id}\nTítulo:${film.title}\n\n`;
    });

    return text;
  }

  /**
   * getFilm
   * @param id
   * @type number
   */
  getFilm = async (id: number) => {
    let data: string = '';

    try {
      const response = await this.apiInstance.get(`/films/${id}/`);

      return response;
    } catch (error) {
      data = 'Ocorreu um erro :/';
      console.log(error);
    }

    return data;
  }
}

export default StarWars;
