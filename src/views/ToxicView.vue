<!-- 독소조항 페이지 -->
<template>
  <div class="toxic-view">
    <div class="content-wrapper">

      <!-- 헤더 영역 -->
      <div class="section-header">
        <span class="breadcrumb text-danger">독소조항 리포트</span>
        <h2 class="section-title">가입 전 반드시 확인해야 할<br>숨은 제약 조건과 독소조항입니다</h2>
      </div>

      <!-- 독소조항 테이블 카드 영역 -->
      <div class="toxic-section card-box">
        <h3 class="card-title">무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)</h3>
        <p class="card-subtitle">약관에 숨겨진 불리한 조건(면책, 감액, 한도 등)을 상세히 분석해 드립니다.</p>

        <!-- 항목이 3개를 초과할 때 has-scrollbar 클래스가 추가되어 헤더와 테두리 너비를 조절합니다 -->
        <div class="table-container" :class="{ 'has-scrollbar': toxicList.length > 3 }">

          <!-- 1. 헤더 독립 테이블 (스크롤바 영역 제외) -->
          <table class="toxic-table-header">
            <colgroup>
              <col class="col-1">
              <col class="col-2">
              <col class="col-3">
              <col class="col-4">
              <col class="col-5">
            </colgroup>
            <thead>
            <tr>
              <th colspan="2">담보별 보장내용 및 분석</th>
              <th>가입금액</th>
              <th>보험료</th>
              <th>납입기간 / 보험기간</th>
            </tr>
            </thead>
          </table>

          <!-- 2. 본문 독립 테이블 (스크롤 영역) -->
          <!-- JS에서 동적으로 계산한 정확한 3개 분량의 높이(rem)가 max-height로 들어갑니다 -->
          <div class="scrollable-wrapper" :style="{ maxHeight: maxWrapperHeight }">
            <table class="toxic-table-body">
              <colgroup>
                <col class="col-1">
                <col class="col-2">
                <col class="col-3">
                <col class="col-4">
                <col class="col-5">
              </colgroup>

              <!-- 항목 하나당 tbody 1개씩 생성하여, 셀 병합(rowspan)을 유지합니다 -->
              <tbody v-for="(item, index) in toxicList" :key="index" class="toxic-item-tbody">
              <!-- 1. 약관 기본 정보 (상단 행) -->
              <tr class="main-info-row">
                <td rowspan="2" class="text-no">{{ item.no }}</td>
                <td class="content-cell">
                  <div class="clause-name">{{ item.name }}</div>
                  <div class="clause-desc">{{ item.desc }}</div>
                </td>
                <td class="other-Info text-center">{{ item.amount }}</td>
                <td class="other-Info text-center">{{ item.premium }}</td>
                <td class="other-Info text-center">{{ item.period }}</td>
              </tr>

              <!-- 2. 독소조항 분석 정보 (하단 행) -->
              <tr class="alert-row">
                <td colspan="4" class="alert-cell">
                  <div class="toxic-alert-content">
                    <div class="toxic-alert-header">🚨 독소조항 분석</div>
                    <div class="toxic-alert-body">{{ item.toxicReason }}</div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ToxicView',
  data() {
    return {
      maxWrapperHeight: 'none',
      toxicList: [
        {
          no: 3,
          name: '[간편] 보험료 납입면제대상 II',
          desc: '보장개시일 이후 상해사고로 80%이상 후유장해가 발생하거나 약관에서 정한 암, 뇌졸중, 급성심근경색증 등으로 진단 확정된 경우 납입면제.',
          toxicReason: '기타피부암, 갑상선암, 대장점막내암, 제자리암 등 발생 확률이 높은 유사암은 납입면제 사유에서 제외되어 있어, 실질적인 면제 혜택을 받기 까다롭습니다.',
          amount: '10만원', premium: '112원', period: '30년납 100세만기'
        },
        {
          no: 231,
          name: '[간편] 상해 중환자실 입원일당(1일이상)',
          desc: '상해사고로 병·의원 등의 중환자실에 1일 이상 계속 입원하여 치료를 받은 경우 가입금액 지급.',
          toxicReason: '입원 보장 기한이 최대 180일로 한정되어 있습니다. 중대 상해로 인해 장기 입원이 필요할 경우 180일 이후부터는 보장 공백이 발생하여 병원비 부담이 커질 수 있습니다.',
          amount: '10만원', premium: '910원', period: '30년납 100세만기'
        },
        {
          no: 316,
          name: '[간편] 상해 통원 수술비(외래 및 당일입원)',
          desc: '상해 치료 목적으로 병원 또는 의원에 외래로 방문하거나 당일입원하여 수술을 받은 경우 지급.',
          toxicReason: '치아의 파절 또는 치아의 탈구로 인한 수술은 지급 사유에서 원천 제외됩니다. 일상생활 중 흔히 발생하는 치아 손상에 대한 보장이 전혀 안 되는 불리한 조항입니다.',
          amount: '100만원', premium: '870원', period: '30년납 100세만기'
        },
        {
          no: 347,
          name: '[간편] 상해 1~5종 수술비(1종)',
          desc: '상해로 인하여 약관에서 정한 1~5종 수술을 받은 경우 지급.',
          toxicReason: '같은 상해로 두 종류 이상의 수술을 받은 경우 가장 높은 지급금액에 해당하는 한 가지 수술비만 지급되는 전형적인 면책 조항입니다.',
          amount: '30만원', premium: '591원', period: '30년납 100세만기'
        },
        {
          no: 400,
          name: '[간편] 골절 진단비(치아파절 제외)',
          desc: '상해로 골절로 진단 확정된 경우 가입금액 지급.',
          toxicReason: '일상생활에서 가장 흔하게 발생하는 치아파절(이빨 깨짐)이 제외되어 있어 실질적인 보장 범위가 크게 축소된 조항입니다.',
          amount: '20만원', premium: '1,500원', period: '30년납 100세만기'
        }
      ]
    };
  },
  mounted() {
    this.calculateDynamicHeight();
    window.addEventListener('resize', this.calculateDynamicHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateDynamicHeight);
  },
  methods: {
    calculateDynamicHeight() {
      if (this.toxicList.length > 3) {
        this.$nextTick(() => {
          const tbodys = this.$el.querySelectorAll('.toxic-item-tbody');

          if (tbodys.length >= 3) {
            // 헤더(thead) 높이를 제외하고, 순수하게 1~3번째 본문 항목의 렌더링 높이만 합산
            let totalPxHeight = 0;
            for (let i = 0; i < 3; i++) {
              totalPxHeight += tbodys[i].offsetHeight;
            }

            // 픽셀(px)로 계산된 값을 rem 단위로 변환하여 할당
            const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            this.maxWrapperHeight = (totalPxHeight / remSize) + 'rem';
          }
        });
      } else {
        this.maxWrapperHeight = 'none';
      }
    }
  }
};
</script>

