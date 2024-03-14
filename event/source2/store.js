let store = new Vuex.Store({
    state : {
        oneDaySale: [],
        Items1: [],
        Items2: [],
        Items3: [],
        Items4: [],
        Items5: [],
        Items6: [],
        Items7: [],
        Items8: [],
        Items9: [],
        Items10: [],
        Items11: [],
        Items12: [],
        Items13: [],
        Items14: [],
        Items15: [],
        firstItems: [],
        secondItems: [],
        thirdItems: [],
        fourthItems: [],
        fifthItems: [],
        sixthItems: [],
        eventBanner: [],
    }
    , actions : {
        GET_ONE_DAY_ITEM(context) {
            const success = function(data) {
                context.commit('SET_ONE_DAY_SALE', data);
            }
            getFrontApiDataV2('GET', '/today/one-day-item', {}, success)
        },
        GET_CATEGORIES_ITEMS(context) { // 카테고리별 상품 조회
            let apiData = {
                masterCode: 27,
                detailCodes: "101,102,124,121,122,120,112,119,117,116,125,118,104,110,103",
                "deviceType" : "MOBILE",
            }
            const success = function(data) {
                context.commit('SET_CATEGORY_ITEMS', data);
            }
            getFrontApiData('GET', '/event/sub-category-of-items', apiData, success)
        },
        GET_PRESENT_CATEGORIES_ITEMS(context) { // 카테고리별 상품 조회
            let apiData = {
                masterCode: 28,
                detailCodes: "293,294,295"

            }
            const success = function(data) {
                context.commit('SET_PRESENT_CATEGORY_ITEMS', data);
            }
            getFrontApiData('GET', '/event/sub-category-of-items', apiData, success)
        },
        GET_EVENT_BANNER_LIST(context) {
            const success = function(data) {
                context.commit('SET_EVENT_BANNER_LIST', data);
            }
            getFrontApiDataV3('GET', '/event/apis/exhibition-event-group/27', {}, success)
        },
    }
    , mutations : {
        SET_ONE_DAY_SALE(state, data) {
            state.oneDaySale = data;
        },
        SET_CATEGORY_ITEMS(state, data) {
            data.forEach(function(item) {
                switch(item.detailcode) {
                    // 통합기획전쪽 카테고리코드
                    // 101	디자인문구
                    // 102	디지털/핸드폰
                    // 124	디자인가전
                    // 121	가구/수납
                    // 122	데코/조명
                    // 120	패브릭/생활
                    // 112	키친
                    // 119	푸드
                    // 117	패션의류
                    // 116	패션잡화
                    // 125	주얼리/시계
                    // 118	뷰티
                    // 104	토이/취미
                    // 110	cat&dog
                    // 103	캠핑
                    
                    // 리스트의 데이터는 통합이벤트에서 불러오고, 상세보기 페이지는 상품속성에서 불어오는 구조이기 때문에 서로 카테고리 코드를 매칭해야한다.
                    // 리스트의 실제 보이는 구조는 상세보기 상품속성에서 불러오는 구조에 맞추어서 뿌려준다.
                    // 기획에서 그렇게 따로 2개로 운영한다고 해서 서로 카테고리 코드를 매칭하는 수뿐이 없음.
                    case 101 : // 디자인문구(통합기획전쪽)
                        if(state.Items1.length < 3) state.Items1.push(item); break; // 디자인문구(리스트의 상품속성)
                    case 102 : // 디지털/핸드폰(통합기획전쪽)
                        if(state.Items2.length < 3) state.Items2.push(item); break; // 디지털/핸드폰(리스트의 상품속성)
                    case 124 : // 디자인가전(통합기획전쪽)
                        if(state.Items3.length < 3) state.Items3.push(item); break; // 디자인가전(리스트의 상품속성)
                    case 121 : // 가구/수납(통합기획전쪽)
                        if(state.Items4.length < 3) state.Items4.push(item); break; // 가구/수납(리스트의 상품속성)
                    case 120 : // 패브릭/생활(통합기획전쪽)
                        if(state.Items5.length < 3) state.Items5.push(item); break; // 패브릭/생활(리스트의 상품속성)
                    case 122 : // 데코/조명(통합기획전쪽)
                        if(state.Items6.length < 3) state.Items6.push(item); break; // 데코/조명(리스트의 상품속성)
                    case 112 : // 키친(통합기획전쪽)
                        if(state.Items7.length < 3) state.Items7.push(item); break; // 키친(리스트의 상품속성)
                    case 119 : // 푸드(통합기획전쪽)
                        if(state.Items8.length < 3) state.Items8.push(item); break; // 푸드(리스트의 상품속성)
                    case 117 : // 패션의류(통합기획전쪽)
                        if(state.Items9.length < 3) state.Items9.push(item); break; // 패션의류(리스트의 상품속성)
                    case 116 : // 패션잡화(통합기획전쪽)
                        if(state.Items10.length < 3) state.Items10.push(item); break; // 패션잡화(리스트의 상품속성)
                    case 118 : // 뷰티(통합기획전쪽)
                        if(state.Items11.length < 3) state.Items11.push(item); break; // 뷰티(리스트의 상품속성)
                    case 125 : // 주얼리/시계(통합기획전쪽)
                        if(state.Items12.length < 3) state.Items12.push(item); break; // 주얼리/시계(리스트의 상품속성)
                    case 110 : // cat&dog(통합기획전쪽)
                        if(state.Items13.length < 3) state.Items13.push(item); break; // cat&dog(리스트의 상품속성)
                    case 104 : // 토이/취미(통합기획전쪽)
                        if(state.Items14.length < 3) state.Items14.push(item); break; // 토이/취미(리스트의 상품속성)
                    case 103 : // 캠핑(통합기획전쪽)
                        if(state.Items15.length < 3) state.Items15.push(item); break; // 캠핑(리스트의 상품속성)
                }
            });
        },
        SET_PRESENT_CATEGORY_ITEMS(state, data) {
            data.forEach(function(item) {
                switch(item.detailcode) {
                    case 293 : if(state.firstItems.length < 3) state.firstItems.push(item); break;
                    case 294 : if(state.secondItems.length < 3) state.secondItems.push(item); break;
                    case 295 : if(state.thirdItems.length < 3) state.thirdItems.push(item); break;
                }
            });
        },
        SET_EVENT_BANNER_LIST(state, data) {
            state.eventBanner = data;
        },
    }
    , getters : {
        oneDaySale(state) {
            return state.oneDaySale;
        },
        Items1(state) {
            return state.Items1;
        },
        Items2(state) {
            return state.Items2;
        },
        Items3(state) {
            return state.Items3;
        },
        Items4(state) {
            return state.Items4;
        },
        Items5(state) {
            return state.Items5;
        },
        Items6(state) {
            return state.Items6;
        },
        Items7(state) {
            return state.Items7;
        },
        Items8(state) {
            return state.Items8;
        },
        Items9(state) {
            return state.Items9;
        },
        Items10(state) {
            return state.Items10;
        },
        Items11(state) {
            return state.Items11;
        },
        Items12(state) {
            return state.Items12;
        },
        Items13(state) {
            return state.Items13;
        },
        Items14(state) {
            return state.Items14;
        },
        Items15(state) {
            return state.Items15;
        },
        firstItems(state) {
            return state.firstItems;
        },
        secondItems(state) {
            return state.secondItems;
        },
        thirdItems(state) {
            return state.thirdItems;
        },
        fourthItems(state) {
            return state.fourthItems;
        },
        fifthItems(state) {
            return state.fifthItems;
        },
        sixthItems(state) {
            return state.sixthItems;
        },
        eventBanner(state) {
            return state.eventBanner;
        },
    }
});
