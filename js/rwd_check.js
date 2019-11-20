(function($){

  const conBox = $('#conBox');

  // 각 디바이스별 크기 기준 설정
  let mobile = 768, tablet = 1024,laptop = 1366, pc = 1600;
  //기본 디바이스 명칭 설정
  let nowSize;
  const device = ['mobile','tablet','laptop','pc','pcfull'];
  let beforeW = $(window).outerWidth(true);

  // 각 디바이스 상황에 맞는 data 처리
  const DeviceData = function(wid){
    switch(wid){

      case device[0]: 
        conBox.load('./temp/main_mob.html');
        $('body').append('<script src="../js/viewBoxmob.js></script>')

      break;
      case device[1]:
        conBox.load('./temp/main_tab.html',function(){
          $('body').append('<script src="../js/tab.js"></script>');
          //load시 각각 html파일에는 script파일이 있어야함, 그렇기 때문에 애초부터 load를 해줄 때 
          //script코드를 같이 추가하여 덜 번거롭게 한다.
        });
      break;
      case device[2]: //중간에 break가 없을 경우 이어나간다는 뜻
      case device[3]:
      case device[4]:
        conBox.load('./temp/main_pc.html',function(){
          $('head').find('title').before('<link rel="stylesheet" href="../css/pc.css">');
          $('body').append('<script>console.log("pc");</script>')
        });

      break;

        };

  }





  // 디바이스 크기 체크
  const DeviceSet = function(winW){
    if(winW <= mobile){ //현재 화면의 크기가 모바일 크기보다 작거나 같으면
      nowSize = device[0]; //현재 화면의 상태는 모바일 상태이다
    }else if(winW > mobile && winW <= tablet){ //현재 화면의 크기가 모바일크기보다 크거나, 태블릿 크기보다 작거나 같으면,
      nowSize = device[1]; //현재 화면의 상태는 타블렛 상태이다
    }else if(winW > tablet && winW <= laptop){
      nowSize = device[2];
    }else if(winW > laptop && winW <= pc){
      nowSize = device[3];
    }else{ //이 모든 것이 아닐 경우에는 
      nowSize = device[4]; //현재 화면의 상태는 pcfull 상태이다.
    }
    return nowSize; //이 if문에서 적용한 값의 상태를 바깥에서 적용시킨다
  };

    let beforeDevice = DeviceSet(beforeW); 
    DeviceData(beforeDevice);

    //console.log(nowSize);
    //console.log(navigator.userAgent);


    // 파이어 폭스인가 아닌가 판단
    let browser = navigator.userAgent.toLowerCase();
    let nowb = null;
    if(browser.indexOf('firefox') !== -1){//실상 -1은 '없다면,아니라면'과 같은 말이다
    // indexOf('...')-> '...'가 존재한다면 / 존재유무판단명령어
      nowb = 'firefox';
    }else{
      nowb = 'other';
    };
    console.log(nowb);

     
    // 사이즈 변경 체크
    $(window).on('resize',function(){ //윈도우 (가로)사이즈를 변경하였을 때

    let afterW = $(window).outerWidth(true); //
    let afterDevice = DeviceSet(afterW);

    if(beforeDevice !== afterDevice){ //만약 전의 device와 현재 deevice 값이 같지 않다면
      if(nowb == 'firefox'){
        window.location = window.location;
      }else{
        location.reload();
      }
      //새로고침하여라
      //location.reload를 쓸 경우 크롬에서는 적용되나 파이어폭스에서는 적용이 되지 않음
      //그러므로 window.location=window.location을 적용시켜 강제로 새로고침하게 한다
      //혹은, if를 다시 넣어 firefox인지 아닌지 유무를 판단하여, 파이어폭스이 경우 window.location으로 적용시키고
      //아닐 경우 location.reload()로 준다라고 명령어를 준다. 그 외 
    }
  });

})(jQuery);
