var ready = false;

$(window).load(function(){
    $("img[class='profilePic img']").each(function(i){
        var o_img = this;
        
        chrome.runtime.sendMessage(
            {message: "convert_image_url_to_data_url", src: o_img.src, width: o_img.width, height: o_img.height, className: o_img.className}, 
            
            //what to do with the dataURL (response.data) of the image
            function(response) {
                console.log(o_img.src);
                o_img.src = response.data;
                ready = true;
            }                           
        );    
    })
    
    $(function() { 
    setInterval(happyize,1000); }) 

    function happyize(){ 
        console.log(ready)
//        $("img").each(function(i){          
        $("img[class='profilePic img']").each(function(i){  
            //initialize canvas
            if(ready){
            var canvas=document.createElement("canvas"); 
            var ctx=canvas.getContext("2d"); 

            //load image onto canvas
            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0);
            };
            image.crossOrigin = 'http://profile.ak.fbcdn.net/crossdomain.xml';
            image.src = this.src;
            console.log(image.src);

            //match canvas attributes to that of original image
            canvas.className = this.className;
            canvas.width = this.width; 
            canvas.height = this.height;
            canvas.id = "image";
            ctx.drawImage(this,0,0);
                
            canvas.style.left = "0";
            canvas.style.top = "0";                      

            //this is where the deformed face mask will be drawn
            var webgl = document.createElement("canvas");
            webgl.width = this.width;
            webgl.height = this.height;
            webgl.id = "webgl";
            
            //this ensures that webgl will be overlayed directly on top of canvas
            webgl.style.position = "absolute";
            webgl.style.left = "5px";
            webgl.style.top = "5px";            
        
            //replace image with canvas
            $(this).after(webgl);
            
            //run deformer
            smile(canvas, webgl);
            ready = false;
            }
        }); 
    }     
});