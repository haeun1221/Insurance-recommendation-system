<template>
  <div class="ai-guide-view">
    <div class="content-wrapper">

      <!-- 1. 타이틀 영역 (SearchView 디자인과 완벽히 동일하게 수정) -->
      <div class="section-header">
        <span class="breadcrumb">보험 리포트</span>
        <h2 class="section-title">AI가 분석한 항목별 보장 수준과<br>맞춤형 추천 결과를 확인하세요</h2>
      </div>

      <!-- 2. 파이 그래프 영역 -->
      <div class="pie-section card-box">
        <h3 class="card-title">항목별 보장 수준 비교</h3>
        <p class="card-subtitle">원하는 파이 그래프를 눌러 각 보험의 보장 수준을 확인해보세요.</p>

        <div class="pie-grid">
          <div class="pie-item" v-for="cat in categories" :key="cat.key">
            <svg viewBox="-1.2 -1.2 2.4 2.4" class="pie-svg">
              <g
                  v-for="slice in generatePieSlices(cat.key)"
                  :key="slice.id"
                  class="pie-slice"
                  :class="{ 'is-active': activeIndex === slice.index }"
                  @click="selectRank(slice.index)"
              >
                <path :d="slice.path" :fill="slice.color" />
                <text :x="slice.textX" :y="slice.textY" class="pie-text">{{ slice.rank }}</text>
              </g>
            </svg>
            <span class="pie-label">{{ cat.name }}</span>
          </div>
        </div>

        <!-- 3. 범례 (Legend) -->
        <div class="legend-container">
          <div
              v-for="(ins, index) in insurances"
              :key="'legend-'+ins.id"
              class="legend-item"
              :class="{ 'is-active': activeIndex === index }"
              @click="selectRank(index)"
          >
            <span class="legend-color" :style="{ backgroundColor: ins.color }"></span>
            <span class="legend-name">{{ ins.rank }}순위 : {{ ins.name }}</span>
          </div>
        </div>
      </div>

      <!-- 4. 상세 리포트 (막대 그래프) 카드 영역 -->
      <div class="report-section card-box">

        <div class="report-header">
          <h3 class="card-title">선택한 보험의 상세 보장 수준</h3>
          <p class="card-subtitle">각 보험이 어떤 항목을 얼마나 강력하게 보장하는지 확인하세요.</p>
        </div>

        <!-- 유리알 슬라이딩 순위 선택 탭 -->
        <div class="sliding-tabs-container">
          <div class="sliding-tab-bg" :style="{ transform: `translateX(${activeIndex * 100}%)` }"></div>

          <div
              v-for="(ins, index) in insurances"
              :key="'tab-'+ins.id"
              class="sliding-tab"
              :class="{ 'is-active': activeIndex === index }"
              @click="selectRank(index)"
          >
            {{ ins.rank }}순위
          </div>
        </div>

        <div class="report-content">
          <h4 class="report-insurance-name">{{ activeInsurance.name }}</h4>

          <!-- 5. 카테고리별 3색 막대 그래프 영역 -->
          <div class="bar-charts-container">
            <!-- [수정됨] 반복문에서 index를 받아와 조건 처리에 사용 -->
            <div class="bar-row" v-for="(category, index) in categories" :key="'bar-'+category.key">
              <span class="bar-label">{{ category.name }}</span>

              <div class="bar-track-area">
                <span class="bar-limit-text">0</span>

                <div class="bar-track-wrapper">
                  <div class="bar-track"></div>
                  <div class="bar-thumb" :style="{ left: activeInsurance.scores[category.key] + '%' }"></div>

                  <!-- [수정됨] 네모 박스와 화살표 제거, 숫자만 깔끔하게 노출 -->
                  <div class="bar-tooltip" :style="{ left: getSliderValueLeft(activeInsurance.scores[category.key], 0, 100, 20) }">
                    {{ activeInsurance.scores[category.key] }}
                  </div>

                  <!-- [수정됨] index가 마지막 카테고리(categories.length - 1)일 때만 X축 레이블 렌더링 -->
                  <div class="bar-axis-area" v-if="index === categories.length - 1">
                    <div class="axis-segment"><span class="axis-text text-danger">낮음</span></div>
                    <div class="axis-segment"><span class="axis-text text-warning">보통</span></div>
                    <div class="axis-segment"><span class="axis-text text-success">높음</span></div>
                  </div>
                </div>

                <span class="bar-limit-text">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. 5개 보험 전체 비교 표 영역 -->
      <div class="table-section card-box">
        <h3 class="card-title">전체 보험 보장 및 독소조항 비교</h3>
        <p class="card-subtitle">숫자를 클릭하면 상세 정보 페이지로 이동합니다.</p>

        <table class="report-table">
          <thead>
          <tr>
            <th>보험명</th>
            <th>보장 수</th>
            <th>독소조항 수</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ins in insurances" :key="'table-'+ins.id">
            <td class="font-bold">{{ ins.name }}</td>
            <td>
              <router-link to="/coverage-details" class="table-link font-semibold">
                {{ ins.coverageCount }}개
              </router-link>
            </td>
            <td>
              <router-link to="/toxic-details" class="table-link text-danger font-bold">
                {{ ins.toxicCount }}개
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AIGuideView',
  data() {
    return {
      activeIndex: 0,
      categories: [
        { key: 'cancer', name: '암' },
        { key: 'brain', name: '뇌 질환' },
        { key: 'heart', name: '심장 질환' },
        { key: 'injury', name: '상해' },
        { key: 'surgery', name: '입원/수술' },
      ],
      insurances: [
        { id: 1, rank: 1, name: 'A보험 (든든플러스)', color: '#168CFD', scores: { cancer: 20, brain: 90, heart: 50, injury: 75, surgery: 40 }, toxicCount: 2, coverageCount: 12 },
        { id: 2, rank: 2, name: 'B보험 (건강지킴이)', color: '#4A62FF', scores: { cancer: 60, brain: 40, heart: 80, injury: 30, surgery: 90 }, toxicCount: 1, coverageCount: 15 },
        { id: 3, rank: 3, name: 'C보험 (퍼펙트케어)', color: '#00C9FF', scores: { cancer: 85, brain: 70, heart: 40, injury: 55, surgery: 60 }, toxicCount: 3, coverageCount: 10 },
        { id: 4, rank: 4, name: 'D보험 (라이프실손)', color: '#8DBEFF', scores: { cancer: 30, brain: 80, heart: 90, injury: 20, surgery: 50 }, toxicCount: 0, coverageCount: 8 },
        { id: 5, rank: 5, name: 'E보험 (안심플랜)', color: '#003C8F', scores: { cancer: 50, brain: 50, heart: 60, injury: 80, surgery: 70 }, toxicCount: 0, coverageCount: 14 }
      ]
    };
  },
  computed: {
    activeInsurance() {
      return this.insurances[this.activeIndex];
    }
  },
  methods: {
    selectRank(index) {
      this.activeIndex = index;
    },

    generatePieSlices(categoryKey) {
      const total = this.insurances.reduce((sum, ins) => sum + ins.scores[categoryKey], 0);
      let currentAngle = -Math.PI / 2;

      return this.insurances.map((ins, index) => {
        const percent = total > 0 ? (ins.scores[categoryKey] / total) : (1 / this.insurances.length);
        const angle = percent * 2 * Math.PI;

        const startX = Math.cos(currentAngle);
        const startY = Math.sin(currentAngle);
        const endAngle = currentAngle + angle;
        const endX = Math.cos(endAngle);
        const endY = Math.sin(endAngle);

        const largeArc = percent > 0.5 ? 1 : 0;
        const path = `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArc} 1 ${endX} ${endY} Z`;

        const midAngle = currentAngle + angle / 2;
        const textX = Math.cos(midAngle) * 0.65;
        const textY = Math.sin(midAngle) * 0.65;

        currentAngle = endAngle;

        return {
          id: ins.id,
          index,
          path,
          color: ins.color,
          textX,
          textY,
          rank: ins.rank
        };
      });
    },

    getSliderValueLeft(value, min = 0, max = 100, thumbWidth = 20) {
      const p = ((value - min) / (max - min)) * 100;
      const h = thumbWidth / 2;
      return `calc(${p}% + ${h - p * (thumbWidth / 100)}px)`;
    }
  }
};
</script>

