<!-- 즐겨찾기 페이지 (디자인 안 바꾼 버전) -->
<template>
  <div class="favorites-view">
    <div class="content-wrapper">

      <!-- 1. 헤더 영역 -->
      <div class="section-header">
        <span class="breadcrumb">즐겨찾기</span>
        <h2 class="section-title">즐겨찾기한 보험 목록과<br>검색했던 조건을 확인해 보세요</h2>
      </div>

      <!-- 2. 즐겨찾기 카드 리스트 -->
      <div class="favorite-list" v-if="favoriteList.length > 0">
        <div
            v-for="item in favoriteList"
            :key="item.id"
            class="favorite-card"
        >
          <!-- 카드 상단: 보험 핵심 정보 -->
          <div class="card-main-row">
            <!-- 즐겨찾기 버튼 -->
            <button
                class="favorite-btn is-active"
                @click="toggleFavorite(item)"
                title="즐겨찾기 해제"
            >
              <svg viewBox="0 0 24 24" class="bookmark-icon">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <!-- 보험 이름 -->
            <div class="insurance-info-group">
              <span class="company-badge">{{ item.company }}</span>
              <h3 class="insurance-name" :title="item.name">{{ item.name }}</h3>
            </div>

            <!-- 월 보험료 -->
            <div class="price-box">
              <span class="label-small">월 보험료</span>
              <span class="price-value">{{ item.premium.toLocaleString() }}원</span>
            </div>

            <!-- 보장 수 -->
            <div class="count-box">
              <span class="label-small">보장 수</span>
              <router-link to="/coverage-details" class="table-link">
                {{ item.coverageCount }}개
              </router-link>
            </div>

            <!-- 독소조항 수 -->
            <div class="count-box">
              <span class="label-small">독소조항 수</span>
              <router-link to="/toxic-details" class="table-link text-danger">
                {{ item.toxicCount }}개
              </router-link>
            </div>
          </div>

          <!-- 입력 정보 영역 -->
          <div class="search-criteria-section">
            <div class="info-grid">
              <!-- 기본 정보 -->
              <div class="info-row">
                <span class="section-label">기본 정보</span>
                <div class="info-content">
                  <span class="info-badge">{{ item.searchCriteria.gender }}</span>
                  <span class="info-badge">{{ item.searchCriteria.birth }}</span>
                  <span class="info-badge">{{ item.searchCriteria.renewal }}</span>
                </div>
              </div>

              <!-- 보장 중요도 -->
              <div class="info-row">
                <span class="section-label">보장 중요도</span>
                <div class="info-content">
                  <div
                      v-for="(priority, index) in item.searchCriteria.priorities"
                      :key="index"
                      class="priority-tag"
                  >
                    <span class="info-badge">
                      {{ priority.name }} <span class="priority-score">{{ priority.score }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 맞춤 조건 -->
              <div class="info-row">
                <span class="section-label">맞춤 조건</span>
                <div class="info-content">
                  <div class="condition-box">
                    "{{ item.searchCriteria.conditions }}"
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 즐겨찾기 항목이 없을 경우 -->
      <div class="empty-state" v-else>
        <p>즐겨찾기한 보험이 없습니다. 보험을 검색하여 추가해 보세요</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesView',
  data() {
    return {
      favoriteList: [
        {
          id: 3,
          company: 'KB손해보험',
          name: 'KB개인실손의료비보험',
          premium: 28000,
          coverageCount: 10,
          toxicCount: 3,
          searchCriteria: {
            gender: '여성',
            birth: '1995.08.15',
            renewal: '비갱신형',
            priorities: [
              { name: '암', score: '2.5' },
              { name: '입원/수술', score: '2.0' },
              { name: '뇌 질환', score: '1.5' },
              { name: '심장 질환', score: '2.0' },
              { name: '상해', score: '2' }
            ],
            conditions: '서비스직, 가족력이 있어서 암 보장이 탄탄했으면 좋겠고, 월 납입금은 5만원 이내로 원해요.'
          }
        },
        {
          id: 1,
          company: 'DB손해보험',
          name: '무배당 프로미라이프 간편실손의료비보험(유병력자용)2604(TM)(만기재가입용)',
          premium: 35000,
          coverageCount: 12,
          toxicCount: 2,
          searchCriteria: {
            gender: '남성',
            birth: '1990.02.20',
            renewal: '갱신형',
            priorities: [
              { name: '상해', score: '3.0' },
              { name: '입원/수술', score: '2.0' },
              { name: '암', score: '2.0' },
              { name: '뇌 질환', score: '2.0' },
              { name: '심장 질환', score: '1.0'}
            ],
            conditions: '직업은 공무원, 최근 병원 방문 이력이 있어서 유병자 보험 위주로 찾아보고 싶고, 일상생활 중 다치는 것에 대한 대비가 필요합니다.'
          }
        }
      ]
    };
  },
  methods: {
    toggleFavorite(item) {
      const index = this.favoriteList.findIndex(f => f.id === item.id);
      if (index !== -1) {
        this.favoriteList.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.favorites-view {
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
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.breadcrumb {
  font-size: clamp(0.55rem, 1.35vw, 0.85rem);
  color: #1F5BFF;
  font-weight: 550;
}

.section-title {
  font-size: clamp(1.15rem, 2.95vw, 1.55rem);
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.45;
}

.favorite-list {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.5vw, 1.5rem);
}

.favorite-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: clamp(0.5rem, 1vw, 0.8rem);
  padding: clamp(1.2rem, 2vw, 1.8rem) clamp(1.5rem, 2.5vw, 2.2rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
}

.card-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 2vw, 2rem);
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  outline: none;
  transition: transform 0.2s ease;
}

.favorite-btn:active {
  transform: scale(0.9);
}

.bookmark-icon {
  width: clamp(1.2rem, 1.5vw, 1.5rem);
  height: clamp(1.5rem, 2.1vw, 2rem);
  fill: #FFD700;
  stroke: #FFD700;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.insurance-info-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(0.3rem, 0.5vw, 0.5rem);
  min-width: 0;
}

.company-badge {
  font-size: clamp(0.75rem, 0.95vw, 0.85rem);
  font-weight: 500;
  color: #333;
}

.insurance-name {
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  font-weight: 700;
  color: #222;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-box, .count-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  min-width: clamp(4rem, 6vw, 6rem);
}

.label-small {
  font-size: clamp(0.75rem, 0.95vw, 0.85rem);
  color: #333;
  font-weight: 500;
  margin-bottom: clamp(0.3rem, 0.5vw, 0.5rem);
}

.price-value {
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  font-weight: 700;
  color: #000;
}

.table-link {
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  text-decoration: underline;
  font-weight: 650;
  color: #1F5BFF;
  cursor: pointer;
}

.table-link.text-danger {
  color: #1F5BFF;
}

.table-link:hover { opacity: 0.7; }

.search-criteria-section {
  margin-top: clamp(1rem, 1.5vw, 1.2rem);
  background-color: #f9f9f9;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  margin-left: clamp(3.25rem, 3.45vw, 3.45rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.2vw, 1.2rem);
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.2vw, 1.2rem);
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: clamp(1rem, 2vw, 2.5rem);
}

.section-label {
  flex: 0 0 clamp(3rem, 4.5vw, 4.5rem);
  font-size: clamp(0.75rem, 1vw, 0.85rem);
  font-weight: 700;
  color: #606060;
  padding-top: clamp(0.2rem, 0.4vw, 0.4rem);
  margin-left: clamp(0.7rem, 0.9vw, 0.9rem);
}

.info-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.3rem, 0.8vw, 0.6rem);
  align-items: center;
}

