//명함 템플릿별 필요 입력 요소
var templateData = {
	"T1": {
		"sample": {
			"path": "images/template/",
			"file": "type01.png",
			"corner": "round",
		},
		"input": [
			{
				"name": "이름",
				"id": "Name",
				"class": "name",
				"placeholder": "이름을 입력하세요.",
				"defaultValue": "홍길동",
			},
			{
				"name": "직함",
				"id": "Title",
				"class": "title",
				"placeholder": "직함을 입력하세요. (ex:PA, DBRT)",
				"defaultValue": "PA",
			},
			{
				"name": "핸드폰 번호",
				"id": "Mobile",
				"class": "mobile",
				"placeholder": "핸드폰번호를 입력하세요.",
				"defaultValue": "010-8855-9999",
			},
			{
				"name": "지점",
				"id": "Branch",
				"class": "branch",
				"placeholder": "지점명을 입력하세요.",
				"defaultValue": "구리지점",
			},
			{
				"name": "주소",
				"id": "Addr",
				"class": "addr",
				"placeholder": "주소를 입력하세요.",
				"defaultValue": "경기 구리시 경춘로 158",
			}
		],
		"image": [
			{
				"path": "images/template/T1/",
				"file": "type1_logo.png",
			},
		],
  },
	"T2": {
		"sample": {
			"path": "images/template/T2/",
			"file": "type2_sample.png",
			"corner": "normal"
		},
		"input": [
			{
				"name": "이름",
				"id": "Name",
				"class": "name",
				"placeholder": "이름을 입력하세요.",
				"defaultValue": "홍길동",
			},
			{
				"name": "지점",
				"id": "Branch",
				"class": "branch",
				"placeholder": "지점명을 입력하세요.",
				"defaultValue": "OO사업단 OO지점",
			},
			{
				"name": "우편번호",
				"id": "Post",
				"class": "post",
				"placeholder": "우편번호를 입력하세요.",
				"defaultValue": "06194",
			},
			{
				"name": "주소",
				"id": "Addr",
				"class": "addr",
				"placeholder": "주소를 입력하세요.",
				"defaultValue": "서울시 강남구 테헤란로 432 DB금융센터 15층"
			},
			{
				"name": "핸드폰번호1",
				"id": "Mobile1",
				"class": "mobile1",
				"placeholder": "핸드폰 번호를 입력하세요.",
				"defaultValue": "010 1234 5678",
			},
			{
				"name": "핸드폰번호2",
				"id": "Mobile2",
				"class": "mobile2",
				"placeholder": "핸드폰 번호를 입력하세요.",
				"defaultValue": "010 1234 5678",
			},
			{
				"name": "사무실번호",
				"id": "Phone",
				"class": "phone",
				"placeholder": "사무실 번호를 입력하세요.",
				"defaultValue": "02 1234 5678",
			},
			{
				"name": "팩스번호",
				"id": "Fax",
				"class": "fax",
				"placeholder": "팩스번호를 입력하세요.",
				"defaultValue": "02 1234 5678",
			},
			{
				"name": "메일주소",
				"id": "Email",
				"class": "email",
				"placeholder": "메일주소를 입력하세요.",
				"defaultValue": "cnshdf@idbins.com",
			},
		],
		"image": [
			{
				"path": "images/template/T2/",
				"file": "type2_logo.png",
			},
			{
				"path": "images/template/T2/",
				"file": "type2_deco1.png",
			},
			{
				"path": "images/template/T2/",
				"file": "type2_deco2.png",
			},
		],
	},
};

