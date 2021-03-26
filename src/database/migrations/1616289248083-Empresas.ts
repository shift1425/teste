import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Empresas1616289248083 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name:"empresas",
                    columns: [
                        {
                            name: "empresas_id",
                            type: "integer",
                            unsigned: true,
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name:"cnpj",
                            type:"varchar",
                        },
                        {
                            name:"matriz_filial",
                            type:"varchar"
                        },
                        {
                            name:"razao_social",
                            type:"varchar"
                        },
                        {
                            name:"nome_fantasia",
                            type:"varchar"
                        },
                        {
                            name:"situacao",
                            type:"number"
                        },
                        {
                            name:"data_situacao",
                            type:"date"
                        },
                        {
                            name:"motivo_situacao",
                            type:"varchar"
                        },
                        {
                            name:"nm_cidade_exterior",
                            type:"varchar"
                        },
                        {
                            name:"cod_pais",
                            type:"number"
                        },
                        {
                            name:"cod_nat_juridica",
                            type:"number"
                        },
                        {
                            name:"data_inicio_ativ",
                            type:"date"
                        },
                        {
                            name:"cnae_fiscal",
                            type:"number"
                        },
                        {
                            name:"descricao_cnae_fiscal",
                            type:"string"
                        },
                        {
                            name:"tipo_logradouro",
                            type:"varchar"
                        },
                        {
                            name:"logradouro",
                            type:"varchar"
                        },
                        {
                            name:"numero",
                            type:"varchar"
                        },
                        {
                            name:"complemento",
                            type:"varchar"
                        },
                        {
                            name:"bairro",
                            type:"varchar"
                        },
                        {
                            name:"cep",
                            type:"varchar"
                        },
                        {
                            name:"uf",
                            type:"varchar"
                        },
                        {
                            name:"cod_municipio",
                            type:"number"
                        },
                        {
                            name:"municipio",
                            type:"varchar"
                        },
                        {
                            name:"ddd_1",
                            type:"varchar"
                        },
                        {
                            name:"telefone_1",
                            type:"varchar"
                        },
                        {
                            name:"ddd_2",
                            type:"varchar"
                        },
                        {
                            name:"telefone_2",
                            type:"varchar"
                        },
                        {
                            name:"ddd_fax",
                            type:"varchar"
                        },
                        {
                            name:"num_fax",
                            type:"varchar"
                        },
                        {
                            name:"email",
                            type:"varchar"
                        },
                        {
                            name:"qualif_resp",
                            type:"varchar"
                        },
                        {
                            name:"capital_social",
                            type:"varchar"
                        },
                        {
                            name:"porte",
                            type:"varchar"
                        },
                        {
                            name:"opc_simples",
                            type:"varchar"
                        },
                        {
                            name:"data_opc_simples",
                            type:"date"
                        },
                        {
                            name:"data_exc_simples",
                            type:"date"
                        },
                        {
                            name:"opc_mei",
                            type:"varchar"
                        },
                        {
                            name:"sit_especial",
                            type:"varchar"
                        },
                        {
                            name:"data_sit_especial",
                            type:"date"
                        }
    
                    ]
                })
    
            )
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("empresas")
        }
    
    }
    