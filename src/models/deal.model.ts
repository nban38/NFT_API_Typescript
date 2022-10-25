import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({    
    tableName: "ed_nft_deal_history",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    freezeTableName: true
})

export class DealModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.BIGINT()
    })
    deal_no!: number;

    @Column({
        type : DataType.INTEGER()
    })
    collection_id!: number;

    @Default(0)
    @Column({
        type : DataType.INTEGER,
        comment : 'NFT 토큰 ID'
    })
    nft_token_id! : number;

    @Column({
        type : DataType.STRING(200),
        comment : '트랜잭션 ID'
    })
    deal_transaction! : string;

    @Column({
        type : DataType.TINYINT,
        comment : '타입 1:sale, 2:listing, 3:transfer, 4:cancel'    
    })
    deal_type! : string;

    @Default(0)
    @Column({
        type : DataType.INTEGER,
        comment : '전송 코인수'
    })
    deal_price! : number;

    @Column({
        type : DataType.STRING(200),
        comment : '보낸 지갑주소'
    })
    deal_from_wallet! : string;

    @Column({
        type : DataType.STRING(200),
        comment : '보낸 지갑주소'
    })
    deal_to_wallet! : string;
}
