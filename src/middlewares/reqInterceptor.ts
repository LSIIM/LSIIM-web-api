import ApiError from "../utils/apiError";
import { NextFunction, Request, Response } from "express";

//Verifica strings em formato de datas
const formatoDeData = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
function ehUmaData(value: any): boolean {
    return value && typeof value === "string" && formatoDeData.test(value);
}
//Lida com as datas vindas em formato de string na query
function handleDatas(dados: any) {
    if (dados === null || dados === undefined || typeof dados !== "object") return dados;

    for (const key of Object.keys(dados)) {
        const valor = dados[key];
        if (ehUmaData(valor)) dados[key] = new Date(valor);
        else if (typeof valor === "object") handleDatas(valor);
    }
}

//Lida com os números vindos em formato de string na query
function handleNumbersOnlyQuery(dados: any) {
    if (dados === null || dados === undefined || typeof dados !== "object") return dados;

    for (const key of Object.keys(dados)) {
        const valor = dados[key];
        const converted = Number(valor);
        if (typeof valor === "string" && !isNaN(converted) && isFinite(converted)) dados[key] = converted;
        else if (typeof valor === "object") handleNumbersOnlyQuery(valor);
    }
}

//Lida com booleans vindo em formato de string na query
function handleBooleansOnlyQuery(dados: any) {
    if (dados === null || dados === undefined || typeof dados !== "object") return dados;

    for (const key of Object.keys(dados)) {
        const valor = dados[key];
        if (valor === "true") dados[key] = Boolean(true);
        else if (valor === "false") dados[key] = Boolean(false);
        else if (typeof valor === "object") handleBooleansOnlyQuery(valor);
    }
}

export const reqInterceptor = (req: Request, _: Response, next: NextFunction) => {
    try {
        //TODO: Por algum motivo handleNumbers converte em número as datas quando convertidas (Por isso handleNumbers antes de handleDatas)
        //Tentar dar um jeito no handleNumbers para que isto não ocorra, enquanto isso manter handleNumbers antes de handleDatas
        handleDatas(req.body);

        handleBooleansOnlyQuery(req.query);
        handleNumbersOnlyQuery(req.query);
        handleDatas(req.query);

        return next();
    } catch (err: any) {
        console.error(err);
        return next(new ApiError(500, err?.message ?? "Houve um erro desconhecido ao tratar a query."));
    }
};