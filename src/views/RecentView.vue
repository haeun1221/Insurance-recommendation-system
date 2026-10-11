<!-- 최근 검색 조회 페이지 -->
<template>
  <div class="recent-view">
    <div class="content-wrapper">

      <!-- 1. 헤더 영역 -->
      <div class="header-row">
        <div class="section-header">
          <span class="breadcrumb">최근 조회 내역</span>
          <h2 class="section-title">이전에 조회했던 분석 결과를<br>다시 확인해 보세요</h2>
        </div>

        <button
            class="submit-btn"
            :class="{ 'is-active': selectedId !== null }"
            :disabled="selectedId === null"
            @click="goToAnalysis"
        >
          열어보기
        </button>
      </div>

      <!-- 2. 최근 조회 이력 카드 리스트 -->
      <div class="history-list">

        <!-- 각 이력 카드 (라디오 버튼 역할) -->
        <label
            v-for="history in historyList"
            :key="history.id"
            class="history-card"
            :class="{ 'is-selected': selectedId === history.id }"
        >
          <!-- 실제 라디오 버튼 (화면에서는 숨김) -->
          <input
              type="radio"
              name="historySelect"
              :value="history.id"
              v-model="selectedId"
              class="hidden-radio"
          >

          <!-- 카드 상단: 날짜 및 선택 박스 -->
          <div class="card-top">
            <span class="history-date">{{ history.date }} 조회</span>

            <!-- 사각형 박스로 묶인 텍스트 + 라디오 버튼 UI -->
            <div class="select-box">
              <span class="select-text">선택</span>
              <div class="custom-radio-circle"></div>
            </div>
          </div>

          <!-- 카드 내용 (가로 배치 레이아웃) -->
          <div class="info-grid">

            <!-- 중단 1: 기본 정보 -->
            <div class="info-row">
              <span class="section-label">기본 정보</span>
              <div class="info-content">
                <span class="info-badge">{{ history.gender }}</span>
                <span class="info-badge">{{ history.birth }}</span>
                <span class="info-badge">{{ history.renewal }}</span>
              </div>
            </div>

            <!-- 중단 2: 보장 중요도 -->
            <div class="info-row">
              <span class="section-label">보장 중요도</span>
              <div class="info-content">
                <div
                    v-for="(priority, index) in history.priorities"
                    :key="index"
                    class="priority-tag"
                >
                  <span class="info-badge">{{ priority.name }}
                    <span class="priority-score">{{ priority.score }}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 하단: 개인 맞춤 조건 -->
            <div class="info-row">
              <span class="section-label">맞춤 조건</span>
              <div class="info-content">
                <div class="condition-box">
                  "{{ history.conditions }}"
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentView',
  data() {
    return {
      selectedId: null,

      historyList: [
        {
          id: 1,
          date: '2026.10.04 14:30',
          gender: '여성',
          birth: '1995.08.15',
          renewal: '비갱신형',
          priorities: [
            { name: '암', score: '2.5' },
            { name: '입원/수술', score: '2.0' },
            { name: '뇌 질환', score: '1.5' },
            { name: '심장 질환', score: '1.0' },
            { name: '상해', score: '1.0' }
          ],
          conditions: '가족력이 있어서 암 보장이 탄탄했으면 좋겠고, 월 납입금은 5만원 이내로 원해요.'
        },
        {
          id: 2,
          date: '2026.09.28 09:15',
          gender: '남성',
          birth: '1990.02.20',
          renewal: '갱신형',
          priorities: [
            { name: '상해', score: '3.0' },
            { name: '입원/수술', score: '2.0' },
            { name: '암', score: '1.5' },
            { name: '심장 질환', score: '1.0' },
            { name: '뇌 질환', score: '0.5' }
          ],
          conditions: '최근 병원 방문 이력이 있어서 유병자 보험 위주로 찾아보고 싶고, 일상생활 중 다치는 것에 대한 대비가 필요합니다.'
        }
      ]
    };
  },
  methods: {
    goToAnalysis() {
      if (this.selectedId !== null) {
        this.$router.push('/ai-guide');
      }
    }
  }
};
</script>

<style scoped>
.recent-view {
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
  gap: clamp(1.3rem, 2.8vw, 2.3rem);
}

/* 1. 헤더 가로 배치 영역 */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.breadcrumb {
  font-size: clamp(0.55rem, 1.35vw, 0.85rem);
  color: #1F5BFF;
  font-weight: 700;
}

.section-title {
  font-size: clamp(1.15rem, 2.95vw, 1.55rem);
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

/* 열어보기 버튼 */
.submit-btn {
  padding: clamp(0.45rem, 0.65vw, 0.65rem) clamp(0.9rem, 1.5vw, 1.3rem);
  font-size: clamp(0.9rem, 1vw, 1.05rem);
  font-weight: 580;
  border: none;
  border-radius: clamp(0.3rem, 0.5vw, 0.4rem);
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  transition: all 0.3s;
}

.submit-btn.is-active {
  background-color: #1F5BFF;
  color: white;
  cursor: pointer;
  box-shadow: 0 clamp(0.15rem, 0.3vw, 0.3rem) clamp(0.3rem, 0.6vw, 0.6rem) rgba(31, 91, 255, 0.25);
}

.submit-btn.is-active:hover {
  background-color: #1a4cd9;
}

/* 2. 카드 리스트 영역 */
.history-list {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.5vw, 1.5rem);
}

