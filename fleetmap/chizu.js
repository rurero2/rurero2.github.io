var todayships
var haltupdate
var historyupdate
var exists=[]
var NBmarker={}
function enter(code)
{
	//エンターキー押下なら
	if(13 === code)
	{
		search();
	}
}

function search(text= document.getElementById("sbox").value){
    //alert(text)
    if(text.match("19XX/XX/XX")){
    	alert("「XX」の部分に数字を入力して下さい")
    	return 0
    }
    if(text=="all"){
    	setClock("19XX/XX/XX")
    	for( var shipname in shipsdata){
    		markers[shipname].addTo(map);
    		
    	}
    	return 0
    }
    if (text.match(/^at\d{4}\/\d{1,2}\/\d{1,2}$/)){
    	text=text.replace("at","")
        livingships(text)
        return 0
    }
    if (text.match(/^from\d{4}\/\d{1,2}\/\d{1,2}$/)){
    	text=text.replace("from","")
        //story(text)
        daystory(text)
        return 0
    }
    if (text.match(/^\d{1,2}\/\d{1,2}$/)){
        datesearch(text)
        return 0
    }
    if (text.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
        timesearch(text)
        return 0
    }
    //ship
    loop:{
      for(var shipname in shipsdata){
          if(shipsdata[shipname]["jpname"]==text){

              attention(shipname)
              //markersOn([shipname])
              break loop;
          }
        }
        //console.log("aa")
       var str=new RegExp(text,"i");// \IJN YAMATO=>YAMATO
       for(var shipname in shipsdata){

          
          if(shipsdata[shipname]["name"]==text){
              attention(shipname)
              //markers[shipname].openPopup();
              //markersOn([shipname])

              break loop;
          }
        }
       // \IJN YAMATO=>YAMATO
       console.log(text)
       for(var shipname in shipsdata){
       	console.log(shipname)

          if(shipname.replace(" ","").match(text)){
          	
              attention(shipname)
              //markersOn([shipname])
              console.log("cCC")
              break loop;
          }
        }
        //console.log("b")
       alert("検索対象を見つけられませんでした")
    }
}

function timesearch(text){
    loop:{
      for(var shipname in shipsdata){
          if(shipsdata[shipname]["Launched"]==text){
              attention(shipname)
              //markersOn([shipname])
              setClock(text)

              
              break loop;
          }
        }
       alert("検索対象の日付を見つけられませんでした")
    }
}

function datesearch(text){
    loop:{
      for(var shipname in shipsdata){
          str=new RegExp("/"+text+"$")// 10/22を想定
          if(shipsdata[shipname]["Launched"].match(str)){
              attention(shipname)
              //markersOn([shipname])
              break loop;
          }
        }
       alert(text+"が進水日の艦はデータにありません。")
    }
}
//background-image:url('+"'kcimg/other/papyrus.jpg'"+')">\
//<img src="kcimg/flag/ijp.png"  style="height:30px;display:inline;top:5px;left:5px;z-index:1;margin:0 10px 0 0;"/>\

