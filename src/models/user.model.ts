import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, Default, AllowNull } from 'sequelize-typescript';
import { sequelize } from './index.model';

@Table({    
    tableName: "tb_member",
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})

export class UserModel extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.INTEGER
    })
    id! : number;

    @Column({
        type : DataType.STRING(100),
        comment : '지갑 제공 사이트'
    })
    wallet_site! : string;

    @Column({
        type : DataType.STRING(200),
        comment : '지갑 주소'
    })
    wallet_id! : string;
}
