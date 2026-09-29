const express = require('express');
const app = express();
let lucroDia = 0; let ops = 0; let compra = null;

app.get('/', (req,res) => {
  res.send(`<div style="background:#111;color:#0f0;padding:20px;border-radius:10px;font-family:monospace">
  🤖 ROBÔ ARAFZ TESTE<br>Lucro: R$ ${(lucroDia*5.5).toFixed(2)}<br>Ops: ${ops}<br>Status: ONLINE</div>`);
});
app.get('/lucro.json', (req,res) => res.json({lucro_dia: lucroDia, operacoes: ops}));

setInterval(async () => {
  try {
    const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
    const d = await r.json(); const preco = parseFloat(d.price);
    if(!compra) compra = preco;
    if(preco >= compra*1.008){ lucroDia+=0.35; ops++; compra=null; }
  } catch(e){}
}, 10000);

app.listen(3000, ()=>console.log('online'));
