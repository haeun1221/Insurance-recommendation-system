<!-- 보험 검색 결과 페이지 -->
<template>
  <div class="ai-guide-view">
    <div class="content-wrapper">

      <!-- 1. 타이틀 영역 -->
      <div class="section-header">
        <span class="breadcrumb">보험 리포트</span>
        <h2 class="section-title">AI가 분석한 항목별 보장 수준과<br>맞춤형 추천 결과를 확인하세요</h2>
      </div>

      <!-- 2. 파이 그래프 영역 -->
      <div class="pie-section card-box">
        <h3 class="card-title">항목별 보장 수준 비교</h3>
        <p class="card-subtitle">메뉴 또는 파이 그래프를 눌러 순위별 보장 수준을 비교해 보세요</p>

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
        <div class="legend-dropdown-wrapper">
          <div class="legend-selected" @click="isLegendExpanded = !isLegendExpanded">
            <span class="legend-color" :style="{ backgroundColor: activeInsurance.color }"></span>
            <span class="legend-name" :title="activeInsurance.name">
              {{ activeInsurance.rank }}순위 : {{ activeInsurance.name }}
            </span>
            <span class="dropdown-arrow" :class="{ 'is-open': isLegendExpanded }">
              <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- 화살표 클릭 시 나타나는 범례 리스트 -->
          <div class="legend-options" v-show="isLegendExpanded">
            <div
                v-for="(ins, index) in insurances"
                :key="'legend-opt-'+ins.id"
                class="legend-item"
                :class="{ 'is-active': activeIndex === index }"
                @click="selectRank(index)"
            >
              <span class="legend-color" :style="{ backgroundColor: ins.color }"></span>
              <span class="legend-name" :title="ins.name">{{ ins.rank }}순위 : {{ ins.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 상세 리포트 (막대 그래프) 카드 영역 -->
      <div class="report-section card-box">

        <div class="report-header">
          <h3 class="card-title">선택한 보험의 상세 보장 수준</h3>
          <p class="card-subtitle">각 보험 안에서 항목별로 얼마나 보장하는지 확인하세요.</p>
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

        <!-- 콘텐츠 영역 -->
        <div class="report-content">
          <h4 class="report-insurance-name">{{ activeInsurance.name }}</h4>

          <!-- 5. 카테고리별 3색 막대 그래프 영역 -->
          <div class="bar-charts-container">
            <div class="bar-row" v-for="(category, index) in categories" :key="'bar-'+category.key">
              <span class="bar-label">{{ category.name }}</span>

              <div class="bar-track-area">
                <span class="bar-limit-text">0</span>

                <div class="bar-track-wrapper">
                  <div class="bar-track"></div>

                  <div class="bar-thumb" :style="{ left: activeInsurance.scores[category.key] + '%' }"></div>
                  <div class="bar-tooltip" :style="{ left: activeInsurance.scores[category.key] + '%' }">
                    {{ activeInsurance.scores[category.key] }}
                  </div>

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
        <p class="table-subtitle">숫자를 클릭하면 보장내용 또는 독소조항을 확인할 수 있어요.</p>

        <table class="report-table">
          <colgroup>
            <col style="width: 6%;">
            <col style="width: 60%;">
            <col style="width: 13%;">
            <col style="width: 10%;">
            <col style="width: 13%;">
          </colgroup>
          <thead>
          <tr>
            <th></th>
            <th>보험명</th>
            <th>월보험료</th>
            <th>보장 수</th>
            <th>독소조항 수</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ins in insurances" :key="'table-'+ins.id">
            <td>
              <button
                  class="favorite-btn"
                  :class="{ 'is-active': ins.isFavorite }"
                  @click="toggleFavorite(ins)"
              >
                <!-- 즐찾 아이콘 -->
                <svg viewBox="0 0 24 24" class="bookmark-icon">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </td>
            <td class="font-semibold align-left name-cell" :title="ins.name">{{ ins.name }}</td>
            <td class="text-price">{{ ins.premium.toLocaleString() }}원</td>
            <td>
              <router-link to="/coverage-details" class="table-link font-medium">
                {{ ins.coverageCount }}개
              </router-link>
            </td>
            <td>
              <router-link to="/toxic-details" class="table-link font-medium">
                {{ ins.toxicCount }}개
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- 가격 비교 페이지 이동 버튼 -->
        <div class="table-action-area">
          <router-link to="/price-compare" class="action-button">
            보장 내용별 가격 비교 확인하기
          </router-link>
        </div>
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
      isLegendExpanded: false,
      categories: [
        { key: 'cancer', name: '암' },
        { key: 'brain', name: '뇌 질환' },
        { key: 'heart', name: '심장 질환' },
        { key: 'injury', name: '상해' },
        { key: 'surgery', name: '입원/수술' },
      ],
      insurances: [
        { id: 1, rank: 1, name: '무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)(만기재가입용)', color: '#168CFD', scores: { cancer: 20, brain: 90, heart: 50, injury: 75, surgery: 40 }, toxicCount: 2, coverageCount: 12, premium: 35000, isFavorite: false },
        { id: 2, rank: 2, name: 'KB손보 간편가입 실손의료비보장보험(무배당)(26.01)', color: '#4A62FF', scores: { cancer: 60, brain: 40, heart: 80, injury: 30, surgery: 90 }, toxicCount: 1, coverageCount: 15, premium: 42000, isFavorite: false },
        { id: 3, rank: 3, name: 'KB개인실손의료비보험', color: '#00d9ff', scores: { cancer: 85, brain: 70, heart: 40, injury: 55, surgery: 60 }, toxicCount: 3, coverageCount: 10, premium: 28000, isFavorite: true },
        { id: 4, rank: 4, name: '무배당 참 편한 실손의료보험(간편고지, 갱신형)1901', color: '#8DBEFF', scores: { cancer: 30, brain: 80, heart: 90, injury: 20, surgery: 50 }, toxicCount: 0, coverageCount: 8, premium: 45000, isFavorite: false },
        { id: 5, rank: 5, name: '무배당 한화노후실손의료보험(갱신형)1501', color: '#003C8F', scores: { cancer: 50, brain: 50, heart: 60, injury: 80, surgery: 70 }, toxicCount: 0, coverageCount: 14, premium: 51000, isFavorite: false }
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
      this.isLegendExpanded = false;
    },
    toggleFavorite(insurance) {
      insurance.isFavorite = !insurance.isFavorite;
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

.section-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.breadcrumb {
  font-size: clamp(0.58rem, 1.48vw, 0.88rem);
  color: #1F5BFF;
  font-weight: 600;
}

.section-title {
  font-size: clamp(1.15rem, 3.05vw, 1.55rem);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-weight: 650;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.card-box {
  background-color: white;
  border-radius: clamp(0.5rem, 1.5vw, 1rem);
  padding: clamp(1.7rem, 3.2vw, 2.7rem) clamp(2.5rem, 5vw, 5rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: clamp(1.25rem, 2.15vw, 1.35rem);
  font-weight: 800;
  color: #333;
  margin: 0 0 clamp(0.2rem, 0.4vw, 0.5rem) 0;
  text-align: center;
}

.card-subtitle {
  font-size: clamp(0.8rem, 1.15vw, 0.9rem);
  color: #777;
  text-align: center;
  margin: 0 0 clamp(1.5rem, 2.5vw, 3rem) 0;
  font-weight: 500;
  padding-top: clamp(0.1rem, 0.2vw, 0.2rem);
}

.pie-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 2rem);
  flex-wrap: nowrap;
  width: 100%;
}

.pie-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 1.2vw, 1rem);
  width: clamp(6.5rem, 16vw, 9rem);
  flex-shrink: 1;
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
  filter: drop-shadow(0 clamp(0.125rem, 0.4vw, 0.375rem) clamp(0.25rem, 0.6vw, 0.5rem) rgba(0,0,0,0.15));
  z-index: 10;
}

.pie-text {
  font-size: 0.26px;
  fill: white;
  text-anchor: middle;
  dominant-baseline: central;
  font-weight: 400;
  pointer-events: none;
}

.pie-label {
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 700;
  color: #444;
}

.legend-dropdown-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
  width: 100%;
}