<style scoped>
.ai-guide-view {
  width: 100%;
  height: 100%;
  min-width: 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
}

.content-wrapper {
  width: 100%;
  min-width: 0;
  flex: 1;
  overflow-y: auto;
  padding: clamp(3rem, 4.5vw, 4.5rem) clamp(13rem, 15vw, 15rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2rem);
}

/* --- 1. 헤더 영역 (SearchView 디자인 완벽 동기화) --- */
.section-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.breadcrumb {
  font-size: clamp(0.55rem, 1.4vw, 0.8rem);
  color: #1F5BFF;
  font-weight: 500;
}

.section-title {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

/* --- 공통 카드 UI --- */
.card-box {
  background-color: white;
  border-radius: clamp(8px, 1.5vw, 16px);
  padding: clamp(3rem, 4.5vw, 4.5rem) clamp(7rem, 8vw, 8rem);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 800;
  color: #333;
  margin: 0 0 0.4rem 0;
  text-align: center;
}

.card-subtitle {
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  color: #777;
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: 500;
}

/* 2. 파이 그래프 영역 */
.pie-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  flex-wrap: wrap;
}

.pie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: clamp(70px, 12vw, 100px);
}

.pie-svg {
  width: 100%;
  overflow: visible;
}

.pie-slice {
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: 0 0;
}