.info-badge {
  background-color: white;
  color: #374151;
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  font-weight: 650;
  padding: clamp(0.3rem, 0.6vw, 0.5rem) clamp(0.7rem, 1.1vw, 1.1rem);
  border-radius: clamp(1.5rem, 1.7vw, 1.7rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.priority-tag {
  display: flex;
  align-items: center;
  background-color: white;
  overflow: hidden;
  border-radius: clamp(1.5rem, 1.7vw, 1.7rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.priority-score {
  background-color: white;
  color: #1F5BFF;
  font-size: clamp(0.75rem, 1vw, 0.9rem);
  font-weight: 800;
  padding: clamp(0.3rem, 0.6vw, 0.5rem) clamp(0.3rem, 0.5vw, 0.5rem);
  margin-right: clamp(-0.6rem, 0.6vw, -0.4rem);
}

.condition-box {
  width: 100%;
  background-color: white;
  padding: clamp(0.5rem, 0.7vw, 0.7rem) clamp(0.8rem, 1.2vw, 1.2rem);
  font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  color: #334155;
  line-height: 1.5;
  font-weight: 500;
  border-radius: clamp(0.3rem, 0.5vw, 0.5rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.empty-state {
  text-align: center;
  font-size: clamp(0.8rem, 1.05vw, 0.95rem);
  font-weight: 600;
  color: #777;
  background-color: white;
  border-radius: clamp(0.5rem, 1.5vw, 1rem);
  padding: clamp(1.5rem, 3.2vw, 2.7rem) clamp(2rem, 4.5vw, 4.5rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
}
</style>