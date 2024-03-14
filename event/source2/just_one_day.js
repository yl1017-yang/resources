Vue.component('just-one-day',{
	template : `
        <div id="tab01" class="tab01" style="height:1000px;background:#FF4895">
            <section class="section01" v-if="oneDaySale">
                <h2>오늘만 찐특가</h2>
            </section>
        </div>
	`
    , created() {
        const _this = this;
        _this.$store.dispatch('GET_ONE_DAY_ITEM');
    }
    , data() {
        return {
            itemList: [],
            isUserLoginOK: false
        }
    }
    , computed : {
        oneDaySale() {
            return this.$store.getters.oneDaySale;
        },
        timeSale() {
            return this.$store.getters.timeSale;
        },
        tentenOfTwentyOne() {
            return this.$store.getters.tentenOfTwentyOne;
        }
    },
    methods : {
        getPrice(priceText) {
			let price = priceText.split('원');
			return price[0];
		},
        getUrl(itemId) {
			// let gaParam = this.createGaParam('today_just1day_1');
			return this.oneDaySale.type == 'E'
					? this.oneDaySale.link
					: '/category/category_itemprd.asp?itemid='+itemId;
		},
		moveItem(itemid) {
			let url = this.getUrl(itemid);
			if(isApp) {
                fnAPPpopupBrowser(OpenType.FROM_RIGHT, [], "상품", [BtnType.SHARE, BtnType.CART], vueAppUrlSsl + url, "");
                fnAmplitudeEventAction('click_tentensale_todaysale', 'num', itemid, callback);
			} else {
				location.href = url;
                fnAmplitudeEventAction('click_tentensale_todaysale', 'num', itemid);
			}
		},
        getDiscountText(text) {
			if(text.indexOf('%') > 0) {
				return text.replaceAll('%','<span class="percent">%</span>');
			}
			return text;
		}
    }
})