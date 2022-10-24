import { UserModel } from "../models/user.model";

export class UserService {

    /** 
     * 지갑 주소로 회원가입 유무 체크 
     * wallet_id : 지갑 주소
     * */
    static checkMemberWallet = async (wallet_id : string) =>  {
        
        const [user, created] = await UserModel.findOrCreate({
            where : { wallet_id : wallet_id },
            defaults : {
                wallet_site : 'metamask'
            }
        });
        
        return user;
    }
}