<!-- 보장 내용별 가격 비교 페이지 -->
<template>
  <div class="price-view">
    <div class="content-wrapper wide-wrapper">

      <!-- 헤더 영역 -->
      <div class="section-header">
        <span class="breadcrumb">보장 내용별 가격 비교</span>
        <h2 class="section-title">보험의 세부 보장 내용마다<br>납부 금액과 실 보장액을 비교해보세요</h2>
      </div>

      <!-- 비교 표 영역 -->
      <div class="price-section card-box">
        <!-- 칸 색상별 설명 -->
        <div class="table-legend-notice">
          <span class="legend-item-notice"><span class="box-sample white-box"></span>: 납부 금액</span>
          <span class="legend-item-notice"><span class="box-sample gray-box"></span>: 실 보장액</span>
        </div>

        <div class="table-container">
          <table class="price-table">
            <thead>
            <tr>
              <th class="header-coverage">보장 내용</th>
              <th v-for="ins in insurances" :key="ins.id" class="header-insurance">
                <div class="insurance-title" :title="ins.fullName">
                  <span class="company-name">{{ ins.company }}</span>
                  <span class="ins-name">{{ ins.name }}</span>
                </div>
              </th>
            </tr>
            </thead>
            <!-- 6개를 넘어가면 스크롤바가 생기는 tbody 영역 -->
            <tbody class="scrollable-tbody">
            <tr v-for="(cov, covIndex) in coverageItems" :key="covIndex" class="data-row">
              <td class="coverage-name-cell">
                <div class="cov-title">{{ cov.name }}</div>
              </td>
              <td v-for="ins in insurances" :key="ins.id" class="cell-combined">
                <div class="cell-payment" :title="ins.name + ' - ' + cov.name + ' 납부금액'">
                  {{ ins.data[cov.key].payment }}
                </div>
                <div class="cell-guarantee" :title="ins.name + ' - ' + cov.name + ' 실 보장액'">
                  {{ ins.data[cov.key].guarantee }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PriceView',
  data() {
    return {
      insurances: [
        {
          id: 1,
          company: 'DB손해보험',
          name: '무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)',
          fullName: 'DB손해보험 무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)',
          data: {
            cov1: { payment: '22,232원', guarantee: '5,000만원' },
            cov2: { payment: '48,479원', guarantee: '5,000만원' },
            cov3: { payment: '14,261원', guarantee: '1,000만원' },
            cov4: { payment: '27,114원', guarantee: '1,000만원' },
            cov5: { payment: '101,250원', guarantee: '5,000만원' },
            cov6: { payment: '7,600원', guarantee: '8백만원' },
            cov7: { payment: '11,960원', guarantee: '5백만원' }
          }
        },
        {
          id: 2,
          company: 'KB손해보험',
          name: 'KB손보 간편가입 실손의료비보장보험(무배당)(26.01)',
          fullName: 'KB손해보험 KB손보 간편가입 실손의료비보장보험(무배당)(26.01)',
          data: {
            cov1: { payment: '21,000원', guarantee: '5,000만원' },
            cov2: { payment: '46,000원', guarantee: '5,000만원' },
            cov3: { payment: '13,500원', guarantee: '1,000만원' },
            cov4: { payment: '25,000원', guarantee: '1,000만원' },
            cov5: { payment: '95,000원', guarantee: '5,000만원' },
            cov6: { payment: '7,000원', guarantee: '8백만원' },
            cov7: { payment: '11,000원', guarantee: '5백만원' }
          }
        },
        {
          id: 3,
          company: 'KB손해보험',
          name: 'KB개인실손의료비보험',
          fullName: 'KB손해보험 KB개인실손의료비보험',
          data: {
            cov1: { payment: '19,000원', guarantee: '3,000만원' },
            cov2: { payment: '40,000원', guarantee: '3,000만원' },
            cov3: { payment: '12,000원', guarantee: '1,000만원' },
            cov4: { payment: '22,000원', guarantee: '1,000만원' },
            cov5: { payment: '85,000원', guarantee: '3,000만원' },
            cov6: { payment: '6,000원', guarantee: '5백만원' },
            cov7: { payment: '9,000원', guarantee: '3백만원' }
          }
        },
        {
          id: 4,
          company: '메리츠화재',
          name: '무배당 참 편한 실손의료보험(간편고지, 갱신형)1901',
          fullName: '메리츠화재 무배당 참 편한 실손의료보험(간편고지, 갱신형)1901',
          data: {
            cov1: { payment: '24,000원', guarantee: '5,000만원' },
            cov2: { payment: '50,000원', guarantee: '5,000만원' },
            cov3: { payment: '15,000원', guarantee: '1,000만원' },
            cov4: { payment: '29,000원', guarantee: '1,000만원' },
            cov5: { payment: '110,000원', guarantee: '5,000만원' },
            cov6: { payment: '8,000원', guarantee: '8백만원' },
            cov7: { payment: '13,000원', guarantee: '5백만원' }
          }
        },
        {
          id: 5,
          company: '한화손해보험',
          name: '무배당 한화노후실손의료보험(갱신형)1501',
          fullName: '한화손해보험 무배당 한화노후실손의료보험(갱신형)1501',
          data: {
            cov1: { payment: '26,000원', guarantee: '3,000만원' },
            cov2: { payment: '55,000원', guarantee: '3,000만원' },
            cov3: { payment: '16,000원', guarantee: '1,000만원' },
            cov4: { payment: '31,000원', guarantee: '1,000만원' },
            cov5: { payment: '120,000원', guarantee: '3,000만원' },
            cov6: { payment: '9,000원', guarantee: '5백만원' },
            cov7: { payment: '14,000원', guarantee: '3백만원' }
          }
        }
      ],
      coverageItems: [
        { key: 'cov1', name: '(기본형) 상해급여의료비 (갱신형)' },
        { key: 'cov2', name: '(기본형) 질병급여의료비 (갱신형)' },
        { key: 'cov3', name: '(특약형2, 비중증) 상해비급여의료비 (갱신형)' },
        { key: 'cov4', name: '(특약형2, 비중증) 질병비급여의료비 (갱신형)' },
        { key: 'cov5', name: '암진단비 II (유사암제외) (갱신형)' },
        { key: 'cov6', name: '유사암진단비 II (갱신형)' },
        { key: 'cov7', name: '암수술비(유사암제외) (갱신형)' }
      ]
    };
  }
};
</script>

