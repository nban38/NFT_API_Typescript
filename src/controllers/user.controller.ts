import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';


export class UsersController {

    static login = async (req:Request, res:Response, next:NextFunction) =>  {
        
        const param = req.body;
        const schema = Joi.object().keys({
            wallet_id : Joi.string().alphanum().required().messages({
                'string.base' : '지갑 주소가 정확하지 않습니다.',
                'string.empty' : '지갑 주소가 빈값입니다.',
            })
        }).unknown();

        try {

            await schema.validateAsync(param);

            const userInfo = await UserService.checkMemberWallet(req.body.wallet_id);

            return res.status(200).json({
                resCode : '',
                resMessage : 'OK',
                resData : userInfo
            });

        } catch ( vali_err : any ) {

            //console.log(vali_err);
            return res.status(400).json({ 
                resCode : 1, 
                resMessage : vali_err.message,
                resData : vali_err.details[0].path[0]
            });

        }
    }
}
