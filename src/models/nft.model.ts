import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({    
    tableName: "ed_nft_item",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    freezeTableName: true
})


/*nft_token_id int(11) NULL토큰 ID
collection_id int(11) NULL컬렉션 ID
nft_round int(11) NULL1,2,3차..회차
nft_flag tinyint(2) NULL상태값 0:미보유, 1:보유, 2:판매중
wallet_id varchar(200) NULL소유주 지갑 주소
nft_title varchar(200) NULLnft 타이틀
nft_price int(11) NULLnft 가격
nft_sell_best int(11) NULLnft 가장 비싸게 팔린 가격
nft_img_src varchar(200) NULLnft 이미지 경로
nft_description varchar(200) NULLnft 설명
nft_json text NULL블록체인 제공 JSON 데이터
nft_create_date int(11) NULL생성일
nft_sell_date int(11) NULL판매 시작 기간
nft_duration_date int(11) NULL판매 종료 기간
*/
export class NftModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.BIGINT()
    })
    nft_no!: number;

    @Default(0)
    @Column({
        type : DataType.INTEGER,
        defaultValue : true,
        comment : 'NFT 토큰 ID'
    })
    nft_token_id! : number;

    @Default(0)
    @AllowNull(true)
    @Column({
        type : DataType.INTEGER,
        comment : '컬렉션 ID'
    })
    collection_id! : number;

    @Default(1)
    @AllowNull(true)
    @Column({
        type : DataType.INTEGER,
        comment : '1,2,3차..회차'
    })
    nft_round! : number;

    @Default(0)
    @AllowNull(true)
    @Column({
        type : DataType.TINYINT(),
        comment : '상태값 0:미보유, 1:보유, 2:판매중'
    })
    nft_flag! : number;

    @AllowNull(true)
    @Column({
        type : DataType.STRING(100),
        comment : '소유주 지갑 주소'
    })
    wallet_id! : string
}