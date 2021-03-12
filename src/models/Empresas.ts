import {Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinTable, JoinColumn} from "typeorm"
import { Motivo } from './Motivo'


@Entity("empresas")

class Empresas {
    @PrimaryColumn()
    cnpj: string;

    @Column()
    matriz_filial: string;

    @Column()
    razao_social: string;

    @Column()
    nome_fantasia: string;

    @Column()
    situacao:number;

    @CreateDateColumn()
    data_situacao: Date;

    @Column()
    motivo_situacao: string;

    @Column()
    nm_cidade_exterior: string;

    @Column()
    cod_pais: number;

    @Column()
    cod_nat_juridica: number;

    @CreateDateColumn()
    data_inicio_ativ: Date;

    @Column()
    cnae_fiscal: number;

    @Column()
    tipo_logradouro: string;

    @Column()
    logradouro: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cep: string;

    @Column()
    uf: string;

    @Column()
    cod_municipio: number;

    @Column()
    municipio: string;

    @Column()
    ddd_1: string;

    @Column()
    telefone_1: string;

    @Column()
    ddd_2: string;

    @Column()
    telefone_2: string;

    @Column()
    ddd_fax: string;

    @Column()
    num_fax: string;

    @Column()
    email: string;

    @Column()
    qualif_resp: string;

    @Column()
    capital_social: string;

    @Column()
    porte: string;

    @Column()
    opc_simples: string;

    @CreateDateColumn()
    data_opc_simples: Date;

    @CreateDateColumn()
    data_exc_simples: Date;

    @Column()
    opc_mei: string;

    @Column()
    sit_especial: string;

    @CreateDateColumn()
    data_sit_especial: Date;


}

export { Empresas }