function autofill() {
  var situation= document.getElementById("situation").value;
  //var bow= document.getElementById("bow").value;
  var bow= document.getElementById("bow").options[document.getElementById("bow").selectedIndex].text;
  var arrow= document.getElementById("arrow").options[document.getElementById("arrow").selectedIndex].text;
  
  var data={}

  data["meichuu_default"]=0
  data["dam_mod"]=0
  data["dam_mult"]=0
  data["slay"]=1
  data["is_sniper"]=false
  data["is_xbow"]=false

  

  //read_item()

  switch(situation){
    case "sniper_J":
      data["meichuu_default"] = data["meichuu_default"] + 150;
      data["slay"] = data["slay"]>5 ? data["slay"]:5;
      data["concentration"] = 7;
      data["is_sniper"]=true
      data["dam_mult"] = data["dam_mult"] + 0.8;
      data["enemy"]=175
      
      break;

    case "archer_J":
      data["meichuu_default"] = data["meichuu_default"] + 140;
      data["slay"] = data["slay"]>1 ? data["slay"]:1;
      data["concentration"] = 0;
      data["is_sniper"]=false
      data["dam_mult"] = data["dam_mult"] + 0.8;
      data["enemy"]=175
      
      break;
      
    default:
      break;
  }
  switch(bow){
    case "★名射手ウィリアム・テルのライト・クロスボウ (x4) (1.20turn) (+40,+13)":
      data["meichuu_bow"] = 40;
      data["is_xbow"]=true
      data["dam_mod"] = data["dam_mod"] + 13;
      data["dam_mult"] = data["dam_mult"] + 4.0;
      break;

    case "★ヘヴィ・クロスボウ『獅子殺し』 (x5) (1.33turn) (+19,+19)":
      data["meichuu_bow"] = 19;
      data["is_xbow"]=true
      data["dam_mod"] = data["dam_mod"] + 19;
      data["dam_mult"] = data["dam_mult"] + 5.0;
      break;
      
    case "★ハラドのヘヴィ・クロスボウ (x5) (0.66turn) (+18,+18) [-44]":
      data["meichuu_bow"] = 18;
      data["is_xbow"]=true
      data["dam_mod"] = data["dam_mod"] + 18;
      data["dam_mult"] = data["dam_mult"] + 5.0;
      break;
      
    default:
      var pattern = /(^.+) \(x(\d)\) \((.+)turn\) \([\+\-](\d+),[\+\-](\d+)\)/g
      var wp_data = pattern.exec(bow)
      if(wp_data != null){
        data["meichuu_bow"] = Number(wp_data[4]);
        data["is_xbow"]= wp_data[1].includes('クロスボウ');
        data["dam_mod"] = data["dam_mod"] + Number(wp_data[5]);
        data["dam_mult"] = data["dam_mult"] + Number(wp_data[2]);
      }else{
        alert("武器パターンにマッチしません")
      }
      break;
      
  }
  switch(arrow){
    case "★名射手ウィリアム・テルの鋼鉄のクロスボウの矢 (6d5) (+20,+16)":
      data["meichuu_arrow"] = 20;
      data["dam_mod"] = data["dam_mod"] + 16;
      data["arrow_type"] = 2;
      data["arrow_dice_num"] = 6;
      data["arrow_dice_pip"] = 5;
      break;
      
    case "追尾クロスボウの矢 (6d5) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 3;
      data["arrow_dice_num"] = 6;
      data["arrow_dice_pip"] = 5;
      break;
    
    case "鋼鉄のクロスボウの矢 (3d5) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 4;
      data["arrow_dice_num"] = 3;
      data["arrow_dice_pip"] = 5;
      break;

    case "クロスボウの矢 (1d5) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 3;
      data["arrow_dice_num"] = 1;
      data["arrow_dice_pip"] = 5;
      break;
    
    case "★射手バルド王の黒い矢 (8d6) (+40,+10)":
      data["meichuu_arrow"] = 40;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 2;
      data["arrow_dice_num"] = 8;
      data["arrow_dice_pip"] = 6;
      break;
      
    case "追尾の矢 (6d4) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 2;
      data["arrow_dice_num"] = 6;
      data["arrow_dice_pip"] = 4;
      break;

    case "束矢 (2d4) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 4;
      data["arrow_dice_num"] = 2;
      data["arrow_dice_pip"] = 4;
      break;

    case "ミスリルの弾 (4d3) (+10,+10)":
      data["meichuu_arrow"] = 10;
      data["dam_mod"] = data["dam_mod"] + 10;
      data["arrow_type"] = 5;
      data["arrow_dice_num"] = 4;
      data["arrow_dice_pip"] = 3;
      break;
      
    default:
      break;
  }
  data["meichuu_default"] = data["meichuu_default"] + data["meichuu_bow"];
  data["xbow_mod"] = data["is_sniper"]*data["is_xbow"]+1
  
  document.getElementById("meichuu_default").value = data["meichuu_default"]
  document.getElementById("meichuu_bow").value  = data["meichuu_bow"]
  document.getElementById("meichuu_arrow").value = data["meichuu_arrow"]
  document.getElementById("arrow_type").querySelector("option[value='" +data["arrow_type"]+ "']").selected = true; 
  document.getElementById("arrow_dice_num").value  = data["arrow_dice_num"]
  document.getElementById("arrow_dice_pip").value  = data["arrow_dice_pip"]
  document.getElementById("dam_mod").value  = data["dam_mod"]
  document.getElementById("dam_mult").value  = data["dam_mult"]
  document.getElementById("slay").querySelector("option[value='" +data["slay"]+ "']").selected = true;
  document.getElementById("concentration").value  = data["concentration"]
  document.getElementById("xbow_mod").querySelector("option[value='" +data["xbow_mod"]+ "']").selected = true;
  document.getElementById("enemy").querySelector("option[value='" +data["enemy"]+ "']").selected = true;
  
  sniper_tool_get()
  
}



