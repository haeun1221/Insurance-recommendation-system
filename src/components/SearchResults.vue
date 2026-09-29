<template>
  <div class="search-results">
    <div class="results-header">
      <h3 class="results-title">검색 결과</h3>
      <p class="results-count">{{ results.length }}개 상품</p>
    </div>

    <div class="results-list">
      <div class="result-item" v-for="(item, index) in paginatedResults" :key="item.id">
        <div class="result-number">{{ startIndex + index + 1 }}</div>
        <div class="result-content">
          <h4 class="result-product">{{ item.insurer }}</h4>
          <p class="result-insurer">{{ item.product }}</p>
        </div>
        <div class="result-compatibility">
          <span class="compatibility-value">적합성 {{ item.compatibility }}%</span>
          <router-link to="/ai-guide" class="expand-button">펼쳐보기</router-link>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
      >
        이전
      </button>

      <div class="pagination-info">
        {{ currentPage }} / {{ totalPages }}
      </div>

      <button
          class="pagination-button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.results.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    paginatedResults() {
      const end = this.startIndex + this.itemsPerPage;
      return this.results.slice(this.startIndex, end);
    },
  },
};
</script>

<style scoped>
.search-results {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(1.3rem, 2.5vw, 2.5rem) clamp(2.5rem, 5vw, 5rem);
  padding-top: clamp(1.95rem, 3.15vw, 3.15rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.5rem);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  flex-wrap: wrap;
}

.results-title {
  font-size: clamp(1.05rem, 2.15vw, 1.25rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.results-count {
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.78rem, 1.48vw, 0.93rem);
  color: #333;
  font-weight: 650;
  margin: 0;
  white-space: nowrap;
}

.results-list {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.45rem, 1vw, 0.6rem);
}

.result-item {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: clamp(30px, 5vw, 40px) 1fr 1fr;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.1rem, 1.6vw, 1.3rem);
  border: 1px solid #eee;
  border-radius: clamp(4px, 0.8vw, 6px);
  align-items: center;
  transition: all 0.2s ease;
  flex-wrap: wrap;
}

.result-number {
  width: clamp(30px, 5vw, 40px);
  height: clamp(30px, 5vw, 40px);
  border-radius: 50%;
  background-color: #0066ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 600;
  flex-shrink: 0;
  grid-column: 1;
  grid-row: 1 / 3;
}

.result-content {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.08rem, 0.25vw, 0.13rem);
  grid-column: 2;
  grid-row: 1 / 3;
}

.result-insurer {
  font-size: clamp(0.83rem, 1.48vw, 1.03rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.result-product {
  font-size: clamp(0.35rem, 0.8vw, 0.8rem);
  font-weight: 500;
  color: #666;
  margin: 0;
}

.result-compatibility {
  width: 100%;
  min-width: 0;
  display: flex;
  gap: clamp(1.15rem, 2.3vw, 2.3rem);
  align-items: center;
  justify-content: flex-end;
  grid-column: 3;
  grid-row: 1 / 3;
}

.compatibility-value {
  font-size: clamp(0.73rem, 1.47vw, 0.97rem);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-weight: 650;
  color: #0066ff;
  white-space: nowrap;
}

.expand-button {
  padding: clamp(0.39rem, 0.79vw, 0.59rem) clamp(0.65rem, 1.4vw, 0.95rem);
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: clamp(4px, 0.8vw, 6px);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(0.74rem, 1.19vw, 0.94rem);
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.expand-button:hover {
  background-color: #0052cc;
  box-shadow: 0 2px 4px rgba(0, 102, 255, 0.2);
}

.compatibility-bar {
  width: 100%;
  height: clamp(4px, 0.8vw, 6px);
  background-color: #e8e8e8;
  border-radius: 3px;
  overflow: hidden;
}

.compatibility-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066ff 0%, #0052cc 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 페이지네이션 */
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(0.8rem, 1.5vw, 2rem);
  margin-top: clamp(0.5rem, 1vw, 1rem);
  flex-wrap: wrap;
}

.pagination-button {
  background-color: white;
  border: 1px solid #ddd;
  padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1rem);
  border-radius: clamp(4px, 0.8vw, 6px);
  font-size: clamp(0.7rem, 1vw, 0.9rem);
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f9f9f9;
  color: #333;
  border-color: #0066ff;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: clamp(0.75rem, 1.2vw, 0.95rem);
  color: #666;
  font-weight: 600;
  min-width: clamp(50px, 8vw, 80px);
  text-align: center;
}
</style>