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
SELECT * FROM score_test;
EOM;
  con($query);
  $stmt = $pdo->query($query);
  $rows = $stmt->fetchAll();
  con($rows);
  output($rows);
}

function output($rows){
  $res = "";
  if(count($rows) > 0){
    $res = $res .  <<<EOM
<table>
<th></th>
EOM;
    foreach($rows as $row){
      $res = $res . <<<EOM
<tr>
<td><img src=""></td>
<td>{$row["種族"]}</td>
<td>{$row["職業"]}</td>
<td>{$row["cause"]}</td>
<td>{$row["日付"]}</td>
<td>{$row["プレイ時間"]}</td>
<td>{$row["eq_a"]}</td>
<td>{$row["eq_b"]}</td>
<td>{$row["eq_c"]}</td>
<td>{$row["eq_d"]}</td>
</tr>
EOM;
    }
    $res = $res . "</table>";
  }else{
    $res ='<p>検索結果</p>' . '<div>該当するデータはありません</div>';
  }
  con($res);
  echo $res;
  con("出力完了");
}


//  echo "<script> console.log('検索ボタンが押されました。 ')</script>";

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>検索</title>
  <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="score.css"/>
  <script src="score.js"></script>
  <meta http-equiv="content-language" content="ja">
  <meta name="author" content="@rei_roguelike">
  <meta name="robots" content="noindex">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <link rel="icon" type="image/png" href="">
  <meta property="og:url" content="">
  <meta property="og:title" content="">
  <meta property="og:description" content="">
  <meta property="og:type" content="website">
  <meta property="og:image" content="">
  <meta name="twitter:card" content=""/>
  <meta name="twitter:site" content="@rei_roguelike"/>
  <meta name="twitter:image" content="">
</head>
<body>
  <header class="headerclass">
    <div class="header-body">
      <div class="header-logo">
        <a href="">
          <img src="https://i.imgur.com/0gYtByo.png">
        </a>
      </div>
      <nav class="header-nav">
        <ul class="nav-ul">
          <li>
            <a href="">
              <span>HOME</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>Q&A</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>変愚蛮奴</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>ダンプ検索</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>モンスター検索</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>アーティファクト検索</span>
            </a>
          </li>
        </ul>
      </nav>
      <ul class="header-ul">
        <li>
          <a href="">
            <span></span>
          </a>
        </li>
        <li>
          <a href="">
            <span>About us</span>
          </a>
        </li>
      </ul>
    </div>
  </header>
  <div id = "dummy-header" class="headerclass"></div>
  <div id="wrapper">
    <div class="site-list-heading">
      <h1 class="heading-section bigfont">
        <span>SEA<a href="" style="color:#0F0;">R</a>CH</span>
        <!--<span>D</span><span style="color:#840;">U</span><span>MP</span>
        <small>検索</small>-->
      </h1>
    </div>
    <div class="search-form">
      <div class="search-form-elem">
        <form class="search-form-006" name="outputForm" action="" method="POST">
          <!--<p>SQLクエリを入力</p>
          <div>
            <font color="#ff0000">

</font></div>--><input type="text" id="username" name="SQL_txt" placeholder="SQLクエリを入力" value="<?php if (!empty($_POST[" SQL_txt "])) {echo htmlspecialchars($_POST[" SQL_txt "], ENT_QUOTES);} ?>">
<button type="submit" id="search" name="search" value="検索" aria-label="検索"></button>
</form></div>
<div class="modal-002__wrap">
    <input type="radio" id="modal-002__open" class="modal-002__open-input" name="modal-002__trigger"/>
    <label for="modal-002__open" class="modal-002__open-label">詳細検索</label>
    <input type="radio" id="modal-002__close" name="modal-002__trigger"/>
    <div class="modal-002">
        <div class="modal-002__content-wrap">
            <label for="modal-002__close" class="modal-002__close-label">×</label>
            <div class="scrollbox">
            <form id="advanced_search" class="modal-wrapper" method="GET" action="">
              <!-- jsで生成 -->
            </form>
            </div>
        </div>
        <label for="modal-002__close">
            <div class="modal-002__background"></div>
        </label>
    </div>
