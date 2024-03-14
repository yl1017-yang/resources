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
  // console.log(typeof files, files);

  if ([...files].length >= 11) {
    alert('이미지는 최대 9개까지 업로드가 가능합니다.');
    return;
  }

  // 파일 타입 검사
  [...files].forEach(file => {
    if (!file.type.match("image/.*")) {
      alert('이미지 파일만 업로드가 가능합니다.');
      return
    }

    // 파일 갯수 검사
    if ([...files].length < 11) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {

        /* 정사이즈 이미지 생성 */
        const preview1 = createElement1(e, file);
        imagePreview.appendChild(preview1);

        /* 가로사이즈 이미지 생성 */
        // const preview7 = createElement7(e, file);
        // imagePreview.appendChild(preview7);

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
    const ele = document.querySelectorAll(".image-preview p");
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
  const imgBoxes = document.querySelectorAll("img-box2");

  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);

  divbox.setAttribute("class", "img-box2");  
  divbox.appendChild(img);

  // 이미지 박스가 생성될 때마다 클래스 추가
  if (imgBoxes[i].length === 0) {
    divbox.classList.add("first");
  } else if (imgBoxes[i].length === 1) {
    divbox.classList.add("second");
    imgBoxes[0].classList.remove("first");
  } else if (imgBoxes[i].length === 2) {
    divbox.classList.add("third");
    imgBoxes[0].classList.remove("first");
    imgBoxes[1].classList.remove("second");
  }

  return divbox;
}

// 가로형 이미지
// function createElement7(e, file) {
//   const divbox = document.createElement("div");
//   const img = document.createElement("img");

//   img.setAttribute("src", e.target.result);
//   img.setAttribute("data-file", file.name);

//   divbox.setAttribute("class", "img-box-row");
//   divbox.setAttribute("id", "rowcapture1");
//   divbox.appendChild(img);

//   const p = document.createElement("p");
//   divbox.appendChild(p);

//   const div = document.createElement('div');
//   div.setAttribute("class", "number");
//   divbox.appendChild(div);

//   return divbox;
// }

// 이미지 저장
function partShot() {
  let name = getInputFileNm();
  let number = getInputNumber();

  html2canvas(document.querySelector("#capture" + 1), {
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
      saveImg(canvas.toDataURL("image/jpeg", 0.8), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + number + "_" + name + ".jpg"));

      // 3번째 1200
      wantedWidth = 1200;
      wantedHeight = 1200;
      saveImg(canvas.toDataURL("image/jpeg", 0.6), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + number + "_" + name + ".jpg"));

    }).catch(function (err) {
      console.log(err);
    });
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
// function rowShot() {
//   let arrNumber = ['1'];
//   let name = getInputFileNm();
//   let number = getInputNumber();

//   for (let i = 0; i < arrNumber.length; i++) {
//     html2canvas(document.querySelector("#rowcapture" + arrNumber[i]), {
//       scale: 1
//     })
//       .then(canvas => {
//         rowsaveImg(canvas.toDataURL("image/jpeg", 0.8), ("640X320_" +  number + "_" +  name + ".jpg"));
//       });
//   }
// }

// function rowsaveImg(uri, filename) {
//   var link = document.createElement("a");
//   if (typeof link.download === 'string') {
//     link.href = uri;
//     link.download = filename
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } else {
//     window.open(uri);
//   }
// }


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
