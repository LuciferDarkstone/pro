import { DB_CONNECTION_TOKEN, APP } from 'src/config/constant';
import { Provider } from '@nestjs/common';
import mongoose from 'src/utils/mongoose';

export const databaseProvider: Provider = {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
        const RECONNET_INTERVAL = 6000;

        function connection() {
            return mongoose.connect(APP.MONGODB.uri, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                autoReconnect: true,
                reconnectInterval: RECONNET_INTERVAL,
            }, error => {});
        }

        mongoose.connection.on('connecting', () => {
            console.log(`数据库链接中...`);
        });

        mongoose.connection.on('open', () => {
            console.info(`数据库链接成功 !`);
        });

        mongoose.connection.on('disconnected', () => {
            console.error(`数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`);
            setTimeout(connection, RECONNET_INTERVAL);
        });

        mongoose.connection.on('error', error => {
            console.error('数据库发生异常！', error);
            mongoose.disconnect();
        });

        return await connection();
    },
};
