import { NftModel } from "../models/nft.model";
import { Op } from '@sequelize/core';

export class NftService {

    /** 
      * offer 리스트 
      * @param param : object
      **/
    static selectItemList = async (param : any)  =>  {
        
        try {
            
            const where : any = {};
            const limit : number = 30;
            const offset : number = 0 + (param.page - 1) * limit;
            
            
            // 검색 시작가 ~ 종료가
            if(param.start_price >= 0 && param.end_price >= 0) {
                where.nft_price = {
                    [Op.gte]: param.start_price, // nft_price >= start_price
                    [Op.lte]: param.end_price,  // nft_price <= end_price
                }
            }

            console.log('keyword::'+param.keyword);
            // nft 타이틀 like 검색
            if(param.keyword){
                where.nft_title = {
                    [Op.substring]: param.keyword,
                }
            }

            // 상태값
            if(param.status) {
                where.nft_flag = param.status;
            }

            // 컬렉션 id
            if(param.collection_id) {
                where.collection_id = param.collection_id;
            }

            const { count, rows } = await NftModel.findAndCountAll({
                where : where,
                limit : limit,
                offset : offset
            });
            console.log('count::'+count);
            const result = { "total" : count, "row" : rows };
            return result;

        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }

    /** 
     * nft 아이템 단일 
     * @param token_id : int
     **/
    static selectItemId = async function(token_id : number) {
            
        const result = await NftModel.findOne({
            where : { nft_token_id : token_id }
        });

        return result;
    }
}