/* 카드 기본 스타일 */
.history-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: clamp(0.5rem, 1vw, 0.8rem);
  padding: clamp(1.2rem, 2vw, 2rem) clamp(1.5rem, 2.5vw, 2.5rem);
  border: clamp(0.12rem, 0.2vw, 0.15rem) solid #f1f1f1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.history-card:hover {
  border-color: #c7d2fe;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.history-card.is-selected {
  border-color: #1F5BFF;
  background-color: #f4f8ff;
  box-shadow: 0 4px 12px rgba(31, 91, 255, 0.1);
}

.hidden-radio {
  display: none;
}

/* 카드 상단 (날짜 및 선택 박스) */
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: clamp(0.06rem, 0.1vw, 0.12rem) solid #f0f0f0;
  padding-bottom: clamp(0.8rem, 1.2vw, 1rem);
  margin-bottom: clamp(1rem, 1.5vw, 1.5rem);
}

.history-date {
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 700;
  color: #444;
}

/* 선택을 명확히 보여주는 사각형 박스 UI */
.select-box {
  display: flex;
  align-items: center;
  gap: clamp(0.4rem, 0.6vw, 0.8rem);
  padding: clamp(0.4rem, 0.6vw, 0.5rem) clamp(0.8rem, 1vw, 1.2rem);
  border: clamp(0.06rem, 0.1vw, 0.12rem) solid #d1d5db;
  border-radius: clamp(0.3rem, 0.5vw, 0.5rem);
  background-color: white;
  transition: all 0.2s;
}

.select-text {
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  font-weight: 700;
  color: #666;
}

.custom-radio-circle {
  width: clamp(1rem, 1.5vw, 1.2rem);
  height: clamp(1rem, 1.5vw, 1.2rem);
  border-radius: 50%;
  border: clamp(0.12rem, 0.2vw, 0.15rem) solid #d1d5db;
  background-color: white;
  transition: all 0.2s;
  position: relative;
}

/* 카드가 선택되었을 때의 박스 & 버튼 상태 */
.history-card.is-selected .select-box {
  border-color: #1F5BFF;
  background-color: #1F5BFF;
}

.history-card.is-selected .select-text {
  color: white;
}

.history-card.is-selected .custom-radio-circle {
  border-color: white;
  background-color: #1F5BFF;
}

.history-card.is-selected .custom-radio-circle::after {
  content: '';
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 30%;
  height: 55%;
  border-bottom: clamp(0.12rem, 0.2vw, 0.15rem) solid white;
  border-right: clamp(0.12rem, 0.2vw, 0.15rem) solid white;
}

/* 카드 내부 가로 배치 레이아웃 (Grid) */
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
  flex: 0 0 clamp(4.5rem, 6vw, 6rem);
  font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  font-weight: 700;
  color: #474747;
  padding-top: clamp(0.2rem, 0.4vw, 0.4rem);
}

.info-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1vw, 0.8rem);
  align-items: center;
}

/* 기본 정보 뱃지 */
.info-badge {
  background-color: #f9f9f9;
  color: #374151;
  font-size: clamp(0.7rem, 1vw, 0.9rem);
  font-weight: 650;
  padding: clamp(0.3rem, 0.6vw, 0.5rem) clamp(0.8rem, 1.2vw, 1.2rem);
  border-radius: clamp(1.5rem, 1.7vw, 1.7rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.history-card.is-selected .info-badge, .priority-score {
  background-color: white;
}

.history-card.is-selected .priority-score {
  background-color: white;
}

/* 보장 중요도 태그 */
.priority-tag {
  display: flex;
  align-items: center;
  background-color: white;
  overflow: hidden;
  border-radius: clamp(1.5rem, 1.7vw, 1.7rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.priority-score {
  background-color: #f9f9f9;
  color: #1F5BFF;
  font-size: clamp(0.8rem, 1.1vw, 0.95rem);
  font-weight: 800;
  padding: clamp(0.3rem, 0.6vw, 0.5rem) clamp(0.3rem, 0.5vw, 0.5rem);
  padding-right: clamp(-0.4rem, 0.4vw, -0.2rem);
}

/* 개인 맞춤 조건 박스 */
.condition-box {
  width: 100%;
  background-color: #f8fafc;
  padding: clamp(0.5rem, 0.7vw, 0.7rem) clamp(0.8rem, 1.2vw, 1.2rem);
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #334155;
  line-height: 1.5;
  font-weight: 500;
  border-radius: clamp(0.3rem, 0.5vw, 0.5rem);
  border: clamp(0.06rem, 0.1vw, 0.1rem) solid #e5e7eb;
}

.history-card.is-selected .condition-box {
  background-color: white;
  border-color: #c7d2fe;
  color: #1e293b;
  font-weight: 600;
}
</style>