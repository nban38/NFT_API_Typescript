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

    static insertDealHistory = async (param : any) => {
        try {

            const result = await DealModel.create({
                collection_id : param.collection_id,
                nft_token_id : param.token_id,
                deal_transaction : param.transaction_code,
                deal_type : 1,
                deal_price : param.of_price,
                deal_from_wallet : param.buyer_wallet,
                deal_to_wallet : param.wallet_id,
                deal_create_date : Math.floor(new Date().getTime() / 1000)
            });
            return result;

        } catch ( error ) {

            return error;
        }
    }
}