<style scoped>
.price-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
}

.wide-wrapper {
  width: 100%;
  flex: 1;
  padding: clamp(3rem, 4.5vw, 4.5rem) clamp(5rem, 8vw, 12rem);
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
  padding: clamp(1.55rem, 3.05vw, 2.55rem) clamp(2rem, 3.5vw, 3.5rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.table-legend-notice {
  display: flex;
  gap: clamp(1.3rem, 2.1vw, 2.1rem);
  margin-bottom: clamp(1.15rem, 1.45vw, 1.45rem);
  margin-top: clamp(-0.7rem, 0.5vw, -0.5rem);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.78rem, 0.98vw, 0.88rem);
  color: #000000;
  font-weight: 600;
  align-items: center;
}

.legend-item-notice {
  display: flex;
  align-items: center;
  gap: clamp(0.3rem, 0.5vw, 0.5rem);
}

.box-sample {
  display: inline-block;
  width: clamp(0.8rem, 1vw, 1rem);
  height: clamp(0.8rem, 1vw, 1rem);
  border-radius: clamp(0.15rem, 0.3vw, 0.3rem);
  border: clamp(0.05rem, 0.1vw, 0.1rem) solid #ccc;
}

.white-box { background-color: #ffffff; }
.gray-box { background-color: #eef3ff; border-color: #ccc; }

.table-container { width: 100%; }

.price-table {
  width: 100%;
  border-collapse: collapse;
}

.price-table thead {
  display: table;
  width: calc(100% - 0.4rem);
  table-layout: fixed;
}

/* 6개 항목 기준 초과 시 스크롤 생성 */
.scrollable-tbody {
  display: block;
  width: 100%;
  max-height: 36.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

.scrollable-tbody::-webkit-scrollbar { width: 0.4rem; }
.scrollable-tbody::-webkit-scrollbar-track { background: transparent; }
.scrollable-tbody::-webkit-scrollbar-thumb { background: #ccc; border-radius: 0.25rem; }
.scrollable-tbody::-webkit-scrollbar-thumb:hover { background: #aaa; }

.price-table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

/* 각 열 너비 분할 배분 (보장내용 20%, 5개 보험사 각 16%) */
.price-table th:nth-child(1),
.price-table td:nth-child(1) { width: 15%; }

.price-table th:nth-child(2),
.price-table td:nth-child(2),
.price-table th:nth-child(3),
.price-table td:nth-child(3),
.price-table th:nth-child(4),
.price-table td:nth-child(4),
.price-table th:nth-child(5),
.price-table td:nth-child(5),
.price-table th:nth-child(6),
.price-table td:nth-child(6) { width: 17%; }

.price-table th,
.price-table td {
  border: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  vertical-align: middle;
  text-align: center;
  box-sizing: border-box;
}

.header-coverage {
  font-weight: 800;
  color: #2c3e50;
  padding: clamp(0.8rem, 1.2vw, 1.4rem) clamp(0.5rem, 0.8vw, 1rem);
  font-size: clamp(0.8rem, 1vw, 0.95rem);
}

.header-insurance {
  background-color: #f8fafc;
  padding: clamp(0.7rem, 1.1vw, 1.3rem) clamp(0.6rem, 0.9vw, 1.1rem);
}

.insurance-title {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.35vw, 0.35rem);
  overflow: hidden;
  text-align: center;
  justify-content: center;
}

.company-name {
  font-size: clamp(0.8rem, 1.05vw, 0.95rem);
  font-weight: 700;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
}

.ins-name {
  font-size: clamp(0.8rem, 1.05vw, 0.95rem);
  font-weight: 700;
  color: #1150ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.coverage-name-cell {
  background-color: #f8fafc;
  padding: clamp(0.8rem, 1vw, 1.2rem) clamp(1rem, 1.5vw, 1.5rem);
  text-align: left;
}

.cov-title {
  padding: clamp(-0.6rem, 0.6vw, -0.4rem) 0;
  font-size: clamp(0.8rem, 1.05vw, 0.95rem);
  color: #222;
  font-weight: 700;
  word-break: keep-all;
  line-height: 1.43;
}

.cell-combined {
  padding: 0 !important;
}

.cell-payment {
  background-color: #ffffff;
  color: #333;
  font-weight: 650;
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  padding: clamp(0.7rem, 1vw, 1.1rem);
  border-bottom: clamp(0.06rem, 0.1vw, 0.15rem) solid #eaeaea;
  text-align: center;
}

.cell-guarantee {
  background-color: #eef3ff;
  color: #333;
  font-weight: 650;
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  padding: clamp(0.7rem, 1vw, 1.1rem);
  text-align: center;
}
</style>