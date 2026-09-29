<template>
  <section class="results-section">
    <h2 class="results-title">검색 결과</h2>

    <div v-if="results.length > 0" class="results-container">
      <div v-for="(result, index) in results" :key="result.id" class="result-item">
        <div class="result-left">
          <div class="result-icon">
            <span class="icon-circle" :style="{ backgroundColor: getIconColor(index) }"></span>
          </div>
          <div class="result-info">
            <h3 class="result-insurer">{{ result.insurer }}</h3>
            <p class="result-product">{{ result.product }}</p>
          </div>
        </div>

        <div class="result-right">
          <div class="compatibility">
            <span class="compatibility-label">적합성</span>
            <span class="compatibility-value">{{ result.compatibility }}%</span>
          </div>
          <button class="expand-button" @click="toggleExpand(result.id)">
            {{ expandedIds.includes(result.id) ? '접기' : '펼쳐보기' }}
          </button>
        </div>
      </div>

      <!-- 펼쳐진 상세 정보 -->
      <transition-group name="expand" tag="div">
        <div
            v-for="result in results"
            v-show="expandedIds.includes(result.id)"
            :key="`details-${result.id}`"
            class="result-details"
        >
          <div class="details-content">
            <h4>상품 상세 정보</h4>
            <ul class="details-list">
              <li>보험료: 월 5만원 대</li>
              <li>갱신주기: 매년</li>
              <li>최대 보장액: 5억원</li>
              <li>보장기간: 80세</li>
            </ul>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-else class="no-results">
      <p>검색 결과가 없습니다.</p>
      <p class="no-results-subtitle">필터를 조정하여 다시 시도해보세요.</p>
    </div>

    <!-- 페이지네이션 -->
    <div v-if="results.length > 0" class="pagination">
      <button
          v-for="page in totalPages"
          :key="page"
          :class="['pagination-button', { active: currentPage === page }]"
          @click="currentPage = page"
      >
        {{ page }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      expandedIds: [],
      currentPage: 1,
      itemsPerPage: 7,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.results.length / this.itemsPerPage);
    },
  },
  methods: {
    toggleExpand(resultId) {
      const index = this.expandedIds.indexOf(resultId);
      if (index > -1) {
        this.expandedIds.splice(index, 1);
      } else {
        this.expandedIds.push(resultId);
      }
    },
    getIconColor(index) {
      const colors = ['#c0c0c0', '#a9a9a9', '#808080', '#696969'];
      return colors[index % colors.length];
    },
  },
};
</script>

<style scoped>
.results-section {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
}

.results-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.result-item:last-of-type {
  border-bottom: none;
}

.result-item:hover {
  background-color: #fafafa;
}

.result-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.result-insurer {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.result-product {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

.result-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  margin-left: 1rem;
}

.compatibility {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.compatibility-label {
  font-size: 0.8rem;
  color: #999;
}

.compatibility-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #666;
}

.expand-button {
  background: none;
  border: none;
  color: #0066ff;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.expand-button:hover {
  color: #0052cc;
}

/* 상세 정보 */
.result-details {
  padding: 1rem 0 1rem 3.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.details-content h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.details-list li {
  font-size: 0.85rem;
  color: #666;
}

.details-list li::before {
  content: '• ';
  color: #0066ff;
  margin-right: 0.5rem;
}

/* 검색 결과 없음 */
.no-results {
  text-align: center;
  padding: 3rem 1rem;
}

.no-results p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.no-results-subtitle {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.5rem;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.pagination-button {
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.pagination-button:hover {
  border-color: #0066ff;
  color: #0066ff;
}

.pagination-button.active {
  background-color: #0066ff;
  color: white;
  border-color: #0066ff;
}

/* 애니메이션 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 반응형 디자인 */
@media (max-width: 640px) {
  .results-section {
    padding: 1.5rem;
  }

  .result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .result-right {
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
  }

  .expand-button {
    white-space: normal;
  }

  .result-details {
    margin-left: -3.5rem;
  }
}

@media (min-width: 768px) {
  .results-section {
    padding: 2.5rem;
  }
}
</style>