.legend-selected {
  display: flex;
  align-items: center;
  gap: clamp(0.4rem, 0.8vw, 0.8rem);
  padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(1rem, 2vw, 1.2rem);
  background-color: #f4f6f8;
  border: clamp(0.0625rem, 0.1vw, 0.125rem) solid #e0e4e8;
  border-radius: clamp(1.5rem, 3vw, 2.5rem);
  cursor: pointer;
  transition: all 0.2s;
  max-width: 100%;
}

.legend-selected:hover {
  background-color: #e8ecf1;
}

.dropdown-arrow {
  display: flex;
  align-items: center;
  color: #666;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  flex-shrink: 0;
}

.dropdown-arrow.is-open {
  transform: rotate(180deg);
}

.legend-options {
  position: absolute;
  top: calc(100% + clamp(0.3rem, 0.6vw, 0.5rem));
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: clamp(0.5rem, 1vw, 0.75rem);
  box-shadow: 0 clamp(0.25rem, 0.5vw, 0.75rem) clamp(0.75rem, 1.5vw, 2rem) rgba(0,0,0,0.12);
  border: clamp(0.0625rem, 0.1vw, 0.125rem) solid #eaeaea;
  display: flex;
  flex-direction: column;
  padding: clamp(0.4rem, 0.8vw, 0.6rem);
  gap: clamp(0.15rem, 0.3vw, 0.25rem);
  z-index: 50;
  width: max-content;
  max-width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: clamp(0.4rem, 0.8vw, 0.6rem);
  padding: clamp(0.5rem, 1vw, 0.7rem) clamp(0.8rem, 1.5vw, 1.2rem);
  border-radius: clamp(0.25rem, 0.5vw, 0.4rem);
  cursor: pointer;
  transition: background-color 0.2s;
}

