import { spawn } from 'child_process';

// Função para executar o script Python
export const runPythonScript = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Chama o script Python usando spawn
    // verifica se esta em produção (dist) ou se esta em dev. se estiver em dev o const caminho = __dirname + '/../utils/python/extractFrame.py', senão const caminho = __dirname + '/python/extractFrame.py'
    // const caminho = __dirname.includes('dist') ? __dirname + '/python/extractFrame.py' : __dirname + '/../utils/python/extractFrame.py';
    const pythonProcess = spawn('python', [__dirname + '/python/extractFrame.py']);
    
    let result = '';
    
    // Captura a saída do script Python
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();  // Acumula a saída do script
    });

    // Captura erros do script Python
    pythonProcess.stderr.on('data', (data) => {
      reject(`stderr: ${data.toString()}`);
    });

    // Trata o evento de finalização do processo
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(result.trim());  // Retorna a saída do script
      } else {
        reject(`Process exited with code ${code}`);
      }
    });
  });
};
