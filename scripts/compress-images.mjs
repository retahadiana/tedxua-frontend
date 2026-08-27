import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

async function compressImages() {
  console.log('Starting image compression to WebP...');
  
  // 1. Temukan semua file gambar PNG dan JPG di dalam src/assets
  const imageFiles = await glob('src/assets/**/*.{png,jpg,jpeg}');
  
  if (imageFiles.length === 0) {
    console.log('No PNG or JPG images found.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to compress.`);

  const convertedFiles = [];

  // 2. Loop dan konversi
  for (const file of imageFiles) {
    const ext = path.extname(file);
    const webpFile = file.replace(new RegExp(`${ext}$`), '.webp');
    
    try {
      console.log(`Converting ${file} -> ${webpFile}`);
      
      // Resize (optional: we can limit max width if we want, but quality 80 is usually enough)
      await sharp(file)
        .webp({ quality: 80, effort: 6 }) // effort 6 gives better compression
        .toFile(webpFile);

      // Verifikasi file baru terbuat
      const stats = await fs.stat(webpFile);
      if (stats.size > 0) {
        // Hapus file asli
        await fs.unlink(file);
        convertedFiles.push({
          oldName: path.basename(file),
          newName: path.basename(webpFile),
          oldExt: ext
        });
      }
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }

  console.log(`Successfully converted ${convertedFiles.length} images.`);

  // 3. Update source code references
  if (convertedFiles.length > 0) {
    console.log('Updating source code references...');
    const sourceFiles = await glob('src/**/*.{js,jsx,css}');
    
    for (const sourceFile of sourceFiles) {
      let content = await fs.readFile(sourceFile, 'utf8');
      let modified = false;

      for (const { oldName, newName } of convertedFiles) {
        // Replace exact filename occurrences
        // Using regex to make sure it matches word boundaries if possible, but exact replace is fine for filenames
        // We escape the filename just in case (e.g. spaces)
        const escapedOldName = oldName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedOldName, 'g');
        
        if (regex.test(content)) {
          content = content.replace(regex, newName);
          modified = true;
        }
      }

      if (modified) {
        await fs.writeFile(sourceFile, content, 'utf8');
        console.log(`Updated references in ${sourceFile}`);
      }
    }
  }

  console.log('Done!');
}

compressImages().catch(console.error);
