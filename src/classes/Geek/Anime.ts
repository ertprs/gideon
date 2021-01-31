import axios, { AxiosInstance } from 'axios';
import DateUtils from '../../utils/DateUtils';

import { iAnimeList } from '../../common/types';

class Anime {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: 'https://api.jikan.moe/v3',
    });
  }

  todaySchedule = async () => {
    try {
      const dateUtils = new DateUtils();
      const currentDay = dateUtils.getCurrentDay(true);

      let animesDay: Array<iAnimeList> = [];
      let text: string = '';

      const response = await this.apiInstance.get(
        `https://api.jikan.moe/v3/schedule/${currentDay}`,
      );

      const { data } = response;

      if (currentDay === 'sunday') {
        animesDay = data.sunday;
      } else if (currentDay === 'monday') {
        animesDay = data.monday;
      } else if (currentDay === 'tuesday') {
        animesDay = data.tuesday;
      } else if (currentDay === 'wednesday') {
        animesDay = data.wednesday;
      } else if (currentDay === 'thursday') {
        animesDay = data.thursday;
      } else if (currentDay === 'friday') {
        animesDay = data.friday;
      } else if (currentDay === 'saturday') {
        animesDay = data.saturday;
      }

      animesDay.forEach((anime) => {
        text += `*${anime.title}*\nEpisódios: *${
          anime.episodes !== null ? anime.episodes : 'Não especificado'
        }*\n\n`;
      });

      return text;
    } catch (error) {
      console.log(error);

      return 'Ocorreu um erro :/';
    }
  };
}

export default Anime;
