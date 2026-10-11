<!-- 보장 상세 내용 페이지 -->
<template>
  <div class="coverage-view">
    <div class="content-wrapper">

      <!-- 헤더 영역 -->
      <div class="section-header">
        <span class="breadcrumb">보장 상세 내용</span>
        <h2 class="section-title">선택하신 보험의<br>세부 보장 내역을 확인해보세요</h2>
      </div>

      <!-- 보장 내역 카드 영역 -->
      <div class="coverage-section card-box">
        <h3 class="card-title">무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)</h3>
        <p class="card-subtitle">각 담보별 가입 금액과 보험료, 보장 기간을 상세히 보여줍니다.</p>

        <!-- 테이블 영역-->
        <div class="table-container">
          <table class="coverage-table">

            <thead>
            <tr>
              <th class="col-1">담보가입현황</th>
              <th class="col-2">가입금액</th>
              <th class="col-3">보험료</th>
              <th class="col-4">납입기간 / 보험기간</th>
            </tr>
            </thead>

            <!-- 9줄(31.5rem)이 넘어가면 스크롤이 생기는 본문 영역 -->
            <tbody class="scrollable-tbody">
            <tr v-for="(item, index) in coverageList" :key="index">
              <td class="col-1-sub text-center text-gray">{{ item.no }}</td>
              <!-- 이름이 길면 칸을 밀어내지 않고 말줄임표(...) 처리 -->
              <td class="col-1-main text-left font-semibold name-cell" :title="item.name">
                {{ item.name }}
              </td>
              <td class="col-2 detail-info">{{ item.amount }}</td>
              <td class="col-3 detail-info">{{ item.premium }}</td>
              <td class="col-4 detail-info">{{ item.period }}</td>
            </tr>
            </tbody>

            <!-- 하단 합계 영역 -->
            <tfoot>
            <tr class="total-main-row">
              <td class="total-label text-left">보장 보험료 합계</td>
              <td class="total-price text-right">{{ totalPremium }}원</td>
            </tr>
            <tr class="total-sub-row">
              <td class="total-label-sub text-left">갱신 보험료 합계</td>
              <td class="total-price-sub text-right">{{ renewalPremium }}원</td>
            </tr>
            <tr class="total-sub-row">
              <td class="total-label-sub text-left">비갱신 보험료 합계</td>
              <td class="total-price-sub text-right">{{ nonRenewalPremium }}원</td>
            </tr>
            </tfoot>

          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverageView',
  data() {
    return {
      coverageList: [
        { no: 1, name: '[간편]상해 사망', amount: '1억원', premium: '2,400원', period: '30년납 100세만기' },
        { no: 2, name: '[간편]유사암진단 납입지원', amount: '2만2천원', premium: '1,498원', period: '30년납 30년만기' },
        { no: 3, name: '[간편]보험료 납입면제대상 II', amount: '10만원', premium: '112원', period: '30년납 100세만기' },
        { no: 231, name: '[간편]상해 중환자실 입원일당(1일이상)', amount: '10만원', premium: '910원', period: '30년납 100세만기' },
        { no: 236, name: '[간편]질병 중환자실 입원일당(1일이상) 이렇게 이름이 긴 경우 칸이 넓어지지 않고 말줄임표가 나옵니다', amount: '10만원', premium: '600원', period: '30년납 100세만기' },
        { no: 315, name: '[간편]상해 입원 수술비(당일입원 제외)(경증상해 제외)', amount: '200만원', premium: '4,880원', period: '30년납 100세만기' },
        { no: 347, name: '[간편]상해 1~5종 수술비(1종)', amount: '30만원', premium: '591원', period: '30년납 100세만기' },
        { no: 348, name: '[간편]상해 1~5종 수술비(2종)', amount: '50만원', premium: '800원', period: '30년납 100세만기' },
        { no: 349, name: '[간편]상해 1~5종 수술비(3종)', amount: '100만원', premium: '1,200원', period: '30년납 100세만기' },
        { no: 350, name: '[간편]상해 1~5종 수술비(4종)', amount: '200만원', premium: '2,400원', period: '30년납 100세만기' },
        { no: 351, name: '[간편]상해 1~5종 수술비(5종) 여기서부터 11번째 줄이므로 스크롤을 내려야 보입니다', amount: '500만원', premium: '4,500원', period: '30년납 100세만기' },
        { no: 400, name: '[간편]골절 진단비(치아파절 제외)', amount: '20만원', premium: '1,500원', period: '30년납 100세만기' },
      ],
      totalPremium: '45,557',
      renewalPremium: '0',
      nonRenewalPremium: '45,557'
    };
  }
};
</script>

