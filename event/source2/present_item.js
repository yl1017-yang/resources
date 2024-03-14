Vue.component('present-item', {
    template : `
    <div id="tab04" class="tab04" style="height:1000px;background:#fff">
        <section class="present-item">
            <h2><span>누군가에게 설렘을 선물하고 싶다면?</span>설레는 선물 구경하기​</h2>
           
        </section>
    </div>
    `
    , created() {
        const _this = this;
        this.is_app = isapp;
        this.$store.dispatch('GET_PRESENT_CATEGORIES_ITEMS');
    }
    , updated() {
        const _this = this;
    }
    , data() {
        return {
            categoryItems: []
        }
    }
    , computed : {
        firstItems() { 
            const items = this.$store.getters.firstItems;
            this.setItemInit('firstItems', items);
            return this.$store.getters.firstItems;
        },
        secondItems() { 
            const items = this.$store.getters.secondItems;
            this.setItemInit('secondItems', items);
            return this.$store.getters.secondItems 
        },
        thirdItems() { 
            const items = this.$store.getters.thirdItems;
            this.setItemInit('thirdItems', items);
            return this.$store.getters.thirdItems 
        },
    },
    methods : {
        /**
         * 상품 정보 연동
         * @param target 클래스명
         * @param items 상품아이디
         * @param fields 상품 정보 필드명
         */
        setItemInfo(target, items, fields){
            fnApplyItemInfoEach({
                items: items,
                target: target,
                fields:fields,
                unit:"none",
                saleBracket:false
            });
        },
        setItemInit(target, e) {
            const _this = this;
            let items = e.map(i => i.itemid);
            _this.setItemInfo(target, items, ["image", "name", "price", "sale","brand"]);
        },
        /**
         * 상품상세 페이지 이동
         * @param itemid
         */
        prdDetailPage(itemid){
            if(this.is_app) {
                const callBack = bool => {
                    if(bool) fnAPPpopupProduct(itemid);
                }
                fnAmplitudeEventAction('click_tentensale_gift_product','item_id',itemid,callBack);
            } else {
                fnAmplitudeEventAction('click_tentensale_gift_product','item_id',itemid);
                location.href = "/category/category_itemPrd.asp?itemid=" + itemid;
            }
        },
        moreDetailPage(index, attribCd){
            if(this.is_app) {
                const callBack = bool => {
                    if(bool) fnAPPpopupBrowser(OpenType.FROM_RIGHT, [], "선물의 진심", [BtnType.SHARE, BtnType.CART], vueAppUrlSsl + "/gift_sincerity/detail/index.asp?attribCd=" + attribCd, "");
                }
                fnAmplitudeEventAction('click_tentensale_gift_product','theme',index,callBack);
            } else {
                fnAmplitudeEventAction('click_tentensale_gift_product','theme',index);
                location.href = "/gift_sincerity/detail/index.asp?attribCd=" + attribCd;
            }
        },
        moreDetailPage2(index, attribCd){
            if(this.is_app) {
                const callBack = bool => {
                    if(bool) fnAPPpopupBrowser(OpenType.FROM_RIGHT, [], "선물의 진심", [BtnType.SHARE, BtnType.CART], vueAppUrlSsl + "/gift_sincerity/detail/index.asp?attribCd=" + attribCd, "");
                }
                fnAmplitudeEventAction('click_tentensale_gift_product_button','theme',index,callBack);
            } else {
                fnAmplitudeEventAction('click_tentensale_gift_product_button','theme',index);
                location.href = "/gift_sincerity/detail/index.asp?attribCd=" + attribCd;
            }
        },
        goHeartGiftPage(){
            let url = "gift_sincerity/";
            if (isApp) {
                const callBack = bool => {
                    if(bool) fnAPPpopupBrowserURL('', "http://m.10x10.co.kr/apps/appCom/wish/web2014/" + url, 'right', '', 'sc')
                }
                fnAmplitudeEventAction('click_tentensale_gift_banner','', '', callBack);
            } else {
                fnAmplitudeEventAction('click_tentensale_gift_banner','', '');
                location.href = "/" + url;
            }
        },
    }
});