function mt_autofill() {
  var situation= document.getElementById("mt_situation").value;
  var weapon= document.getElementById("mt_weapon").options[document.getElementById("mt_weapon").selectedIndex].text;
  var data={}
  data["twoweapon_penalty"]=document.getElementById("mt_twoweapon_penalty").value;

  data["meichuu_default"]=0
  data["dam_plus"]=0
  data["slay"]=1
  data["vopal"]=0
  data["is_ninja"]=false
  data["ninja_hit"]=0
  data["backstab"]=0
  data["impact"]=0
  data["str"]=20
  data["force"]=false
  data["magic_slay"]=false

  //read_item()

  switch(situation){
    case "warrior_J":
      data["player_class"] = "0";
      data["meichuu_default"] = data["meichuu_default"] + 150;
      data["enemy"]=175
      data["str"]=20
      data["blow_num"]=6
      data["backstab_mode"]="0"
      data["dam_plus"] = data["dam_plus"] + 10;

      data["stealth"]=21
      data["aggravate"]=false
      data["light"]=true
      data["player_lv"]=50
      data["enemy_lv"]=90
      data["enemy_hp"]=12321
      data["unique"]=false
      data["half_hp"]=false
      data["enemy_sleep"]=true
      
      break;
      
    case "ninja_D":
      data["player_class"] = "ninja";
      data["meichuu_default"] = data["meichuu_default"] + 100;
      data["enemy"]=111
      data["str"]=20
      data["backstab_mode"]="sleep"
      data["ninja_hit"]="deadly"
      data["blow_num"]=4
      data["dam_plus"] = data["dam_plus"] + 5;

      data["stealth"]=21
      data["aggravate"]=false
      data["light"]=true
      data["player_lv"]=50
      data["enemy_lv"]=90
      data["enemy_hp"]=12321
      data["unique"]=false
      data["half_hp"]=false
      data["enemy_sleep"]=true

      break;
      
    case "ninja_J":
      data["player_class"] = "ninja";
      data["meichuu_default"] = data["meichuu_default"] + 100;
      data["enemy"]=175
      data["str"]=20
      data["backstab_mode"]="0"
      data["ninja_hit"]="0"
      data["blow_num"]=4
      data["dam_plus"] = data["dam_plus"] + 5;

      data["stealth"]=21
      data["aggravate"]=false
      data["light"]=true
      data["player_lv"]=50
      data["enemy_lv"]=100
      data["enemy_hp"]=30000
      data["unique"]=true
      data["half_hp"]=false
      data["enemy_sleep"]=false

      break;
      
    default:
      break;
  }
  switch(weapon){
    case "★適当な棒 (1d77) (+22,+22) [+10]":
      data["weight_kg"]=2.5
      data["slay"] = 2;
      break;

    case "★破壊の隼の剣 (3d6) (+10,+25)":
      data["weight_kg"]=1.5
      data["slay"] = 1;
      data["aggravate"]=true
      data["blow_num"]=data["blow_num"]+3
      break;

    case "★レイピア『シルバーチャリオッツ』 (2d6) (+17,+12)":
      data["weight_kg"]=3.7
      data["slay"] = 2;
      data["blow_num"]=data["blow_num"]+2
      break;

    case "★スモール・ソード『エクスカリバー・ジュニア』 (2d6) (+10,+10)":
      data["weight_kg"]=4
      data["slay"] = 1;
      data["blow_num"]=data["blow_num"]+2
      break;

    case "★ダガー『マジックベーン』 (2d4) (+10,+10)":
      data["weight_kg"]=0.6
      data["slay"] = 1;
      data["magic_slay"]=true
      break;

    case "★スモール・ソード『つらぬき丸』 (1d6) (+10,+10)":
      data["weight_kg"]=3.7
      data["slay"] = 2;
      data["blow_num"]=data["blow_num"]+2
      break;

    case "★二天一流開祖宮本武蔵の脇差し (3d4) (+28,+17)":
      data["weight_kg"]=4.5
      data["vopal"]="normal"
      data["slay"] = 1;
      break;

    case "★抜け忍カムイの忍者刀 (2d9) (+15,+10)":
      data["weight_kg"]=5
      data["slay"] = 1;
      data["stealth"]=data["stealth"]+4
      break;

    case "★混沌の王子マーリンのショート・ソード (1d7) (+10,+10)":
      data["weight_kg"]=4
      data["slay"] = 1;
      data["blow_num"]=data["blow_num"]+2
      break;

    case "★ダガー『ニムサンク』 (2d4) (+10,+10)":
      data["weight_kg"]=0.6
      data["slay"] = 1;
      break;

    case "★レイピア『フォラスギル』 (2d6) (+12,+19)":
      data["weight_kg"]=2
      data["slay"] = 1;
      break;

    case "★ドワーフ王アザガルのマン・ゴーシュ (2d5) (+12,+14)":
      data["weight_kg"]=1.5
      data["slay"] = 1;
      break;

    case "★レイピア『すばやき刺』 (1d7) (+27,+10)":
      data["weight_kg"]=2.7
      data["slay"] = 1;
      data["blow_num"]=data["blow_num"]+3
      break;

    case "★マン・ゴーシュ『小さき刺』 (1d5) (+18,+10)":
      data["weight_kg"]=1.5
      data["slay"] = 2;
      break;

    case "★憤怒の三叉槍 (3d9) (+16,+18)":
      data["weight_kg"]=15;
      data["slay"] = 2;
      break;

    case "★水の王ウルモのトライデント (4d8) (+15,+19)":
      data["weight_kg"]=3.5
      data["slay"] = 1
      break;

    case "★顕聖二郎真君のトライデント (2d8) (+12,+16)":
      data["weight_kg"]=3.5
      data["slay"] = 1
      break;

    case "★破壊神シヴァの三叉槍『トリシューラ』 (4d9) (+15,+25) [+5]":
      data["weight_kg"]=20
      data["slay"] = 2
      break;

    case "★バルログの長ゴスモグのムチ (6d12) (+15,+25)":
      data["weight_kg"]=15
      data["slay"] = 1
      break;

    case "★ムチ『ヴァンパイア・キラー』 (5d6) (+15,+21)":
      data["weight_kg"]=3.7
      data["slay"] = 2
      break;

    case "★鉄棒『如意金葹棒重一万三千五百斤』 (7d7) (+10,+25) [+10]":
      data["weight_kg"]=25
      data["slay"] = 2
      break;

    case "★グレート・ソード『ドラゴンころし』 (8d8) (+10,+15) [+10]":
      data["weight_kg"]=25
      data["impact"]="impact"
      break;

    case "★フレイル『ウィンブロウズ』 (8d6) (+10,+30)":
      data["weight_kg"]=25
      data["impact"]="impact"
      break;

    case "★ロング・ソード『ヴォーパルブレード』 (5d5) (+32,+32)":
      data["weight_kg"]=7.5
      data["slay"] = 2
      data["vopal"]="special"
      break;

    case "★苦痛のグレイブ (9d6) (+10,+30)":
      data["weight_kg"]=9.5
      break;

    case "☆剣の女王キシオムバーグのヘヴィ・ランス (4d8) (+40,+34) (+4探索) {+探r乱獄沌劣;瞬|焼沌理/邪デ}":
      data["weight_kg"]=20
      data["slay"] = 2
      data["force"] = true
      break;
      
    default:
      var pattern = /(^.+) \((\d+)d(\d+)\) \([\+\-](\d+),[\+\-](\d+)\)/g
      var wp_data = pattern.exec(weapon)
      if(wp_data != null){
        if (wp_data[1].includes('忍者刀')){
          data["weight_kg"]=5
        }else if (wp_data[1].includes('脇差し')){
          data["weight_kg"]=4.5
        }else{
          data["weight_kg"]=0.1
          alert("重量データなし")
        }
      }else{
        alert("武器パターンにマッチしません")
      }
      break;
    
  }
  var pattern = /(^.+) \((\d+)d(\d+)\) \([\+\-](\d+),[\+\-](\d+)\)/g
  var wp_data = pattern.exec(weapon)
  if(wp_data != null){
    data["meichuu_weapon"] = Number(wp_data[4]);
    data["dam_plus"] = data["dam_plus"] + Number(wp_data[5]);
    data["dice_num"] = Number(wp_data[2]);
    data["dice_pip"] = Number(wp_data[3]);
    if (data["twoweapon_penalty"]!="no" && (wp_data[1].includes('三叉槍') || wp_data[1].includes('トライデント'))){
      data["meichuu_default"]=data["meichuu_default"]-10
    }
  }else{
    alert("武器パターンにマッチしません")
  }

  if (data["twoweapon_penalty"]!="no"){
    console.log("twoweapon_penalty",data["twoweapon_penalty"])
    if (data["twoweapon_penalty"][0]=="g"){
      data["meichuu_default"]=data["meichuu_default"]+(Number(data["twoweapon_penalty"].slice(1))/160 + (130 -data["weight_kg"]*20)/8 -100)/2
    }else{
      console.log("twoweapon_penalty",Number(data["twoweapon_penalty"]))
      data["meichuu_default"]=data["meichuu_default"]+(Number(data["twoweapon_penalty"])/160 + (130 -data["weight_kg"]*20)/8 -100)
    }
  }
  
  data["meichuu_default"] = data["meichuu_default"] + data["meichuu_weapon"];
  data["dam_plus"] = data["dam_plus"] + data["str"];
  
  document.getElementById("mt_player_class").querySelector("option[value='" +data["player_class"]+ "']").selected = true;
  document.getElementById("mt_meichuu_default").value =data["meichuu_default"]
  document.getElementById("mt_meichuu_weapon").value = data["meichuu_weapon"]
  document.getElementById("mt_weight_kg").value = data["weight_kg"]
  document.getElementById("mt_dice_num").value = data["dice_num"];
  document.getElementById("mt_dice_pip").value = data["dice_pip"];
  document.getElementById("mt_slay").querySelector("option[value='" +data["slay"]+ "']").selected = true;
  document.getElementById("mt_force").checked = data["force"];
  document.getElementById("mt_dam_plus").value  = data["dam_plus"];
  //document.getElementById("mt_str").value  = data["str"];
  document.getElementById("mt_vopal").querySelector("option[value='" +data["vopal"]+ "']").selected = true;
  document.getElementById("mt_blow_num").value  = data["blow_num"];
  document.getElementById("mt_enemy").value  = data["enemy"];

  document.getElementById("mt_impact").querySelector("option[value='" +data["impact"]+ "']").selected = true;
  document.getElementById("mt_backstab_mode").querySelector("option[value='" +data["backstab_mode"]+ "']").selected = true;
  document.getElementById("mt_ninja_hit").querySelector("option[value='" +data["ninja_hit"]+ "']").selected = true;

  document.getElementById("mt_stealth").value = data["stealth"];
  document.getElementById("mt_aggravate").checked = data["aggravate"];
  document.getElementById("mt_light").checked = data["light"];
  document.getElementById("mt_player_lv").value =data["player_lv"]
  document.getElementById("mt_enemy_lv").value =data["enemy_lv"]
  document.getElementById("mt_enemy_hp").value =data["enemy_hp"]
  document.getElementById("mt_unique").checked = data["unique"];
  document.getElementById("mt_half_hp").checked = data["half_hp"];
  document.getElementById("mt_enemy_sleep").checked = data["enemy_sleep"];

  document.getElementById("mt_magic_slay").checked = data["magic_slay"];

  melee_tool_get()
  
}