function makepopup(s){//background:#FFCC99;
    var imgsrc='"kcimg/kanmusu/'+s["imgsrc"]+'.png"'
    //<div class="cherry-blossom-container">\
    //console.log('<img src="'+s["imgsrc"]+'.png" style="width:16)')
    //開けて onError="this.onerror=null;this.src='http://www.tenman.info/images/pen.jpg';"
    var popuptxt='\
<div  class="'+s["type"]+' " style="width:600px;height:400px;border:none;position:relative;font-family: serif;\
+padding:5px;">\
<div class="cherry-blossom-container">\
<div id="particles-js"></div>\
<div id="wrapper">\
<img src="kcimg/flag/ijp.png"  style="height:30px;position:absolute;top:5px;right:5px;z-index:1;"/>\
<div class="nowrap" style="left:30px;font-size:30px;display:inline;">'+s["Class"]+" Class "+s["type"]+" "+s["jpname"]
+''+'</div>\
<hr class="mhr">\
<div id="leftbox" style="width:160px;display:inline;float:left;">'
+
//'<img src="kcimg/kanmusu/empty.png"; alt='+imgsrc+ 'style="width:163px;height:225px;"></img>'
'<img src="kcimg/kanmusu/'+s["imgsrc"]+'.png"  onError="this.onerror=null;this.src=\'kcimg/kanmusu/empty.png\'"; alt='+imgsrc+ 'style="width:163px;height:225px;"></img>'
+'<hr>\
<div class="Laid Down" style="font-size:10px;">　起工　　　　'+s["Laid Down"]+'</div>\
<hr>\
<div class="Launched" style="font-size:10px;">　進水　　　　'+s["Launched"]+'</div>\
<hr>\
<div class="Commissioned" style="font-size:10px;">　就役　　　　'+s["Commissioned"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　戦没　　　　'+s["Loss Date"]+'</div>\
<hr>\
</div>\
<div id="rightbox" style="width:410px;height:300px;display:inline;float:right;top:20px;">\
<br>\
<div class="Loss Date" style="font-size:10px;">　基準排水量　'+s["Displacement"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　沈没過程　　'+s["Cause"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　大きさ　　　'+s["Length  (oa)  x  Beam  x  Draft"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　射程　　　　'+s["Range"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　速度　　　　'+s["Speed"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　乗員数　　　'+s["Complement"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　主武装　　　'+s["Main"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　副武装　　　'+s["Secondary"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　機銃　　　　'+s["Anti-Aircraft"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　対潜装備　　'+s["Anti-Submarine"]+'</div>\
<hr>\
<div class="Loss Date" style="font-size:10px;">　航空機運用　'+s["Aircraft"]+'</div>\
<hr>\
</div>\
</div>\
</div>\
</div>'
return popuptxt
}

function markersOn(shipnames){
	for( var shipname in shipsdata){
		if ( shipnames.includes(shipname)){
			markers[shipname].addTo(map);
			//console.log(shipname+"on")
		}
		else{
			map.removeLayer(markers[shipname]);
			//markers[shipname]=null
		}
	}
}
function whatday(time){
	time="/"+time+"$"
	console.log(time)
	var laid_down=[]
	var launch=[]
	var comission=[]
	var sunk=[]
	time=new RegExp(time)

      for(var shipname in shipsdata){
          if(shipsdata[shipname]["Laid Down"].match(time)){
              laid_down.push(shipname)
          }
          if(shipsdata[shipname]["Launched"].match(time)){
              launch.push(shipname)
          }
          if(shipsdata[shipname]["Commissioned"].match(time)){
              comission.push(shipname)
          }
          if(shipsdata[shipname]["Loss Date"].match(time)){
              sunk.push(shipname)
          }
        }
     var res={}
     res["launched_day"]=laid_down;
     res["laid_down_day"]=launch;
     res["commission_day"]=comission;
     res["sunk_day"]=sunk
     return res
}

function atthattime(time){
	var time=Date.parse(time)
	var thenships={}
	var noexists=[]
	var laid_down=[]
	var launch=[]
	var comission=[]
	var sunk=[]
	//console.log(time)
      for(var shipname in shipsdata){
      	var status=""

          if(time>Date.parse(shipsdata[shipname]["Loss Date"])){
          	//console.log(Date.parse(shipsdata[shipname]["Loss Date"]))
              status="Loss Date";
              sunk.push(shipname)
              continue;
          }
          if(time>Date.parse(shipsdata[shipname]["Commissioned"])){
              status="Commissioned";
              comission.push(shipname)
              continue;
          }
          if(time>Date.parse(shipsdata[shipname]["Launched"])){
              status="Launched";
              launch.push(shipname)
              continue;
          }
          if(time>Date.parse(shipsdata[shipname]["Laid Down"])){
              status="Laid Down";
              laid_down.push(shipname)
              continue;
          }
          noexists.push(shipname)
          thenships[shipname]=status
        }
       //console.log(sunk)
      return [noexists,laid_down,launch,comission,sunk]

}
function livingships(text){
	console.log(text)
	var shipstatus=atthattime(text);
	//console.log(shipstatus)
	var alive=[]
	for(var statusnum in shipstatus){
		for(var shipsnum in shipstatus[statusnum]){
			var shipname=shipstatus[statusnum][shipsnum]
			//console.log(["1","2","3"].includes(statusnum))
			if(["3"].includes(statusnum)){
				alive.push(shipname)
			}
		}
	}
	exists=alive
	//console.log(alive)
	setClock(text)
	markersOn(alive)


}

function attention(shipname){
	var loc=[shipsdata[shipname]["Location"][0]+4,shipsdata[shipname]["Location"][1]]
	map.flyTo(loc, 6);
	//flyTo
	setTimeout(function(){markers[shipname].openPopup();}, 100);
    
    //time.sleep(0.05)
    setTimeout(function(){ popupclick(shipname);}, 1000);
    //popupclick(shipname)
    //popupclick(shipname)
}
function popupclick(shipname){

	//console.log(e.target)
	
	//shipname=e.target.title
	//console.log(shipname)
	for(var shipname2 in todayships["laid_down_day"]){
		if (shipname==todayships["laid_down_day"][shipname2]){cherry()}
	}
	for(var s2 in todayships["launched_day"]){
		if (shipname==todayships["launched_day"][s2]){conf()}
	}
	for(var shipname2 in todayships["commission_day"]){
		if (shipname==todayships["commission_day"][shipname2]){cherry()}
	}
	for(var shipname2 in todayships["sunk_day"]){
		if (shipname==todayships["sunk_day"][shipname2]){}
	}
}
function story(time){
	clearTimeout(historyupdate);
	livingships(time)
	time=new Date(Date.parse(time))
    const update = () => {
    console.log(time.getMonth())
    var a=time.getMonth() + 1
    time.setMonth(a);
    var textdate=time.getFullYear()+"/" +(time.getMonth() +1) +"/"+ (time.getDate())
    console.log(textdate)
    livingships(textdate);
    setClock(textdate)
    	 historyupdate=setTimeout(update,1000)
    }
    update()
    //historyupdate=setTimeout(update,1000)
}
haltupdate=()=>{
	console.log(historyupdate)
	 clearTimeout(historyupdate);
}
function daystory(time){
	if(time=="19XX/XX/XX"){
    	alert("「XX」の部分に数字を入力して下さい")
    	return 0
    }
	//BB/CVなら演出つきpopupが出る
	//0.1sに一回更新、add&popup&delete delteは海戦あるしokか
	//一覧の更新
	clearTimeout(historyupdate);
	livingships(time)
	time=new Date(Date.parse(time))
	var datedata={}
	var datekeys={}
    var attrs=["Laid Down","Launched","Commissioned","Loss Date"]
    for(var attr of attrs){
    	datedata[attr]={}
    	datekeys[attr]=[]
    	for(var shipname in shipsdata){
    		if(datedata[attr][shipsdata[shipname][attr]]!=undefined){
    			datedata[attr][shipsdata[shipname][attr]].push(shipname)
    		}else{
    			datedata[attr][shipsdata[shipname][attr]]=[shipname]
    		}
    		datekeys[attr].push(shipsdata[shipname][attr])
    	}
    }
    //console.log(datedata["Loss Date"])
    var willclose
    var closesettime
    const update = () => {
    time.setDate(time.getDate() + 1);
    var textdate=time.getFullYear()+"/" +(time.getMonth() +1) +"/"+ (time.getDate())
    for(var attr of attrs){
    	if (datekeys[attr].includes(textdate)){
    		if (attr=="Commissioned"){
    			for(var a in datedata[attr][textdate]){
    				var b=shipsdata[datedata[attr][textdate][a]]["type"]
    				exists.push(datedata[attr][textdate][a])
					
    				markers[datedata[attr][textdate][a]].addTo(map);
    				if(["BB","CV"].includes(b)){
    					//markers[willclose].closePopup()
    					markers[datedata[attr][textdate][a]].openPopup();
    					setTimeout(conf(),1500)
    					willclose=datedata[attr][textdate][a]
    					var afterclose=()=>{markers[willclose].closePopup()}
    					var closesettime=setTimeout(afterclose,3000)
    				}
    			}
    			//markers[datedata[attr][textdate]].addTo(map);
    			
    		}
    		if (attr=="Loss Date"){
    			console.log("loss")
    			for(var a in datedata[attr][textdate]){
    				//console.log(a)
    				exists.filter(item => item!=datedata[attr][textdate][a]);
    				map.removeLayer(markers[datedata[attr][textdate][a]]);
    			}
    			
    		}
    		
    	}
    }


    
    setClock(textdate)
    	 historyupdate=setTimeout(update,100)
    }
    //livingships(textdate);
    update()
    //historyupdate=setTimeout(update,1000)
}
function setClock(textdate){
	//console.log("timeset")
	var date=textdate.split("/")
	document.getElementById("clockyear").innerHTML=date[0]
	document.getElementById("clockmonth").innerHTML=date[1]
	document.getElementById("clockday").innerHTML=date[2]
}
function fromClock(textdate){
	var date=	
	document.getElementById("clockyear").innerHTML+"/"
	+document.getElementById("clockmonth").innerHTML+"/"
	+document.getElementById("clockday").innerHTML
	console.log("date::"+date)
	daystory(date)
}
makeNBpopup=(NB)=>{
	var name_of_battle=Naval_battles[NB]["name"]
          var period_of_battle=Naval_battles[NB]["start_date"]+"～"+Naval_battles[NB]["end_date"]
          var left_countries=Naval_battles[NB]["left_countries"].join("・")
          var left_ships=Naval_battles[NB]["left_ships"]
          var left_sunken_ships=Naval_battles[NB]["left_sunken_ships"]
          var lsl=""
          left_ships.forEach(e=>{
            if(left_sunken_ships.indexOf(e)!=-1){
              lsl=lsl+'<div style="color: red; display: inline-block;">'+e+'</div>'+"　"
            }else{
              lsl=lsl+e+"　"
            }
          })
          

          



          var right_ships=Naval_battles[NB]["right_ships"]
          var right_sunken_ships=Naval_battles[NB]["right_sunken_ships"]
          var rsl=""
          right_ships.forEach(e=>{
            if(right_sunken_ships.indexOf(e)!=-1){
              rsl=rsl+'<div style="color: red; display: inline-block;">'+e+'</div>'+"　"
            }else{
              rsl=rsl+e+"　"
            }
          })
    var popuptxt='\
<div style="width:500px;height:300px;border:solid;position:relative;">\
<div id="name_of_battle" style="text-align:center;font-size:30px;">'+name_of_battle+'</div>\
<div id="period_of_battle" style="text-align:center;font-size:10px;border:solid;">'+period_of_battle+'</div>\
<div id="left_countries" style="display:inline;text-align:left">'+left_countries+'</div>\
<div id="right_countries" style="display:inline-block;text-align:right;float:right;">'+right_countries+'</div>\
<div style="position:relative;">\
<div id="left_ships"style="display:inline;text-align:left">'+lsl+'</div>\
<div id="right_ships" style="display:inline;text-align:right;float:right;">'+rsl+'</div>\
</div>\
</div>'
return popuptxt
}
makeNBpopup2=(NB)=>{
	var name_of_battle=Naval_battles[NB]["name"]
          var period_of_battle=Naval_battles[NB]["start_date"]+"～"+Naval_battles[NB]["end_date"]
          var left_countries=Naval_battles[NB]["left_countries"].join("・")
          var left_ships=Naval_battles[NB]["left_ships"]
          var left_sunken_ships=Naval_battles[NB]["left_sunken_ships"]
          var lsl=""
          var regexp = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
          for(var ship of left_ships){
          	//jpnameかidか
          	if(regexp.test(ship)){
          		var jpname=ship
          	}else{
          		var jpname=""
          	}
          	
          	lsl=lsl+'<img src="kcimg/kanmusu/empty.png"; style="width:70px;margin:5px;"/>'
          	//lsl=lsl+'<img src="kcimg/kanmusu/'+jpname+'.png" onError="this.onerror=null;this.src=\'kcimg/kanmusu/empty.png\'"; style="width:70px;margin:5px;"/>'
          }
          var right_countries=""
          for(var country of Naval_battles[NB]["right_countries"]){
          	right_countries=right_countries+'<img src="kcimg/flag/'+country+'.png" alt="'+country+'" style="height:15px;position:absolute;right:5px;"/>'
          }
          var right_ships=Naval_battles[NB]["right_ships"]
          var right_sunken_ships=Naval_battles[NB]["right_sunken_ships"]
          var rsl=""
          for(var ship of right_ships){
          	//jpnameかidか
          	if(regexp.test(ship)){
          		var jpname=ship
          	}else{
          		var jpname=""
          	}
          	
          	rsl=rsl+'<img src="kcimg/kanmusu/'+jpname+'.png" onError="this.onerror=null;this.src=\'kcimg/kanmusu/empty.png\'"; style="width:70px;margin:5px;"/>'
          }
    var popuptxt='\
<div style="width:500px;height:300px;border:solid;position:relative;">\
<div id="name_of_battle" style="text-align:center;font-size:30px;font-family: \'Yuji Syuku\', serif;">'+name_of_battle+'</div>\
<div id="period_of_battle" style="text-align:center;font-size:10px;border:solid;">'+period_of_battle+'</div>\
<div id="left_countries" style="display:inline;text-align:left">'+left_countries+'</div>\
<div id="right_countries" style="display:inline-block;text-align:right;float:right;">'+right_countries+'</div>\
<div style="position:relative;">\
<div id="left_ships"style="display:inline;text-align:left">\
'+lsl+'\
</div>\
<div id="right_ships" style="display:inline;text-align:right;float:right;">'+rsl+'</div>\
</div>\
</div>'
return popuptxt
}
function popupNBclick(NBname){
	NBmarker[NBname]
	document.getElementsByClassName("leaflet-popup-content-wrapper")[0].style.backgroundImage ="url('kcimg/other/papyrus.jpg')"
	//document.getElementsByClassName("particles-js")[0].style.backgroundImage ="url('kcimg/other/papyrus.jpg')"
}
closeday=()=>{
	document.getElementById("daydialog").classList.add('fadehidden')
}
tutorial=()=>{
	document.getElementById("tutorialPopup1")
}
var nextday=(daydiff)=>{
	var daydialogdate=new Date()
	globaldaydiff=globaldaydiff+daydiff
            daydialogdate.setDate(daydialogdate.getDate() + globaldaydiff);
			var month=daydialogdate.getMonth()+1
            var day = daydialogdate.getDate()
            var todayships= whatday(month +"/"+ day)
            //月の終わりは無理
            //書き換え
            var classes=document.getElementsByClassName("daysship")
            if (globaldaydiff>0){
            	var dayname=globaldaydiff+"日後が"
            }
            if (globaldaydiff==2){
            	var dayname="明後日が"
            }
            if (globaldaydiff==1){
            	var dayname="明日が"
            }
            if (globaldaydiff==0){
            	var dayname="今日が"
            }
            if (globaldaydiff==-1){
            	var dayname="昨日が"
            }
            if (globaldaydiff==-2){
            	var dayname="一昨日が"
            }
            if (globaldaydiff<-2){
            	var dayname=(-1*(globaldaydiff))+"日前が"
            }
            for (var ds of classes){
            	ds.innerHTML=ds.innerHTML.replace(/\S*が/,dayname)
            }
            //更新
            for(var statusnum in todayships){
            	document.getElementById(statusnum).innerHTML=""
		        for(var shipsnum in todayships[statusnum]){
					var shipname=todayships[statusnum][shipsnum]
					var html=document.getElementById(statusnum).innerHTML
					html=html+ '<div onclick="attention('+"'"+shipname+"'"+')">'+"《"+shipsdata[shipname]["jpname"]+"》"+'</div>'
					document.getElementById(statusnum).innerHTML=html
			    }
		    }
		}
var tutorial=()=>{
	document.getElementById("initialbox").innerHTML=html
}

var openHowToUse=()=>{
	document.getElementById("HowToUse_container").classList.toggle('hidden')
	document.getElementById("fadeLayer").classList.toggle('hidden')
}

/*
//他のとこにもかかわるやつでは？
shipsdataごと消さなきゃ…（使命感）
var filter=()=>{
	for(var i of markers){
		i.

    }
}*/
var buttonvisible
buttonvisible="off"

function togglebuttons(){
	
	if(buttonvisible=="off"){
		for(var num of [1,2,3,4,5,7,8,9,10]){
		    document.getElementById("b"+num).classList.remove('hidden')	
		    setTimeout(()=>{document.getElementById("b"+num).classList.add('fadeon05')},100)
	    }
	    document.getElementById("b6").innerHTML="-";
	    console.log(document.getElementById("b6").innerHTML);
	    buttonvisible="on";
	    return 0
	}
	if(buttonvisible=="on"){
		for(var num of [1,2,3,4,5,7,8,9,10]){
		    document.getElementById("b"+num).classList.add('hidden')	
	    }
	    document.getElementById("b6").innerHTML="+";
	    buttonvisible="off";
	    return 0
	}

}
var greeting=()=>{
	document.getElementById("greetingbox").classList.toggle('hidden')
	document.getElementById("fadeLayer").classList.toggle('hidden')
}

//var setClock=()=>{
//	var dates=[[1941,12,8],[1942,6,5],[1942,8,8],[1944,10,20]]
	//document.getElementById("clockyear").innerHTML=dates[random][0]
	
//}
var existsUpdateAdd = (shipname)=>{
	var type=shipsdata[shipname]["type"]
          if(type in stypes){
          	var icontype=stypes[shipsdata[shipname]["type"]]
          }else{
          	var icontype="other"
          }
	document.getElementById("exist"+icontype)
}