.legend-item:hover {
  background-color: #f8fafc;
}

.legend-item.is-active {
  background-color: #f0f7f9;
}

.legend-color {
  width: clamp(0.6rem, 1.2vw, 0.8rem);
  height: clamp(0.6rem, 1.2vw, 0.8rem);
  border-radius: 50%;
  box-shadow: inset 0 clamp(0.0625rem, 0.2vw, 0.1875rem) clamp(0.125rem, 0.4vw, 0.375rem) rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.legend-name {
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.8rem, 1.1vw, 0.95rem);
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sliding-tabs-container {
  position: relative;
  display: flex;
  background-color: #f0f4f8;
  border-radius: 3.125rem;
  padding: 0.375rem;
  width: 100%;
  height: 3.3rem;
  margin: 0 auto 0.625rem auto;
}

.sliding-tab-bg {
  position: absolute;
  top: 0.375rem;
  bottom: 0.375rem;
  left: 0.375rem;
  width: calc((100% - 0.75rem) / 5);
  background-color: white;
  border-radius: clamp(1.5rem, 3vw, 2.5rem);
  box-shadow: 0 clamp(0.0625rem, 0.2vw, 0.1875rem) clamp(0.25rem, 0.8vw, 0.625rem) rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;
}

.sliding-tab {
  flex: 1;
  text-align: center;
  padding: clamp(0.3rem, 0.9vw, 0.6rem) 0;
  font-weight: 650;
  font-size: clamp(0.75rem, 1.15vw, 0.95rem);
  color: #888;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.sliding-tab.is-active {
  color: #333;
  font-weight: 650;
}

.report-content {
  background-color: white;
  margin-top: clamp(0.5rem, 1vw, 1rem);
  padding: clamp(1.25rem, 1.95vw, 2.05rem) clamp(2rem, 2.5vw, 2.3rem);
  padding-top: clamp(1.85rem, 2.45vw, 2.65rem);
  border-radius: clamp(0.25rem, 0.8vw, 0.5rem);
  border: #f4f4f4 solid 0.15vw;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.report-insurance-name {
  text-align: center;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  font-weight: 700;
  color: #333333;
  margin: 0 0 clamp(1.5rem, 2.5vw, 2.5rem) 0;
  padding-bottom: clamp(0.5rem, 1vw, 0.7rem);
}

.bar-charts-container {
  display: flex;
  flex-direction: column;
  gap: clamp(1.6rem, 2.8vw, 2.3rem);
  padding-bottom: clamp(1.4rem, 2.6vw, 2.1rem);
}

.bar-row {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 1.8vw, 1.5rem);
}

.bar-label {
  flex: 0 0 clamp(3.75rem, 12vw, 5rem);
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
  gap: clamp(0.75rem, 1.17vw, 1rem);
}

