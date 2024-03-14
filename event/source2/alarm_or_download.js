Vue.component('alarm-or-download',{
	template : `
        <div>
            <div class="app-alert" v-for="(info, index) in infoAlert">
                <template>
                    <img :src="info.imgUrl" :alt="info.imgAlt" />
                    <button class="app-alert__btn" @click="goAlert()"></button>
                </template>
            </div>
        </div>
	`,
    data() {
        let varImgUrl='';
        let varImgAlt='';
        let varid=''
        if (isapp) {
            varImgUrl="//webimage.10x10.co.kr/fixevent/event/2023/tentensale/m/alert.jpg?v=2";
            varImgAlt="텐바이텐의 알림을 켜두면​ 새로운 혜택이 오픈될 때​ 가장 빠르게 알 수 있어요. 지금 내 알람이 켜져있는지 확인해보세요!";
            varid = "app";
        } else {
            varImgUrl="//webimage.10x10.co.kr/fixevent/event/2023/tentensale/m/app_down.jpg?v=2";
            varImgAlt="텐바이텐의 앱 설치하고 편리하게 상품을 구경해 보세요.";
            varid = "";
        };
        return {
            app: 1,
            infoAlert: [
                {
                    id: varid,
                    imgUrl: varImgUrl,
                    imgAlt: varImgAlt
                }
            ],
            is_login_ok : false,
        }
    },
    created() {
        this.$nextTick(function() {
            this.is_login_ok = isUserLoginOK;
        });
    },
    methods: {
        goAlert() {
            if (isapp) {
                const callBack = bool => {
                    if(bool) fnAPPpopupSetting();
                }
                fnAmplitudeEventAction('click_tentensale_alarm','','',callBack);
            } else {
                fnAmplitudeEventAction('click_tentensale_appdownload','','');
                location.href = "https://tenten.app.link/o1yhZvnwLvb";
            }
        }
    }

})