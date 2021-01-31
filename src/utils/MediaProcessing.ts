import sharp from 'sharp';

class MediaProcessing {
  image = async (buffer: string | Buffer) => {
    const image = await sharp(buffer, { failOnError: false })
      .resize({
        fit: sharp.fit.contain,
        width: 512,
        height: 512,
      })
      .toBuffer();

    return image.toString('base64');
  }
}

export default MediaProcessing;
