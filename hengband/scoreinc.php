<?php

class gen_option{
  public $type;
  public $title;
  public $name;
  public $firstelem;
  public $elem;

  """
  <h3 class="selector_title">種族:</h3>
  <select name="race_id">
  <option value="0" selected="">すべて</option>
  /* valueは0じゃない */
  """
  public function __construct(){
    init()
  }
  public function init(){

  }

  public function gen_select(){
    echo "<h3 class=\"selector_title\">{$this->title}</h3>";
    echo "<select name=\"{$this->name}\">";
    foreach ($this->elem as $e) {
      echo "<option value=\"{$e}\">{$e}</option>";
    }
    echo '</select>';
  }
}
$gen1 = new $gen_option("selector","種族","raceid","", array("人間","エルフ") )
$gen_option->gen_select()


    /**
     * スコアソート用のORDER BY句を取得する
     *
     * @return string スコアソート用のORDER BY句
     */
    private function get_order_by()
    {
        switch ($this->sort_mode) {
        case "score":
            $order_by = "ORDER BY score DESC";
            break;
        case "newcome":
            $order_by = 'ORDER BY score_id DESC';
            break;
        }

        return $order_by;
    }


    /**
     * スコア検索用のSQLクエリを取得する
     *
     * @param integer $offset スコア取得開始位置
     * @param integer $limit スコア取得最大件数
     * @param string $where スコア検索に用いるWHERE句
     * @param string $order_by スコアソートに用いるORDER BY句
     * @return string スコア検索用SQLクエリ
     */
    private function get_search_query($offset, $limit, $where, $order_by)
    {
        $query = <<<EOM
WITH
  target_score_ids
AS
 (SELECT
    score_id
  FROM
    scores
  {$where}
  {$order_by}
  LIMIT {$offset}, {$limit})
SELECT
  *,
  CASE
    WHEN killer = 'ripe' THEN '勝利の後引退'
    WHEN killer = 'Seppuku' THEN '勝利の後切腹'
    WHEN dead_place IS NULL THEN killer || 'に殺された'
    ELSE dead_place || 'で' || killer || 'に殺された'
  END AS death_reason
FROM
 (SELECT
    score_id,
    group_concat(realm_name) AS realms_name
  FROM
    target_score_ids
  NATURAL LEFT JOIN
    score_realms
  NATURAL LEFT JOIN
    realms
  GROUP BY
    score_id)
NATURAL INNER JOIN
  scores
NATURAL INNER JOIN
  races
NATURAL INNER JOIN
  classes
NATURAL INNER JOIN
  personalities
{$order_by}
EOM;
            <<<EOM
CREATE TABLE
  killers_cache
AS
SELECT
  killer_name,
  count(*) AS killer_count_total,
  count(killed_status = 0 OR NULL) AS killer_count_normal,
  count(killed_status != 0 OR NULL) AS killer_count_freeze
FROM
 (SELECT
    CASE
      WHEN killer LIKE '麻痺状態で%' THEN substr(killer, 6)
      WHEN killer LIKE '彫像状態で%' THEN substr(killer, 6)
      WHEN killer = 'ripe' THEN '引退'
      WHEN killer = 'Seppuku' THEN '切腹'
      ELSE killer
    END AS killer_name,
    CASE
      WHEN killer LIKE '麻痺状態で%' THEN 1
      WHEN killer LIKE '彫像状態で%' THEN 2
      ELSE 0
    END AS killed_status
  FROM
    scores
 )
GROUP BY
  killer_name
ORDER BY
  killer_count_total DESC
EOM

?>
