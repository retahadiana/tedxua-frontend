import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.resolve('src/assets/images');
const SRC_DIR = path.resolve('src');

// Extension yang akan dikonversi
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Temukan semua file gambar
const imageFiles = fs.readdirSync(ASSETS_DIR, { recursive: true })
  .filter(f => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  })
  .map(f => path.join(ASSETS_DIR, f));

console.log(`\n🔍 Ditemukan ${imageFiles.length} gambar untuk dikonversi:\n`);

let totalOriginalSize = 0;
let totalWebpSize = 0;
const converted = [];

for (const filePath of imageFiles) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const webpPath = filePath.replace(new RegExp(`\\${ext}$`), '.webp');
    
    const originalSize = fs.statSync(filePath).size;
    totalOriginalSize += originalSize;

    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    totalWebpSize += webpSize;

    const saved = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const webpKB = (webpSize / 1024).toFixed(0);

    console.log(`✅ ${path.basename(filePath)}`);
    console.log(`   ${originalKB} KB → ${webpKB} KB (hemat ${saved}%)\n`);

    converted.push({ original: filePath, webp: webpPath, ext });
  } catch (err) {
    console.error(`❌ Gagal mengonversi ${filePath}: ${err.message}`);
  }
}

const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
const totalWebpMB = (totalWebpSize / 1024 / 1024).toFixed(2);
const totalSaved = (((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1);

console.log('============================================');
console.log(`📊 TOTAL PENGHEMATAN:`);
console.log(`   Sebelum : ${totalOriginalMB} MB`);
console.log(`   Sesudah : ${totalWebpMB} MB`);
console.log(`   Hemat   : ${totalSaved}%`);
console.log('============================================\n');

// ============================================================
// UPDATE IMPORT DI FILE JS/JSX/TS/TSX
// ============================================================
console.log('🔄 Memperbarui import di file source...\n');

// Cari semua file JS/JSX/TS/TSX di src
const sourceFiles = [];
const walkDir = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(entry.name))) {
      sourceFiles.push(fullPath);
    }
  }
};
walkDir(SRC_DIR);

let updatedFileCount = 0;

for (const srcFile of sourceFiles) {
  let content = fs.readFileSync(srcFile, 'utf-8');
  let modified = false;

  for (const ext of IMAGE_EXTENSIONS) {
    // Match import statements dan require() yang menggunakan ekstensi PNG/JPG
    const importRegex = new RegExp(`(import\\s+\\w+\\s+from\\s+['"]([^'"]+)\\${ext}['"])|(require\\(['"]([^'"]+)\\${ext}['"]\\))`, 'gi');
    
    if (importRegex.test(content)) {
      content = content.replace(
        new RegExp(`(from\\s+['"]([^'"]+))\\${ext}(['"])`, 'gi'),
        `$1.webp$3`
      );
      content = content.replace(
        new RegExp(`(require\\(['"]([^'"]+))\\${ext}(['"]\\))`, 'gi'),
        `$1.webp$3`
      );
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(srcFile, content, 'utf-8');
    console.log(`📝 Updated: ${path.relative(SRC_DIR, srcFile)}`);
    updatedFileCount++;
  }
}

console.log(`\n✅ ${updatedFileCount} file berhasil diperbarui.`);
console.log('\n🎉 Konversi selesai! File PNG lama masih ada (backup).');
console.log('   Jika sudah yakin, kamu bisa hapus file PNG asli secara manual.\n');
