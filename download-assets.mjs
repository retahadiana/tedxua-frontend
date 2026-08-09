// download-assets.mjs
import fs from "fs";
import path from "path";

const OUTPUT_DIR = "src/assets/auth";

const loginAssets = {
  "login/ellipse-41.png": "https://www.figma.com/api/mcp/asset/e49e1dab-0383-4fb6-881a-228c51ae78b9",
  "login/ellipse-42.png": "https://www.figma.com/api/mcp/asset/ba1e6650-3d1a-474c-8a31-a3c4f3d35813",
  "login/ellipse-43.png": "https://www.figma.com/api/mcp/asset/d317f8e0-b2c0-47a3-b2cb-f678fd0ae347",
  "login/element-1.png": "https://www.figma.com/api/mcp/asset/449628ff-9199-4f63-b6b1-6a836d84977f",
  "login/element-2.png": "https://www.figma.com/api/mcp/asset/23d6ab7d-2332-48d8-ade1-c68fa80669a1",
  "login/element-3.png": "https://www.figma.com/api/mcp/asset/19d33053-e3b4-4fec-a896-acbee5a8c5ec",
  "login/element-4.png": "https://www.figma.com/api/mcp/asset/d51d010f-68f3-480c-9b58-835d8710e6a5",
  "login/element-5.png": "https://www.figma.com/api/mcp/asset/b9f58ef7-44e0-4be1-835b-fc40cdc38346",
  "login/element-6.png": "https://www.figma.com/api/mcp/asset/1b3e96c0-c2ff-42b1-a83f-466b5629bb79",
  "login/element-7.png": "https://www.figma.com/api/mcp/asset/2c7a4da6-63ee-47a8-b3df-492ce03f8b64",
  "login/element-8.png": "https://www.figma.com/api/mcp/asset/75e6a77e-9cb7-4382-a30d-8f94e7b21d4c",
  "login/element-9.png": "https://www.figma.com/api/mcp/asset/847fb3fc-01e3-4ddc-a451-b7e296678328",
  "login/mask-left.svg": "https://www.figma.com/api/mcp/asset/aeaefc03-decc-4764-8f84-712c01615eb3",
  "login/mask-right.svg": "https://www.figma.com/api/mcp/asset/8c981fb6-d05a-4d74-8554-0cbc5a391ab3",
  "login/mask-pixels.svg": "https://www.figma.com/api/mcp/asset/5e6dc8c1-cf5c-46ba-8d9a-b55bea63fe42",
  "login/photoroom-1.png": "https://www.figma.com/api/mcp/asset/6af36f1b-93d5-4720-bc14-0429e83f1d46",
  "login/photoroom-2.png": "https://www.figma.com/api/mcp/asset/a170520c-72f0-43ef-b65b-188641493ab4",
  "login/tedx-logo.png": "https://www.figma.com/api/mcp/asset/ff302108-9f71-42f7-b9c8-c1657bb16369",
  "login/arrow-up.svg": "https://www.figma.com/api/mcp/asset/e9d30444-60f3-4f96-ae61-2f5fd1f18b15",
};

const signupAssets = {
  "signup/tolong-7.png": "https://www.figma.com/api/mcp/asset/b26613ed-9aa7-4107-a1f7-4a9ccf44fdc5",
  "signup/tolong-8.png": "https://www.figma.com/api/mcp/asset/53df69bf-da48-4362-9d22-0f31ec738f90",
  "signup/tedx-logo.png": "https://www.figma.com/api/mcp/asset/726f003c-d8f2-4f97-9304-c8fb76148d72",
  "signup/rumput-paling-belakang.png": "https://www.figma.com/api/mcp/asset/ec706ced-9209-49e8-baae-13439e8dd30d",
  "signup/mylo-say-hai.png": "https://www.figma.com/api/mcp/asset/0f51a26d-4133-44f0-ae41-d7c11e8f4582",
  "signup/fireflies.png": "https://www.figma.com/api/mcp/asset/bcd197bd-8794-4ee6-b630-016820d135ac",
  "signup/rectangle8-footer-bg.png": "https://www.figma.com/api/mcp/asset/7cb12fa5-26fa-468f-a013-b4d32c105fc4",
  "signup/rumput-belakang-mylo.png": "https://www.figma.com/api/mcp/asset/d74aa582-cf59-4066-a095-007dcb65d164",
  "signup/ellipse-44.png": "https://www.figma.com/api/mcp/asset/05e98a4e-86a5-4f1b-b36e-ee7df7b12a7b",
  "signup/rumput-depan-mylo.png": "https://www.figma.com/api/mcp/asset/722e2f0d-3b95-4437-8d11-3370bd9c8d29",
  "signup/social-icons-3.svg": "https://www.figma.com/api/mcp/asset/351ea3f1-d5ac-4540-9f4e-b043cbb19bb7",
  "signup/icon-mail-group.svg": "https://www.figma.com/api/mcp/asset/fafcc409-04be-4ce0-91c5-7ced3c5beea5",
  "signup/icon-lock-vector.svg": "https://www.figma.com/api/mcp/asset/a4faa07f-18ca-479d-a1c2-3553ab1e391b",
  "signup/icon-instagram-base.svg": "https://www.figma.com/api/mcp/asset/1d2f251e-d1f8-40aa-ac92-197f7cdeb98b",
  "signup/icon-instagram-detail1.svg": "https://www.figma.com/api/mcp/asset/2cb87a73-df58-43c0-8248-b6210798a65a",
  "signup/icon-instagram-detail2.svg": "https://www.figma.com/api/mcp/asset/e7258096-f370-4677-b4e6-64d206c3afe1",
  "signup/icon-x-twitter.svg": "https://www.figma.com/api/mcp/asset/5d5ed813-1a45-4d63-9d3a-08a05725421b",
  "signup/icon-tiktok-or-other.svg": "https://www.figma.com/api/mcp/asset/f97bc4fc-c87e-4d3c-bacd-f1deb21f4534",
  "signup/icon-social-4.svg": "https://www.figma.com/api/mcp/asset/949d1ffb-3cd5-47f1-8b14-9a57aca40553",
  "signup/icon-social-corner.svg": "https://www.figma.com/api/mcp/asset/10dcbd7e-9c08-49b3-864e-0ec45ec2376e",
  "signup/arrow-up.svg": "https://www.figma.com/api/mcp/asset/f70dfa97-29f8-40ab-b4d2-372f997cbaff",
  "signup/input-underline.svg": "https://www.figma.com/api/mcp/asset/afc51ae1-b079-4551-97cd-24f340d398a3",
};

