function decimal(value, n) {
  return Math.floor(value * Math.pow(10, n) ) / Math.pow(10, n);
}


const selectFile = ()=>{
    // FileListオブジェクト取得
    const selectFiles = document.querySelector("#select-file").files

    // Fileオブジェクト取得
    const file = selectFiles[0]

    // FileReaderオブジェクト取得
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {
        // 8ビット符号なし整数値配列と見なす
        var array = new Uint8Array(e.target.result);

        // 文字コードを取得
        switch (Encoding.detect(array)) {
        case 'UTF16':
            // 16ビット符号なし整数値配列と見なす
            array = new Uint16Array(e.target.result);
            break;
        case 'UTF32':
            // 32ビット符号なし整数値配列と見なす
            array = new Uint32Array(e.target.result);
            break;
        }

        // Unicodeの数値配列に変換
        var unicodeArray = Encoding.convert(array, 'UNICODE');
        // Unicodeの数値配列を文字列に変換
        var txtresult = Encoding.codeToString(unicodeArray);
        console.log("エンコード");
        console.log(txtresult);
        // 結果

        console.log(txtresult.slice(0, 5))
        console.log(txtresult.slice(0, 5) == "Monst")

        if (txtresult.slice(0, 5) == "Monst") {
            monInfo(txtresult)
        } else if (txtresult.slice(0, 5) == "Artif") {
            artInfo(txtresult)
        } else {
            towiki(txtresult)
        }

        
    }
    

    // ファイル読み込み完了時の処理
    
    // ファイル読み込みエラー時の処理
    reader.onerror = ()=>{
        console.log("ファイル読み込みエラー")
    }

}

const tablesorter=()=> {
    let column_no = 0;
    //今回クリックされた列番号
    let column_no_prev = 0;
    //前回クリックされた列番号
    document.querySelectorAll('#ranking_table th').forEach(elm=>{
        elm.onclick = function() {
            column_no = this.cellIndex;
            //クリックされた列番号
            var table = this.parentNode.parentNode;
            console.log(table)
            console.log(this)
            console.log(this.cellIndex)
            
            let sortType = 0;
            //0:数値 1:文字
            let sortArray = new Array;
            //クリックした列のデータを全て格納する配列
            for (let r = 1; r < table.rows.length; r++) {
                //行番号と値を配列に格納
                let column = new Object;
                column.row = table.rows[r];
                //console.log(table.rows[r])
                //console.log(column_no)
                //console.log(table.rows[r].cells[column_no])
                column.value = table.rows[r].cells[column_no].textContent;
                sortArray.push(column);
                //数値判定
                if (isNaN(Number(column.value))) {
                    sortType = 1;
                    //値が数値変換できなかった場合は文字列ソート
                }
            }
            if (sortType == 0) {
                //数値ソート
                if (column_no_prev == column_no) {
                    //同じ列が2回クリックされた場合は降順ソート
                    sortArray.sort(compareNumberDesc);
                } else {
                    sortArray.sort(compareNumber);
                }
            } else {
                //文字列ソート
                if (column_no_prev == column_no) {
                    //同じ列が2回クリックされた場合は降順ソート
                    sortArray.sort(compareStringDesc);
                } else {
                    sortArray.sort(compareString);
                }
            }
            //ソート後のTRオブジェクトを順番にtbodyへ追加（移動）
            let tbody = this.parentNode.parentNode;
            for (let i = 0; i < sortArray.length; i++) {
                tbody.appendChild(sortArray[i].row);
            }
            //昇順／降順ソート切り替えのために列番号を保存
            if (column_no_prev == column_no) {
                column_no_prev = -1;
                //降順ソート
            } else {
                column_no_prev = column_no;
            }

            var hogeTable = document.getElementById('ranking_table');
            var TRs = hogeTable.getElementsByTagName('tr');
            for (var i = 1; i < TRs.length; ++i) {
                var nodes = TRs[i].childNodes;
                if (nodes) {
                    if (nodes[0].tagName.toLowerCase() == 'td') {
                        nodes[0].innerHTML = '<strong>' + i + '</strong>';
                    }
                }
                //TRs[i].insertCell(0)
                //TRs[i][0].innerHTML=i
            }

        }
        ;
    }
    );
};
//数値ソート（昇順）
function compareNumber(a, b) {
    return a.value - b.value;
}
//数値ソート（降順）
function compareNumberDesc(a, b) {
    return b.value - a.value;
}
//文字列ソート（昇順）
function compareString(a, b) {
    if (a.value < b.value) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}
//文字列ソート（降順）
function compareStringDesc(a, b) {
    if (a.value > b.value) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}