var final_name ="";
var final_phone="";
var final_personalImgUrl = "";
var final_personalImgUrl_path = "";
var imgDataUrl = "";
var selected_load_card = ""; // 211020 명함불러오기 변수 추가
var load_img_html = "";// 211020 명함불러오기 변수 추가
var app = {
	connInfo: function() {
	    var protocol = location.protocol;
	    var val = protocol.indexOf("http") >= 0 ? true : false;

	    return val;
	},
	pathInfo: function() {
	    var path = '';
	    var pathArr = location.pathname.split('/');
	    
	    for (var i = 0; i < pathArr.length - 1; i++) {
	      if (pathArr[i] !== '') {
	        path = path + '/' +pathArr[i];
	      }
	    }
	    
	    //포트체크 추가
		if(location.port >= 0){
			var pathName = location.protocol + '//' + location.hostname + ':' + location.port + path + '/';
		} else{
			var pathName = location.protocol + '//' + location.hostname + path + '/';		
		}
    
	    if (app.connInfo()) {
	    	return pathName;
	    } else {
	    	return '/';
	    }
	},
	tmplObject: function(arg) {
		var type;
		switch (arg) {
			case "T1":
				type = templateData.T1;
				break;
			case "T2":
				type = templateData.T2;
				break;
			default:
				type = app.tmplObject('T1');
		}
		return type;
	},
	designSelect: function() {
		var dataArr = Object.keys(templateData);
		var sliderHtml = '';
		var $sliderWrap = $('#designSelect');
		var slideHtml = '';

		sliderHtml = '<div class=\"swiper-container\"><div class=\"swiper-wrapper\"></div></div>';

		$sliderWrap.append(sliderHtml);

		for (var i in dataArr) {
			var templateType = dataArr[i];
			var data = app.tmplObject(dataArr[i]);

			var defaultSelect = i == 0 ? 'checked=\"checked\"' : '';
			var cornerType = data.sample.corner;

			slideHtml = '<div class=\"swiper-slide\">';
			slideHtml += '<input type=\"radio\" id=\"'+ dataArr[i] +'\" name=\"design\" class=\"inp_radio\" '+ defaultSelect +' value=\"'+ dataArr[i] +'\">';
			slideHtml += '<label for=\"'+ dataArr[i] +'\" class=\"lbl_layer\">';
			slideHtml += '<span class=\"wrap_image '+ cornerType +'\"><img src=\"'+ app.pathInfo() + data.sample.path + data.sample.file +'\" alt=\"\"></span>';
			slideHtml += '<span class=\"btn_select\"><span class=\"inner\"><i class=\"icon\"></i>이미지 선택</span></span>';
			slideHtml += '</label>';
			slideHtml += '</div>';

			$sliderWrap.find('.swiper-wrapper').append(slideHtml);
		}

		app._swiper = new Swiper('#designSelect .swiper-container', {
			slidesPerView: 'auto',
			on: {
				init: function() {
					$('#designSelect').find('.lbl_layer').on('click', function() {
						var idx = $(this).parents('.swiper-slide').index();
						app._swiper.slideTo(idx);
					});
				},
			},
		});
	},
  	formInit: function(templateType) {
	    var formHtml = '';
	    var imageHtml = '';
	    var $formWrap = $(".field-wrap");
	    var templateHtml = '';
	    var $templateWrap = $(".section_output").find(".card");
	    var $outputCont = $(".section_output").find(".template");

    	//$templateWrap.attr("class", "card " + templateType);

		var data = app.tmplObject(templateType);

	    for (var i in data.input) {
	    	formHtml += '<div class=\"form_group\">';
	    	formHtml += '<label class=\"form_label\" for=\"'+ 'inp' + data.input[i].id +'\">'+ data.input[i].name +'</label>';
	    	formHtml += '<input type=\"text\" id=\"'+ 'inp' + data.input[i].id +'\" class=\"form_control\" placeholder=\"'+ data.input[i].placeholder +'\" value=\"\">';
	    	formHtml += '</div>';
	
	    	templateHtml += '<p id=\"'+ 'txt' + data.input[i].id +'\" class=\"'+ data.input[i].class +'\">'/*+ data.input[i].defaultValue*/ +'</p>';
	    }
	    for (var j in data.image) {
	    	imageHtml += '<img src=\"'+ app.pathInfo() + data.image[j].path + data.image[j].file +'\" class=\"'+ 'image' + (++j) +'\" alt=\"\">';
	    }
		console.log('formInit');
	    //$formWrap.html('').append(formHtml);
	    //$outputCont.html('').append(templateHtml).append(imageHtml);
	    
	    var $fieldinput = $('.field-input');
	    /*
	    for (var w = 0, len = $fieldinput.length; w < len; w++) {
	    	var _value = $fieldinput.eq(w).val();
	    	var _inpID = $fieldinput.eq(w).attr('id');
	    	inpChangeText(_value,_inpID);
	    }
	    */
	    $formWrap.find("input").on("change keyup paste", function() {
	    	var $this = $(this);
	    	var value = $this.val();
	    	var valueMp;
	    	var inpID = $this.attr("id");
	    	
	    	if (inpID === 'inpMP1' || inpID === 'inpMP2' || inpID === 'inpTel' || inpID === 'inpFax') {
	    		valueMp = $this.val().replace(/[^0-9]/g,"").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--","-");
	    		value = $this.val(valueMp);
	    		
	    		inpChangeText(valueMp,inpID);
	    	} else {
	    		inpChangeText(value,inpID);
	    	}
			
	    });
	    
	    function inpChangeText(value,inpID){
	    	var txtID = inpID.replace("inp", "txt");
	    	
	    	console.log(value);
			if (!!value) {
				$('[data-id="' + txtID + '"]').addClass('on').text(value);
				if(inpID == "inpMP1") {final_phone = value;}
                if(inpID =="inpName") {final_name = value}
			} else {
				$('[data-id="' + txtID + '"]').removeClass('on').text(value);
			}
	    }
  	},
	formSubmit: function(templateType) {
    	var $outputCont = $(".section_output").find(".card");
		//app.beforeIssue(templateType);
    },
	beforeIssue: function(templateType) {
		var $template = $(".section_output").find(".card");
		/* 이미지 렌더링 전 템플릿 별 추가 작업 */
	    switch (templateType) {
	    	case 'T1':
	        	var merge1 = $("#txtBranch").text() + '&nbsp;/&nbsp;' + $("#txtAddr").text();
		       
		        $("#txtAddr").html(merge1);
		        $("#txtBranch").hide();
		
		        $("#txtName").append($("#txtTitle"));
		        break;
	    	case 'T2':
				if ($("#txtPost").text() != '') {
					var merge1 = $("#txtPost").text() + '&nbsp;' + $("#txtAddr").text();
					$("#txtAddr").html(merge1);
				}
				
				$("#txtPost").hide();
	
				if ($("#txtMobile2").text() != '') {
		        	var merge2 = '<em class=\"marker\">M</em>' + $("#txtMobile1").text() + '&nbsp;/&nbsp;' + $("#txtMobile2").text() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em class=\"marker\">T</em>' + $("#txtPhone").text();
		        	$("#txtMobile1").html(merge2);
				} else {
					var merge2 = '<em class=\"marker\">M</em>' + $("#txtMobile1").text() + '&nbsp;&nbsp;&nbsp;&nbsp;<em class=\"marker\">T</em>' + $("#txtPhone").text();
		        	$("#txtMobile1").html(merge2);
				}
				
				$("#txtMobile2, #txtPhone").hide();
	
				if ($("#txtFax").text() != '') {
					var merge3 = '<em class=\"marker\">F</em>' + $("#txtFax").text() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + $("#txtEmail").text();
					$("#txtEmail").html(merge3);
				}
				
				$("#txtFax").hide();
	
				$template.append('<p class=\"url\">https://www.idbins.com</p>');
	       		break;
	      	default:
				//app.beforeIssue('T1');
		}
	},
	convertImage: function(el) {
		var $viewCont = $(".section_view");
		var $imgView = $(".img-view");
	    var $imageView = $("#imageView");
	    var $issueCard = $("#issueCard");
	    $("#issueCard span").text("생성중");
	    $issueCard.attr('disabled', true);
	    $imageView.find('img').remove();
	    
		html2canvas(document.querySelector(el), {
	    	backgroundColor: "transparent",
	    	scale: 2.0,
	    }).then(function(canvas) {
   	
			imgDataUrl = canvas.toDataURL("image/png");
			var tmstamp = app.getCurrentDate();
			console.log(tmstamp);
			
			
	    	setTimeout(function() {
				
			var blobBin = atob(imgDataUrl.split(',')[1]); // base64 데이터 디코딩
            var array = [];
            for (var i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            var file = new Blob([new Uint8Array(array)], {type: 'image/png'}); // Blob 생성
            var formdata = new FormData();
            
            formdata.append("file", file);
            formdata.append("phone", final_phone);
            formdata.append("name", final_name);
            formdata.append("tmstamp", tmstamp);
				
				$.ajax({
					type : 'post',
					url : '/ebizcard/saveIamge.do',
					data : formdata,
					processData : false,	// data 파라미터 강제 string 변환 방지!!
					contentType : false,	// application/x-www-form-urlencoded; 방지!!
					async : false,
					success : function () {

						//final_personalImgUrl = "http://10.88.24.26:8300/mobile/img/ebiz/"+final_phone+"/"+tmstamp +".png";	//개발계
						final_personalImgUrl = "https://d.directdb.co.kr/mobile/img/ebiz/"+final_phone+"/"+tmstamp + ".png";	//운영계
						final_personalImgUrl_path = "mobile/img/ebiz/"+final_phone+"/"+tmstamp + ".png";
						console.log("success =>" , final_personalImgUrl);
						var imgHtml = '<img src=\"' + imgDataUrl + ' \">';
						//var imgHtml = '<img src=\"'+final_personalImgUrl+'\">';
						$imageView.append(imgHtml);
						$imgView.addClass('on');
					},
					error : function(e)
					{console.log("e:", e);
					//app.closeLoding();
					}
				});
	    	}, 1000);
		    
			/*
		    $viewCont.fadeIn(function() {
			    $(this).find(".wrap_button").show();
				$('body').addClass('scroll_disable');
		    });
		    */
	    });
	},
	intro: function() {
		$('.intro-wrap').addClass('show');
		/*$('#startApp').on('click', function() {
			$('#intro').fadeOut(function() {
				$(this).removeClass("show");
				$('body').removeClass('intro');
				$('.card-select').addClass('on');
			});
		})*/
		$('#startApp').on('click', function() {
			$('.card-select').addClass('on');
		})
		
		$('.card-select-wrap .list button').off('click.sel').on('click.sel',function(){
			var n = $(this).attr('data-type');
			
			$('.page-card').attr('data-card', n);
			$('#intro').fadeOut(function() {
				$(this).removeClass("show");
				$('body').removeClass('intro');
			});
			popClose();
			$(window).scrollTop(0);
		});
		
		$('.card-select-wrap .btn-close').off('click.close').on('click.close',popClose);
		
		$('.ui-reselect').off('click.re').on('click.re',function(){
			$('.card-select').addClass('on');
		});
		$('.ui-remake').off('click.rem').on('click.rem',function(){
			$('.img-view').removeClass('on');
			$('#issueCard').removeAttr('disabled');
			$("#issueCard span").text("확인");
		});
		function popClose(){
			$('.card-select').addClass('off');
			$('.card-select').off('transitionend.end').on('transitionend.end', function(){
				$('.card-select').removeClass('on off');
				$('.card-select').off('transitionend.end');
			});
		}
		// 주요 전화번호 안내 팝업 start
		$('#informTel').on('click', function() {
			$('.main-tel').addClass('on');
			checkMobile();
		})
		$('.main-tel-wrap .btn-close').on('click', function() {
			$('.main-tel').addClass('off');
			$('.main-tel').on('transitionend', function() {
				$('.main-tel').removeClass('on off');
				$('.main-tel').off('transitionend');
			})
			
		});
		// 주요 전화번호 안내 팝업 end
		// 211020 명함불러오기 start
			// 명함 불러오기 클릭시
		$('#loadCard').on('click', function() {
			$('.load-card-select').addClass('on');
		});
			// 명함 불러오기 내 닫힘 버튼 클릭시
		$('.load-card-select-wrap .btn-close').on('click', function() {
			console.log('닫힘');
			$('.load-card-select').addClass('off');
			$('.load-card-select').on('transitionend', function() {
				$('.load-card-select').removeClass('on off');
				$('.load-card-select').off('transitionend');
			})
			if (selected_load_card.length) {
				selected_load_card.removeClass('selected');
				selected_load_card = "";
				load_img_html = "";
			}
		});
			// 명함 불러오기 화면에서 명함 이미지 클릭시
		$('.load-card-select-wrap .list button').off('click.sel').on('click.sel',function(){
			if (selected_load_card.length) {
				selected_load_card.removeClass('selected');
				selected_load_card = "";
				load_img_html = "";
			}
			load_img_html = $(this).children().html();
			selected_load_card = $(this);
			selected_load_card.addClass('selected');
		});
			// 명함 선택 후 확인 버튼 클릭 시
		$('#confirmLoad').on('click', function() {
			if (load_img_html.length) {
				$("#imageView").find('img').remove();
				$('.img-view-wrap .txt, .img-view-wrap .txt02, .img-view .btns-fixed-area').addClass('hide');
				$('.load-card-select').addClass('off');
				$('.load-card-select').on('transitionend', function() {
					$('.load-card-select').removeClass('on off');
					$('.load-card-select').off('transitionend');
				});
				$('.btn-load-ver').removeClass('hide');
				$("#imageView").append(load_img_html);
				$(".img-view-wrap").css("margin-top", "0");
				$(".img-view").addClass('on');
			} else {
				alert('카드를 선택하세요.');
			}
		});
		
		//명함불러오기 닫기
		$('#backCard').on('click', function(){
			$("#imageView").find('img').remove();
			$('.img-view').removeClass('on');
			$(".img-view-wrap").css("margin-top", "-170px");
			$('.img-view-wrap .txt, .img-view-wrap .txt02, .img-view .btns-fixed-area').removeClass('hide');
			$('.btn-load-ver').addClass('hide');
			$('.load-card-select').addClass('on');
		});
		
		
			// 명함 불러오기 화면에서 카카오톡 전송 클릭시
		$('#sendLoadCard').on('click', function() {
			$('.img-view').removeClass('on');
			$(".img-view-wrap").css("margin-top", "-170px");
			$('.img-view-wrap .txt, .img-view-wrap .txt02, .img-view .btns-fixed-area').removeClass('hide');
			$('.btn-load-ver').addClass('hide');
			console.log(selected_load_card)
			var load_card_src = $(load_img_html).attr("src");
			console.log(load_card_src)
			sendKakao(load_card_src, load_card_src); // path부분은 추후에 변경해야 함
			selected_load_card.removeClass('selected');
			selected_load_card = "";
			load_img_html = "";
		});
			// 명함 불러오기 화면에서 삭제 버튼 클릭시
		$('#delLoadCard').on('click', function() {
			$('.img-view').removeClass('on');
			$(".img-view-wrap").css("margin-top", "-170px");
			$('.img-view-wrap .txt, .img-view-wrap .txt02, .img-view .btns-fixed-area').removeClass('hide');
			$('.btn-load-ver').addClass('hide');
			// 삭제 로직 구현되어야 할 부분
			selected_load_card.remove();
			selected_load_card = "";
			load_img_html = "";
		});
		// 211020 명함불러오기 end
	},
	init: function() {
	    var _this = this;
	    
	    _this.templateType = 'T1';

	    if (!app.connInfo()) {
	    	setTimeout(function() {
	    		alert("로컬파일에서는 기능이 제한될 수 있습니다.");
	   		}, 500);
    		console.log("로컬파일에서는 기능이 제한될 수 있습니다.");
	    }

		app.designSelect();
		app.formInit(_this.templateType);
		app.intro();
		/*
		function getX(){
			var w = $(window).outerWidth();
			var x = ((w - 300) / 300) + 1;
			
			console.log(w, x, x.toFixed(2)); 
			if (x > 1 && x <= 2) {
				$('.section_output').css('transform', 'scale('+ x +')');
			}
			
		}
		getX();
		
		$(window).on('resize', getX);
		*/
		
	},
	getCurrentDate:function() {
        var date = new Date();
        var year = date.getFullYear().toString();

        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();

        var day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour.toString() : hour.toString();

        var minites = date.getMinutes();
        minites = minites < 10 ? '0' + minites.toString() : minites.toString();

        var seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

        return year + month + day + hour + minites + seconds;
    }
};

