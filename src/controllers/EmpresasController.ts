import { Request, Response } from "express";
import { getConnection, getCustomRepository } from "typeorm";
import { EmpresasRepository } from "../repository/EmpresasRepository";
import { MotivosRepository } from "../repository/MotivosRepository";
import { AppError } from "../errors/AppError";
import axios from "axios";
import * as yup from "yup";
import ConsultaCnaeIbge from "../services/ConsultaCnaeIbge";
const dateFormat = require('dateformat');

class EmpresasController {
  async show(request: Request, response: Response) {
    const motivosRepository = getCustomRepository(MotivosRepository);

    const { cnpj } = request.params;
    const schema = yup.object().shape({
      cnpj: yup
        .string()
        .min(14, "CNPJ INVÁLIDO, VERIFIQUE O CNPJ INFORMADO E TENTE NOVAMENTE")
        .max(14, "CNPJ INVÁLIDO, VERIFIQUE O CNPJ INFORMADO E TENTE NOVAMENTE")
        .required("POR FAVOR INFORME O NUMERO DO CNPJ"),
    });

    try {
      await schema.validate(request.params, { abortEarly: false });
    } catch (err) {
      throw new AppError(err.message, 404);
    }


    const data_cnpj = await axios.get(`https://clicksistema.com.br/cnpj.json?cnpj=${cnpj}`).then(function (response) {
     return response.data;
    }).catch(function (error) {
      console.error(error);
    });

    
    
    // if (empresa.length === 0) {
    //   throw new AppError(
    //     "CNPJ não encontrado, verifique e tente novamente!",
    //     404
    //   );
    // }

    async function getMotivo(codMotivo) {
      const motivo = await motivosRepository.findOne({
        codigoMotivo: codMotivo,
      });

      if (!motivo) {
        return "Motivo não encontrado";
      } else {
        return motivo.descricaoMotivo;
      }
    }

    await Promise.all(
      data_cnpj.map(async (empresa) => {
        console.log(empresa.motivo_situacao);
        const situacao = await getMotivo(empresa.motivo_situacao);
        const cnae = await ConsultaCnaeIbge(empresa.cnae_fiscal.substring(0, 5));
        empresa.motivo_situacao = situacao;
        empresa.cnae_fiscal = cnae
      })
    );
    // return response.json(data_cnpj);
    return response.render("cnpj", { empresa: data_cnpj });
    // return response.json(empresa)
  }
  async create(request: Request, response: Response) {
    // const cnaes = request.body.cnae
    // const dados = {
    //   cnpj: request.body.cnpj,
    //   matriz_filial: request.body.matriz_filial,
    //   razao_social: request.body.razao_social,
    //   nome_fantasia: request.body.nome_fantasia,
    //   situacao: request.body.situacao,
    //   data_situacao: request.body.data_situacao,
    //   motivo_situacao: request.body.motivo_situacao,
    //   nm_cidade_exterior: request.body.nm_cidade_exterior,
    //   cod_pais: request.body.cod_pais,
    //   cod_nat_juridica: request.body.cod_nat_juridica,
    //   data_inicio_ativ: request.body.data_inicio_ativ,
    //   cnae_fiscal: request.body.cnae_fiscal,
    //   tipo_logradouro: request.body.tipo_logradouro,
    //   logradouro: request.body.logradouro,
    //   numero: request.body.numero,
    //   complemento: request.body.complemento,
    //   bairro: request.body.bairro,
    //   cep: request.body.cep,
    //   uf: request.body.uf,
    //   cod_municipio: request.body.cod_municipio,
    //   municipio: request.body.municipio,
    //   ddd_1: request.body.ddd_1,
    //   telefone_1: request.body.telefone_1,
    //   ddd_2: request.body.ddd_2,
    //   telefone_2: request.body.telefone_2,
    //   ddd_fax: request.body.ddd_fax,
    //   num_fax: request.body.num_fax,
    //   email: request.body.email,
    //   qualif_resp: request.body.qualif_resp,
    //   capital_social: request.body.capital_social,
    //   porte: request.body.porte,
    //   opc_simples: request.body.opc_simples,
    //   data_opc_simples: request.body.data_opc_simples,
    //   data_exc_simples: request.body.data_exc_simples,
    //   opc_mei: request.body.opc_mei,
    //   sit_especial: request.body.sit_especial,
    //   data_sit_especial: request.body.data_sit_especial,
    //   Cnaes: {
    //     cnpj: request.body.cnpj,
    //     cnaes.map( ()=>{

    //     })
    //   },
    // };
    const schema = yup.object().shape({
      cnpj: yup
        .string()
        .min(14, "CNPJ INVÁLIDO, VERIFIQUE O CNPJ INFORMADO E TENTE NOVAMENTE")
        .max(14, "CNPJ INVÁLIDO, VERIFIQUE O CNPJ INFORMADO E TENTE NOVAMENTE")
        .required("POR FAVOR INFORME O NUMERO DO CNPJ"),
      matriz_filial: yup.string().required("INFORME O SE É MATRIZ OU FILIAL"),
      razao_social: yup.string().required("RAZÃO SOCIAL OBRIGATÓRIA"),
      nome_fantasia: yup.string(),
      situacao: yup.string().required("CAMPO SITUAÇÃO OBRIGATÓRIO"),
      data_situacao: yup.date().required("DATA DA SITUAÇÃO OBRIGATÓRIA"),
      motivo_situacao: yup.number().required(),
      nm_cidade_exterior: yup.string(),
      cod_pais: yup.number().nullable(),
      cod_nat_juridica: yup
        .number()
        .required("INFORME O CODIGO DE NATUREZA JURIDICA"),
      data_inicio_ativ: yup
        .date()
        .required("DATA DA INICIO ATIVIDADE OBRIGATÓRIA"),
      cnae_fiscal: yup.number().required("INFORME O CNAE PRINCIPAL"),
      tipo_logradouro: yup.string().required("INFORME O TIPO DE LOGRADOURO"),
      logradouro: yup.string().required("INFORME O LOGRADOURO"),
      numero: yup.string().required("INFORME O NUMERO DO ENDEREÇO"),
      complemento: yup.string(),
      bairro: yup.string().required("INFORME O BAIRRO"),
      cep: yup.string().required("INFORME O CEP"),
      uf: yup.string().required("INFORME O CEP"),
      cod_municipio: yup.string().required("INFORME O CODIGO DO MUNICIPIO"),
      municipio: yup.string().required("INFORME O NOME DO MUNICIPIO"),
      ddd_1: yup.string(),
      telefone_1: yup.string(),
      ddd_2: yup.string(),
      telefone_2: yup.string(),
      ddd_fax: yup.string(),
      num_fax: yup.string(),
      email: yup
        .string()
        .email("INFORME UM E-MAIL VÁLIDO")
        .required("INFORME O EMAIL"),
      qualif_resp: yup.string(),
      capital_social: yup.string(),
      porte: yup.string().required("INFORME O PORTE DA EMPRESA"),
      opc_simples: yup.string(),
      data_opc_simples: yup.date().nullable(),
      data_exc_simples: yup.date().nullable(),
      opc_mei: yup.string(),
      sit_especial: yup.string(),
      data_sit_especial: yup.date().nullable(),
      cnaes: yup.array(
        yup.object().shape({
          cnpj: yup.string(),
          cnae_ordem: yup.number(),
          cnae: yup.number().required("CNAE OBRIGATÓRIO"),
          descricao_cnae: yup.string().required("DESCRIÇÃO OBRIGATÓRIA"),
        })
      ),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (err) {
      throw new AppError(err.message, 400);
    }
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const empresa = empresasRepository.create(request.body);
    await empresasRepository.save(empresa);
    if (!empresa) {
      throw new AppError("Erro ao tentar salvar os dados!", 400);
    }
    return response.status(201).render("success");
  }
}

export { EmpresasController };
