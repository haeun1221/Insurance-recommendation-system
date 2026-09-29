<template>
  <div class="favorites-view">
    <div class="content-wrapper">
      <!-- 헤더 -->
      <div class="favorites-header">
        <h1 class="favorites-title">즐겨찾기</h1>
        <p class="favorites-subtitle">관심있는 보험 상품을 관리해보세요</p>
      </div>

      <!-- 탭 네비게이션 -->
      <div class="tab-navigation">
        <button
            class="tab-button"
            :class="{ active: activeTab === 'overview' }"
            @click="activeTab = 'overview'"
        >
          한눈에 보기
        </button>
        <button
            class="tab-button"
            :class="{ active: activeTab === 'comparison' }"
            @click="activeTab = 'comparison'"
        >
          항목 비교하기
        </button>
      </div>

      <!-- 탭 1: 한눈에 보기 -->
      <div v-if="activeTab === 'overview'" class="tab-content">
        <!-- 요약 카드 -->
        <div class="summary-cards">
          <div class="summary-card" v-for="i in 4" :key="i">
            <div class="card-number">{{ i }}</div>
            <p class="card-text">항목{{ i }}</p>
          </div>
        </div>

        <!-- 보장내용 테이블 -->
        <div class="table-section">
          <h3 class="table-title">보장내용</h3>
          <div class="overview-table">
            <div class="table-header">
              <div class="table-cell">항목</div>
              <div class="table-cell" v-for="i in 5" :key="i">보험사 {{ String.fromCharCode(64 + i) }}</div>
            </div>
            <div class="table-row" v-for="j in 5" :key="j">
              <div class="table-cell">항목 {{ j }}</div>
              <div class="table-cell" v-for="i in 5" :key="i">
                <input type="checkbox" class="table-checkbox" />
              </div>
            </div>
          </div>
        </div>

        <!-- 항목 드롭다운 -->
        <div class="dropdown-section">
          <button class="dropdown-button" @click="showDetails = !showDetails">
            펼쳐보기
          </button>
          <div v-if="showDetails" class="dropdown-content">
            <div class="insurance-list">
              <div class="insurance-item" v-for="item in favoritesList" :key="item.id">
                <span class="insurance-name">{{ item.insurer }} - {{ item.product }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 탭 2: 항목 비교하기 -->
      <div v-if="activeTab === 'comparison'" class="tab-content">
        <!-- 요약 카드 -->
        <div class="summary-cards">
          <div class="summary-card" v-for="i in 4" :key="i">
            <div class="card-number">{{ i }}</div>
            <p class="card-text">보험{{ i }}</p>
          </div>
        </div>

        <!-- 비교 추가 버튼 -->
        <button class="add-comparison-button">+ 비교 추가</button>

        <!-- 비교 분석 테이블 -->
        <div class="comparison-analysis">
          <div class="comparison-table">
            <div class="table-header">
              <div class="table-cell">분류</div>
              <div class="table-cell" v-for="i in 4" :key="i">상품 {{ i }}</div>
            </div>
            <div class="table-row" v-for="j in 6" :key="j">
              <div class="table-cell">항목 {{ j }}</div>
              <div class="table-cell" v-for="i in 4" :key="i"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesView',
  data() {
    return {
      activeTab: 'overview',
      showDetails: false,
      favoritesList: [
        { id: 1, insurer: 'A 보험사', product: '의료보험 1' },
        { id: 2, insurer: 'B 보험사', product: '의료보험 2' },
        { id: 3, insurer: 'C 보험사', product: '실손보험' },
        { id: 4, insurer: 'D 보험사', product: '암보험' },
        { id: 5, insurer: 'E 보험사', product: '골절보험' },
      ],
    };
  },
};
</script>

<style scoped>
.favorites-view {
  width: 100%;
  min-width: 0;
  background-color: #f9f9f9;
}

.content-wrapper {
  width: 100%;
  min-width: 0;
  padding: clamp(1rem, 3vw, 3rem) clamp(0.5rem, 2vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
}

/* 헤더 */
.favorites-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.favorites-title {
  font-size: clamp(1.3rem, 3.5vw, 2rem);
  font-weight: 700;
  color: #333;
  margin: 0;
}

.favorites-subtitle {
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: #666;
  margin: 0;
}

/* 탭 네비게이션 */
.tab-navigation {
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  border-bottom: 2px solid #e8e8e8;
  flex-wrap: wrap;
}

.tab-button {
  background: none;
  border: none;
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(0.8rem, 1.3vw, 1rem);
  font-weight: 600;
  color: #999;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  white-space: nowrap;
}

.tab-button.active {
  color: #0066ff;
  border-bottom-color: #0066ff;
}

.tab-button:hover {
  color: #0066ff;
}

/* 탭 콘텐츠 */
.tab-content {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
}

/* 요약 카드 */
.summary-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(100px, 20vw, 180px), 1fr));
  gap: clamp(0.75rem, 1.5vw, 1rem);
}

.summary-card {
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(0.75rem, 1.5vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  text-align: center;
}

.card-number {
  width: clamp(35px, 7vw, 45px);
  height: clamp(35px, 7vw, 45px);
  border-radius: 50%;
  background-color: #0066ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: bold;
}

.card-text {
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: #666;
  margin: 0;
  font-weight: 500;
}

/* 테이블 */
.table-section {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1rem);
}

.table-title {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.overview-table,
.comparison-table {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  overflow-x: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #f9f9f9;
}

.table-cell {
  padding: clamp(0.6rem, 1.2vw, 1rem);
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
}

.table-checkbox {
  width: clamp(16px, 2vw, 18px);
  height: clamp(16px, 2vw, 18px);
  cursor: pointer;
  accent-color: #0066ff;
}

/* 드롭다운 */
.dropdown-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
}

.dropdown-button {
  background-color: white;
  border: 1px solid #ddd;
  padding: clamp(0.6rem, 1.2vw, 0.85rem) clamp(1rem, 2vw, 1.5rem);
  border-radius: clamp(4px, 0.8vw, 6px);
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  white-space: nowrap;
}

.dropdown-button:hover {
  background-color: #f5f5f5;
  border-color: #0066ff;
  color: #0066ff;
}

.dropdown-content {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(0.75rem, 1.5vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.insurance-list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
}

.insurance-item {
  padding: clamp(0.5rem, 1vw, 0.75rem);
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: #666;
  border-bottom: 1px solid #eee;
}

.insurance-item:last-child {
  border-bottom: none;
}

.insurance-name {
  display: block;
}

/* 비교 추가 버튼 */
.add-comparison-button {
  width: fit-content;
  background-color: #e8e8e8;
  border: 2px dashed #999;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-radius: clamp(6px, 1vw, 12px);
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center;
}

.add-comparison-button:hover {
  background-color: #ddd;
  border-color: #666;
  color: #333;
}

/* 비교 분석 */
.comparison-analysis {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}
</style>