function enchant_tool_get() {
    var input_data = {}
    var elements = document.getElementById("enchant_tool").querySelectorAll('input')
    for (let i = 0; i < elements.length; i++) {
        if (elements.item(i).type=="checkbox"){
            input_data[elements.item(i).id] = elements.item(i).checked;
        }else{
            input_data[elements.item(i).id] = Number(elements.item(i).value);
        }
    }
    var elements = document.getElementById("enchant_tool").querySelectorAll('select')
    for (let i = 0; i < elements.length; i++) {
        input_data[elements.item(i).id] = Number(elements.item(i).value);
    }

    var result = enchant_calc(input_data)

    document.getElementById("et_enchant_chance").innerHTML = Math.floor(result["et_enchant_chance"]*10000000)/100000 + "%";
    document.getElementById("et_need_num").innerHTML = Math.floor(result["et_need_num"]*10)/10 + "回";
    document.getElementById("et_need_money").innerHTML = Math.floor(result["et_need_money"]*10)/10;
}

function enchant_calc(data) {
    var et_enchant_chance,et_need_num,et_need_money
    if(data["et_muramasa"]){
        et_enchant_chance= Math.pow((3/4),(data["et_enchanted"]+3))
        et_need_num=1/et_enchant_chance
        et_need_money="***"
    }else{
        var chance_list=[100,95,90,80,70,60,50,35,20,5,1.3,0.7,0.5,0.2,0]
        if(data["et_enchanted"]<0){
            et_enchant_chance=100/100
        }else if(data["et_enchanted"]>15){
            et_enchant_chance=0/100
        }else{
            et_enchant_chance= chance_list[data["et_enchanted"]]/100
        }
        et_need_num = et_enchant_chance==0 ? "***" : 1/et_enchant_chance
        et_need_money = et_enchant_chance==0 ? "***" : et_need_num*data["et_price"]
    }
    return {"et_enchant_chance":et_enchant_chance,"et_need_num":et_need_num,"et_need_money":et_need_money}
}
