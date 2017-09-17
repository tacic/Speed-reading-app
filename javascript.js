$(function(){
    
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    
    
    
    
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();
    
    
    $("#start").click(function(){
        //uzmi tekst i rastavi ga na delove
        //\ je za prored, novi red, razmak itd... i + znaci jedan ili vise
        myArray = $("#userInput").val().split(/\s+/);
        //provera duzine niza reci
        inputLength = myArray.length;
        
        if(inputLength>1){
            reading = true;
            
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();
            
            //progres slider maksimum
            $("#progressslider").attr("max", inputLength-1);
            
            counter = 0;
            
            $("#result").show();
            $("#result").text(myArray[counter]);
            
            action = setInterval(read, frequency);
            
        }else{
            $("#error").show();
        }
    });
    
    
    $("#new").click(function(){
       location.reload(); 
    });
    
    
    $("#pause").click(function(){
        clearInterval(action);
        reading = false;
        $("#pause").hide();
        $("#resume").show();
    });
    
    
    $("#resume").click(function(){
       action = setInterval(read, frequency);
       reading = true;
        
        $("#resume").hide();
        $("#pause").show();
    });
    
    
    
    $("#fontsizeslider").on("slidestop", function(event,ui){
        
        $("#fontsizeslider").slider("refresh");
        
        var slidervalue = parseInt($("#fontsizeslider").val());
        
        $("#result").css("fontSize", slidervalue);
        $("#fontsize").text(slidervalue);
    });
    
    
     $("#speedslider").on("slidestop", function(event,ui){
        
        $("#speedslider").slider("refresh");
        
        var slidervalue = parseInt($("#speedslider").val());
        
        
        $("#speed").text(slidervalue);
         
         clearInterval(action);
         
         frequency = 60000/slidervalue;
         
         if(reading){
             action = setInterval(read, frequency);
         }
    });
    
    
     $("#progressslider").on("slidestop", function(event,ui){
        
        $("#progressslider").slider("refresh");
        
        var slidervalue = parseInt($("#progressslider").val());
        
         
         clearInterval(action);
         
         counter = slidervalue;
         
         $("#result").text(myArray[counter]);
         
         $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
         
         if(reading){
             action = setInterval(read, frequency);
         }
    });
    
    
    
    function read(){
        if(counter == inputLength-1){
           clearInterval(action);
            reading = false;
            
            $("#pause").hide();
            
           }else{
              counter++;
              $("#result").text(myArray[counter]);
               
              $("#progressslider").val(counter).slider("refresh");
               
              $("#percentage").text(Math.floor(counter/(inputLength-1)*100));   
             
           }
        
    }
    
    
    
    
});