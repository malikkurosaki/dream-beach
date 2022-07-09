#!/usr/bin/env node
// const prompts = require('prompts');
// const colors = require('colors');
// const Generator = require('./controller');

// prompts({
//     type: 'select',
//     name: 'menu',
//     message: `
//     -----------------------------
//     Dream Beach Report Generator
//     -----------------------------
//     @malikkurosaki        v1.0.0


//     Pilih menu:`.green,
//     choices: [
//         { title: 'generate report lembongan ', value: 'lembongan' },
//         { title: 'generate report putra kembar', value: 'putra_kembar' },
//         { title: 'generate report mele', value: 'mele' },
//         { title: 'generate report other', value: 'other' },
//         { title: 'generate report all', value: 'all' },
//         ({ title: 'exit', value: 'exit' }),
//     ]
// }).then(async ({ menu }) => {
//     let dataSupplier = await Generator.getData();
//     switch (menu) {
//         case 'lembongan':
//             console.log('generate report lembongan'.green);
//             await Generator.perhitungan(dataSupplier.lembongan, 'lembongan');
//             break;
//         case 'putra_kembar':
//             console.log('generate report putra kembar'.grey);
//             await Generator.perhitungan(dataSupplier.putraKembar, 'putra_kembar');
//             break;
//         case 'mele':
//             console.log('generate report mele'.green);
//             await Generator.perhitungan(dataSupplier.mele, 'mele');
//             break;
//         case 'other':
//             console.log('generate report other'.green);
//             await Generator.perhitungan(dataSupplier.other, 'other');
//             break;
//         case 'all':
//             console.log('generate report all'.green);
//             await Generator.perhitungan(dataSupplier.lembongan, 'lembongan');
//             await Generator.perhitungan(dataSupplier.putraKembar, 'putra_kembar');
//             await Generator.perhitungan(dataSupplier.mele, 'mele');
//             await Generator.perhitungan(dataSupplier.other, 'other');
//             console.log('generate report all berhasil'.yellow);
//             break;
//         case 'exit':
//             console.log('oh eyy, bye'.blue);
//             process.exit();
//             break;
//         default:
//             console.log('ok ...'.red);
//             break;
//     }
// }).catch(console.error);