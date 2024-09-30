const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const recordingsDir = path.join(__dirname, '..', 'recording');

if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir);
}

router.post('/', (req, res) => {
  const { baby_info, mov_id, baby_id, project_id, videos } = req.body;

  if (!baby_info || !mov_id || !baby_id || !project_id || !videos) {
    return res.status(400).send('Faltam dados na requisição.');
  }

  const fileName = `${baby_id}_${project_id}_${mov_id}.json`;
  const filePath = path.join(recordingsDir, fileName);

  const data = { baby_info, mov_id, baby_id, project_id, videos };

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Erro ao salvar o arquivo.');
    }
    res.status(200).send('Informações salvas com sucesso!');
  });
});


router.get('/:project_id', (req, res) => {
  const {  project_id} = req.params;

  
  const fileName = `${project_id}.json`;
  const filePath = path.join(recordingsDir, fileName);

 
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Gravação não encontrada.');
  }

 
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler o arquivo.');
    }
    res.status(200).json(JSON.parse(data));
  });
});

module.exports = router;