function sniper_tool_get(){
  
    var meichuu_default= Number( document.getElementById("meichuu_default").value );
    var meichuu_bow= Number( document.getElementById("meichuu_bow").value );
    var meichuu_arrow= Number(document.getElementById("meichuu_arrow").value);
    var arrow_type= Number( document.getElementById("arrow_type").value );
    var arrow_dice_num= Number( document.getElementById("arrow_dice_num").value );
    var arrow_dice_pip= Number( document.getElementById("arrow_dice_pip").value );
    var dam_mod= Number( document.getElementById("dam_mod").value );
    var dam_mult= Number( document.getElementById("dam_mult").value );
    var slay= Number( document.getElementById("slay").value );
    var concentration= Number( document.getElementById("concentration").value );
    var xbow_mod= Number( document.getElementById("xbow_mod").value );
    var enemy= Number( document.getElementById("enemy").value );
  var result=sniper_calc(meichuu_default,meichuu_bow,meichuu_arrow,arrow_type,arrow_dice_num,arrow_dice_pip,dam_mod,
             dam_mult,slay,concentration,xbow_mod,enemy);
  
  document.getElementById("hit_chance").innerHTML=result["hit_chance"] +"%";
  document.getElementById("crit_chance").innerHTML=result["crit_chance"] +"%";
  document.getElementById("average_real_dam").innerHTML=result["average_real_dam"];
  document.getElementById("average_hit_dam").innerHTML=result["average_hit_dam"];
  document.getElementById("average_crit_dam").innerHTML=result["average_crit_dam"];
  document.getElementById("crit_dam").innerHTML=result["crit_dam_min"] + "～"+ result["crit_dam_max"];
  document.getElementById("no_crit_dam").innerHTML=result["no_crit_dam_min"] + "～"+ result["no_crit_dam_max"];
  
  console.log("表示ダメージ:" + result["average_dam"])
  
}

