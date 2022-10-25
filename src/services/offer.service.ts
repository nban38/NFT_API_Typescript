import { OfferModel } from "../models/offer.model";


export class OfferService {

     /** 
      * offer 리스트 
      * @param token_id : Int
      **/
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

    static insertItemOffer = async (params : any) => {
        
        try {

            const result = await OfferModel.create({
                nft_token_id : params.token_id,
                of_flag : 1,
                wallet_id : params.wallet_id,
                of_price : params.offer_price,
            });
            return result;

        } catch ( error ) {

            return error;
        }
    }

    static selectOfferNo = async ( param : any ) => {
        
    }
}