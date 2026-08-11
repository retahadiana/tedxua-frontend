// Data produk merchandise. Harga dalam Rupiah (number).
// Sumber tunggal untuk grid produk — update di sini tanpa bongkar UI.
// - subtitle: teks pendek 1 baris di card grid (nama + harga + subtitle).
// - description: deskripsi lengkap verbatim untuk halaman Item Details.
// - size / material: detail ukuran & bahan, ditampilkan di halaman Item Details.
// Foto produk: belum tersedia (null) → tampil placeholder.
import produk1 from "@/assets/merch/produk 1.png";
import produk2 from "@/assets/merch/produk 2.png";
import produk3 from "@/assets/merch/produk 3.png";
import produk4 from "@/assets/merch/produk 4.png";
import produk5 from "@/assets/merch/produk 5.png";
import produk6 from "@/assets/merch/produk 6.png";
import S1 from "@/assets/merch/sticker/S1.png";
import S2 from "@/assets/merch/sticker/S2.png";
import S3 from "@/assets/merch/sticker/S3.png";
import S4 from "@/assets/merch/sticker/S4.png";
import S5 from "@/assets/merch/sticker/S5.png";
import S6 from "@/assets/merch/sticker/S6.png";
import S7 from "@/assets/merch/sticker/S7.png";
import PI1 from "@/assets/merch/pin button/PI1.png";
import pinMylo from "@/assets/merch/pin button/pin 1 - mylo.png";
import pinMycelium from "@/assets/merch/pin button/pin 2 - mycelium cell.png";

export const PRODUCTS = [
  {
    id: 1,
    name: "Sticker Sheet",
    subtitle: "Unseen Work, Celebrated",
    price: 10000,
    note: null,
    size: "A6",
    material: "Vinyl doff, kiss-cut, waterproof",
    description:
      "A sticker sheet is for everyone doing the work no one claps for. Waterproof, kiss-cut, ready to mark up your laptop, bottle, or notebook.",
    image: produk1,
    gallery: [produk1, S1, S2, S3, S4, S5, S6, S7],
    variants: [
      {
        label: "With Mylo",
        image: produk1,
        gallery: [produk1, S1, S2, S3, S4, S5, S6, S7],
        description:
          "A sticker sheet is for everyone doing the work no one claps for. Waterproof, kiss-cut, ready to mark up your laptop, bottle, or notebook.",
      },
      {
        label: "Without Mylo",
        image: S1,
        gallery: [S1, S2, S3, S4, S5, S6, S7],
        description:
          "A sticker sheet is for everyone doing the work no one claps for. Waterproof, kiss-cut, ready to mark up your laptop, bottle, or notebook.",
      },
    ],
  },
  {
    id: 2,
    name: "Keychain Sprout",
    subtitle: "Grows Where Unseen",
    price: 35000,
    note: null,
    size: "—",
    material: "Acrylic",
    description:
      "Some things grow best where you can't see them. This keychain carries that idea everywhere you go.",
    image: produk2,
  },
  {
    id: 3,
    name: "Phone Strap",
    subtitle: "Forest Floor Swings",
    price: 35000,
    note: "Berlaku kelipatan 5 pcs",
    size: "—",
    material: "—",
    description:
      "A small, wearable piece of the forest floor, made to swing from your phone and catch a little light.",
    image: produk3,
  },
  {
    id: 4,
    name: "Foldable Bags",
    subtitle: "Mylo's World, Folded",
    price: 40000,
    note: "Minimal beli 6 pcs",
    size: "42×31 cm",
    material: "Parachute",
    description:
      "A patchwork of every corner of Mylo's world, stitched into one bag and tucked into a pouch small enough to disappear into your everyday carry.",
    image: produk4,
  },
  {
    id: 5,
    name: "Cardholder",
    subtitle: "Lightning Meets Root",
    price: 50000,
    note: null,
    size: "10×8 cm, 6 slot kartu",
    material: "Synthetic leather",
    description:
      "Every spark starts underground. This card holder carries Mylo caught in the exact moment lightning meets root.",
    image: produk5,
  },
  {
    id: 6,
    name: "Pin Button",
    subtitle: "Small, Hooded, Watching",
    price: 12000,
    note: null,
    size: "4.4 cm",
    material: "Glossy",
    description:
      "Meet Mylo - small, hooded, and always watching. Beneath every visible thing is a network no one sees. This pin traces the roots that quietly hold everything together.",
    image: pinMylo,
    gallery: [pinMylo, pinMycelium, PI1],
    variants: [
      {
        label: "Mylo",
        image: pinMylo,
        gallery: [pinMylo, PI1],
        description: "Meet Mylo - small, hooded, and always watching.",
      },
      {
        label: "Mycelium Cell",
        image: pinMycelium,
        gallery: [pinMycelium, PI1],
        description:
          "Beneath every visible thing is a network no one sees. This pin traces the roots that quietly hold everything together.",
      },
    ],
  },
]