function melee_tool_get(){
  
  var mt_player_class= document.getElementById("mt_player_class").value;
  var mt_meichuu_default= Number( document.getElementById("mt_meichuu_default").value );
  var mt_meichuu_weapon= Number( document.getElementById("mt_meichuu_weapon").value );
  var mt_weight_kg= Number( document.getElementById("mt_weight_kg").value );
  var mt_dice_num= Number( document.getElementById("mt_dice_num").value );
  var mt_dice_pip= Number( document.getElementById("mt_dice_pip").value );
  var mt_slay= Number( document.getElementById("mt_slay").value );
  var mt_force= document.getElementById("mt_force").checked;
  var mt_dam_plus= Number( document.getElementById("mt_dam_plus").value );
  //var mt_str= Number( document.getElementById("mt_str").value );
  var mt_vopal= document.getElementById("mt_vopal").value;
  var mt_blow_num= Number( document.getElementById("mt_blow_num").value );
  var mt_enemy= Number( document.getElementById("mt_enemy").value );

  var mt_impact= document.getElementById("mt_impact").value;
  var mt_backstab_mode= document.getElementById("mt_backstab_mode").value;
  var mt_ninja_hit= document.getElementById("mt_ninja_hit").value;

  var mt_stealth= Number(document.getElementById("mt_stealth").value)
  var mt_aggravate= document.getElementById("mt_aggravate").checked
  var mt_light= document.getElementById("mt_light").checked
  var mt_player_lv= Number(document.getElementById("mt_player_lv").value)
  var mt_enemy_lv= Number(document.getElementById("mt_enemy_lv").value)
  var mt_enemy_hp= Number(document.getElementById("mt_enemy_hp").value)
  var mt_unique= document.getElementById("mt_unique").checked
  var mt_half_hp= document.getElementById("mt_half_hp").checked
  var mt_enemy_sleep= document.getElementById("mt_enemy_sleep").checked

  
  var mt_magic_slay= document.getElementById("mt_magic_slay").checked
  var mt_additional_slay= document.getElementById("mt_additional_slay").value
  var mt_final_slay= Number(document.getElementById("mt_final_slay").value)
  
  var result=melee_calc(mt_player_class,mt_meichuu_default,mt_meichuu_weapon,mt_weight_kg,
                         mt_blow_num,mt_dice_num,mt_dice_pip,mt_slay,/*mt_str,*/mt_dam_plus,mt_force,mt_vopal,
                       mt_enemy,mt_impact,mt_backstab_mode,mt_ninja_hit,
                       mt_stealth,mt_aggravate,mt_light,mt_player_lv,
                        mt_enemy_lv,mt_enemy_hp,mt_unique,mt_half_hp,mt_enemy_sleep,
                       mt_magic_slay,mt_additional_slay,mt_final_slay);
  
  document.getElementById("mt_hit_chance").innerHTML=result["hit_chance"] +"%";
  document.getElementById("mt_crit_chance").innerHTML=result["crit_chance"] +"%";
  document.getElementById("mt_average_real_dam").innerHTML=result["average_real_dam"];
  document.getElementById("mt_average_hit_dam").innerHTML=result["average_hit_dam"];
  document.getElementById("mt_average_crit_dam").innerHTML=result["average_crit_dam"];
  document.getElementById("mt_crit_dam").innerHTML=result["crit_dam_min"] + "～"+ result["crit_dam_max"];
  document.getElementById("mt_no_crit_dam").innerHTML=result["no_crit_dam_min"] + "～"+ result["no_crit_dam_max"];

  if(mt_player_class!="ninja"){
    document.getElementById("mt_surprise_attack_chance").innerHTML="なし"
    document.getElementById("mt_surprise_attack_chance_irimi").innerHTML="なし"
    document.getElementById("mt_ninja_hit_chance").innerHTML="なし"
    document.getElementById("mt_deadly_chance").innerHTML="なし"
  
    document.getElementById("mt_first_attack_irimi").innerHTML="なし";
    document.getElementById("mt_hayagake_td").innerHTML="なし"
    document.getElementById("mt_irimi_td").innerHTML="なし"
  }else{
    document.getElementById("mt_surprise_attack_chance").innerHTML=result["surprise_attack_chance"] +"%";
    document.getElementById("mt_surprise_attack_chance_irimi").innerHTML=result["surprise_attack_chance_irimi"] +"%";
    document.getElementById("mt_ninja_hit_chance").innerHTML=result["ninja_hit_chance"] +"%";
    document.getElementById("mt_deadly_chance").innerHTML=result["deadly_chance"] +"%";
  
    document.getElementById("mt_first_attack_irimi").innerHTML=result["first_attack_irimi"];
    document.getElementById("mt_hayagake_td").innerHTML=result["hayagake_td"]
    document.getElementById("mt_irimi_td").innerHTML=result["irimi_td"]
  }

  
  
}

function sniper_calc(meichuu_default,meichuu_bow,meichuu_arrow,arrow_type,arrow_dice_num,arrow_dice_pip,dam_mod,
             dam_mult,slay,concentration,xbow_mod,enemy){
    
    var formula=""
    var hit_chance=1 - Math.max(Math.min((enemy*3/4)*((8-concentration)/8) / ((meichuu_default+meichuu_arrow)*3),1),0)
    
    var hit_chance=0.05 + hit_chance * (0.90 + Math.min((concentration)/100,0.05))
  
    var min_dam=((arrow_dice_num)*(1) + dam_mod) *dam_mult *(10 +concentration)/10 *slay
    var max_dam=((arrow_dice_num)*(arrow_dice_pip) + dam_mod) *dam_mult *(10 +concentration)/10 *slay
    var average_dam=((arrow_dice_num)*(1+arrow_dice_pip)/2 + dam_mod) *dam_mult *(10 +concentration)/10 *slay
    var crit_chance=Math.min((meichuu_default - meichuu_bow + meichuu_arrow) * 3 * (5 +concentration)/5 *xbow_mod +meichuu_bow*8*(5+concentration),10000)/10000
    var arrow_weight=500*arrow_type
    var average_crit_mult=
      1.5*(Math.min(900,(arrow_weight))/arrow_weight) 
      +2*((arrow_weight>900?(arrow_weight>1300?400:arrow_weight-900):0)/arrow_weight) 
      +3*((arrow_weight>1300?arrow_weight-1300:0)/arrow_weight)
   
    var min_crit_dam=1.5 *min_dam
    var max_crit_dam= (arrow_weight>1300?3:(arrow_weight>900?2:1.5)) * max_dam;
    var average_hit_dam= average_dam*(1-crit_chance) + average_dam*crit_chance*average_crit_mult
  
    return {
      "average_dam":Math.ceil(average_dam),
      "hit_chance":Math.ceil(hit_chance*1000)/10, "crit_chance":Math.ceil(crit_chance*1000)/10, 
      "average_real_dam":Math.ceil(average_hit_dam*hit_chance),"average_hit_dam":Math.ceil(average_hit_dam), 
      "average_crit_dam":Math.ceil(average_dam*average_crit_mult), 
      "crit_dam_max":Math.ceil(max_crit_dam), "crit_dam_min":Math.ceil(min_crit_dam),
      "no_crit_dam_max":Math.ceil(max_dam), "no_crit_dam_min":Math.ceil(min_dam),
            }
}