const signinRedAssets = {
  "signin-red/tolong-7.png": "https://www.figma.com/api/mcp/asset/e67711b6-8e47-4036-b13d-2c1ddd347c2d",
  "signin-red/tolong-8.png": "https://www.figma.com/api/mcp/asset/1c777d9d-bf48-4c8c-81f9-37ac3fbdaaf3",
  "signin-red/tedx-logo.png": "https://www.figma.com/api/mcp/asset/209a2448-4660-4d7c-aa30-8c7e54ad4f31",
  "signin-red/tolong-2-grass.png": "https://www.figma.com/api/mcp/asset/35b36622-816e-4b18-bc9a-f8a0f0e2521b",
  "signin-red/mylo-say-hai.png": "https://www.figma.com/api/mcp/asset/97941bea-bcda-4ad5-a045-d5a5ae14cedd",
  "signin-red/rectangle8-footer-bg.png": "https://www.figma.com/api/mcp/asset/a52e71de-3286-4214-9646-19512a0427ab",
  "signin-red/fireflies.png": "https://www.figma.com/api/mcp/asset/f583d867-6bb5-4b0a-9023-e907047e41e8",
  "signin-red/rectangle39-grass-back.png": "https://www.figma.com/api/mcp/asset/7f06acdb-4dce-43ab-b1a0-06ebd4c25e0e",
  "signin-red/ellipse-44.png": "https://www.figma.com/api/mcp/asset/6bbec92f-7f8c-4efe-8523-d1673df896c5",
  "signin-red/rectangle41-grass-front.png": "https://www.figma.com/api/mcp/asset/bd4a83c3-5974-4335-9ddd-6b0940cb08fc",
  "signin-red/icon-lock-vector.svg": "https://www.figma.com/api/mcp/asset/5aba5c22-5d6c-4181-9725-693c8b5d69c5",
  "signin-red/icon-mail-group.svg": "https://www.figma.com/api/mcp/asset/8c642c1b-c17e-4c89-aa73-1a8099455bec",
  "signin-red/input-underline.svg": "https://www.figma.com/api/mcp/asset/e2e7fbcf-0052-4002-a7ef-f4d9507d35fc",
  "signin-red/social-icons-3.svg": "https://www.figma.com/api/mcp/asset/15709955-c20c-4845-b899-7463561728fc",
  "signin-red/icon-instagram-base.svg": "https://www.figma.com/api/mcp/asset/6fdefd4a-7e97-45de-9cf9-282829948b11",
  "signin-red/icon-instagram-detail1.svg": "https://www.figma.com/api/mcp/asset/16ab62a6-2f29-423d-9552-726c05127dbb",
  "signin-red/icon-instagram-detail2.svg": "https://www.figma.com/api/mcp/asset/ab71170c-8c68-4425-abfb-3241fa3e8084",
  "signin-red/icon-x-twitter.svg": "https://www.figma.com/api/mcp/asset/3888174c-89b8-4772-a5cd-c5385bd479d7",
  "signin-red/icon-social-4.svg": "https://www.figma.com/api/mcp/asset/a1eb7861-27b8-46e1-949e-32e2987b48f3",
  "signin-red/icon-social-corner.svg": "https://www.figma.com/api/mcp/asset/b7691e5e-6746-404b-9f2a-8d24bba4b6a5",
  "signin-red/arrow-up.svg": "https://www.figma.com/api/mcp/asset/5f3e4745-9b4c-4cb3-b051-f749285d30f0",
};

const allAssets = { ...loginAssets, ...signupAssets, ...signinRedAssets };

async function downloadAll() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [filename, url] of Object.entries(allAssets)) {
    const dest = path.join(OUTPUT_DIR, filename);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`✅ ${filename}`);
    } catch (err) {
      console.error(`❌ ${filename} gagal: ${err.message}`);
    }
  }

  console.log("\nSelesai. Cek folder:", OUTPUT_DIR);
}

downloadAll();