<style scoped>
.toxic-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
}

.content-wrapper {
  width: 100%;
  flex: 1;
  padding: clamp(3rem, 4.5vw, 4.5rem) clamp(13rem, 15vw, 15rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2rem);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.breadcrumb {
  font-size: clamp(0.57rem, 1.43vw, 0.83rem);
  font-weight: 500;
}

.section-title {
  font-size: clamp(1.12rem, 3.02vw, 1.52rem);
  font-weight: 750;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.card-box {
  background-color: white;
  border-radius: clamp(0.5rem, 1vw, 1.5rem);
  padding: clamp(1.55rem, 3.05vw, 2.55rem) clamp(2.5rem, 5vw, 5rem);
  padding-bottom: clamp(2rem, 3.5vw, 3rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  font-weight: 700;
  color: #000000;
  margin: 0 0 clamp(0.2rem, 0.5vw, 0.5rem) 0;
  text-align: left;
}

.card-subtitle {
  font-size: clamp(0.58rem, 0.95vw, 0.95rem);
  color: #777;
  text-align: left;
  margin: clamp(0.08rem, 0.8vw, 0.15rem) 0 clamp(1.3rem, 2.3vw, 2.8rem) 0;
  font-weight: 550;
}

/* 스크롤 및 테두리 (border) 제어 영역 */
.table-container {
  position: relative;
  width: 100%;
}

/* 상하단 까만선 테두리(가상요소) */
.table-container::before,
.table-container::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: clamp(0.07rem, 0.12vw, 0.17rem);
  background-color: #000000;
  z-index: 20;
}

.table-container::before { top: 0; }
.table-container::after { bottom: 0; }

/* 3개를 넘어가면 스크롤바 너비(0.4rem)만큼 테두리(가상요소) 너비 축소 */
.table-container.has-scrollbar::before,
.table-container.has-scrollbar::after {
  width: calc(100% - 0.4rem);
}

/* 테이블 구조 분리 (헤더 / 본문) 설정 */
.toxic-table-header,
.toxic-table-body {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

/* 항목이 3개 초과일 때 헤더 테이블의 너비를 스크롤바만큼 줄여서 열(Column) 정렬 */
.has-scrollbar .toxic-table-header {
  width: calc(100% - 0.4rem);
}

.scrollable-wrapper {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollable-wrapper::-webkit-scrollbar { width: 0.4rem; }
.scrollable-wrapper::-webkit-scrollbar-track { background: transparent; }
.scrollable-wrapper::-webkit-scrollbar-thumb { background: #ccc; border-radius: 0.25rem; }
.scrollable-wrapper::-webkit-scrollbar-thumb:hover { background: #aaa; }

.toxic-table-header th {
  background-color: #fff2f2;
  font-weight: 700;
  color: #000000;
  text-align: center;
  border-bottom: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  border-right: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  padding: clamp(0.8rem, 1.2vw, 1.5rem);
  font-size: clamp(0.85rem, 1.1vw, 1rem);
}

.toxic-table-body td {
  border-bottom: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  border-right: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  padding: clamp(0.8rem, 1.2vw, 1.5rem);
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  color: #000000;
  vertical-align: middle;
}

/* 좌측 외곽선 보강 (헤더와 본문 모두 동일하게 적용) */
.toxic-table-header th:first-child,
.toxic-table-body td:first-child {
  border-left: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
}

/* 내부 셀 너비 */
.col-1 { width: 7.5%; }
.col-2 { width: 50.5%; }
.col-3 { width: 11%; }
.col-4 { width: 11%; }
.col-5 { width: 20%; }

.text-danger { color: #ef0007; }
.text-center { text-align: center; }
.text-no { text-align: center; font-size: clamp(0.75rem, 1.25vw, 0.85rem); font-weight: 500; }
.clause-name { font-weight: 700; color: #000000; }

.content-cell {
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vw, 0.8rem);
  text-align: left;
}

.clause-desc {
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.73rem, 0.93vw, 0.98rem);
  font-weight: 450;
  color: #000000;
  line-height: 1.5;
}

.alert-cell {
  background-color: #fafafa;
  padding: clamp(1rem, 1.5vw, 1.5rem) clamp(1rem, 1.5vw, 1.5rem) !important;
}

.toxic-alert-content {
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.6vw, 0.8rem);
}

.toxic-alert-header {
  font-weight: 700;
  color: black;
  font-size: clamp(0.83rem, 1.08vw, 0.98rem);
}

.toxic-alert-body {
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  color: #000000;
  line-height: 1.5;
  font-weight: 600;
}

.other-Info {
  text-align: center;
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  font-weight: 600;
  color: black;
}
</style>