function melee_calc(player_class,meichuu_default,meichuu_weapon,weight_kg,
                        blow_num,dice_num,dice_pip,slay,/*str,*/dam_plus,force,vopal,
                    enemy_ac,impact,backstab_mode,ninja_hit,
                   stealth,aggravate,light,player_lv,
                        enemy_lv,enemy_hp,unique,half_hp,enemy_sleep,
                   magic_slay,additional_slay,final_slay){
  var twoweapon="no"
  if (player_class=="ninja"){
    //dam_plus=dam_plus/2
  }
  if (twoweapon!="no"){
    //dam_plus=dam_plus/2
  }
  dice_num = magic_slay ? dice_num*1.314:dice_num;
  var special=final_slay;
  var sub_blow_num=0

  var backstab_mult=1

  var char_lazy=false
  var hit_chance=0.05
  var miss_chance=char_lazy?0.1:0.05

  var twoweapon=8000/160 + (130-weight_kg*20)/8 - 100
  console.log("hit_chance",(1-hit_chance-miss_chance),(enemy_ac*0.75/meichuu_default),hit_chance + (1-hit_chance-miss_chance)*(enemy_ac*0.75/meichuu_default)*-1)
  hit_chance= hit_chance + (1-hit_chance-miss_chance)*(1-Math.min(Math.max(enemy_ac*0.75/(meichuu_default*3),0),1))
  
  
  var surprise_attack_chance=0
  var surprise_attack_chance_irimi=0
  var ninja_hit_chance=0
  var deadly_chance=0

  if ((player_class=="monk_martial") || (player_class=="monk_martial_byakko")){
    var matial_table = [
      [ "を殴った。", [1], 0, [1], [5, 4], 0 ],
    [ "を蹴った。", [2], 0, [1], [7, 6], 0 ],
    [ "に正拳突きをくらわした。", [3], 0, [1], [9, 7], 0 ],
    [ "に膝蹴りをくらわした。", [5], 5, [2], [4, 3], "MA_KNEE" ],
    [ "に肘打ちをくらわした。", [7], 5, [1], [12, 8], 0 ],
    [ "に体当りした。", [9], 10, [2], [6, 5], 0 ],
    [ "を蹴った。", [11], 10, [3], [6, 4], "MA_SLOW" ],
    [ "にアッパーをくらわした。", [13], 12, [5, 4], [5, 4], 6 ],
    [ "に二段蹴りをくらわした。", [16], 15, [5], [6, 4], 8 ],
    [ "に猫爪撃をくらわした。", [20], 20, [5], [8, 5], 0 ],
    [ "に跳空脚をくらわした。", [24, 25], 25, [6, 5], [8, 6], 10 ],
    [ "に鷲爪襲をくらわした。", [28, 29], 25, [7, 6], [9, 6], 0 ],
    [ "に回し蹴りをくらわした。", [32, 33], 30, [8, 6], [10, 8], 10 ],
    [ "に鉄拳撃をくらわした。", [35, 37], 35, [8], [11, 8], 10 ],
    [ "に飛空脚をくらわした。", [39, 41], 35, [8], [12, 10], 12 ],
    [ "に昇龍拳をくらわした。", [43, 45], 35, [9, 10], [12, 10], 16 ],
    [ "に石破天驚拳をくらわした。",  [48], 40, [10], [13, 12], 18 ],
                       ]
    console.log(player_lv,player_lv/7,Math.ceil(player_lv/7))
    var reroll_num=Math.ceil((player_class=="monk_martial_byakko")?(player_lv/3):(player_lv/7))
    
    var decide_chance_per_roll=0
    matial_table.forEach(art=>{
      if ((art[1][0]<=player_lv)){
        
        decide_chance_per_roll = decide_chance_per_roll + (1-(art[2]/player_lv))/17
      }
    })
    
    var reroll_chance_per_roll=1-decide_chance_per_roll
    console.log("選び直す確率:" + reroll_chance_per_roll*100 + "%")
    var avarage_dice=0
    var chance_list=[]
    matial_table.forEach(art=>{
      if (art[1]<=player_lv){
        var decide_chance=1-(art[2]/player_lv);
        decide_chance=  decide_chance/17 /decide_chance_per_roll
        chance_list.push(decide_chance)
      }else{
        chance_list.push(0)
      }
    })
    console.log("一回試行で攻撃ごとの確率表",chance_list)

    var avarage_dice_roll=0 
    //すべてindex以下かつindexが一回以上選ばれる確率
    matial_table.forEach((art,index)=>{
      var decide_chance_finally=0
      chance_list.forEach((chance,index2)=>{
        if (index2<=index){
          decide_chance_finally=decide_chance_finally+chance;
        }
      })
      decide_chance_finally=decide_chance_finally**reroll_num
      var at_least_1select=1- ((1-chance_list[index])**reroll_num)
      decide_chance_finally=decide_chance_finally*at_least_1select
      console.log("一回の攻撃で"+ art[0] + "が出る確率:" + decide_chance_finally)

      avarage_dice_roll=avarage_dice_roll+decide_chance_finally*(art[3][0]*(1+art[4][0])/2)

      console.log("期待値込み:" + (decide_chance_finally *(art[3][0]*(1+art[4][0])/2)))
    })
    console.log(avarage_dice_roll)
    
    
  }

  //忍者処理。フラグとは無関係に算出。直接ダメージに関わる処理はここでは行わない。
  //通常時とirimi時両方の変数
  if (player_class=="ninja"){
    console.log("ninja")
    console.log(light)
    var surprise_attack_chance=player_lv*6 +(stealth+10)*4;
    surprise_attack_chance= surprise_attack_chance / (light?3:1) /(aggravate?3:1) 
      /((enemy_lv > (player_lv*player_lv/20 +10))?3:1)
    surprise_attack_chance= 1 - Math.min((enemy_lv + 20)/(surprise_attack_chance - 1),1)

    var surprise_attack_chance_irimi=player_lv*6 +(stealth+10)*4;
    surprise_attack_chance_irimi= surprise_attack_chance_irimi / (1) /(aggravate?3:1) 
      /((enemy_lv > (player_lv*player_lv/20 +10))?3:1)
    surprise_attack_chance_irimi= 1 - Math.min((enemy_lv + 20)/(surprise_attack_chance_irimi - 1),1)
    
    //危険！フラグに確率代入
    var ninja_hit_chance=1/27
    var ninja_hit_chance_sp=1/15

    var deadly_chance=half_hp/((blow_num+sub_blow_num+1)*10) 
      + (1/666 *!unique)
    deadly_chance = ninja_hit_chance>=1 ? 0 : deadly_chance*(1-ninja_hit_chance)
    var deadly_chance_sp=half_hp/((blow_num+sub_blow_num+1)*10) 
      + (1/666 *!unique)
      + (1/11 * !unique)
    deadly_chance_sp = ninja_hit_chance_sp>=1 ? 0 : deadly_chance_sp*(1-ninja_hit_chance_sp)
  }
  
  var force_slay =force?(slay!=1?slay*1.5+2:3.5):slay
  if (additional_slay=="x1"){
  }else if (additional_slay[0]=="x"){
    force_slay = Math.max(Number(additional_slay.slice(1)),force_slay)
  }else if(additional_slay.indexOf(":")+1){
    var slay_lim = Number(additional_slay.slice(additional_slay.indexOf(":")+1))
    var slay_add = Number(additional_slay.slice(0,additional_slay.indexOf(":")))
    force_slay = (slay + slay_add)>slay_lim?slay_lim:(slay + slay_add);
  }else{
    alert("剣術家スレイの値に異常");
  }
  var weight_lb = (((player_class=="monk_martial") || (player_class=="monk_martial_byakko"))?player_lv*8:weight_kg*20)
  var crit_pow = (player_class=="ninja"?4444:5000)/(impact=="impact"?2:1)
  var crit_chance=Math.max(Math.min((weight_lb + (meichuu_default-meichuu_weapon)*3 + meichuu_weapon*5) /crit_pow *2,1),0)
  crit_chance=impact=="majin"?1:crit_chance;
  //hit_chance=1
  //crit_chance=0
  var crit_rand=(impact=="majin" || impact=="impact")?1300:650;
  var w1=weight_lb
  var w2=w1 + crit_rand
  var average_crit_mult= 0
    +2*(400<w1 ? 0 : (400-w1)/crit_rand)
    +2*(w1<400 && 700<w2 ? (700-400)/crit_rand : (400<w1 ? Math.max(700-w1,0)/crit_rand : Math.max(w2-400,0)/crit_rand ))
    +3*(w1<700 && 900<w2 ? (900-700)/crit_rand : (700<w1 ? Math.max(900-w1,0)/crit_rand : Math.max(w2-700,0)/crit_rand ))
    +3*(w1<900 && 1300<w2 ? (1300-900)/crit_rand : (900<w1 ? Math.max(1300-w1,0)/crit_rand : Math.max(w2-900,0)/crit_rand ))
    +3.5*(w1<1300 ? Math.max(w2-1300,0)/crit_rand : crit_rand/crit_rand);
  var average_crit_plus= 0
    +5*(400<w1 ? 0 : (400-w1)/crit_rand)
    +10*(w1<400 && 700<w2 ? (700-400)/crit_rand : (400<w1 ? Math.max(700-w1,0)/crit_rand : Math.max(w2-400,0)/crit_rand ))
    +15*(w1<700 && 900<w2 ? (900-700)/crit_rand : (700<w1 ? Math.max(900-w1,0)/crit_rand : Math.max(w2-700,0)/crit_rand ))
    +20*(w1<900 && 1300<w2 ? (1300-900)/crit_rand : (900<w1 ? Math.max(1300-w1,0)/crit_rand : Math.max(w2-900,0)/crit_rand ))
    +25*(w1<1300 ? Math.max(w2-1300,0)/crit_rand : crit_rand/crit_rand);
  
  //不意打ち系はスレイ直後
  var surprise_attack_mult=(5 + (player_lv * 2 / 25)) / 2;
  switch(backstab_mode){
    case "sleep":
      backstab_mult=(3 + (player_lv / 20));
      break;
    case "surprise":
      backstab_mult=surprise_attack_mult
      break;
    case "backstab":
      backstab_mult=3 / 2;
      break;
    default:
      backstab_mult=1;
      break;
  }
  var vopal_mult=(vopal=="normal" ? 11/9 : (vopal=="special" ? 5/3 : 1))

  
  var base_average_dam=dice_num *(1+dice_pip)/2 *(force_slay *backstab_mult);
  var surprise_avd=dice_num *(1+dice_pip)/2 *(force_slay *surprise_attack_mult)
  
  if((player_class=="monk_martial") || (player_class=="monk_martial_byakko")){
    console.log("martial_dam")
     base_average_dam=avarage_dice_roll
    console.log(base_average_dam)
  }
  var base_min_dam=dice_num *1 *(force_slay *backstab_mult);
  var base_max_dam=dice_num *dice_pip *(force_slay *backstab_mult);
  console.log(backstab_mode)
  console.log(backstab_mult)
    console.log(player_class)
  var average_dam=(
    (base_average_dam *(average_crit_mult *crit_chance + 1 *(1-crit_chance)) +average_crit_plus *crit_chance
    )
    *vopal_mult+ /*str*/ + dam_plus
                  )*special;
  surprise_avd=(
    (surprise_avd *(average_crit_mult *crit_chance + 1 *(1-crit_chance)) +average_crit_plus *crit_chance
    )
    *vopal_mult+ /*str*/ + dam_plus
                  )*special;
  var min_dam=(
    (base_min_dam
    )
    *vopal_mult+ /*str*/ + dam_plus
                  )*special;
  var max_dam=(
    (base_max_dam
    )
    *vopal_mult+ /*str*/ + dam_plus
                  )*special;
  console.log(average_dam)
  console.log(max_dam)
  var average_crit_dam=((base_average_dam
               * (average_crit_mult) +average_crit_plus)
              *vopal_mult
               + /*str*/ + dam_plus
              )*special;
  var min_crit_dam=((base_min_dam
               * (average_crit_mult) +average_crit_plus)
              *vopal_mult
               + /*str*/ + dam_plus
              )*special;
  var max_crit_dam=((base_max_dam
               * (average_crit_mult) +average_crit_plus)
              *vopal_mult
               + /*str*/ + dam_plus
              )*special;
  //忍者ヒットは最後
  if (ninja_hit=="ninja_hit"){
    average_dam = average_dam *5;
    min_dam=min_dam*5
    max_dam=max_dam*5
    average_crit_dam= average_crit_dam*5
    min_crit_dam=min_crit_dam*5
    max_crit_dam=max_crit_dam*5
  }
  else if(ninja_hit=="deadly"){
    average_dam = Math.max(average_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
    min_dam= Math.max(min_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
    max_dam= Math.max(max_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
    average_crit_dam= Math.max(average_crit_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
    min_crit_dam= Math.max(min_crit_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
    max_crit_dam= Math.max(max_crit_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2));
  }else if(player_class=="ninja"){
    console.log(ninja_hit_chance,deadly_chance)
    average_dam = average_dam*(1-ninja_hit_chance-deadly_chance)
     +average_dam*ninja_hit_chance*5 +Math.max(average_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2))*deadly_chance;
    max_dam= Math.max(max_dam*5 ,deadly_chance?((half_hp || !unique)?enemy_hp:enemy_hp/2):0);
    average_crit_dam = average_crit_dam*(1-ninja_hit_chance-deadly_chance)
     +average_crit_dam*ninja_hit_chance*5 +Math.max(average_crit_dam*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2))*deadly_chance;
    max_crit_dam= Math.max(max_crit_dam*5 ,deadly_chance?((half_hp || !unique)?enemy_hp:enemy_hp/2):0);
  }
 
  var average_hit_dam=average_dam
  var surprise_avd=surprise_avd*(1-ninja_hit_chance_sp-deadly_chance_sp)
     +surprise_avd*ninja_hit_chance_sp*5 +Math.max(surprise_avd*5 ,((half_hp || !unique)?enemy_hp:enemy_hp/2))*deadly_chance_sp;

  
  var hayagake_td=surprise_avd*surprise_attack_chance*1 + surprise_avd*(1-surprise_attack_chance)*hit_chance
    + average_hit_dam*hit_chance*(blow_num-1)
  var irimi_td=surprise_avd*surprise_attack_chance_irimi*1 + surprise_avd*(1-surprise_attack_chance_irimi)*hit_chance
    + average_hit_dam*hit_chance*(blow_num-1)
  
  console.log("初撃","普通",average_dam,"普通率",(1-ninja_hit_chance-deadly_chance),
             "忍殺率",ninja_hit_chance,deadly_chance,"入")
  
  
  return {
      "average_dam":Math.ceil(average_dam),
      "hit_chance":Math.ceil(hit_chance*1000)/10, "crit_chance":Math.ceil(crit_chance*1000)/10, 
      "average_real_dam":Math.ceil(average_hit_dam*hit_chance),"average_hit_dam":Math.ceil(average_hit_dam), 
      "average_crit_dam":Math.ceil(average_crit_dam), 
      "crit_dam_max":Math.ceil(max_crit_dam), "crit_dam_min":Math.ceil(min_crit_dam),
      "no_crit_dam_max":Math.ceil(max_dam), "no_crit_dam_min":Math.ceil(min_dam),
    "surprise_attack_chance":Math.ceil(surprise_attack_chance*1000)/10,"surprise_attack_chance_irimi":Math.ceil(surprise_attack_chance_irimi*1000)/10,
    "ninja_hit_chance":Math.ceil(ninja_hit_chance*1000)/10,"deadly_chance":Math.ceil(deadly_chance*1000)/10,
    "first_attack_irimi":Math.ceil(surprise_avd*surprise_attack_chance_irimi*1 + surprise_avd*(1-surprise_attack_chance_irimi)*hit_chance),
    "hayagake_td":Math.ceil(hayagake_td),"irimi_td":Math.ceil(irimi_td),
            }
    
  /*
+ magical_brand_extra_dice(pa_ptr);


            mult = mult_hissatsu(player_ptr, mult, flags, m_ptr, mode);
        }

        if (!pc.equals(PlayerClassType::SAMURAI) && (flags.has(TR_FORCE_WEAPON)) && (player_ptr->csp > (o_ptr->dd * o_ptr->ds / 5))) {
            player_ptr->csp -= (1 + (o_ptr->dd * o_ptr->ds / 5));
            RedrawingFlagsUpdater::get_instance().set_flag(MainWindowRedrawingFlag::MP);
            mult = mult * 3 / 2 + 20;
        }

        if ((o_ptr->is_specific_artifact(FixedArtifactId::NOTHUNG)) && (m_ptr->r_idx == MonsterRaceId::FAFNER)) {
            mult = 150;
        
    if (mult > 150) {
        mult = 150;
    }
    return tdam * mult / 10;(player_ptr, pa_ptr);
      if (pa_ptr->backstab) {
        pa_ptr->attack_damage *= (3 + (player_ptr->lev / 20));
        return;
    }

    if (pa_ptr->surprise_attack) {
        pa_ptr->attack_damage = pa_ptr->attack_damage * (5 + (player_ptr->lev * 2 / 25)) / 2;
        return;
    }

    if (pa_ptr->stab_fleeing) {
        pa_ptr->attack_damage = (3 * pa_ptr->attack_damage) / 2;
    }

    
    POISON_NEEDLE

    process_vorpal_attack(player_ptr, pa_ptr, vorpal_cut, vorpal_chance);
    */
  

}

function addf(symbol,num,word){
  return (((symbol=="+"&&num==0)||(symbol=="×"&&num==1))?"":symbol + num + "("+word+")");
}

function dr (num,pip){
  return num*(pip+1)/2
}

function magic_tables(realm,lv) {
  var tables = {
    "magic_chaos":{"レベル":[lv],
                "マジックミサイル":[dr((3+(lv-1)/5),4)],
               "閃光":[dr(2,lv/2)],
               "魔力炸裂":[dr(3,5)+lv+(lv/2)],
               "ファイアボルト":[dr((8+(lv-5)/4),8)],
               "力の拳":[dr((8+(lv-5)/4),8)],
               "カオスボルト":[dr((10+(lv-5)/4),8)],
               "ソニックブーム":[(60+lv)],
               "破滅の矢":[dr((11+(lv-5)/4),8)],
               "ファイアボール":[lv+55],
               "ログルス発動":[(lv*2)+99],
               "連鎖稲妻":[dr((5+lv/10),8)],
                "原子分解":[lv+70],
                "マジックロケット":[(lv*2)+120],
                "重力光線":[dr((9+(lv-5)/4),8)],
                "焔の一撃":[300+(lv*3)],
                "魔力の嵐":[300+(lv*4)],
              }
  }
  return tables[realm]
  
}

function make_magic_table() {
  var realm="magic_chaos"
  
  var table="<table>"
  const lv_list =[1,10,20,25,30,40,50]

  for(var magic_name in magic_tables(realm,1)){
    var trs= "<tr>"
    trs =trs + "<td>" + magic_name + "</td>"
    lv_list.forEach(index=>{
      var lv = index
      var td ="<td>"
      console.log(magic_name)
      console.log(magic_tables(realm,lv))
      td = td + magic_tables(realm,lv)[magic_name][0]
      td = td + "</td>"
      trs = trs + td
    })
    trs=trs + "</tr>\n"
    table = table +trs
  }
  table=table+"</table>"
  document.getElementById("magic_table").innerHTML=table
}

var tableFromTxtid=(id)=>{
    var ad = document.getElementById(id)
    var ad2 = ad.contentWindow.document.getElementsByTagName('pre')[0].innerHTML
    if(id=="art_txt"){
        artInfo(ad2)
    }
    else if(id=="mon_txt"){
        monInfo(ad2)
    }else{
      alert("tableFromTxtidの引数が不正です")
    }
}

const artInfo = (mon_txt)=>{
    var art_list = mon_txt.split('\n')
    var num = 0
    var art_list2 = [[]]
    for (var a of art_list) {
        if (a == "") {
            num = num + 1
            art_list2[num] = []
        }
        art_list2[num].push(a)
    }
    art_list2.shift()
    console.log(art_list2.slice(0, 5))
    var art_dict = []
    var weaponType = ""
    console.log(art_list2)
    for (var a of art_list2) {

        if (a.length < 2) {
            /*空白カラム*/
            continue
        }
        if (a.length == 3) {
            weaponType = a[2]
            /*分類カラム*/
            continue
        }
        console.log(a)
        var namecolumn = a[1]
        var infocolumn = a[a.length - 1]

        var elem = {}
        var b = infocolumn.split(", ")
        if (b.length < 6) {
            //console.log(b)
        }
        //console.log(b)
        /*
N:237:『デーモンベーン』
E:'Demonbane'
I:23:17:0
W:10:0:130:2500
P:0:2d5:5:0:0
F:SLAY_DEMON | RIDING
D:$They say that the sword which servants of the law hate
D:$ and abhor.
D:秩序の下僕が忌み嫌う剣があるらしい。

N:212:バルログの長ゴスモグの
E:of Gothmog
I:21:2:3
W:80:100:300:66666
P:0:6d12:15:25:0
F:STR | DEX | CON | HIDE_TYPE | 
F:HEAVY_CURSE | CURSED | AGGRAVATE | 
F:BRAND_FIRE | RES_FIRE | RES_ELEC | SH_FIRE | SELF_FIRE | RES_DARK | LITE_3 | 
F:ACTIVATE | SHOW_MODS
U:BA_FIRE_2
D:$With this unbearably bright whip of flame, the Balrog Gothmog has become
D:$ known for never having lost in combat.
D:この正視するもかなわぬ眩い炎のムチをひとたび手に取れば、
D:バルログの長ゴズモグは戦において負け知らずであった。
*/
        elem["tablenum"] = ""
        elem["name"] = namecolumn
        elem["lv"] = b[0].replace("レベル ", "")
        elem["rare"] = b[1].replace("希少度 ", "")
        elem["wgt"] = b[2].replace(" kg", "")
        elem["value"] = b[3].replace("＄", "")
        art_dict.push(elem)
    }
    console.log(art_dict.slice(0, 4))
}

const monInfo = (mon_txt)=>{
    var mon_list = mon_txt.split('\n')
    var num = 0
    var mon_list2 = [[]]
    for (var a of mon_list) {
        if (a == "") {
            num = num + 1
            mon_list2[num] = []
        }
        mon_list2[num].push(a)
    }
    mon_list2.shift()
    console.log(mon_list2.slice(0, 5))
    var mon_dict = []
    for (var a of mon_list2) {
        if (a.length < 4) {
            //console.log(a)
            continue
        }
        //console.log(a)
        var c, name
        var levcolumn = a.forEach(function(e, index) {
            if (e.slice(0, 3) == "===") {

                name = a.slice(0, index).join("")
                //console.log(name)
                c = a[index]

            }
        })
        var elem = {}

        var b = c.split(" ")
        elem["tablenum"] = ""
        elem["name"] = name
        elem["num"] = b[1].replace("Num:", "")
        elem["lv"] = b[3].replace("Lev:", "")
        elem["rare"] = b[5].replace("Rar:", "")
        elem["speed"] = b[7].replace("Spd:", "")
        elem["hp"] = b[9].replace("Hp:", "")
        elem["ac"] = b[11].replace("Ac:", "")
        elem["exp"] = b[13].replace("Exp:", "")
        elem["umami"] = (elem["exp"]!="0" ? (Number(elem["exp"]) / Number(elem["hp"])).toFixed(2): 0)
        mon_dict.push(elem)
        console.log(elem)
    }
    console.log(mon_dict.slice(0, 4))
}
const toggle_hide = (id)=>{
  document.getElementById(id).classList.toggle('hide')
}

document.addEventListener("DOMContentLoaded", (event) => {
  //make_magic_table()
  var elements = document.getElementById("sniper_tool").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = sniper_tool_get;
  }
  var elements = document.getElementById("melee_tool").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = melee_tool_get;
  }
  var elements = document.getElementById("melee_tool_ninja").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = melee_tool_get;
  }
  var elements = document.getElementById("melee_tool_other").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = melee_tool_get;
  }
  var elements = document.getElementById("magic_tool").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = magic_tool_get;
  }
  var elements = document.getElementById("enchant_tool").querySelectorAll('input, select, checkbox')
  for (let i = 0; i < elements.length; i++){
      elements.item(i).onchange = enchant_tool_get;
  }
});
window.addEventListener('load',function() {
  magic_tool_get()
  enchant_tool_get()
    tableFromTxtid("art_txt")
  
});