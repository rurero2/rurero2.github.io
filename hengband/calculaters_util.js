function get_tool(id) {
    var input_data = {}
    var elements = document.getElementById(id).querySelectorAll('input')
    for (let i = 0; i < elements.length; i++) {
        if (elements.item(i).type=="checkbox"){
            input_data[elements.item(i).id] = elements.item(i).checked;
        }else{
            input_data[elements.item(i).id] = Number(elements.item(i).value);
        }
    }
    var elements = document.getElementById(id).querySelectorAll('select')
    for (let i = 0; i < elements.length; i++) {
        input_data[elements.item(i).id] = Number(elements.item(i).value);
    }
    return input_data
}