function shortenURL(){
    let slug = "";
    let input = document.getElementById("urlinput").value;
    let poss = "ABCDEFGHIJKLMNOPQRTUVabcdefghijklmnopqrstuvwxys123456789"
    for(x = 0; x < 5; x++){
        index = Math.floor(Math.random() * poss.length);
        console.log(index)
        slug += poss.charAt(index);
        console.log(slug);
    }
    
}

