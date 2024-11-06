const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
    // Insira os dados manualmente
    const dataPatient = [
        {
            name: "Antonia",
            birthDate: new Date("2021-04-29"), // Converte a string para Date
        },
        {
            name: "Davi",
            birthDate: new Date("2021-05-11"), // Converte a string para Date
        },
        {
            name: "Arthur",
            birthDate: new Date("2020-07-28"),
        },
        {
            name: "Elisa",
            birthDate: new Date("2021-03-21"),
        },
        {
            name: "Lara",
            birthDate: new Date("2020-07-01"),
        },
        {
            name: "Pietra",
            birthDate: new Date("2020-11-27"),
        },
        {
            name: "Anthony",
            birthDate: new Date("2021-05-26"), // Converte a string para Date
        },
        {
            name: "Ana Beatriz",
            birthDate: new Date("2021-02-22"),
        },
        {
            name: "Giusepe",
            birthDate: new Date("2020-11-16"),
        },
        {
            name: "Louise",
            birthDate: new Date("2020-12-22"),
        },
        {
            name: "Yohan",
            birthDate: new Date("2021-04-16"),
        },
        {
            name: "Bernardo",
            birthDate: new Date("2021-10-14"),
        },
        {
            name: "Luna",
            birthDate: new Date("2021-05-04"),
        },
        {
            name: "Rebeca",
            birthDate: new Date("2021-03-12"),
        },
        {
            name: "Bento",
            birthDate: new Date("2021-06-21"),
        },
        {
            name: "Emanuel",
            birthDate: new Date("2021-03-13"),
        },
        {
            name: "Jorge Luis",
            birthDate: new Date("2021-09-26"),
        },
        {
            name: "Maria Cecilia",
            birthDate: new Date("2022-12-28"),
        },
        {
            name: "Maria Isis",
            birthDate: new Date("2022-12-28"),
        },
        {
            name: "Otavio",
            birthDate: new Date("2019-04-16"),
        },
        {
            name: "Theo",
            birthDate: new Date("2021-06-24"),
        },
        {
            name: "Felipe",
            birthDate: new Date("2019-09-22"),
        },
        {
            name: "Murialdo",
            birthDate: new Date("2022-12-28"),
        },
        {
            name: "Vinicius",
            birthDate: new Date("2021-12-01"),
        },
        {
            name: "Alana",
            birthDate: new Date("2022-03-27"),
        },
        {
            name: "Joao Batista",
            birthDate: new Date("2022-12-01"),
        },
        {
            name: "Arthur",
            birthDate: new Date("2021-12-23"),
        },
        {
            name: "Gael",
            birthDate: new Date("2021-07-22"),
        },
        {
            name: "Levi",
            birthDate: new Date("2022-05-23"),
        },
        { name: "Iara", birthDate: new Date("1900-01-01") },
        { name: "Benjamin", birthDate: new Date("2022-11-08") },
        { name: "Miguel", birthDate: new Date("2021-12-10") },
        { name: "Victor", birthDate: new Date("2022-07-03") },
        { name: "Gabriel", birthDate: new Date("2022-10-10") },
        { name: "Erick", birthDate: new Date("2022-07-31") },
        { name: "Ana Sther", birthDate: new Date("2022-04-21") },
        { name: "Davi", birthDate: new Date("2022-06-19") },
    ];

    const dataProject = [
        {
            projectName: "camera fixa",
            description: "aaaa",
            patientSpecialFetauresTemplate: {
                feature3: "Valor 3",
                feature4: "Valor 4",
            },
        },
        {
            projectName: "vestivel",
            description: "bbbb",
            patientSpecialFetauresTemplate: {
                feature3: "Valor 3",
                feature4: "Valor 4",
            },
        },
    ];

    const dataCamInfo = [
        {
            model: "HardLine Cutie 6809",
            isInfraRed: true,
            framerate: 25.74,
        },
        {
            model: "(adicionar o modelo da pequena aqui)",
            isInfraRed: true,
        },
        {
            model: "(adicionar o modelo da que usam pra auxiliar a...",
            isInfraRed: false,
        },
        {
            model: "camera muito foda JKV",
            isInfraRed: true,
            framerate: 765781000000.0,
        },
    ];

    const dataProjectVideoType = [
        {
            projectId: 1,
            isMain: true,
            typeName: "Camera principal",
        },
        {
            projectId: 1,
            isMain: false,
            typeName: "Auxiliar",
        },
        {
            projectId: 2,
            isMain: true,
            typeName: "Olho Direito",
        },
        {
            projectId: 2,
            isMain: true,
            typeName: "Olho Esquerdo",
        },
        {
            projectId: 2,
            isMain: false,
            typeName: "Auxiliar",
        },
    ];

    const dataMovesInfo = [
        {
            description: "HorizontalSlow_Cammoving",
            projectId: 1,
            defaultCamId: 1,
        },
        {
            description: "HorizontalAbrupt_Cammoving",
            projectId: 1,
            defaultCamId: 1,
        },
        {
            description: "VerticalSlow_Cammoving",
            projectId: 1,
            defaultCamId: 2,
        },
        {
            description: "HorizontalHead_Camfixed",
            projectId: 1,
            defaultCamId: 2,
        },
    ];

    const dataRecordings = [
        { ignore: false, patientId: 8, recordingDate: new Date("2021-11-30"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 8, recordingDate: new Date("2021-11-30"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 8, recordingDate: new Date("2021-11-30"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 9, recordingDate: new Date("2021-11-30"), moveId: 4, projectId: 1 },
        {
            ignore: true,
            observation: "Video corrompido",
            patientId: 9,
            recordingDate: new Date("2021-11-30"),
            moveId: 1,

            projectId: 1,
        },
        { ignore: false, patientId: 9, recordingDate: new Date("2021-11-30"), moveId: 2, projectId: 1 },
        { ignore: true, patientId: 10, recordingDate: new Date("2021-11-30"), projectId: 1 },
        { ignore: false, patientId: 10, recordingDate: new Date("2021-11-30"), projectId: 1 },
        { ignore: false, patientId: 10, recordingDate: new Date("2021-11-30"), projectId: 1 },
        { ignore: true, patientId: 10, recordingDate: new Date("2021-11-30"), projectId: 1 },
        {
            ignore: false,
            observation: "Infravermelho desligado",
            patientId: 11,
            recordingDate: new Date("2021-11-30"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Infravermelho desligado",
            patientId: 11,
            recordingDate: new Date("2021-11-30"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Infravermelho desligado",
            patientId: 11,
            recordingDate: new Date("2021-11-30"),

            projectId: 1,
        },
        { ignore: false, patientId: 1, recordingDate: new Date("2021-12-07"), projectId: 1 },
        { ignore: false, patientId: 1, recordingDate: new Date("2021-12-07"), projectId: 1 },
        { ignore: false, patientId: 1, recordingDate: new Date("2021-12-07"), projectId: 1 },
        {
            ignore: true,
            observation: "Não funcionou, ficou prestando atenção na logo do computador avell, desconsiderar.",
            patientId: 2,
            recordingDate: new Date("2021-12-07"),

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Não funcionou, ficou prestando atenção na logo do computador avell, desconsiderar.",
            patientId: 2,
            recordingDate: new Date("2021-12-07"),

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Não funcionou, ficou prestando atenção na logo do computador avell, desconsiderar.",
            patientId: 2,
            recordingDate: new Date("2021-12-07"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Sem Infravermelho",
            patientId: 3,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Sem Infravermelho",
            patientId: 3,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Sem Infravermelho",
            patientId: 3,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: true,
            observation: "primeiro teste, bebe não deixou movimentar para o lado esquerdo dela.",
            patientId: 4,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        { ignore: false, patientId: 4, recordingDate: new Date("2021-12-09"), projectId: 1 },
        { ignore: false, patientId: 4, recordingDate: new Date("2021-12-09"), projectId: 1 },
        { ignore: false, patientId: 4, recordingDate: new Date("2021-12-09"), projectId: 1 },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 5,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 5,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 5,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 6,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 6,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "não colaborou nos movimentos",
            patientId: 6,
            recordingDate: new Date("2021-12-09"),

            projectId: 1,
        },
        { ignore: true, patientId: 7, recordingDate: new Date("2021-12-14"), projectId: 1 },
        { ignore: false, patientId: 12, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 12, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 12, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 12, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 14, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 14, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 14, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 14, recordingDate: new Date("2022-02-22"), projectId: 1 },
        { ignore: false, patientId: 15, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 15, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 15, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 15, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 16, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 16, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 16, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 16, recordingDate: new Date("2022-03-22"), projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 20, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 20, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 20, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 20, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: true, patientId: 21, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 21, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 21, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 21, recordingDate: new Date("2022-04-05"), projectId: 1 },
        {
            ignore: true,
            observation: "O video não ta ali",
            patientId: 22,
            recordingDate: new Date("2022-05-31"),

            projectId: 1,
        },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-05-31"), projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-05-31"), projectId: 1 },
        {
            ignore: false,
            observation: "Ultimo movimento de olhar falso positiv",
            patientId: 24,
            recordingDate: new Date("2022-05-31"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Ultimo movimento de olhar falso positiv",
            patientId: 24,
            recordingDate: new Date("2022-05-31"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Ultimo movimento de olhar falso positiv",
            patientId: 24,
            recordingDate: new Date("2022-05-31"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Ultimo movimento de olhar falso positiv",
            patientId: 24,
            recordingDate: new Date("2022-05-31"),

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Sem resposta",
            patientId: 25,
            recordingDate: new Date("2022-06-14"),

            projectId: 1,
        },
        { ignore: false, patientId: 26, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 26, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 26, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 26, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-06-14"), projectId: 1 },
        { ignore: true, patientId: 10, recordingDate: new Date("2021-11-30"), projectId: 1 },
        { ignore: false, patientId: 21, recordingDate: new Date("2022-04-05"), projectId: 1 },
        { ignore: false, patientId: 28, recordingDate: new Date("2022-07-05"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 28, recordingDate: new Date("2022-07-05"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 28, recordingDate: new Date("2022-07-05"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 28, recordingDate: new Date("2022-07-05"), moveId: 4, projectId: 1 },
        {
            ignore: true,
            observation: "Nao fixa",
            patientId: 29,
            recordingDate: new Date("2022-07-05"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Muito agitada",
            patientId: 14,
            recordingDate: new Date("2022-07-05"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Muito agitada",
            patientId: 14,
            recordingDate: new Date("2022-07-05"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Muito agitada",
            patientId: 14,
            recordingDate: new Date("2022-07-05"),
            moveId: 3,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Muito agitada",
            patientId: 14,
            recordingDate: new Date("2022-07-05"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem sucesso",
            patientId: 21,
            recordingDate: new Date("2022-07-05"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem sucesso",
            patientId: 21,
            recordingDate: new Date("2022-07-05"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "falha, crianca nao executou",
            patientId: 9,
            recordingDate: new Date("2022-07-15"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Falha, ambiente ruidoso",
            patientId: 30,
            recordingDate: new Date("2022-07-26"),
            moveId: 1,

            projectId: 1,
        },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-07-26"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-07-26"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-07-26"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-07-26"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-07-26"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-07-26"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-07-26"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-07-26"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-07-26"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-07-26"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-07-26"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-07-26"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-07-26"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-07-26"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-07-26"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 17, recordingDate: new Date("2022-07-26"), moveId: 4, projectId: 1 },
        {
            ignore: false,
            observation: "movimento 1 ok",
            patientId: 31,
            recordingDate: new Date("2022-12-08"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "movimento 2 nao",
            patientId: 31,
            recordingDate: new Date("2022-12-08"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "movimento 3 e 4 - mesmo video. COnfirmou movimento 3.",
            patientId: 31,
            recordingDate: new Date("2022-12-08"),
            moveId: 3,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "movimento 3 e 4 - mesmo video. COnfirmou movimento 3.",
            patientId: 31,
            recordingDate: new Date("2022-12-08"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta",
            patientId: 28,
            recordingDate: new Date("2022-12-08"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta",
            patientId: 28,
            recordingDate: new Date("2022-12-08"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta",
            patientId: 28,
            recordingDate: new Date("2022-12-08"),
            moveId: 3,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta",
            patientId: 28,
            recordingDate: new Date("2022-12-08"),
            moveId: 4,

            projectId: 1,
        },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-09-01"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-09-01"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-09-01"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 27, recordingDate: new Date("2022-09-01"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 32, recordingDate: new Date("2022-09-01"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 32, recordingDate: new Date("2022-09-01"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 32, recordingDate: new Date("2022-09-01"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 32, recordingDate: new Date("2022-09-01"), moveId: 4, projectId: 1 },
        {
            ignore: true,
            observation: "Nao fixou",
            patientId: 33,
            recordingDate: new Date("2022-09-01"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "Nao fixou",
            patientId: 33,
            recordingDate: new Date("2022-09-01"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta, nao executado os seguintes",
            patientId: 34,
            recordingDate: new Date("2022-12-09"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "sem resposta, nao executado os seguintes",
            patientId: 34,
            recordingDate: new Date("2022-12-09"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Muito disperso",
            patientId: 15,
            recordingDate: new Date("2022-09-16"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Muito disperso",
            patientId: 15,
            recordingDate: new Date("2022-09-16"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "3 falhou, 4 nao feito",
            patientId: 15,
            recordingDate: new Date("2022-09-16"),
            moveId: 3,

            projectId: 1,
        },
        { ignore: false, patientId: 3, recordingDate: new Date("2022-09-30"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 3, recordingDate: new Date("2022-09-30"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 3, recordingDate: new Date("2022-09-30"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 3, recordingDate: new Date("2022-09-30"), moveId: 4, projectId: 1 },
        {
            ignore: true,
            observation: "Falhou",
            patientId: 4,
            recordingDate: new Date("2022-09-30"),
            moveId: 1,

            projectId: 1,
        },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-09-30"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-09-30"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-09-30"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 13, recordingDate: new Date("2022-09-30"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 35, recordingDate: new Date("2022-10-14"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 35, recordingDate: new Date("2022-10-14"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 35, recordingDate: new Date("2022-10-14"), moveId: 3, projectId: 1 },
        {
            ignore: false,
            observation: "ultimo movimento durou poucoo tempo, invalido",
            patientId: 35,
            recordingDate: new Date("2022-10-14"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Lado direito nao fixando ?",
            patientId: 36,
            recordingDate: new Date("2022-10-14"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Lado direito nao fixando ?",
            patientId: 36,
            recordingDate: new Date("2022-10-14"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Lado direito nao fixando ?",
            patientId: 36,
            recordingDate: new Date("2022-10-14"),
            moveId: 3,

            projectId: 1,
        },
        {
            ignore: false,
            observation: "Lado direito nao fixando ?",
            patientId: 36,
            recordingDate: new Date("2022-10-14"),
            moveId: 4,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "nao fixou em nenhum movimento, 4 nao realizado",
            patientId: 37,
            recordingDate: new Date("2022-11-04"),
            moveId: 1,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "nao fixou em nenhum movimento, 4 nao realizado",
            patientId: 37,
            recordingDate: new Date("2022-11-04"),
            moveId: 2,

            projectId: 1,
        },
        {
            ignore: true,
            observation: "nao fixou em nenhum movimento, 4 nao realizado",
            patientId: 37,
            recordingDate: new Date("2022-11-04"),
            moveId: 3,

            projectId: 1,
        },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-11-04"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-11-04"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-11-04"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 18, recordingDate: new Date("2022-11-04"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-11-04"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-11-04"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-11-04"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 19, recordingDate: new Date("2022-11-04"), moveId: 4, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-11-04"), moveId: 1, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-11-04"), moveId: 2, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-11-04"), moveId: 3, projectId: 1 },
        { ignore: false, patientId: 23, recordingDate: new Date("2022-11-04"), moveId: 4, projectId: 1 },
    ];

    const dataResultType = [
        {
            name: "Rastreamento visiual vertical",
            description: "RSV",
        },
        {
            name: "Rastreamento visiual horizontal",
            description: "RSH",
        },
        {
            name: "Campo Visual Esquerda",
            description: "CVE",
        },
        {
            name: "Campo Visual Direita",
            description: "CVD",
        },
        {
            name: "Fixação Visual",
            description: "FV",
        },
        {
            name: "Reflexo Vestibulo-ocular Esquerda",
            description: "RVE",
        },
        {
            name: "Reflexo Vestibulo-ocular Direita",
            description: "RVD",
        },
    ];
    const dataResultTypeOptions = [
        // Rastreamento visual vertical (RSV) - resultTypeId: 1
        {
            resultTypeId: 1,
            name: "Continuo",
            description: "Acompanhamento visual contínuo por toda amplitude",
        },
        {
            resultTypeId: 1,
            name: "Descontinuo",
            description: "Acompanhamento visual descontinuo, não cobre toda amplitude",
        },
        {
            resultTypeId: 1,
            name: "Breve",
            description: "Acompanhamento visual breve, por poucos graus de amplitude",
        },
        {
            resultTypeId: 1,
            name: "Não realiza",
            description: "Não realiza o acompanhamento visual",
        },

        // Rastreamento visual horizontal (RSH) - resultTypeId: 2
        {
            resultTypeId: 2,
            name: "Continuo",
            description: "Acompanhamento visual contínuo por toda amplitude",
        },
        {
            resultTypeId: 2,
            name: "Descontinuo",
            description: "Acompanhamento visual descontinuo, não cobre toda amplitude",
        },
        {
            resultTypeId: 2,
            name: "Breve",
            description: "Acompanhamento visual breve, por poucos graus de amplitude",
        },
        {
            resultTypeId: 2,
            name: "Não realiza",
            description: "Não realiza o acompanhamento visual",
        },

        // Campo visual esquerda (CVE) - resultTypeId: 3
        {
            resultTypeId: 3,
            name: "Realiza",
            description: "Encontra o estímulo na periferia (esquerda)",
        },
        {
            resultTypeId: 3,
            name: "Não realiza",
            description: "Não encontra o estímulo na periferia (esquerda)",
        },

        // Campo visual direita (CVD) - resultTypeId: 4
        {
            resultTypeId: 4,
            name: "Realiza",
            description: "Encontra o estímulo na periferia (direita)",
        },
        {
            resultTypeId: 4,
            name: "Não realiza",
            description: "Não encontra o estímulo na periferia (direita)",
        },

        // Fixação visual (FV) - resultTypeId: 5
        {
            resultTypeId: 5,
            name: "Estável",
            description: "Fixa o olhar no estímulo por no mínimo 3 segundos",
        },
        {
            resultTypeId: 5,
            name: "Instável",
            description: "Fixação visual instável",
        },

        // Reflexo vestíbulo-ocular esquerda (RVE) - resultTypeId: 6
        {
            resultTypeId: 6,
            name: "Realiza",
            description: "Movimenta os olhos para o lado contrário da cabeça (esquerda)",
        },
        {
            resultTypeId: 6,
            name: "Não realiza",
            description: "Não realiza o movimento dos olhos (esquerda)",
        },

        // Reflexo vestíbulo-ocular direita (RVD) - resultTypeId: 7
        {
            resultTypeId: 7,
            name: "Realiza",
            description: "Movimenta os olhos para o lado contrário da cabeça (direita)",
        },
        {
            resultTypeId: 7,
            name: "Não realiza",
            description: "Não realiza o movimento dos olhos (direita)",
        },
    ];

    const dataEventTypes = [
        {
            name: "Encontrou estímulo periférico",
            description: "...",
            isTemporal: false,
        },
        {
            name: "Fixação",
            description: "Olho fixado em objeto imóvel",
            isTemporal: true,
        },
        {
            name: "Rastreamento",
            description: "Olho fixado em objeto em movimento",
            isTemporal: true,
        },
    ];
    const dataRecordingsVideo = [
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 1,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 1,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 2,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 2,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 3,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 3,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 4,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 4,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 5,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 5,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 6,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 6,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 7,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 7,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 8,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 8,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 9,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 9,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 10,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 10,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 11,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 11,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 12,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 12,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 13,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 13,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 14,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 14,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 15,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 15,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 16,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 16,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 17,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 17,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 18,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 18,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 19,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 19,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 20,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 20,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 21,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 21,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 22,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 22,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 23,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 23,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 24,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 24,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 25,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 25,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 26,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 26,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 27,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 27,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 28,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 28,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 29,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 29,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 30,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 30,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 31,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 31,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 32,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 32,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 33,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 33,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 34,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 34,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 35,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 35,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 36,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 36,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 37,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 37,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 38,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 38,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 39,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 39,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 40,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 40,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 41,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 41,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 42,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 42,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 43,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 43,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 44,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 44,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 45,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 45,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 46,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 46,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 47,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 47,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 48,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 48,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 49,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 49,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 50,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 50,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 51,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 51,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 52,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 52,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 53,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 53,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 54,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 54,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 55,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 55,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 56,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 56,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 57,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 57,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 58,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 58,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 59,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 59,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 60,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 60,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 61,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 61,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 62,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 62,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 63,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 63,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 64,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 64,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 65,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 65,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 66,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 66,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 67,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 67,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 68,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 68,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 69,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 69,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 70,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 70,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 71,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 71,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 72,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 72,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 73,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 73,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 74,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 74,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 75,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 75,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 76,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 76,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 77,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 77,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 78,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 78,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 79,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 79,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 80,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 80,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 81,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 81,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 82,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 82,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 83,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 83,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 84,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 84,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 85,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 85,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 86,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 86,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 87,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 87,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 88,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 88,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 89,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 89,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 90,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 90,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 91,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 91,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 92,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 92,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 93,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 93,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 94,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 94,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 95,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 95,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 96,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 96,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 97,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 97,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 98,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 98,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 99,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 99,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 100,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 100,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 101,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 101,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 102,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 102,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 103,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 103,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 104,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 104,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 105,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 105,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 106,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 106,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 107,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 107,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 108,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 108,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 109,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 109,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 110,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 110,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 111,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 111,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 112,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 112,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 113,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 113,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 114,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 114,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 115,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 115,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 116,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 116,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 117,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 117,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 118,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 118,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 119,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 119,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 120,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 120,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 121,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 121,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 122,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 122,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 123,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 123,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 124,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 124,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 125,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 125,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 126,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 126,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 127,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 127,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 128,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 128,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 129,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 129,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 130,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 130,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 131,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 131,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 132,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 132,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 133,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 133,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 134,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 134,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 135,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 135,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 136,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 136,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 137,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 137,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 138,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 138,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 139,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 139,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 140,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 140,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 141,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 141,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 142,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 142,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 143,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 143,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 144,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 144,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 145,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 145,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 146,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 146,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 147,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 147,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 148,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 148,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 149,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 149,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 150,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 150,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 151,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 151,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 152,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 152,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 153,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 153,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 154,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 154,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 155,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 155,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 156,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 156,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 157,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 157,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 158,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 158,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 159,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 159,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 160,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 160,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 161,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 161,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 162,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 162,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 163,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 163,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 164,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 164,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 165,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 165,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 166,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 166,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 167,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 167,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 168,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 168,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 169,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 169,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 170,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 170,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 171,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 171,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 172,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 172,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 173,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 173,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 174,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 174,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 175,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 175,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 176,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 176,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 177,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 177,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 178,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 178,
        },
        {
            projectVideoTypeId: 1,
            camIdUsed: 1,
            recordingId: 179,
        },
        {
            projectVideoTypeId: 2,
            camIdUsed: 2,
            recordingId: 179,
        },
    ];

    try {
        await prisma.$transaction([
            // Manipulação específica de `babyInfo` para tratar o campo `isPremature`
            prisma.patient.createMany({
                data: dataPatient,
            }),
            prisma.project.createMany({
                data: dataProject,
            }),
            prisma.projectVideoType.createMany({
                data: dataProjectVideoType,
            }),
            prisma.camInfo.createMany({
                data: dataCamInfo,
            }),
            prisma.moveInfo.createMany({
                data: dataMovesInfo,
            }),
            prisma.resultType.createMany({
                data: dataResultType,
            }),
            prisma.resultTypeOption.createMany({
                data: dataResultTypeOptions,
            }),
            prisma.eventType.createMany({
                data: dataEventTypes,
            }),
            prisma.recording.createMany({
                data: dataRecordings,
            }),
            prisma.recordingVideo.createMany({
                data: dataRecordingsVideo,
            }),
        ]);
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
