import { NftModel } from "../models/nft.model";

export class NftService {

    /** nft 아이템 리스트 */
    static selectItemList = async (param : any)  =>  {
        
        try {
            
            const where : any = {};
            const limit = 10;
            const offset = 0 + (param.page - 1) * limit;
            
            if(param.status) {
                where.nft_flag = param.status;
            }

            if(param.collection_id) {
                where.collection_id = param.collection_id;
            }

            const { count, rows } = await NftModel.findAndCountAll({
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

    /** nft 아이템 단일 */
    static selectItemId = async function(token_id : number) {
            
        const result = await NftModel.findOne({
            where : { nft_token_id : token_id }
        });

        return result;
    }
}