</div>
</div>
<div class="search-result">
    <div class="small-heading-section bigfont">

            <span><a href="" style="color:#0F0;">R</a>ESULT</span>
      <hr>

    </div>
    <div class="search-result-dump">
    <?php
    input();
      ?>
    </div>
</div>
</div>
<footer class="footer-001">
    <a href="#">
        <!--お好きな画像を指定してください-->
        <svg class="footer-001__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1722.9 411.2">
            <path d="M223 310.5c-30.3 0-55.6-10.1-75.9-30.4-20.3-20.3-30.4-48.8-30.4-85.7s10.5-65 31.5-86.4c21-21.4 46.5-32.1 76.6-32.1s49.4 9.8 68.6 29.4L264.9 140c-12.9-11.9-25.9-17.8-39.2-17.8s-27.7 6.4-37.9 19.1c-10.2 12.8-15.3 29.8-15.3 51.2s4.7 39.8 14.1 52.4c9.4 12.6 22.2 18.9 38.4 18.9s30.2-6.9 43-20.8l28.5 34.1c-19.2 22.2-43.7 33.3-73.6 33.3ZM391 310.5c-15.2 0-30.3-2.8-45.1-8.3s-28-13.6-39.5-24l30.6-37.4c8.1 6.9 17.2 12.5 27.2 16.8 10 4.3 19.3 6.4 28.1 6.4 19.6 0 29.4-6.6 29.4-19.9s-4.4-12.7-13.1-17.2c-2.4-1.4-8.6-4.2-18.7-8.3l-29.1-12.2c-13.3-5.3-24.2-13.2-32.8-23.6-8.6-10.4-12.9-23.2-12.9-38.4s7.7-35.4 23.2-48.5c15.4-13.2 35-19.7 58.8-19.7s26.7 2.5 39.6 7.6c13 5 24.3 12.4 34 22.1l-27 34.1c-15.4-11.7-31-17.5-46.6-17.5s-14.9 1.7-19.7 5c-4.9 3.4-7.3 8-7.3 14s2.3 9.6 7 12.6c4.6 3.1 12.5 6.8 23.6 11.1 1.8.6 3.1 1.1 3.9 1.5l28.2 11.3c29.7 12.1 44.5 32.8 44.5 62s-7.8 36.5-23.3 50.2c-15.5 13.7-36.5 20.5-62.8 20.5ZM579.2 310.5c-15.2 0-30.3-2.8-45.1-8.3s-28-13.6-39.5-24l30.6-37.4c8.1 6.9 17.2 12.5 27.2 16.8 10 4.3 19.3 6.4 28.1 6.4 19.6 0 29.4-6.6 29.4-19.9s-4.4-12.7-13.1-17.2c-2.4-1.4-8.6-4.2-18.7-8.3L549 206.4c-13.3-5.3-24.2-13.2-32.8-23.6-8.6-10.4-12.9-23.2-12.9-38.4s7.7-35.4 23.2-48.5c15.4-13.2 35-19.7 58.8-19.7s26.7 2.5 39.6 7.6c13 5 24.3 12.4 34 22.1l-27 34.1c-15.4-11.7-31-17.5-46.6-17.5s-14.9 1.7-19.7 5c-4.9 3.4-7.3 8-7.3 14s2.3 9.6 7 12.6c4.6 3.1 12.5 6.8 23.6 11.1 1.8.6 3.1 1.1 3.9 1.5L621 178c29.7 12.1 44.5 32.8 44.5 62s-7.8 36.5-23.3 50.2c-15.5 13.7-36.5 20.5-62.8 20.5ZM842.9 310.5c-15.2 0-30.3-2.8-45.1-8.3s-28-13.6-39.5-24l30.6-37.4c8.1 6.9 17.2 12.5 27.2 16.8 10 4.3 19.3 6.4 28.1 6.4 19.6 0 29.4-6.6 29.4-19.9s-4.4-12.7-13.1-17.2c-2.4-1.4-8.6-4.2-18.7-8.3l-29.1-12.2c-13.3-5.3-24.2-13.2-32.8-23.6-8.6-10.4-12.9-23.2-12.9-38.4s7.7-35.4 23.2-48.5c15.4-13.2 35-19.7 58.8-19.7s26.7 2.5 39.6 7.6c13 5 24.3 12.4 34 22.1l-27 34.1c-15.4-11.7-31-17.5-46.6-17.5s-14.9 1.7-19.7 5c-4.9 3.4-7.3 8-7.3 14s2.3 9.6 7 12.6c4.6 3.1 12.5 6.8 23.6 11.1 1.8.6 3.1 1.1 3.9 1.5l28.2 11.3c29.7 12.1 44.5 32.8 44.5 62s-7.8 36.5-23.3 50.2c-15.5 13.7-36.5 20.5-62.8 20.5ZM1030.5 310.5c-20.8 0-36.2-6-46.2-18.1-10-12.1-15-28.8-15-50.2v-66.5h-23.5v-40.1l26.7-2.4 5.9-45.4h45.1v45.4h40.7v42.5h-40.7v65.9c0 17.8 7.2 26.7 21.7 26.7s9.1-1 16-3l8.3 38.9c-14.3 4.2-27.3 6.2-39.2 6.2ZM1169.7 310.5c-23.2 0-43.1-8.2-59.8-24.6-16.7-16.4-25.1-38.4-25.1-65.9s8.4-49.5 25.1-66.1c16.7-16.5 36.7-24.8 59.8-24.8s42.8 8.3 59.4 24.8 24.9 38.5 24.9 66.1-8.3 49.5-24.9 65.9c-16.6 16.4-36.4 24.6-59.4 24.6Zm0-43.6c19.4 0 29.1-15.6 29.1-46.9s-9.7-47.2-29.1-47.2-29.7 15.7-29.7 47.2 9.9 46.9 29.7 46.9ZM1364.5 310.5c-25.1 0-45.8-8.1-61.9-24.3-16.1-16.2-24.2-38.3-24.2-66.2s8.8-49.8 26.4-66.2c17.6-16.4 39.1-24.6 64.4-24.6s36.2 6.1 50.5 18.4l-25.2 34.7c-7.5-6.3-14.9-9.5-22.3-9.5-11.9 0-21.3 4.3-28.2 12.8-6.9 8.5-10.4 20-10.4 34.4s3.4 25.4 10.2 34c6.8 8.6 15.7 12.9 26.6 12.9s20.2-4.1 30.3-12.2l20.5 35.6c-15 13.5-33.9 20.2-56.7 20.2ZM1451.2 306.4V63.5h52.5v135.7h1.2l52.5-65.9h58.8l-61.2 71.6 65.3 101.5h-58.8l-37.1-65.6-20.8 23.5v42.2h-52.5Z" fill="#fff"/>
        </svg>
    </a>
    <nav>
        <ul class="footer-001__list">
            <li>
                <a href="#" class="footer-001__link">Link1</a>
            </li>
            <li>
                <a href="#" class="footer-001__link">Link2</a>
            </li>
            <li>
                <a href="#" class="footer-001__link">Link3</a>
            </li>
            <li>
                <a href="#" class="footer-001__link">Link4</a>
            </li>
            <li>
                <a href="#" class="footer-001__link">Link5</a>
            </li>
        </ul>
    </nav>
    <p class="footer-001__copyright">2023 "＠観光ガイド" All rights reserved.</p>
</footer>
</body>
</html>
