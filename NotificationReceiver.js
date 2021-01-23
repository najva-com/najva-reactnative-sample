module.exports = async (notificationData) =>{
	for(key in notificationData) {
        if(notificationData.hasOwnProperty(key)) {
            var value = notificationData[key];
            console.log(key + " : "  + value);
            //do something with value;
        }
    }
    // you can interactive with analytics here
};
 
