function magic_tool_get() {
    var input_data = {}
    var elements = document.getElementById("magic_tool").querySelectorAll('input')
    for (let i = 0; i < elements.length; i++) {
        if (elements.item(i).type=="checkbox"){
            input_data[elements.item(i).id] = elements.item(i).checked;
        }else{
            input_data[elements.item(i).id] = Number(elements.item(i).value);
        }
    }
    var elements = document.getElementById("magic_tool").querySelectorAll('select')
    for (let i = 0; i < elements.length; i++) {
        input_data[elements.item(i).id] = Number(elements.item(i).value);
    }
    var result = magic_calc(input_data)

    document.getElementById("mat_miss_chance").innerHTML = result["mat_miss_chance"] + "%";
    document.getElementById("mat_miss_chance_min").innerHTML = result["mat_miss_chance_min"] + "%";
}

function magic_calc(data) {
    if(data["mat_player_lv"] < data["mat_magic_lv"]){
        return {"mat_miss_chance":100,"mat_miss_chance_min":100}
    }
    var int_mod=-1
    var int_list=[3,8,15,18,23,25].concat([...Array(50).keys()].map(i => i+26))
    for(var num of int_list){
        if(data["mat_int"]<num){
            break
        }
        int_mod = int_mod +1
    }
    var miss=0
    miss = data["mat_difficulty"] - 3 * (data["mat_player_lv"] - data["mat_magic_lv"]) - 3 * (int_mod - 1)
    miss = miss + data["mat_person"] + 5*data["mat_second_realm"]
        -3*data["mat_easy_magic"] -2*data["mat_less_mana"] - (data["mat_easy_magic"] && data["mat_less_mana"])
    
    var int_mod_min=99
    if (data["mat_int"]>=8){
        int_mod_min=50
    }if (data["mat_int"]>=9){
        int_mod_min=30
    }if (data["mat_int"]>=10){
        int_mod_min=20
    }if (data["mat_int"]>=11){
        int_mod_min=15
    }if (data["mat_int"]>=12){
        int_mod_min=12
    }
    var int_list=[13,14,15,16,17,18,20,25,27,29,33,38,99]
    for(var num of int_list){
        if(data["mat_int"]<num){
            break
        }
        int_mod_min = int_mod_min -1
    }
    int_mod_min = (data["mat_dual"] && int_mod_min<5 )? 5 : int_mod_min;
    miss = Math.max(miss,int_mod_min)
    
    miss = Math.min(miss,95) + data["mat_veteran"]
    miss = Math.max(miss,0)
    return {"mat_miss_chance":miss,"mat_miss_chance_min":int_mod_min}
}
