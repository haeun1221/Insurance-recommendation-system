<template>
  <div class="analysis-view">
    <div class="content-wrapper">
      <!-- 헤더 -->
      <div class="analysis-header">
        <h1 class="analysis-title">최근 조회 분석</h1>
        <p class="analysis-subtitle">최근 본 보험 상품을 분석해드릴게요</p>
      </div>

      <!-- 상품 요약 -->
      <div class="summary-section">
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-icon">1</div>
            <h3 class="card-title">조회한 상품</h3>
            <p class="card-value">15개</p>
          </div>
          <div class="summary-card">
            <div class="card-icon">2</div>
            <h3 class="card-title">평균 호환도</h3>
            <p class="card-value">67%</p>
          </div>
          <div class="summary-card">
            <div class="card-icon">3</div>
            <h3 class="card-title">추천 상품</h3>
            <p class="card-value">5개</p>
          </div>
          <div class="summary-card">
            <div class="card-icon">4</div>
            <h3 class="card-title">최고 호환도</h3>
            <p class="card-value">87%</p>
          </div>
        </div>
      </div>

      <!-- 비교 테이블 -->
      <div class="comparison-section">
        <h2 class="section-title">상품 비교 분석</h2>

        <div class="comparison-table">
          <div class="table-header">
            <div class="table-column">보험사</div>
            <div class="table-column">상품명</div>
            <div class="table-column">호환도</div>
            <div class="table-column">가격</div>
            <div class="table-column">평점</div>
          </div>

          <div class="table-row" v-for="item in comparisonData" :key="item.id">
            <div class="table-column">{{ item.insurer }}</div>
            <div class="table-column">{{ item.product }}</div>
            <div class="table-column">
              <span class="compatibility-badge">{{ item.compatibility }}%</span>
            </div>
            <div class="table-column">{{ item.price }}</div>
            <div class="table-column">{{ item.rating }}</div>
          </div>
        </div>
      </div>

      <!-- 차트 섹션 -->
      <div class="chart-section">
        <h2 class="section-title">호환도 분포도</h2>
        <div class="chart-placeholder">
          <p>호환도 분포 차트가 표시될 영역</p>
        </div>
      </div>

      <!-- 추천 섹션 -->
      <div class="recommendation-section">
        <h2 class="section-title">이 중에서 선택해보세요</h2>
        <div class="recommendation-cards">
          <div class="recommendation-card" v-for="i in 3" :key="i">
            <div class="recommendation-badge">추천</div>
            <h3 class="recommendation-title">상품명</h3>
            <p class="recommendation-info">보험사 이름</p>
            <button class="recommendation-button">상세 보기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisView',
  data() {
    return {
      comparisonData: [
        { id: 1, insurer: 'A 보험사', product: '의료보험 2', compatibility: 87, price: '12,000원', rating: 4.8 },
        { id: 2, insurer: 'B 보험사', product: '의료보험 1', compatibility: 75, price: '10,500원', rating: 4.6 },
        { id: 3, insurer: 'C 보험사', product: '의료보험 1', compatibility: 65, price: '9,800원', rating: 4.4 },
        { id: 4, insurer: 'A 보험사', product: '의료보험 1', compatibility: 58, price: '8,900원', rating: 4.2 },
        { id: 5, insurer: 'D 보험사', product: '의료보험 3', compatibility: 52, price: '11,200원', rating: 4.5 },
      ],
    };
  },
};
</script>

<style scoped>
.analysis-view {
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
.analysis-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.analysis-title {
  font-size: clamp(1.3rem, 3.5vw, 2rem);
  font-weight: 700;
  color: #333;
  margin: 0;
}

.analysis-subtitle {
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: #666;
  margin: 0;
}

/* 요약 카드 */
.summary-section {
  width: 100%;
  min-width: 0;
  display: flex;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.summary-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(140px, 20vw, 240px), 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.summary-card {
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(0.75rem, 1.5vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  text-align: center;
}

.card-icon {
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  border-radius: 50%;
  background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: bold;
}

.card-title {
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card-value {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: #0066ff;
  margin: 0;
}

/* 섹션 제목 */
.section-title {
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
  color: #333;
  margin: 0 0 clamp(0.75rem, 1.5vw, 1rem) 0;
}

/* 비교 테이블 */
.comparison-section {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

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
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #f9f9f9;
}

.table-column {
  padding: clamp(0.6rem, 1.2vw, 1rem);
  font-size: clamp(0.7rem, 1vw, 0.9rem);
  color: #666;
  display: flex;
  align-items: center;
  word-break: break-word;
}

.compatibility-badge {
  background-color: #e8f0ff;
  color: #0066ff;
  padding: clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem);
  border-radius: clamp(3px, 0.5vw, 5px);
  font-weight: 600;
  font-size: clamp(0.65rem, 1vw, 0.85rem);
  white-space: nowrap;
}

/* 차트 섹션 */
.chart-section {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.chart-placeholder {
  width: 100%;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(2rem, 5vw, 4rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-height: clamp(200px, 30vw, 300px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ddd;
}

.chart-placeholder p {
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: #999;
  margin: 0;
}

/* 추천 섹션 */
.recommendation-section {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.recommendation-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(180px, 22vw, 280px), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.recommendation-card {
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(1rem, 2vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  position: relative;
  border: 1px solid #e8e8e8;
}

.recommendation-badge {
  position: absolute;
  top: clamp(0.5rem, 1vw, 0.75rem);
  right: clamp(0.5rem, 1vw, 0.75rem);
  background-color: #ff6b6b;
  color: white;
  padding: clamp(0.2rem, 0.4vw, 0.4rem) clamp(0.4rem, 0.8vw, 0.6rem);
  border-radius: clamp(3px, 0.5vw, 5px);
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  font-weight: 600;
  white-space: nowrap;
}

.recommendation-title {
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  font-weight: 600;
  color: #333;
  margin: clamp(0.75rem, 1.5vw, 1rem) 0 0 0;
}

.recommendation-info {
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  color: #666;
  margin: 0;
}

.recommendation-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1rem);
  border-radius: clamp(4px, 0.8vw, 6px);
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  margin-top: auto;
}

.recommendation-button:hover {
  background-color: #0052cc;
}
</style>