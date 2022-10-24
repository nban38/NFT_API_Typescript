import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({    
    tableName: "ed_nft_offer",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    freezeTableName: true
})

export class OfferModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.BIGINT()
    })
    of_no!: number;
    
    @Default(0)
    @Column({
        type : DataType.INTEGER,
        comment : 'NFT 토큰 ID'
    })
    nft_token_id! : number;

    @Default(1)
    @Column({
        type : DataType.TINYINT,
        comment : '1:미낙찰, 2:낙찰',
    })
    of_flag! : number;

    @AllowNull(true)
    @Column({
        type : DataType.STRING(100),
        comment : '소유주 지갑 주소'
    })
    wallet_id! : string

    @Default(0)
    @Column({
        type : DataType.INTEGER,
        comment : '입찰 가격',
    })
    of_price! : number;

    @Default(0)
    @Column({
        type : DataType.INTEGER,
        comment : '입찰 일자'
    })
    of_create_date! : number;
}