import { db } from "./db";
import {apples} from "./src/schema/apples.ts";
import {genealogies} from "./src/schema/genealogies.ts";


await db.insert(apples).values([
  {
    name: "unknown",
    display_name: "不明",
    color: "不明"
  },
  {
    name: "shinano_sweet",
    display_name: "シナノスイート",
    color: "黃"
  },
  {
    name: "tsugaru",
    display_name: "つがる",
    color: "赤"
  },
  {
    name: "kougyoku",
    display_name: "紅玉",
    color: "赤"
  },
  {
    name: "golden_delicious",
    display_name: "ゴールデンデリシャス",
    color: "黄"
  },
  {
    name: "fuji",
    display_name: "ふじ",
    color: "赤"
  },
  {
    name: "delicious",
    display_name: "デリシャス",
    color: "赤"
  },
  {
    name: "kokkou",
    display_name: "国光",
    color: "赤"
  },
  {
    name: "shinano_dolce",
    display_name: "シナノドルチェ",
    color: "赤"
  },
  {
    name: "senshu",
    display_name: "千秋",
    color: "赤"
  },
  {
    name: "toukou",
    display_name: "東光",
    color: "黃"
  },
  {
    name: "indo",
    display_name: "印度",
    color: "赤"
  },
  {
    name: "shinano_lip",
    display_name: "シナノリップ",
    color: "赤"
  },
  {
    name: "shinano_red",
    display_name: "シナノレッド",
    color: "赤"
  },
  {
    name: "vista_bella",
    display_name: "ビスタベラ",
    color: "赤"
  },
  {
    name: "ohshu_roman",
    display_name: "奥州ロマン",
    color: "赤"
  },
  {
    name: "shinano_gold",
    display_name: "シナノゴールド",
    color: "黄"
  },
]);

await db.insert(genealogies).values([
  {
    child_name: "unknown",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "shinano_sweet",
    pollen_name: "tsugaru",
    seed_name: "fuji"
  },
  {
    child_name: "tsugaru",
    pollen_name: "kougyoku",
    seed_name: "golden_delicious"
  },
  {
    child_name: "kougyoku",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "golden_delicious",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "delicious",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "kokkou",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "fuji",
    pollen_name: "delicious",
    seed_name: "kokkou"
  },
  {
    child_name: "shinano_dolce",
    pollen_name: "senshu",
    seed_name: "golden_delicious"
  },
  {
    child_name: "senshu",
    pollen_name: "fuji",
    seed_name: "toukou"
  },
  {
    child_name: "toukou",
    pollen_name: "indo",
    seed_name: "golden_delicious"
  },
  {
    child_name: "indo",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "shinano_lip",
    pollen_name: "shinano_red",
    seed_name: "senshu"
  },
  {
    child_name: "shinano_red",
    pollen_name: "vista_bella",
    seed_name: "tsugaru"
  },
  {
    child_name: "vista_bella",
    pollen_name: "unknown",
    seed_name: "unknown"
  },
  {
    child_name: "ohshu_roman",
    pollen_name: "tsugaru",
    seed_name: "shinano_gold"
  },
  {
    child_name: "shinano_gold",
    pollen_name: "senshu",
    seed_name: "golden_delicious"
  },
])


console.log(`Seeding complete.`);