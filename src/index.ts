import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { sequelize } from './models/index.model';
import indexRoute from './routes/index.route';

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static('public'));  // 정적 파일
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', indexRoute);

app.listen(process.env.PORT || 3000, () => {

    sequelize.sync({ force: false, logging: false, }).then(() => {
        console.log('데이터베이스 연결 성공');
    }).catch((err) => {
        console.error(err);
    });

    console.log(`
    #############################################
        🛡️ Server listening on port: ${process.env.PORT || 3000} 🛡️
    #############################################    
    `);
});