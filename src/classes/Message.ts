import {
  Client,
  decryptMedia,
  Message as iMessage,
} from '@open-wa/wa-automate';

/**
 * Modules in development
 */
// import StarWars from './Geek/StarWars';
// import Anime from './Geek/Anime';

import MediaProcessing from '../utils/MediaProcessing';

class Message {
  /**
   * Handler
   * @param client
   * @param message
   */
  handler = async (client: Client, message: iMessage) => {
    try {
      const {
        caption,
        from,
        sender,
        type,
        isMedia,
        mimetype,
        isGroupMsg,
      } = message;
      let { body } = message;

      const prefix = '!';

      if (type === 'chat' && body.startsWith(prefix)) {
        // eslint-disable-next-line no-self-assign
        body = body;
      } else if (
        (type === 'image' || type === 'video')
        && caption
        && caption.startsWith(prefix)
      ) {
        body = caption;
      }

      const command = body !== undefined
        ? body.slice(1).trim().split(/ +/).shift()
          .toLowerCase()
        : '';

      const args = body !== undefined ? body.trim().split(/ +/).slice(1) : '';

      const mediaProcessing = new MediaProcessing();
      // const anime = new Anime();
      // const starWars = new StarWars();

      switch (command) {
        case 'gideon':
          await client.sendTextWithMentions(
            from,
            `👋 Hi @${sender.id}, sou *Gideon*!\nUma bot criada para satisfazer suas necessidades!\nPara mais comandos digite:\n*!help*`,
          );
          break;
        case 'help':
          await client.sendText(
            from,
            '*Lista de Comandos*\n\n!sticker: Cria um sticker a partir de uma imagem.\n!anime: Gera uma lista dos animes do dia.\nEm construção...',
          );
          break;
        case 'sticker':
          if (isMedia && isGroupMsg) {
            const mediaData = await decryptMedia(message);
            const resizedMediaData = await mediaProcessing.image(mediaData);
            const mediaBase64 = `data:${mimetype};base64,${resizedMediaData}`;

            if (mimetype === 'video/mp4') {
              // Alpha
              await client.sendMp4AsSticker(from, mediaBase64);
            } else {
              await client.sendImageAsSticker(from, mediaBase64);
            }
          }
          break;
        case 'anime':
          // if (args.length === 0) {
          //   const todaySchedule = await anime.todaySchedule();

          //   await client.sendText(from, `*Animes do Dia*\n\n${todaySchedule}`);
          // }
          break;
        case 'sw':
          // if (args.length === 0) {
          //   await client.sendText(from, '*Universo Star Wars*\n\nComandos:\n!sw filmes - Lista de Filmes\n!sw filme ID_DO_FILME');
          // } else if (args.length > 0 && args[0] === 'filmes') {
          //   const films = await starWars.getFilms();

          //   await client.sendText(from, `*Lista de Filmes*\n\n${films}`);
          // }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default Message;
