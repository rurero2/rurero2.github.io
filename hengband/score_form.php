<?php




function con($ins){
  echo '<script>';
  echo 'console.log('. json_encode( $ins ) .')';
  echo '</script>';
}

function makequery(){
  $where="";
  foreach (array_keys($_GET) as $key){
    $connecter= $where == "" ? " " : " AND ";
    if ($key == "ソート順"){
      continue;
    }
    if (in_array($_GET[$key] , ["すべて",""])){
      continue;
    }
    $where = $where . $connecter . $key . " = " . $_GET[$key];
  }
  con($where);
  $querybody=<<<EOM
SELECT * FROM score_test
WHERE {$where}
ORDER BY {$_GET["ソート順"]} DESC
EOM;
  con($querybody);
  return $querybody;
}
  
function input(){
  con($_GET);
  $db['dbname'] = "rachel_hengband";
  $db['user'] = 'rachel_test';
  $db['pass'] = "password";
  $db['host'] = 'mysql1.php.xdomain.ne.jp';
  $errorMessage = "";
  $rows = [];
  $query = makequery();
  
  $dsn = "mysql:host={$db['host']}; dbname={$db['dbname']}; charset=utf8";
  $pdo = new PDO($dsn, $db['user'], $db['pass'], [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
  $query = <<<EOM
SELECT * FROM score_test WHERE id = "85000";
EOM;
  con($query);
  $stmt = $pdo->query($query);
  $rows = $stmt->fetchAll();
  con($rows);
}

function output(){
  $res = "";
  if(count($rows) > 0){
    $res = $res +  <<<EOM
<p>検索結果<br>
{count(4649)}件のダンプがヒットしました。
- - - - - - - - - - - - - - - - - - - - - - - - </p>
<table>
<th></th>
EOM;
    foreach($rows as $row){
      $res = $res + <<<EOM
<tr>
<td>{$row["id"]}</td>
<td>{$row["id"]}</td>
<td>{$row["id"]}</td>
</tr>
EOM;
    }
    $res = $res + "</table>";
  }else{
    $res ='<p>検索結果</p>' + '<div>該当するデータはありません</div>';
  }
}

input()
//  echo "<script> console.log('検索ボタンが押されました。 ')</script>";

?>
