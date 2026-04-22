const bcrypt = require('bcrypt');

async function main() {
  const senha = 'ecotrack2025';
  const hash = await bcrypt.hash(senha, 10);
  console.log(hash);
}

main();