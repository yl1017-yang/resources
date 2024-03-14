// 업로드 클릭 이벤트 처리
const realUpload = document.querySelector(".real-upload");
const upload = document.querySelector(".btn-upload");

upload.addEventListener("click", () => realUpload.click());
realUpload.addEventListener('change', getImageFiles);

// 이미지 파일을 가져왔을때 이벤트 처리
function getImageFiles(e) {
  const uploadFiles = [];
  const files = e.currentTarget.files;
  let imagePreview = document.querySelector('.image-preview');
  const docFrag = new DocumentFragment();
  console.log(typeof files, files);

  if ([...files].length >= 2) {
    alert('이미지는 최대 1개까지 업로드가 가능합니다.');
    return;
  }

  // 파일 타입 검사
  [...files].forEach(file => {
    if (!file.type.match("image/.*")) {
      alert('이미지 파일만 업로드가 가능합니다.');
      return
    }

    // 파일 갯수 검사
    if ([...files].length < 2) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {

        /* 정사이즈 이미지 생성 */
        const preview1 = createElement1(e, file);
        imagePreview.appendChild(preview1);

        /* 가로사이즈 이미지 생성 */
        const preview7 = createElement7(e, file);
        imagePreview.appendChild(preview7);

      };
      reader.readAsDataURL(file);
    }
  });
}

/* 화면 초기화 */
const del = document.querySelector(".btn-del");
del.addEventListener("click", () => {
  location.reload(true);
});

//BI 변경
const categories = ["bi-pulmuone", "bi-orga", "bi-foodmerce", "bi-water", "bi-danone", "bi-none"];

categories.forEach(category => {
  document.querySelector(`.${category}`).addEventListener("click", function () {
    const ele = document.querySelectorAll(".img-box p, .img-box-row p");
    for (let i = 0; i < ele.length; i++) {
      ele[i].classList.add(category);
      categories.filter(c => c !== category).forEach(c => ele[i].classList.remove(c));
      console.log(ele[i]);
    }
  });
});


function createElement1(e, file) {
  const divbox = document.createElement("div");
  const img = document.createElement("img");

  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);

  divbox.setAttribute("class", "img-box");
  divbox.setAttribute("id", "capture1");
  divbox.appendChild(img);

  const p = document.createElement("p");
  divbox.appendChild(p);

  const div = document.createElement('div');
  div.setAttribute("class", "number");
  divbox.appendChild(div);

  return divbox;
}

// 가로형 이미지
function createElement7(e, file) {
  const divbox = document.createElement("div");
  const img = document.createElement("img");

  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);

  divbox.setAttribute("class", "img-box-row");
  divbox.setAttribute("id", "rowcapture1");
  divbox.appendChild(img);

  const p = document.createElement("p");
  divbox.appendChild(p);

  const div = document.createElement('div');
  div.setAttribute("class", "number");
  divbox.appendChild(div);

  return divbox;
}

// 이미지 저장
function partShot(download_index) {
  let arrNumber = ['1'];
  let name = getInputFileNm();
  let number = getInputNumber();

  console.log("arrNumber.length = ", arrNumber.length);
  console.log("download_index = ", download_index);

  setTimeout(function () {
    html2canvas(document.querySelector("#capture" + arrNumber[download_index]), {
      // logging: true,
      // letterRendering: 1,
      // allowTaint: true,
      // taintTest: false,
      // useCORS: true,
      scale: 4,
    })
      .then(canvas => {

        var wantedWidth = 0;
        var wantedHeight = 0;        

        // 1 번째 550
        wantedWidth = 550;
        wantedHeight = 550;
        saveImg(canvas.toDataURL("image/jpg"), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + number + "_" + name + ".jpg"));

        // 2번째 1000
        wantedWidth = 1000;
        wantedHeight = 1000;
        // toDataUrL 함수로 이미지를 base64로 가져온다.jpeg사용 화질 1.0최고/0.5중간/0.1낮은
        saveImg(canvas.toDataURL("image/jpeg", 0.4), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + number + "_" + name + ".jpg"));

        if (download_index < arr.length - 1) {
          partShot(download_index + 1);
        }

      }).catch(function (err) {
        console.log(err);
      });
  }, 500);


}


function saveImg(dataURL, wantedWidth, wantedHeight, filename) {
  var img = document.createElement("img");

  img.onload = function () {
    var originalWidth = img.naturalWidth;
    var originalHeight = img.naturalHeight;

    console.log("image width : " + originalWidth + ", height : " + originalHeight);
    console.log("image resize Yes, wantedWidth : " + wantedWidth + ",wantedHeight : " + wantedHeight);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = wantedWidth;
    canvas.height = wantedHeight;

    ctx.drawImage(this, 0, 0, originalWidth, originalHeight, 0, 0, wantedWidth, wantedHeight);

    var dataURI = canvas.toDataURL();
    console.log("dataURI.length : " + dataURI.length);

    var link = document.createElement("a");
    if (typeof link.download === 'string') {
      link.href = dataURI;
      link.download = filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(dataURI);
    }

    console.log("image resize No");
  };

  img.src = dataURL;
}


/* 640X320 이미지 저장 */
function rowShot() {
  let arrNumber = ['1'];
  let name = getInputFileNm();
  let number = getInputNumber();

  for (let i = 0; i < arrNumber.length; i++) {
    html2canvas(document.querySelector("#rowcapture" + arrNumber[i]), {
      // logging: true,
      // letterRendering: 1,
      // allowTaint: true,
      // useCORS: true,
      /* scale: 1, */
    })
      .then(canvas => {
        rowsaveImg(canvas.toDataURL("image/jpeg", 0.8), ("640X320_" +  number + "_" +  name + ".jpg"));
      });
  }
}

function rowsaveImg(uri, filename) {
  var link = document.createElement("a");
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}


// 입력한 수량을 가져온다.
function getInputNumber() {
  const number = document.querySelector('.input-msg').value;
  return number;
}

// 수량 세팅
function setNumber() {
  const div = document.querySelectorAll('.number');
  for (let i = 0; i < div.length; i++) {
    div[i].classList.add("number-show");
  }

  const value = getInputNumber();
  
  const number = document.querySelectorAll('.number-show');
  for (let j = 0; j < number.length; j++) {
    number[j].textContent = value;
    console.log(value);
  } 
}

// 수량 삭제
function delNumber() {
  const div = document.querySelectorAll('.number');
  for (let i = 0; i < div.length; i++) {
    div[i].classList.remove("number-show");
  }

  const msgdel = document.querySelector('.input-msg');
  msgdel.value = null;
}

// 입력한 파일명을 가져온다.
function getInputFileNm() {
  const name = document.querySelector(".input-name").value;
  return name;
}

// 입력한 파일명을 화면에 보여준다.
function showInputFileNm() {	
   var name = getInputFileNm();
   document.querySelector(".name-show").textContent = name;   
}