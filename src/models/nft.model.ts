import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({    
    tableName: "ed_nft_item",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    freezeTableName: true
})


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