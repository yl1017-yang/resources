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

        const preview2 = createElement2(e, file);
        imagePreview.appendChild(preview2);

        const preview3 = createElement3(e, file);
        imagePreview.appendChild(preview3);

        const preview4 = createElement4(e, file);
        imagePreview.appendChild(preview4);

        const preview5 = createElement5(e, file);
        imagePreview.appendChild(preview5);

        // const preview6 = createElement6(e, file);
        // imagePreview.appendChild(preview6);

        /* 가로사이즈 이미지 생성 */
        const preview7 = createElement7(e, file);
        imagePreview.appendChild(preview7);

        const preview8 = createElement8(e, file);
        imagePreview.appendChild(preview8);

        const preview9 = createElement9(e, file);
        imagePreview.appendChild(preview9);

        const preview10 = createElement10(e, file);
        imagePreview.appendChild(preview10);

        const preview11 = createElement11(e, file);
        imagePreview.appendChild(preview11);

        // const preview12 = createElement12(e, file);
        // imagePreview.appendChild(preview12);

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
document.querySelector(".bi-pulmuone").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-pulmuone");
    ele[i].classList.remove("bi-orga", "bi-foodmerce", "bi-water", "bi-danone", "bi-none");
    console.log(ele[i]);
  }
});
document.querySelector(".bi-orga").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-orga");
    ele[i].classList.remove("bi-pulmuone", "bi-foodmerce", "bi-water", "bi-danone", "bi-none");
    console.log(ele[i]);
  }
});
document.querySelector(".bi-foodmerce").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-foodmerce");
    ele[i].classList.remove("bi-pulmuone", "bi-orga", "bi-water", "bi-danone", "bi-none");
    console.log(ele[i]);
  }
});
document.querySelector(".bi-water").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-water");
    ele[i].classList.remove("bi-pulmuone", "bi-orga", "bi-foodmerce", "bi-danone", "bi-none");
    console.log(ele[i]);
  }
});
document.querySelector(".bi-danone").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-danone");
    ele[i].classList.remove("bi-pulmuone", "bi-orga", "bi-water", "bi-foodmerce", "bi-none");
    console.log(ele[i]);
  }
});
document.querySelector(".bi-none").addEventListener("click", function () {
  const ele = document.querySelectorAll(".img-box p, .img-box-row p");
  for (let i = 0; i < ele.length; i++) {
    ele[i].classList.add("bi-none");
    ele[i].classList.remove("bi-pulmuone", "bi-orga", "bi-water", "bi-foodmerce", "bi-danone");
    console.log(ele[i]);
  }
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

  // const input = document.createElement("input");
  // input.setAttribute("type","checkbox");
  // input.setAttribute("name","selectImg");
  // input.setAttribute("class","check-box");
  // divbox.appendChild(input);

  return divbox;
}

function createElement2(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 2; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box");
    divbox.setAttribute("id", "capture2");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  // const input = document.createElement("input");
  // input.setAttribute("type","checkbox");
  // input.setAttribute("name","selectImg");
  // input.setAttribute("class","check-box");
  // divbox.appendChild(input);

  return divbox;
}

function createElement3(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box");
    divbox.setAttribute("id", "capture3");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

function createElement4(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box");
    divbox.setAttribute("id", "capture4");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

function createElement5(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box");
    divbox.setAttribute("id", "capture5");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

// function createElement6(e, file) {
//   const divbox = document.createElement("div");

//   for (let i = 0; i < 6; i++) {
//     const img = document.createElement("img");

//     img.setAttribute("src", e.target.result);
//     img.setAttribute("data-file", file.name);

//     divbox.setAttribute("class", "img-box");
//     divbox.setAttribute("id", "capture6");
//     divbox.appendChild(img);
//   }

//   const p = document.createElement("p");
//   divbox.appendChild(p);

//   return divbox;
// }

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

  return divbox;
}

function createElement8(e, file) {
  const divbox = document.createElement("div");
  
  for (let i = 0; i < 2; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box-row");
    divbox.setAttribute("id", "rowcapture2");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

function createElement9(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box-row");
    divbox.setAttribute("id", "rowcapture3");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

function createElement10(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box-row");
    divbox.setAttribute("id", "rowcapture4");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

function createElement11(e, file) {
  const divbox = document.createElement("div");

  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");

    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", "img-box-row");
    divbox.setAttribute("id", "rowcapture5");
    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  return divbox;
}

// function createElement12(e, file) {
//     const divbox = document.createElement("div");

//     for (let i = 0; i < 6; i++) {
//       const img = document.createElement("img");
  
//       img.setAttribute("src", e.target.result);
//       img.setAttribute("data-file", file.name);
  
//       divbox.setAttribute("class", "img-box-row");
//       divbox.setAttribute("id", "rowcapture6");
//       divbox.appendChild(img);
//     }

//   const p = document.createElement("p");
//   divbox.appendChild(p);

//   return divbox;
// }

function checkShot() {
  // 체크한 이미지만 저장 : https://nameybs.tistory.com/37
  const arr = [];
  const selectImg = document.getElementsByName("selectImg");
  for (let i=0; i < selectImg.length; i++) {
    if (selectImg[i].checked == true) {
      arr.push(selectImg[i].value);
    }
  }
  return check;
}

// 이미지 저장
function partShot(download_index) {
  let arr = ['1', '2', '3', '4', '5', '6'];
  let name = getInputFileNm();

  console.log("arr.length = ", arr.length);
  console.log("download_index = ", download_index);

  setTimeout(function () {
    html2canvas(document.querySelector("#capture" + arr[download_index]), {
      logging: true,
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
        saveImg(canvas.toDataURL("image/jpg"), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + arr[download_index] + "_" + name + ".jpg"));

        // 3번째 1000
        wantedWidth = 1000;
        wantedHeight = 1000;
        // toDataUrL 함수로 이미지를 base64로 가져온다.jpeg사용 화질 1.0최고/0.5중간/0.1낮은
        saveImg(canvas.toDataURL("image/jpeg", 0.2), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + arr[download_index] + "_" + name + ".jpg"));

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
  let arr = ['1', '2', '3', '4', '5', '6'];
  let name = getInputFileNm();

  for (let i = 0; i < arr.length; i++) {
    html2canvas(document.querySelector("#rowcapture" + arr[i]), {
      logging: true,
      // letterRendering: 1,
      // allowTaint: true,
      // useCORS: true,
      /* scale: 1, */
    })
      .then(canvas => {
        rowsaveImg(canvas.toDataURL("image/jpeg", 0.8), ("640X320_" + arr[i] + "_" + name + ".jpg"));
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