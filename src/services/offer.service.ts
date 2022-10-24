import { OfferModel } from "../models/offer.model";

export class OfferService {

     /** offer 리스트 */
     static selectOfferList = async function(token_id : number) {
        
        try {
            
            const { count, rows } = await OfferModel.findAndCountAll({
                where : { nft_token_id : token_id }
            });

            const result = { "total" : count, "row" : rows };
            return result;

        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }
}