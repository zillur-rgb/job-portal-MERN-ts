import mongoose from 'mongoose';
import config from './config/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connected to ${mongoose.connection.host}`);

    app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('error from server: ', error);
  }
}

main();
