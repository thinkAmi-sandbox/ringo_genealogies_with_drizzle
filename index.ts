import {db} from "./db.ts";
import {sql} from "drizzle-orm";

const targetName = 'shinano_lip'

const result = await db.all(
  sql`
      WITH RECURSIVE ancestry AS (
          -- 最初に、検索したいりんごの情報を取得
          SELECT
              g.child_name,
              a.display_name as child_display_name,
              g.pollen_name,
              g.seed_name,
              0 AS generation
          FROM genealogies g
          INNER JOIN apples a
            ON g.child_name = a.name
          WHERE child_name = ${targetName}

          UNION ALL

          -- 再帰的に父母や祖父母、曽祖父母を取得
          SELECT
              g.child_name as child_name,
              apples.display_name as child_display_name,
              g.pollen_name as pollen_name,
              g.seed_name as seed_name,
              a.generation + 1
          FROM genealogies g
              INNER JOIN ancestry a 
                  ON g.child_name = a.pollen_name OR g.child_name = a.seed_name
              INNER JOIN apples
                  ON g.child_name = apples.name
          WHERE a.generation < 3 -- 曽祖父母まで取得する
      )

-- 結果を横持ちで表示(重複して取得できてしまうので、DISTINCTが必要)
      SELECT DISTINCT
          a.child_display_name AS "Apple Name",
          p.child_display_name AS "Father",
          pp.child_display_name AS "Grandfather (Father's side)",
          ppp.child_display_name AS "Great-Grandfather (Father's Father's side)",
          pps.child_display_name AS "Great-Grandmother (Father'sFather's side)",
          ps.child_display_name AS "Grandmother (Father's side)",
          psp.child_display_name AS "Great-Grandfather (Father's Mother's side)",
          pss.child_display_name AS "Great-Grandmother (Father's Mother's side)",
          s.child_display_name AS "Mother",
          sp.child_display_name AS "Grandfather (Mother's side)",
          spp.child_display_name AS "Great-Grandfather (Mother's side)",
          sps.child_display_name AS "Great-Grandmother (Mother's Father's side)",
          ss.child_display_name AS "Grandmother (Mother's side)",
          ssf.child_display_name AS "Great-Grandfather (Mother's Mother's side)",
          sss.child_display_name AS "Great-Grandmother (Mother's Mother's side)"
      FROM
          ancestry a
-- 父系
-- 父親を結合
              LEFT JOIN ancestry p 
                  ON p.child_name = a.pollen_name AND p.generation = 1
-- 父親の父親（祖父）を結合
              LEFT JOIN ancestry pp 
                  ON pp.child_name = p.pollen_name AND pp.generation = 2
-- 父親の母親（祖母）を結合
              LEFT JOIN ancestry ps 
                  ON ps.child_name = p.seed_name AND ps.generation = 2
-- 父親の父親の父親（曽祖父）を結合
              LEFT JOIN ancestry ppp 
                  ON ppp.child_name = pp.pollen_name AND ppp.generation = 3
-- 父親の父親の母親（曽祖母）を結合
              LEFT JOIN ancestry pps 
                  ON pps.child_name = pp.seed_name AND pps.generation = 3
-- 父親の母親の父親（曽祖父）を結合
              LEFT JOIN ancestry psp 
                  ON psp.child_name = ps.pollen_name AND psp.generation = 3
-- 父親の母親の母親（曽祖母）を結合
              LEFT JOIN ancestry pss 
                  ON pss.child_name = ps.seed_name AND pss.generation = 3
-- 母系
-- 母親を結合
              LEFT JOIN ancestry s 
                  ON s.child_name = a.seed_name AND s.generation = 1
-- 母親の父親（祖父）を結合
              LEFT JOIN ancestry sp 
                  ON sp.child_name = s.pollen_name AND sp.generation = 2
-- 母親の母親（祖母）を結合
              LEFT JOIN ancestry ss 
                  ON ss.child_name = s.seed_name AND ss.generation = 2
-- 母親の父親の父親（曽祖父）を結合
              LEFT JOIN ancestry spp 
                  ON spp.child_name = sp.pollen_name AND spp.generation = 3
-- 母親の父親の母親（曽祖母）を結合
              LEFT JOIN ancestry sps 
                  ON sps.child_name = sp.seed_name AND sps.generation = 3
-- 母親の母親の父親（曽祖父）を結合
              LEFT JOIN ancestry ssf 
                  ON ssf.child_name = ss.pollen_name AND ssf.generation = 3
-- 母親の母親の母親（曽祖母）を結合
              LEFT JOIN ancestry sss 
                  ON sss.child_name = ss.seed_name AND sss.generation = 3
      WHERE
          a.generation = 0;
`
)

console.log(result)