.bar-limit-text {
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  font-weight: 400;
  color: #c3c3c3;
  min-width: 1.5rem;
  text-align: right;
}

.bar-track-wrapper {
  position: relative;
  flex: 1;
  height: clamp(0.4rem, 0.8vw, 0.6rem);
  display: flex;
  align-items: center;
}

.bar-track {
  width: 100%;
  height: 68%;
  border-radius: 0.25rem;
  background: linear-gradient(
      to right,
      #ef0007 0%, #ef0007 33.33%,
      #fff767 33.33%, #ffdf40 66.66%,
      #00bc0e 66.66%, #00bc0e 100%
  );
}

.bar-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: clamp(0.6rem, 1.1vw, 0.8rem);
  height: clamp(0.6rem, 1.1vw, 0.8rem);
  background-color: white;
  box-shadow: 0 0 0.2rem #d1d1d1,
  0 0 0.2rem #d1d1d1;
  border-radius: 50%;
  transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 2;
}

.bar-tooltip {
  position: absolute;
  top: clamp(-1.75rem, -2.5vw, -1.375rem);
  transform: translateX(-50%);
  color: #555;
  font-size: clamp(0.65rem, 1.15vw, 0.85rem);
  font-weight: 630;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.bar-axis-area {
  position: absolute;
  top: clamp(1.5rem, 1.8vw, 1.9rem);
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
  padding-top: 0.25rem;
}

.text-danger { color: #ef0007; font-size: clamp(0.75rem, 1.1vw, 0.9rem); font-weight: 600; }
.text-warning { color: #ffdf40; font-size: clamp(0.75rem, 1.1vw, 0.9rem); font-weight: 600; }
.text-success { color: #1aca54; font-size: clamp(0.75rem, 1.1vw, 0.9rem); font-weight: 600; }

.table-subtitle {
  font-size: clamp(0.8rem, 1.15vw, 0.9rem);
  color: #777;
  text-align: center;
  margin: 0 0 clamp(1.8rem, 2vw, 2rem) 0;
  font-weight: 500;
  padding-top: clamp(0.1rem, 0.2vw, 0.2rem);
}

/* 테이블의 table-layout을 fixed로 고정하여 넓이가 초과될 때 텍스트 자르기(ellipsis) 활성화 */
.report-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  overflow: hidden;
  table-layout: fixed;
}

.report-table th, .report-table td {
  border-bottom: clamp(0.0625rem, 0.1vw, 0.125rem) solid #eaeaea;
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  vertical-align: middle;
}

.report-table th {
  background-color: #f4f6f8;
  font-weight: 700;
  color: #444;
  white-space: nowrap;
}

.report-table td {
  color: #555;
}

/* 이름 칸 말줄임표(...) 적용 */
.name-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: clamp(0.8rem, 1.5vw, 1.2rem);
}

.font-semibold {
  font-weight: 600;
  color: #222 !important;
}

.align-left {
  text-align: left;
}

.text-price {
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-weight: 550;
  color: #000000;
}

.table-link {
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  color: #1F5BFF;
}

.table-link:hover {
  opacity: 0.6;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: transform 0.2s ease;
}

.favorite-btn:active {
  transform: scale(0.9);
}

/* 즐겨찾기 아이콘 스타일 */
.bookmark-icon {
  width: clamp(1rem, 1.2vw, 1.2rem);
  height: clamp(1.3rem, 1.9vw, 1.6rem);
  fill: transparent;
  stroke: #ccc;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.3s ease;
}

/* 활성화되었을 때 책갈피 색상 */
.favorite-btn.is-active .bookmark-icon {
  fill: #FFD700;
  stroke: #FFD700;
}

.table-action-area {
  display: flex;
  justify-content: center;
  margin-top: clamp(0.5rem, 1vw, 1rem);
  padding-top: clamp(0.5rem, 1vw, 1rem);
}

/* 보장 내용별 가격 비교 버튼 */
.action-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: clamp(0.5rem, 1.5vw, 0.7rem) clamp(0.6rem, 1.5vw, 1.5rem);
  margin: clamp(0.25rem, 0.9vw, 0.1rem) 0;
  border-radius: clamp(0.25rem, 0.8vw, 0.375rem);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.7rem, 1.1vw, 1.1rem);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: end;
  text-decoration: none;
}

.action-button:hover {
  background-color: #0052cc;
}
</style>