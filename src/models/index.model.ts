'use strict';

import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { UserModel } from "./user.model";
import { NftModel } from "./nft.model";
import { OfferModel } from "./offer.model";
import { DealModel } from "./deal.model";

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'mysql',
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true   // 테이블명 수동 설정
        },
    }
);

sequelize.addModels([UserModel, NftModel, OfferModel, DealModel]);