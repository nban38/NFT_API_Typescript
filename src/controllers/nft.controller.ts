import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { OfferService } from '../services/offer.service';
import { NftService } from '../services/nft.service';
import { DealService } from '../services/deal.service';


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
            status : Joi.string().allow(''),
            property : Joi.string().allow(''),
            keyword : Joi.string().allow(''),
            start_price : Joi.number().allow(''),
            end_price : Joi.number().allow(''),
            orderby : Joi.string().allow(''),
            page : Joi.number().required(),
            collection_id : Joi.number().allow(''),
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

    static getDealHistoryList = async (req : Request, res : Response) => {

        const param = req.params;
        const schema = Joi.object().keys({
            token_id : Joi.number().required(),
            page : Joi.number().required()
        }).unknown();
        
        try {

            await schema.validateAsync(param);

            const token_id : number = parseInt(req.params.token_id);
            const nft : any = await NftService.selectItemId(token_id);
            console.log('nft::'+nft);
            if(!nft?.nft_token_id) {
                return res.status(400).json({
                    resCode : '3',
                    resMessage : "NFT 빈정보",
                    resData : 'token_id',
                });
            }
            
            const dbResult : any = await DealService.selectDealHistoryList(param);
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
