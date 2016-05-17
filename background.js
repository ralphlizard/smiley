var counter = 0;

chrome.browserAction.onClicked.addListener(function (tab) {
    counter++;
    if (counter == 5) {
        alert("Hey !!! You have clicked five timessssssssss");
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "convert_image_url_to_data_url") {
        var canvas=document.createElement("canvas"); 
        var ctx=canvas.getContext("2d"); 

        //match canvas attributes to that of original image
        canvas.className = request.className;
        canvas.width = request.width; 
        canvas.height = request.height;
        canvas.id = "image";        
        
        //load image onto canvas
        var image = new Image();
        image.crossOrigin = 'http://profile.ak.fbcdn.net/crossdomain.xml';
        image.addEventListener("load", function() {
            ctx.drawImage(image, 0, 0);
            sendResponse({data: canvas.toDataURL()}); 
        });
        image.src = request.src;
/*
        //this is where the deformed face mask will be drawn
        var webgl = document.createElement("canvas");
        webgl.className = request.className;
        webgl.width = request.width;
        webgl.height = request.height;
        webgl.id = "webgl";

        //this ensures that webgl will be overlayed directly on top of canvas
        webgl.style.position = "absolute";
        webgl.style.left = "0";
        webgl.style.top = "0";            

        smile(canvas, webgl);

   
        //replace image with canvas
        $(this).replaceWith(canvas);
        $(canvas).after(webgl);

        //run deformer
        smile(canvas, webgl);
*/
        return true; // Required for async sendResponse()
    
    }
  }
)
