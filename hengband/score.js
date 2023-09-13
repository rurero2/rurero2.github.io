window.addEventListener('load',function() {
    makeSelector("種族",["すべて","人間","ハーフエルフ","エルフ","ホビット","ノーム","ドワーフ","ハーフオーク","ハーフトロル"
    ,"アンバライト","ハイエルフ","野蛮人","ハーフオーガ","半巨人","半タイタン","サイクロプス","イーク","クラッコン","コボルド","ニーベルング"
    ,"ダークエルフ","ドラコニアン","マインドフレア","インプ","ゴーレム","骸骨","ゾンビ","吸血鬼","幽霊","妖精","獣人","エント","アルコン","バルログ","ドゥナダン"
    ,"影フェアリー","クター","アンドロイド","マーフォーク"],"s",0)
    makeSelector("職業",["すべて","戦士","メイジ","プリースト","盗賊","レンジャー","パラディン","魔法戦士","混沌の戦士","修行僧","超能力者"
    ,"ハイ=メイジ","観光客","ものまね師","魔獣使い","スペルマスター","アーチャー","魔道具術師","吟遊詩人","赤魔道師","剣術家"
    ,"練気術師","青魔道師","騎兵","狂戦士","鍛冶師","鏡使い","忍者","スナイパー","元素使い"],"s",0)
    makeSelector("領域",['すべて', '生命', '仙術', '自然', 'カオス', '暗黒', 'トランプ', '秘術', '匠', '悪魔',
                  '破邪', '歌', '武芸', '呪術', '炎', '氷', '空', '海', '闇', '混沌', '地', '瘴気']
      ,"s",0)
    makeSelector("性格",['すべて', 'ふつうの', 'ちからじまんの', 'きれものの', 'しあわせものの', 'すばしっこい', 'いのちしらずの', 'コンバット',
     'なまけものの', 'セクシーギャルの', 'ラッキーマンの', 'がまんづよい', 'いかさまの', 'チャージマン']
     ,"s",0)
    makeSelector("キャラクター名",[],"t",0)
    makeSelector("死因",[],"t",0, placeholder="勝利")
    makeSelector("右手装備",[],"t",0)/*利き手オプション？*/
    makeSelector("左手装備",[],"t",0)
    makeSelector("射撃装備",[],"t",0)
    makeSelector("右手指輪",[],"t",0)
    makeSelector("左手指輪",[],"t",0)
    makeSelector("アミュレット",[],"t",0)
    makeSelector("光源",[],"t",0)
    makeSelector("胴防具",[],"t",0)
    makeSelector("外套",[],"t",0)
    makeSelector("頭防具",[],"t",0)
    makeSelector("籠手",[],"t",0)
    makeSelector("靴",[],"t",0)
    makeSelector("オプション",["悪夢モード","保存モード"],"c",0)
    makeSelector("ソート順",["新着順","プレイ時間","平均ダメージ","加速"],"s",0)
    makeSelector("",[],"submit",0)
    console.log("made")

});

const makeSelector =(title,options,selectortype,selectednum=0,placeholder="")=>{
  switch (selectortype) {
    case "s":
      var res='<h3 class="selector_title">'+ title +'</h3>\
      <select name="'+title+'">'
      for(var num in options){
        var selected = selectednum == num ? "" : " selected "
        res = res + '<option value="'+options[num]+'" >'+options[num]+'</option>'
      }
      res = res + '</select>'
      break;
    /*case "r":
      var res='<div class="rangeslider">'
      var res= res + '<h3 class="selector_title">'+ title +'</h3>\
      <input type="range" name="'+title+'" list="'+title+'_values" />\
      <datalist id="'+title+'_values">'
      for(var num in options){
        res = res + '<option value="'+num+'" label='+options[num]+'></option>'
      }
      res = res + '</datalist>'
      res = res + '</div>'
      break;*/
    case "t":
      var res='<h3 class="selector_title">'+ title +'</h3>\
        <input type="text" placeholder="'+placeholder+'" name="'+title+'">'
      break;
    case "c":
      var res='<h3 class="selector_title">'+ title +'</h3>\n<ul>'
      for(var num in options){
        var id = title + "_" + options[num]
        res = res + "<li>\n<span>"
        res = res + '<input type="checkbox" id="'+ id +'" name="'+options[num]+'" value="ON" />\
        <label for="'+ id +'" >'+options[num]+'</label>'
        res = res + "</span></li>\n"
      }
      res = res + '</ul>'
      break;
    case "submit":
      var res = '<input type="submit" value="検索">'
      break;
    default:
      break;
  }
  document.getElementById("advanced_search").innerHTML=document.getElementById("advanced_search").innerHTML+res
}
