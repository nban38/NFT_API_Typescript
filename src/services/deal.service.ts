import { DealModel } from "../models/deal.model";
import { Op } from '@sequelize/core';

export class DealService {

    static selectDealHistoryList = async (param : any) => {
        
        try {

            const where : any = {};
            const limit : number = 30;
            const offset : number = 0 + (param.page - 1) * limit;

            // nft token id
            if(param.token_id) {
                where.nft_token_id = param.token_id;
            }

            const { count, rows } = await DealModel.findAndCountAll({
                where : where,
                limit : limit,
                offset : offset
            });
            
            const result = { "total" : count, "row" : rows };
            return result;

        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }
}