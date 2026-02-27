// Script de otimização de imagens para o STAR STUDIO CAR
// Execute com: node optimize-images.js

const fs = require('fs');
const path = require('path');

// Lista de imagens para otimizar
const images = [
    { src: 'logo.png', maxSize: 500000 }, // 500KB
    { src: 'Icon.png', maxSize: 100000 }, // 100KB
    { src: 'image/agenda.jpg', maxSize: 50000 }, // 50KB
    { src: 'image/adicionar-serviços.jpg', maxSize: 50000 },
    { src: 'image/historico.jpg', maxSize: 50000 },
    { src: 'image/serviços.jpg', maxSize: 50000 }
];

console.log('🚀 Iniciando otimização de imagens...');
console.log('📊 Tamanhos atuais:');

images.forEach(img => {
    const filePath = path.join(__dirname, img.src);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        const targetKB = Math.round(img.maxSize / 1024);
        const reduction = Math.round((1 - img.maxSize / stats.size) * 100);
        
        console.log(`📁 ${img.src}: ${sizeKB}KB → ${targetKB}KB (redução: ${reduction}%)`);
        
        if (stats.size > img.maxSize) {
            console.log(`   ⚠️  Precisa de otimização!`);
        } else {
            console.log(`   ✅ Tamanho adequado`);
        }
    } else {
        console.log(`   ❌ Arquivo não encontrado: ${img.src}`);
    }
});

console.log('\n💡 Recomendações:');
console.log('1. Use ferramentas como TinyPNG.com ou Squoosh.app');
console.log('2. Para PNG: considere converter para WebP');
console.log('3. Para JPG: reduza qualidade para 80-85%');
console.log('4. Use imagens responsivas com srcset');

console.log('\n🎯 Próximos passos:');
console.log('1. Comprima as imagens manualmente');
console.log('2. Substitua os arquivos originais');
console.log('3. Implemente lazy loading no HTML');
console.log('4. Adicione WebP como fallback');
