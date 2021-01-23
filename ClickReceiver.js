module.exports = async (clickData) =>{
    for(key in clickData) {
        if(clickData.hasOwnProperty(key)) {
            var value = clickData[key];
            console.log(key + " : "  + value);
            //do something with value;
        }
    }
    // you can interactive with analytics here
};
 
