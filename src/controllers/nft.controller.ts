import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { OfferService } from '../services/offer.service';
import { NftService } from '../services/nft.service';


export class NftController {

    /**
     * NFT 아이템 리스트
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    static getItemList = async (req:Request, res:Response, next:NextFunction) =>  {
        
        const param = req.body;
        const schema = Joi.object().keys({
            status : Joi.string(),
            property : Joi.string(),
            keyword : Joi.string(),
            start_price : Joi.number(),
            end_price : Joi.number(),
            orderby : Joi.string(),
            page : Joi.number(),
            collection_id : Joi.number(),
        }).unknown();

        try {

            await schema.validateAsync(param);

            param.page = req.body.page ?? 1;
            const dbResult : any = await NftService.selectItemList(param);
            
            console.log(dbResult.total);

            return res.status(200).json({
                resCode : '',
                resMessage : 'OK',
                count : dbResult.total,
                resData : dbResult.row
            });

        } catch (vali_err : any ) {

            console.log(vali_err);
            return res.status(400).json({ 
                resCode : 1, 
                resMessage : vali_err.message,
                resData : vali_err.details[0].path[0]
            });

        }
    };

    /**
     * NFT 아이템 상세
     * @param req 
     * @param res 
     * @param next 
     */
    static getItemDetail = async (req: Request, res: Response, next : NextFunction) => {
        const param = req.params;
        const schema = Joi.object().keys({
            token_id : Joi.number().required(),
        }).unknown();

        try {

            await schema.validateAsync(param);

            const token_id : number = parseInt(param.token_id);
            console.log('token_id:'+token_id);

            const nft = await NftService.selectItemId(token_id);
            
            if(nft?.nft_token_id) {

                return res.status(200).json({
                    resCode : '',
                    resMessage : "OK",
                    resData : nft,
                });

            } else {

                return res.status(400).json({code : 2, message : 'DB 빈값'});
            }

        } catch (vali_err : any ) {

            console.log(vali_err);
            return res.status(400).json({ 
                resCode : 1, 
                resMessage : vali_err.message,
                resData : vali_err.details[0].path[0]
            });
        }
    };

    /**
     * Offer 리스트
     * @param req 
     * @param res 
     * @param next 
     */
    static getOfferList = async (req : Request, res : Response) => {
        
        const param = req.params;
        const schema = Joi.object().keys({
            token_id : Joi.number().required(),
        }).unknown();
        
        try {

            await schema.validateAsync(param);

            const token_id : number = parseInt(param.token_id);
            console.log('token_id:'+token_id);

            const dbResult : any = await OfferService.selectOfferList(token_id);
            
            return res.status(200).json({
                resCode : '',
                resMessage : "OK",
                count : dbResult.total,
                resData : dbResult.row,
            });

        } catch (vali_err : any ) {

            console.log(vali_err);
            return res.status(400).json({ 
                resCode : 1, 
                resMessage : vali_err.message,
                resData : vali_err.details[0].path[0]
            });
        }

    }

}
