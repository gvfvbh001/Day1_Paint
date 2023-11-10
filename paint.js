class Paint{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.clear = document.querySelector("#container_btn-ClearGrid");
        this.erase = document.querySelector("#container_btn-erase");
        this.PaintGrid = document.querySelector("#container_btn-PaintGrid");
        if(!this.canvas){
            console.error(" lỗi không tìm thấy nơi vẽ");
            return;
        }
        this.canvas.width = 892;
        this.canvas.height = 288;
        this.ctx = this.canvas.getContext("2d");
        if(!this.ctx){
            console.log("ko tìm thấy dạng vẽ ");
            return;
        }
        this.lineWidth = 5;
        this.ques = false;
        this.i =0;
        this.update();
    }
    update(){
        this.clear.addEventListener("click", ()=> this.clearAll());
        this.PaintGrid.addEventListener("click", (e)=> this.clickbtnPaint());
        this.lineListen();        
    }
    // vị trí khí đưa chuột đến 
    lineMouse(e){
        let rect = this.canvas.getBoundingClientRect();
        return {
            x : (e.clientX - rect.left),
            y : (e.clientY - rect.top),
        }
    }
    // sự kiện 
    mouseMove(e) {
        if(this.ques) {
        let {x, y} = this.lineMouse(e);
        this.draw(x,y);
        }
    }
    clickbtnPaint(){
        this.i++;
        if(this.i % 2 ==0){
            this.ques = false;
        }else{
            this.ques = true;
        }
    }
    clearAll(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    erase(x,y){
        this.ctx.clearRect(x,y,this.canvas.width,this.canvas.height);
    }
    // nghe sự kiện 
    lineListen(){
        this.canvas.addEventListener("mousemove", (eve)=> this.mouseMove(eve));
    }
    drawLine(startPos, endPos ){
        this.ctx.lineWidth = this.lineWidth; // size của đường viền 
        this.ctx.strokeStyle = "black"; // màu của đường viền
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.x, startPos.y); // di chuyển đến nơi cần vẽ 
        this.ctx.lineTo(endPos.x , endPos.y); // vẽ từ điểm mới di chuyển đến của moveTo đến điểm cuối 
        this.ctx.stroke(); // bắt đầu vẽ đường viền 
    }
    draw(x,y){
        this.ctx.beginPath();
        this.ctx.arc(x,y,5,0,2 * Math.PI); // x nơi bắt dầu vẽ đến y
        // lưu ý nhỏ là khi vẽ hình tròn xong mới được tô màu 
        this.ctx.fillStyle = " red"; // màu nền 
        this.ctx.fill(); // bắt đầu tô 
    }
}
let p = new Paint();