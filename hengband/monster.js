window.addEventListener('load',function() {
    tableFromTxtid("mon_txt")
//class="hide"
});
const tableFromTxtid=(id)=>{
    var ad = document.getElementById(id)
    var ad2 = ad.contentWindow.document.getElementsByTagName('pre')[0].innerHTML
    if(id=="art_txt"){
        artInfo(ad2)
    }
    else{
        monInfo(ad2)
    }
}

const diceToNum=(ins)=>{
  if (!isNaN(ins)) {
    var max=ins, min=ins, expect=ins
  }else if (/^\d+d\d+$/.test(ins)){
    d1 = /^(\d+)d(\d+)$/.exec(ins)[0]
    d2 = /^(\d+)d(\d+)$/.exec(ins)[1]
    var max=d1*d2, min = d1, expect = d1*(d2+1)/2
  }else if (/^\d+d\d+)\+(\d)+$/.test(ins)){
    d1 = /^(\d+)d(\d+)\+(\d+)$/.exec(ins)[0]
    d2 = /^(\d+)d(\d+)\+(\d+)$/.exec(ins)[1]
    d3 = /^(\d+)d(\d+)\+(\d+)$/.exec(ins)[2]
    var max=d1*d2+d3, min = d1+d3, expect = (d1*(d2+1)/2)+d3
  }else{
    console.log(ins +"をダイス読み込みできません")
  }
  return {"max":max,"min":min,"expect":expect}
}


const monInfo = (mon_txt)=>{
    document.getElementById("ranking_table").innerHTML="モンスター情報を読み込み中…"

    //console.log(mon_txt)

    var mon_list = mon_txt.split('\n')
    var mondex = []
    var loopid=0
    var version
    var colordict = {"D":"Black","w" : "White" , "s" : "Gray" , "o" : "Orange", "r" : "Red" , "g" : "Green","b" : "Blue"  ,"u" : "Brown",
"d" : "Dark Gray","W" : "Light Gray", "v" : "Violet" ,"y" : "Yellow", "R" : "Light Red","G" : "Light Green","B" : "Light Blue", "U" : "Light Brown"}
    for (var row of mon_list){
      if (row == ""){
        continue
      }
      switch (row[0]) {
        case "#":
          break;
        case "N":
          loopid=row.split(":")[1]
          mondex[loopid]={ "id":row.split(":")[1], "jpname":row.split(":")[2] }
          mondex[loopid]["attack"]=[]
          mondex[loopid]["flags"]=[]
          mondex[loopid]["spell"]=[]
          mondex[loopid]["en_expl"]=[]
          mondex[loopid]["jp_expl"]=[]
          break;
        case "E":
          mondex[loopid]["enname"]=row.split(":")[1]
          break;
        case "G":
          mondex[loopid]["symbol"]=row.split(":")[1]
          mondex[loopid]["_color"]=row.split(":")[2]
          mondex[loopid]["color"]= mondex[loopid]["_color"] in colordict ? colordict[mondex[loopid]["_color"]] : mondex[loopid]["_color"] + "？"
          break;
        case "I":
          mondex[loopid]["speed"]=row.split(":")[1] //normal=110
          mondex[loopid]["hp"]=row.split(":")[2]
          mondex[loopid]["vision"]=row.split(":")[3]
          mondex[loopid]["ac"]=row.split(":")[4]
          mondex[loopid]["alert"]=row.split(":")[5]
          break;
        case "W":
          mondex[loopid]["lv"]=row.split(":")[1]
          mondex[loopid]["rare"]=row.split(":")[2]
          mondex[loopid]["exp"]=row.split(":")[3]
          mondex[loopid]["next_exp"]=row.split(":")[4]
          mondex[loopid]["next_mon"]=row.split(":")[5]
          break;
        case "B":
          mondex[loopid]["attack"].push({"method":row.split(":")[1],"effect":row.split(":")[2],"damage":row.split(":")[3]})
          break;
        case "F":
          mondex[loopid]["flags"]=mondex[loopid]["flags"].concat(row.split(":")[1].split("|"))
          break;
        case "S":
          mondex[loopid]["spell"]=mondex[loopid]["spell"].concat(row.split(":")[1].split("|"))
          mondex[loopid]["spell_freq"]=mondex[loopid]["spell"][0]
          break;
        case "R":
          mondex[loopid]["minions"]=mondex[loopid]["minions"].push({"mminion_id":row.split(":")[1],"minion_num":row.split(":")[2]})
          break;
        case "A":
          mondex[loopid]["art_id"]=row.split(":")[1]
          mondex[loopid]["art_rate"]=row.split(":")[2]
          break;
        case "D":
          if (row[2] == "$"){
            mondex[loopid]["en_expl"].push(row.split(":").splice(1))
          }else{
            mondex[loopid]["jp_expl"].push(row.split(":")[1])
          }
          break;
        case "V":
          version = row.split(":")[1]
          break;
        default:
          console.log("「" + row + "」の読み込みに失敗")
      }
      document.getElementById("ranking_table").innerHTML="モンスター情報を読み込み完了"
    }
    console.log(mondex[0])
}