var txtToJs = ()=>{
    // FileListオブジェクト取得
    const selectFiles = document.querySelector("#txtToJsInput").files

    // Fileオブジェクト取得
    const file = selectFiles[0]

    // FileReaderオブジェクト取得
    const reader = new FileReader()
    reader.readAsText(file)

    // ファイル読み込み完了時の処理
    reader.onload = ()=>{
        if ((reader.result).includes('"')) {
            console.log('"が含まれています')
        }
        var read_txt = reader.result.replace(/\n/g, '\\\n')
        console.log('"' + read_txt + '"')
        //document.querySelector("#output").innerHTML = read_txt
    }

}

const monInfo = (mon_txt)=>{
    document.getElementById("ranking_table").innerHTML="表を生成中…"

    console.log(mon_txt)

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
    document.querySelector("#output").innerHTML = mon_list[10]

    const playerList = document.getElementById("ranking_table");
    playerList.innerHTML=""
    var players = mon_dict
    playerList.deleteTHead();
    var thead = document.createElement("thead");
    playerList.appendChild(thead);
    var tr = document.createElement("tr");
    playerList.appendChild(tr);
    playerList.deleteTHead();
    for(var a of ["順位","名称","番号","レベル","希少度","速度","HP","AC","経験値","うま味"]){
        var th = document.createElement("th");
        th.textContent=a
        tr.appendChild(th);
    }
    players.forEach((player)=>{
        // 配列の中のオブジェクトの数だけ処理を繰り返す
        const tr = document.createElement("tr");
        playerList.appendChild(tr);
        // 表の中に８個の「tr」（行）ができる
        // 1行の中を生成
        const objArray = Object.entries(player);
        // オブジェクトを配列に
        objArray.forEach((arr)=>{
            // No, name, age, gradeの4回繰り返す
            const td = document.createElement("td");
            td.textContent = arr[1];
            // arr[1]はvalueの部分
            tr.appendChild(td);
        }
        );
    }
    );
   
    var hogeTable = document.getElementById('ranking_table');
    var TRs = hogeTable.getElementsByTagName('tr');
    for (var i = 1; i < TRs.length; ++i) {
        var nodes = TRs[i].childNodes;
        if (nodes) {
            if (nodes[0].tagName.toLowerCase() == 'td') {
                nodes[0].innerHTML = '<strong>' + i + '</strong>';
            }
        }
        //TRs[i].insertCell(0)
        //TRs[i][0].innerHTML=i
    }
    document.getElementById("tabletitle").innerHTML="★モンスターランキング"
    tablesorter()
}

const artInfo = (mon_txt)=>{
    document.getElementById("ranking_table").innerHTML="表を生成中…"
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
    var weaponType = ""
    console.log(mon_list2)
    for (var a of mon_list2) {

        if (a.length < 2) {
            //console.log(a)
            continue
        }
        if (a.length == 3) {
            weaponType = a[2]
            continue
        }
        //console.log(a)
        var namecolumn = a[1]
        var infocolumn = a[a.length - 1]

        var elem = {}
        var b = infocolumn.split(", ")
        if (b.length < 6) {
            console.log(b)
        }
        console.log(b)
        elem["tablenum"] = ""
        elem["name"] = namecolumn
        elem["lv"] = b[0].replace("レベル ", "")
        elem["rare"] = b[1].replace("希少度 ", "")
        elem["wgt"] = b[2].replace(" kg", "")
        elem["value"] = b[3].replace("＄", "")
        mon_dict.push(elem)

    }
    console.log(mon_dict.slice(0, 4))
    document.querySelector("#output").innerHTML = mon_list[10]
    
    var playerList = document.getElementById("ranking_table");
    document.getElementById("ranking_table").innerHTML=""
    var players = mon_dict
    playerList.deleteTHead();
    var thead = document.createElement("thead");
    playerList.appendChild(thead);
    var tr = document.createElement("tr");
    playerList.appendChild(tr);
    for(var a of ["順位","名称","生成階層","希少度","重量","原価"]){
        var th = document.createElement("th");
        th.textContent=a
        tr.appendChild(th);
    }
    
    players.forEach((player)=>{
        // 配列の中のオブジェクトの数だけ処理を繰り返す
        var tr = document.createElement("tr");
        playerList.appendChild(tr);
        // 表の中に８個の「tr」（行）ができる
        // 1行の中を生成
        const objArray = Object.entries(player);
        // オブジェクトを配列に
        objArray.forEach((arr)=>{
            // No, name, age, gradeの4回繰り返す
            const td = document.createElement("td");
            td.textContent = arr[1];
            // arr[1]はvalueの部分
            tr.appendChild(td);
        }
        );
    }
    );
    var hogeTable = document.getElementById('ranking_table');
    var TRs = hogeTable.getElementsByTagName('tr');
    for (var i = 1; i < TRs.length; ++i) {
        var nodes = TRs[i].childNodes;
        if (nodes) {
            if (nodes[0].tagName.toLowerCase() == 'td') {
                nodes[0].innerHTML = '<strong>' + i + '</strong>';
            }
        }
        //TRs[i].insertCell(0)
        //TRs[i][0].innerHTML=i
    }
    document.getElementById("tabletitle").innerHTML="★アーティファクトランキング"
    tablesorter()
}

