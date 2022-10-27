import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { NftService }   from '../services/nft.service';

export class MypageController {

    /**
     * async getMyItemList
     */
    static getMyItemList = async (req : Request, res : Response) => {
        
        return res.status(200).json({
            resCode : '',
            resMessage : "OK",
        });

    }
}