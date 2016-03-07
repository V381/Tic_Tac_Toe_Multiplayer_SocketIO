    

    var userWaitingH1 = document.querySelector('.userWaiting');

    startButton.addEventListener('click', function(e) {
        socket.emit('myClick');
    });

    socket.on('move', function(index){
        var i = index.index;
         if (xySwitch) {
                 
                    if (td[i].innerHTML === 'o') {
                        return;
                    }

                    td[i].innerHTML = "x";
                    xySwitch = false;
                    td[i].style.color = "green";
                    td[i].className = "x";
                    /*
                    if(winner(el, 'x')){
                        drawArr = [];
                        setTimeout(function(){
                            clearAll(el);
                        }, 2000)
                        xySwitch = true;
                    }
                    */
                    if (checkForWinner(td[i], 'x')) {
                        drawArr = [];
                        setTimeout(function () {
                            clearAll();
                        }, 2000);
                        xySwitch = true;
                    }
                    checkForWinner(td[i], 'x');
                    checkIfDraw(td[i]);
                } else if (xySwitch === false) {

                    if (td[i].innerHTML === 'x') {
                        return;
                    }

                    td[i].innerHTML = "o";
                    xySwitch = true;
                    td[i].style.color = "red";
                    td[i].className = "o";
                    /*
                    if(winner(el, 'o')){
                        setTimeout(function(){
                            clearAll(el);
                        }, 2000)
                        xySwitch = true;
                        drawArr = [];
                    }
                    */
                    if (checkForWinner(td[i], 'o')) {
                        drawArr = [];
                        setTimeout(function () {
                            clearAll();
                        }, 2000);
                        xySwitch = true;
                    }
                    checkIfDraw(td[i]);
                }
    });

    socket.on('myClick', function(data) {
        startButton.click();
    });

    socket.on('waiting for user', function(msg) {
        userWaitingH1.innerHTML = msg;
    });

    socket.on('user connected', function(msg){
        userWaitingH1.innerHTML = msg + ' Press start game button';
        oneVsOne();
                clearAll();
        setTimeout(function(){
            userWaitingH1.innerHTML = '';
        }, 3000);
    })

    socket.on('user disconnected', function(msg) {
        userWaitingH1.innerHTML = msg;
        setTimeout(function(){
            userWaitingH1.innerHTML = 'User disconnected!';
        }, 3000);
    });