<style scoped>
.coverage-view {
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
  gap: clamp(0.3rem, 0.55vw, 0.55rem);
}

.breadcrumb {
  font-size: clamp(0.55rem, 1.45vw, 0.85rem);
  color: #1F5BFF;
  font-weight: 600;
}

.section-title {
  font-size: clamp(1.15rem, 3.05vw, 1.55rem);
  font-weight: 650;
  color: #333;
  margin: 0;
  line-height: 1.35;
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

.table-container {
  width: 100%;
  position: relative;
}

.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 0.4rem);
  height: clamp(0.05rem, 0.1vw, 0.15rem);
  background-color: #000000;
}

.table-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 0.4rem);
  height: clamp(0.1rem, 0.15vw, 0.2rem);
  background-color: #000000;
}

.coverage-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

/* thead와 tfoot 너비를 스크롤바 영역(0.4rem) 뺀 만큼으로 통일 */
.coverage-table thead {
  display: table;
  table-layout: fixed;
  width: calc(100% - 0.4rem);
}

.coverage-table tfoot {
  display: table;
  table-layout: fixed;
  width: calc(100% - 0.4rem);
}

/* 정확히 9줄(31.5rem)이 넘어가면 스크롤 생성 */
.scrollable-tbody {
  display: block;
  width: 100%;
  max-height: 31.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

.scrollable-tbody::-webkit-scrollbar {
  width: 0.4rem;
}

.scrollable-tbody::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-tbody::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 0.25rem;
}

.scrollable-tbody::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

.coverage-table tr {
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 3.5rem;
}

.coverage-table th,
.coverage-table td {
  border-right: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  border-bottom: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  padding: 0 clamp(0.8rem, 1.2vw, 1.5rem);
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  color: #000000;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
}

.coverage-table th:first-child,
.coverage-table td:first-child {
  border-left: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
}

.coverage-table thead th {
  background-color: #f0f7f9;
  font-weight: 700;
  color: #000000;
  text-align: center;
}

.col-1 { width: 58%; }
.col-1-sub { width: 8%; text-align: center; }
.col-1-main { width: 50%; }
.col-2 { width: 11%; }
.col-3 { width: 12%; }
.col-4 { width: 19%; }

.name-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;
}

.text-left { text-align: left; }
.text-right { text-align: right; }
.text-center { text-align: center; }
.text-gray { color: #888; font-weight: 600; }
.font-semibold { font-weight: 600; color: #000000 !important; }

.detail-info {
  text-align: center;
  font-size: clamp(0.6rem, 0.85vw, 0.75rem);
  font-weight: 500;
}

.total-main-row td { background-color: #f0f7f9; }
.total-sub-row td { background-color: white; }

.total-label {
  font-weight: 700;
  color: #000000;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  padding-left: clamp(1rem, 2vw, 2.5rem);
  width: 59%;
}

.total-price {
  width: 41%;
  font-weight: 700;
  color: #000000;
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  padding-right: clamp(0.7rem, 1.7vw, 2.2rem);
}

.total-label-sub {
  width: 59%;
  font-weight: 700;
  color: #000000;
  padding-left: clamp(1rem, 2vw, 2.5rem);
}

.total-price-sub {
  width: 41%;
  font-weight: 700;
  color: #000000;
  padding-right: clamp(0.7rem, 1.7vw, 2.2rem);
}
</style>