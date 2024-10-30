const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
    // Insira os dados manualmente
    const dataPatient = [
        {
            name: "Antonia",
            birthDate: new Date("2021-04-29"), // Converte a string para Date
            isPremature: 1,
            gestationalAge: 38,
            atipicidades: "olhar descontinuo acompanhamento horizontal",
        },
        {
            name: "Davi",
            birthDate: new Date("2021-05-11"), // Converte a string para Date
            isPremature: 1,
            gestationalAge: 38,
            atipicidades:
                "olhar breve no horizontal, estrabismo convergente, tempo de fixação instável e descontinuidade do olhar no RVO",
        },
        {
            name: "Arthur",
            birthDate: new Date("2020-07-28"),
            isPremature: 1,
            gestationalAge: 39,
            atipicidades: "sem alteração",
        },
        {
            name: "Elisa",
            birthDate: new Date("2021-03-21"),
            isPremature: 1,
            gestationalAge: 40,
            atipicidades: "sem alteração",
        },
        {
            name: "Lara",
            birthDate: new Date("2020-07-01"),
            isPremature: 1,
            gestationalAge: 37,
            atipicidades: "não realiza RVO",
        },
        {
            name: "Pietra",
            birthDate: new Date("2020-11-27"),
            isPremature: 1,
            gestationalAge: 41,
            atipicidades: "sem alteração",
        },
        {
            name: "Anthony",
            birthDate: new Date("2021-05-26"), // Converte a string para Date
            isPremature: 1,
            gestationalAge: 39,
            atipicidades: "não realiza todos",
        },
        {
            name: "Ana Beatriz",
            birthDate: new Date("2021-02-22"),
            isPremature: 1,
            gestationalAge: 39,
            atipicidades: "sem alteração",
        },
        {
            name: "Giusepe",
            birthDate: new Date("2020-11-16"),
            isPremature: 1,
            gestationalAge: 32,
            atipicidades: "sem alteração",
        },
        {
            name: "Louise",
            birthDate: new Date("2020-12-22"),
            isPremature: 1,
            gestationalAge: 30,
            atipicidades:
                "acompanhamento horizontal descontínuo, estrabismo convergente, fixação instável, não realiza RVO",
        },
        {
            name: "Yohan",
            birthDate: new Date("2021-04-16"),
            isPremature: 1,
            gestationalAge: 39.0,
            atipicidades: "sem alteração",
        },
        {
            name: "Bernardo",
            birthDate: new Date("2021-10-14"),
            isPremature: 1,
            gestationalAge: 36,
            atipicidades: "acompanhamento horizontal descontínuo",
        },
        {
            name: "Luna",
            birthDate: new Date("2021-05-04"),
            isPremature: 1,
            gestationalAge: 39,
            atipicidades: "estrabismo convergente, acompanhamento horizontal breve, não realiza campo visual e RVO",
        },
        {
            name: "Rebeca",
            birthDate: new Date("2021-03-12"),
            isPremature: 1,
            gestationalAge: 26,
            atipicidades: "estrabismo convergente",
        },
        {
            name: "Bento",
            birthDate: new Date("2021-06-21"),
            isPremature: 1,
            gestationalAge: 38.0,
            atipicidades: "sem alteração",
        },
        {
            name: "Emanuel",
            birthDate: new Date("2021-03-13"),
            isPremature: 1,
            gestationalAge: 37,
            atipicidades: "sem alteração",
        },
        {
            name: "Jorge Luis",
            birthDate: new Date("2021-09-26"),
            isPremature: 1,
            gestationalAge: 28,
            atipicidades: "sem alteração",
        },
        {
            name: "Maria Cecilia",
            birthDate: new Date("2022-12-28"),
            isPremature: 1,
            gestationalAge: 29,
            atipicidades:
                "acompanhamento vertical breve, não realiza acompanhamento visual horizontal para direita e é breve, não realiza campo visual esquerdo, tempo de fixação instável, olhar descontínuo no RVO",
        },
        {
            name: "Maria Isis",
            birthDate: new Date("2022-12-28"),
            isPremature: 1,
            gestationalAge: 29,
            atipicidades:
                "não realiza acompanhamento vertical, horizontal, campo visual D, RVO, tempo de fixação instável, estrabismo convergente",
        },
        {
            name: "Otavio",
            birthDate: new Date("2019-04-16"),
            isPremature: 1,
            gestationalAge: 40,
            atipicidades: "horizontal descontínuo",
        },
        {
            name: "Theo",
            birthDate: new Date("2021-06-24"),
            isPremature: 1,
            gestationalAge: 37,
            atipicidades: "horizontal e RVO descontínuo",
        },
        {
            name: "Felipe",
            birthDate: new Date("2019-09-22"),
            isPremature: 1,
            gestationalAge: 33.0,
            atipicidades: "não tem vídeo",
        },
        {
            name: "Murialdo",
            birthDate: new Date("2022-12-28"),
            isPremature: 1,
            gestationalAge: 29,
            atipicidades: "vertical e horizontal descontínuo, fixação instável, não realiza RVO ",
        },
        {
            name: "Vinicius",
            birthDate: new Date("2021-12-01"),
            isPremature: 1,
            gestationalAge: 26,
            atipicidades: "não realiza vertical caudal, horizontal D breve e E descontínuo, RVO descontínuo",
        },
        {
            name: "Alana",
            birthDate: new Date("2022-03-27"),
            isPremature: 1,
            gestationalAge: 29.0,
            atipicidades: "choro",
        },
        {
            name: "Joao Batista",
            birthDate: new Date("2022-12-01"),
            isPremature: 1,
            gestationalAge: 38,
            atipicidades: "vertical descontínuo",
        },
        {
            name: "Arthur",
            birthDate: new Date("2021-12-23"),
            isPremature: 1,
            gestationalAge: 38,
            atipicidades: "vertical, horizontal e RVO descontínuos, fixação instável",
        },
        {
            name: "Gael",
            birthDate: new Date("2021-07-22"),
            isPremature: 1,
            gestationalAge: 40,
            atipicidades: "sem alteração",
        },
        {
            name: "Levi",
            birthDate: new Date("2022-05-23"),
            isPremature: 1,
            gestationalAge: 31,
            atipicidades: "não realiza vertical, horizontal, campo visual e RVO, fixação instável",
        },
        { name: "Iara", birthDate: new Date("1900-01-01"), isPremature: 0, gestationalAge: 0, atipicidades: "" },
        { name: "Benjamin", birthDate: new Date("2022-11-08"), isPremature: 1, gestationalAge: 39, atipicidades: "" },
        { name: "Miguel", birthDate: new Date("2021-12-10"), isPremature: 1, gestationalAge: 30, atipicidades: "" },
        { name: "Victor", birthDate: new Date("2022-07-03"), isPremature: 1, gestationalAge: 40, atipicidades: "" },
        { name: "Gabriel", birthDate: new Date("2022-10-10"), isPremature: 1, gestationalAge: 39, atipicidades: "" },
        { name: "Erick", birthDate: new Date("2022-07-31"), isPremature: 1, gestationalAge: 41, atipicidades: "" },
        { name: "Ana Sther", birthDate: new Date("2022-04-21"), isPremature: 1, gestationalAge: 33, atipicidades: "" },
        { name: "Davi", birthDate: new Date("2022-06-19"), isPremature: 1, gestationalAge: 23, atipicidades: "" },
    ];

    const dataProject = [
        {
            projectName: "camera fixa",
        },
        {
            projectName: "vestivel",
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
        },
        {
            description: "HorizontalAbrupt_Cammoving",
            projectId: 1,
        },
        {
            description: "VerticalSlow_Cammoving",
            projectId: 1,
        },
        {
            description: "HorizontalHead_Camfixed",
            projectId: 1,
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
        }
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

    try {
        // Manipulação de dataBabyInfo para tratar o campo `isPremature`
        const updatedPatient = dataPatient.map((baby) => ({
            ...baby,
            isPremature: baby.isPremature === 1, // Transforma 1 em true e 0 em false
        }));
        await prisma.$transaction([
            // Manipulação específica de `babyInfo` para tratar o campo `isPremature`
            prisma.patient.createMany({
                data: updatedPatient,
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
