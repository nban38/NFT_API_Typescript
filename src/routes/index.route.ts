import express, { Router } from 'express';
import { UsersController } from '../controllers/user.controller';
import { NftController } from '../controllers/nft.controller';
import { MypageController } from '../controllers/mypage.controller';


const router = Router();

// 회원 로그인/가입
router.post('/users/login', UsersController.login);

// NFT 아이템 리스트
router.post('/nft/getItemList', NftController.getItemList);

// NFT 아이템 상세
router.get('/nft/getItemDetail/:token_id', NftController.getItemDetail);

// Offer 리스트
router.get('/nft/getOfferList/:token_id', NftController.getOfferList);

// Deal history 리스트
router.get('/nft/getDealHistoryList/:token_id/:page', NftController.getDealHistoryList);

// Offer 신청
router.post('/nft/setItemOffer', NftController.setItemOffer);

// Offer 신청 취소
router.post('/nft/setOfferCancel', NftController.setOfferCancel);

router.post('/mypage/getMyItemList', MypageController.getMyItemList);

export default router;