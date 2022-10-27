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

    /** 
      * offer 신청 
      * @param params
      **/
    static insertItemOffer = async (params : any) => {
        
        try {

            const result = await OfferModel.create({
                nft_token_id : params.token_id,
                of_flag : 1,
                wallet_id : params.wallet_id,
                of_price : params.offer_price,
                of_create_date : Math.floor(new Date().getTime() / 1000)
            });
            return result;

        } catch ( error ) {

            return error;
        }
    }

    /** 
      * offer 신청 단일 정보 
      * @param params
      **/
    static selectOfferNo = async ( params : any ) => {
        
        try {

            const result = await OfferModel.findOne({
                raw : true, // 결과 object 만 반환
                where : {
                    of_no : params.of_no,
                    wallet_id : params.wallet_id
                }
            });
            return result;

        } catch ( error ) {
            
            return error;
        }
    }

    /** 
      * offer 신청 삭제
      * @param params
      **/
    static deleteOfferNo = async ( params : any ) => {
        
        try {
            
            const result = await OfferModel.destroy({
                where: {
                    of_no : params.of_no,
                    wallet_id : params.wallet_id
                }
            });

        } catch ( error ) {

            return error;

        }
    }
}