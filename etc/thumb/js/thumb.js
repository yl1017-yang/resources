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

        for (let i = 1; i <= 10; i++) {
          const inRowCapture = i > 5; // 가로 이미지 여부
          const count = inRowCapture ? i - 5 : i; // 이미지 번호 계산

          const preview = createElement(e, file, count, inRowCapture);
          imagePreview.appendChild(preview);
        }
        
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
const categories = ["bi-pulmuone", "bi-orga", "bi-foodmerce", "bi-water", "bi-danone", "bi-pulmuone-basic", "bi-orga-basic", "bi-foodmerce-basic", "bi-water-basic", "bi-danone-basic", "bi-none"];

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


function createElement(e, file, count, isRowCapture) {
  const divbox = document.createElement("div");

  // const imgCount = isRowCapture ? count : 1;

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", e.target.result);
    img.setAttribute("data-file", file.name);

    divbox.setAttribute("class", isRowCapture ? "img-box-row" : "img-box");
    divbox.setAttribute("id", isRowCapture ? "rowcapture" + count : "capture" + count);

    divbox.appendChild(img);
  }

  const p = document.createElement("p");
  divbox.appendChild(p);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "selectImg");
  input.setAttribute("value", count.toString());
  input.setAttribute("class", "check-box");
  divbox.appendChild(input);

  return divbox;
}


// 체크한 이미지만 저장 : https://nameybs.tistory.com/37
function checkShot() {  
  let arrNumber = [];
  let selectImg = document.getElementsByName("selectImg");
  for (let i = 0; i < selectImg.length; i++) {
    if (selectImg[i].checked == true) {
      arrNumber.push(selectImg[i].value);
    }
  }
  
  console.log(arrNumber);
  
  let name = getInputFileNm();

  for (let i = 0; i < arrNumber.length; i++) {
    html2canvas(document.querySelector("#capture" + arrNumber[i]))
    .then(canvas => {
      rowsaveImg(canvas.toDataURL("image/jpeg", 0.4), ("1000X1000_" + arrNumber[i] + "_" + name + ".jpg"));
    });
  }

  if (arrNumber.length === 0) {
    alert('이미지를 선택하세요.');
    return;
  }
}

// 이미지 저장
function partShot(download_index) {
  let arrNumber = ['1', '2', '3', '4', '5'];
  let name = getInputFileNm();

  console.log("arrNumber.length = ", arrNumber.length);
  console.log("download_index = ", download_index);

  setTimeout(function () {
    html2canvas(document.querySelector("#capture" + arrNumber[download_index]), {
      scale: 4,
    })
    .then(canvas => {

      var wantedWidth = 0;
      var wantedHeight = 0;

      // 1 번째 550
      wantedWidth = 550;
      wantedHeight = 550;
      saveImg(canvas.toDataURL("image/jpg"), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + arrNumber[download_index] + "_" + name + ".jpg"));

      // 2번째 1000
      wantedWidth = 1000;
      wantedHeight = 1000;
      // toDataUrL 함수로 이미지를 base64로 가져온다.jpeg사용 화질 1.0최고/0.5중간/0.1낮은
      saveImg(canvas.toDataURL("image/jpeg", 0.4), wantedWidth, wantedHeight, (wantedWidth + "X" + wantedHeight + "_" + arrNumber[download_index] + "_" + name + ".jpg"));

      if (download_index < arrNumber.length - 1) {
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
  let arrNumber = ['1', '2', '3', '4', '5'];
  let name = getInputFileNm();

  for (let i = 0; i < arrNumber.length; i++) {
    html2canvas(document.querySelector("#rowcapture" + arrNumber[i]), {
      scale: 1
    })
    .then(canvas => {
      rowsaveImg(canvas.toDataURL("image/jpg"), ("640X320_" + arrNumber[i] + "_" + name + ".jpg"));
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

// zip 파일 저장
function saveAllAsZip() {
  const images = document.querySelectorAll('.image-preview img');
  if (images.length === 0) {
    alert('이미지가 없습니다.');
    return;
  }

  const zip = new JSZip();
  const promises = [];

  images.forEach((image, index) => {
    const url = image.src;
    const filename = `image_${index}.jpg`;

    // 이미지를 Blob 형태로 가져와 zip 파일에 추가하는 비동기 작업
    const promise = fetch(url)
      .then(response => response.blob())
      .then(blob => {
        zip.file(filename, blob);
      })
      .catch(error => {
        console.error(`이미지를 가져오는 중 오류가 발생했습니다: ${error}`);
      });

    promises.push(promise);
  });

  // 모든 이미지를 다운로드할 때까지 기다린 후 zip 파일 생성 및 다운로드
  Promise.all(promises)
    .then(() => {
      zip.generateAsync({ type: 'blob' })
        .then(content => {
          saveAs(content, 'images.zip');
        })
        .catch(error => {
          console.error(`zip 파일을 생성하는 중 오류가 발생했습니다: ${error}`);
        });
    });
}