const calc_item = (mode,input_data)=>{
    if (mode == "artifact") {

        input_data["quantity"]
        //GOODのみ。 GREATは計算不可
        input_data["gen_floor"]
        //60
        input_data["item_floor"]
        //80
        input_data["baseitem_floor"]
        //80
        input_data["rare"]
        //80
        input_data["insta"]
        //80

        var boostrate = input_data["item_floor"] > input_data["gen_floor"] ? (input_data["item_floor"] - input_data["gen_floor"]) * 2 : 1;
        var baseboostrate = input_data["baseitem_floor"] > input_data["gen_floor"] ? (input_data["baseitem_floor"] - input_data["gen_floor"]) * 5 : 1;

        var res = 0.9 * (input_data["quantity"] == "GOOD" ? 0.1 : 0.001) / boostrate / input_data["rare"] / baseboostrate
        console.log(res)
    } else if (mode == "normal") {
        input_data["gen_floor"] += 10
        var GREAT_OBJ = 10
        //ナニコレ
        //1 + (10 * 128 / (1d128))
        var enoughboostrate = (Math.trunc(1280 / ((input_data["baseitem_floor"] - input_data["gen_floor"] - 1))) - 1) / 128
        enoughboostrate = enoughboostrate > 1 ? 1 : enoughboostrate;
        var res = 0.9 / GREAT_OBJ * enoughboostrate
        console.log(res)

    }
}

//calc_item("artifact",{"quantity":"GOOD","gen_floor":127,"item_floor":100,"baseitem_floor":110,"rare":255,"insta":true })
calc_item("normal", {
    "quantity": "GOOD",
    "gen_floor": 0,
    "item_floor": 100,
    "baseitem_floor": 110,
    "rare": 255,
    "insta": true
})

const towiki = (txt)=>{
    if (txt.slice(0, 5) == "<html") {
        //console.log(txt)
        var res = ""
        var parser = new DOMParser();
        var doc = parser.parseFromString(txt, 'text/html');
        //console.log(doc.getElementById('header').textContent);
        var pre = doc.getElementsByTagName("pre")[0]
        console.log(pre)
        var fonttags = doc.getElementsByTagName("font")
        var flag=0
        for (var fonttag of fonttags) {
            //console.log(fonttag)
            //console.log(fonttag.getAttribute("color"))
            //console.log(window.getComputedStyle(fonttag).color.match(/\d+/g))
            //var fontcolor=rgb2hex(window.getComputedStyle(fonttag).color.match(/\d+/g))
            var a = "&color(" + fonttag.getAttribute("color") + ",black){" + zenkakuka(fonttag.textContent) + "};"
            if(flag){
                if(fonttag.textContent.includes("#")){
                    flag=0
                }
                else{
                    a=""
                }
            }
            if (fonttag.textContent.includes("\n")){
                console.log("改行")
                a =fonttag.textContent.replace("\n", "};~\n&size(12){")
                console.log(a)
                flag=1
            }
            
            res = res + a
        }
        console.log(res)
        document.querySelector("#output").innerHTML = res
        //インプ &color(#0FF,black){$}
    } else {
        alert("この形式は読み込めませんでした…。")
    }
}

function rgb2hex(rgb) {
    return "#" + rgb.map(function(value) {
        return ("0" + value.toString(16)).slice(-2);
    }).join("");
}
const zenkakuka=(txt)=>{
    txt=txt.replace(/#/g,"＃")
    txt=txt.replace(/\./g,"．").replace(/\>/g,"＞").replace(/\~/g,"～").replace(/\^/g,"＾").replace(/\*/g,"＊").replace(/\@/g,"＠")
    return txt
}


window.addEventListener('load',function() {
    tableFromTxtid("art_txt")
//class="hide"
});
var tableFromTxtid=(id)=>{
    var ad = document.getElementById(id)
    var ad2 = ad.contentWindow.document.getElementsByTagName('pre')[0].innerHTML
    if(id=="art_txt"){
        artInfo(ad2)
    }
    else{
        monInfo(ad2)
    }
    
    
}