.pie-slice:hover {
  opacity: 0.7;
}

.pie-slice.is-active {
  opacity: 1;
  transform: scale(1.15);
  filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.15));
  z-index: 10;
}

.pie-text {
  font-size: 0.35px;
  fill: white;
  text-anchor: middle;
  dominant-baseline: central;
  font-weight: 800;
  pointer-events: none;
}

.pie-label {
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 700;
  color: #444;
}

/* 3. 범례 영역 */
.legend-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  opacity: 0.4;
}

.legend-item.is-active {
  opacity: 1;
  background-color: #f4f6f8;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.legend-name {
  font-size: clamp(0.8rem, 1.1vw, 0.95rem);
  font-weight: 700;
  color: #333;
}

/* 4. 슬라이딩 탭 (Segmented Control) */
.sliding-tabs-container {
  position: relative;
  display: flex;
  background-color: #f0f4f8;
  border-radius: 50px;
  padding: 6px;
  width: 100%;
  margin: 0 auto 30px auto;
}

.sliding-tab-bg {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc((100% - 12px) / 5);
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;
}

.sliding-tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-weight: 700;
  font-size: clamp(0.9rem, 1.3vw, 1.1rem);
  color: #888;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.sliding-tab.is-active {
  color: #333;
  font-weight: 800;
}

/* 5. 막대 그래프 구역 */
.report-insurance-name {
  text-align: center;
  font-size: clamp(1.4rem, 2.5vw, 1.6rem);
  font-weight: 800;
  color: #168CFD;
  margin: 0 0 2.5rem 0;
}

.bar-charts-container {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 3.5vw, 3rem);
  padding-bottom: 20px; /* 마지막 축 레이블이 잘리지 않도록 여백 추가 */
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.bar-label {
  flex: 0 0 clamp(60px, 12vw, 80px);
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  font-weight: 700;
  color: #333;
  text-align: right;
  white-space: nowrap;
}

.bar-track-area {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-limit-text {
  font-size: clamp(0.75rem, 1.1vw, 0.9rem);
  font-weight: 700;
  color: #aaa;
  min-width: 28px;
}

.bar-track-wrapper {
  position: relative;
  flex: 1;
  height: 8px; /* 막대그래프 두께를 조정하는 곳! */
  display: flex;
  align-items: center;
}

.bar-track {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(
      to right,
      #FF5A5F 0%, #FF5A5F 33.33%,
      #FFB800 33.33%, #FFB800 66.66%,
      #00C48C 66.66%, #00C48C 100%
  );
}

.bar-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: white;
  border: 4px solid #333;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 2;
}

/* [수정됨] 네모 박스와 화살표 꼬리가 없는 깔끔한 숫자 툴팁 */
.bar-tooltip {
  position: absolute;
  top: -24px;
  transform: translateX(-50%);
  color: #555;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* X축 레이블 */
.bar-axis-area {
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.axis-segment {
  display: flex;
  justify-content: center;
}

.axis-text {
  font-size: clamp(0.7rem, 1vw, 0.8rem);
  font-weight: 800;
  padding-top: 4px;
}

.text-danger { color: #FF5A5F; }
.text-warning { color: #FFB800; }
.text-success { color: #00C48C; }

/* 6. 분리된 표 영역 */
.report-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
}

.report-table th, .report-table td {
  border: 1px solid #eaeaea;
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.report-table th {
  background-color: #f4f6f8;
  font-weight: 800;
  color: #444;
  white-space: nowrap;
}

.report-table td {
  color: #555;
}

.font-bold {
  font-weight: 800;
  color: #222 !important;
}
.font-semibold {
  font-weight: 700;
}

/* 숫자 클릭 라우터 링크 스타일 */
.table-link {
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  color: inherit;
}
.table-link:hover {
  opacity: 0.6;
}
</style>