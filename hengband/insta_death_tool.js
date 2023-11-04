function insta_death_tool_get() {
    var result = insta_death_calc(get_tool("insta_death_tool"))

    document.getElementById("et_insta_death_chance").innerHTML = Math.floor(result["et_insta_death_chance"]*10000000)/100000 + "%";
    document.getElementById("et_need_num").innerHTML = Math.floor(result["et_need_num"]*10)/10 + "回";
    document.getElementById("et_need_money").innerHTML = Math.floor(result["et_need_money"]*10)/10;
}
function insta_death_calc(data) {
    var et_insta_death_chance,et_need_num,et_need_money
    var player_speed=speed_to_energy(data["idt_player_speed"])/speed_to_energy(data["idt_enemy_speed"])
    var need[...Array(400).keys()].map(i => i-100)
    

    
    if(data["et_muramasa"]){
        et_insta_death_chance= Math.pow((3/4),(data["et_insta_deathed"]+3))
        et_need_num=1/et_insta_death_chance
        et_need_money="***"
    }else{
        var chance_list=[100,95,90,80,70,60,50,35,20,5,1.3,0.7,0.5,0.2,0]
        if(data["et_insta_deathed"]<0){
            et_insta_death_chance=100/100
        }else if(data["et_insta_deathed"]>15){
            et_insta_death_chance=0/100
        }else{
            et_insta_death_chance= chance_list[data["et_insta_deathed"]]/100
        }
        et_need_num = et_insta_death_chance==0 ? "***" : 1/et_insta_death_chance
        et_need_money = et_insta_death_chance==0 ? "***" : et_need_num*data["et_price"]
    }
    return {"et_insta_death_chance":et_insta_death_chance,"et_need_num":et_need_num,"et_need_money":et_need_money}
}

const extract_energy = [
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* Slow */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* S-50 */     1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	/* S-40 */     2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
	/* S-30 */     2,  2,  2,  2,  2,  2,  2,  3,  3,  3,
	/* S-20 */     3,  3,  3,  3,  3,  4,  4,  4,  4,  4,
	/* S-10 */     5,  5,  5,  5,  6,  6,  7,  7,  8,  9,
	/* Norm */    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	/* F+10 */    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
	/* F+20 */    30, 31, 32, 33, 34, 35, 36, 36, 37, 37,
	/* F+30 */    38, 38, 39, 39, 40, 40, 40, 41, 41, 41,
	/* F+40 */    42, 42, 42, 43, 43, 43, 44, 44, 44, 44,
	/* F+50 */    45, 45, 45, 45, 45, 46, 46, 46, 46, 46,
	/* F+60 */    47, 47, 47, 47, 47, 48, 48, 48, 48, 48,
	/* F+70 */    49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
	/* Fast */    49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
];
const speed_to_energy = (speed)=>{
    return speed > 199 ? 49 : extract_energy[speed];
}