<!-- 보험 검색 페이지 -->
<template>
  <div class="search-view">
    <div class="content-wrapper">
      <!-- 필터 섹션 -->
      <div class="section-header">
        <span class="breadcrumb">맞춤 보험 추천</span>
        <h2 class="section-title">내 조건에 가장 잘 맞는<br>최적의 보험 상품을 찾아 드려요</h2>
      </div>

      <div class="filter-card">
        <!-- 필터 그룹 1: 성별 & 갱신유무 -->
        <div class="filter-group">
          <div class="filter-item">
            <label class="filter-label">성별</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="filters.gender" value="남성" class="radio-input" />
                <span class="radio-text">남성</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="filters.gender" value="여성" class="radio-input" />
                <span class="radio-text">여성</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="filters.gender" value="미지정" class="radio-input" />
                <span class="radio-text">미지정</span>
              </label>
            </div>
          </div>

          <div class="filter-item">
            <label class="filter-label">갱신 유무</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="filters.renewal" value="갱신" class="radio-input" />
                <span class="radio-text">갱신</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="filters.renewal" value="비갱신" class="radio-input" />
                <span class="radio-text">비갱신</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="filters.renewal" value="미지정" class="radio-input" />
                <span class="radio-text">미지정</span>
              </label>
            </div>
          </div>
        </div>

        <!-- 필터 그룹 3: 생년월일 직접 입력 -->
        <div class="filter-row">
          <label class="filter-label">생년월일</label>
          <div class="date-input-group">
            <div class="date-input-wrapper">
              <input type="number" v-model.number="filters.birthYear" placeholder="YYYY" class="date-input year-input" />
              <span class="date-unit">년</span>
            </div>
            <div class="date-input-wrapper">
              <input type="number" v-model.number="filters.birthMonth" placeholder="MM" class="date-input month-input" min="1" max="12" />
              <span class="date-unit">월</span>
            </div>
            <div class="date-input-wrapper">
              <input type="number" v-model.number="filters.birthDay" placeholder="DD" class="date-input day-input" min="1" max="31" />
              <span class="date-unit">일</span>
            </div>
          </div>
        </div>

        <!-- 조회 버튼 -->
        <button class="search-button" @click="handleQuickSearch">조회</button>
      </div>

      <!-- 세부 보장 중요도 섹션 -->
      <div class="payout-section" v-if="showPayoutSection">
        <div class="multi-slider-header">
          <h4 class="multi-slider-title">세부 보장 집중도</h4>
          <p class="custom-conditions-subtitle">5개 카테고리에서 중요하다고 생각하는 보장 사항을 표시해주세요</p>
          <p class="multi-slider-subtitle">
            💡 {{ filters.insuranceAge }}세 {{ filters.gender || '고객' }} 통계 기준선 기본 배치
          </p>
        </div>

        <div class="multi-slider-group">
          <!-- 반복문을 활용한 슬라이더 렌더링 -->
          <div class="slider-row" v-for="item in sliderItems" :key="item.key">

            <span class="slider-label-left">{{ item.label }}</span>

            <div class="slider-container">
              <span class="slider-range-min">1</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': ((filters[item.key] - 1) / 9) }">
                <input
                    type="range"
                    v-model.number="filters[item.key]"
                    min="1" max="10" step="1"
                    class="range-slider"
                />
                <!-- 18px -> 1.125rem 파라미터 전달 -->
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters[item.key], 1, 10, 1.125) }">
                  {{ filters[item.key] }}
                </div>
              </div>
              <span class="slider-range-max">10</span>
            </div>

            <!-- Grid 위치 맞춤용 빈 div -->
            <div></div>

            <!-- 통계 기준선 대비 등락 표시 UI -->
            <div class="diff-indicator">
              <span class="diff-arrow-icon">↳</span>
              <span v-if="filters[item.key] === baselines[item.key]" class="diff-same">
                기준선과 동일 ({{ baselines[item.key] }})</span>
              <span v-else-if="filters[item.key] > baselines[item.key]" class="diff-up">
                ▲ +{{ (filters[item.key] - baselines[item.key]) }} <span class="diff-base">(통계 기준선: {{ baselines[item.key] }})</span>
              </span>
              <span v-else class="diff-down">
                ▼ {{ (filters[item.key] - baselines[item.key]) }} <span class="diff-base">(통계 기준선: {{ baselines[item.key] }})</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 개인 맞춤 조건 -->
        <div class="custom-conditions-section">
          <h4 class="custom-conditions-title">개인 맞춤 조건</h4>
          <p class="custom-conditions-subtitle">직업, 추가 기저질환 또는 피하고 싶은 약관 입력</p>
          <textarea
              v-model="filters.customConditions"
              class="custom-conditions-input"
              placeholder="예 : 사무직, 이륜차 운전중, 전이암 제외 약관 기피, 감액기간 최소화 희망 등"
              rows="3"
          ></textarea>
        </div>

        <router-link to="/ai-guide" class="search-button">검색</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data() {
    return {
      filters: {
        gender: '',
        renewal: '',
        birthYear: null,
        birthMonth: null,
        birthDay: null,
        insuranceAge: 0,
        diagnosis: 5,
        treatment: 5,
        surgery: 5,
        hospitalization: 5,
        injury: 5,
        customConditions: '',
      },
      baselines: {
        diagnosis: 5,
        treatment: 5,
        surgery: 5,
        hospitalization: 5,
        injury: 5
      },
      sliderItems: [
        { key: 'diagnosis', label: '암' },
        { key: 'treatment', label: '뇌 질환' },
        { key: 'surgery', label: '심장 질환' },
        { key: 'hospitalization', label: '상해' },
        { key: 'injury', label: '입원비 / 수술비' }
      ],
      showPayoutSection: false,
    };
  },
  methods: {
    handleQuickSearch() {
      if (!this.filters.birthYear || !this.filters.birthMonth || !this.filters.birthDay) {
        alert('생년월일을 모두 입력해주세요.');
        return;
      }

      const monthStr = String(this.filters.birthMonth).padStart(2, '0');
      const dayStr = String(this.filters.birthDay).padStart(2, '0');
      const birthDateString = `${this.filters.birthYear}-${monthStr}-${dayStr}`;
      this.filters.insuranceAge = this.calculateInsuranceAge(birthDateString);

      this.generateMockBaselines();

      this.showPayoutSection = true;
      this.$nextTick(() => {
        const payoutSection = document.querySelector('.payout-section');
        if (payoutSection) {
          payoutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    generateMockBaselines() {
      if (this.filters.gender === '여성' && this.filters.insuranceAge >= 40) {
        this.baselines = { diagnosis: 6, treatment: 7, surgery: 1, hospitalization: 1, injury: 3 };
      } else if (this.filters.gender === '남성') {
        this.baselines = { diagnosis: 5, treatment: 5, surgery: 7, hospitalization: 8, injury: 5 };
      } else {
        this.baselines = { diagnosis: 4, treatment: 4, surgery: 4, hospitalization: 4, injury: 4 };
      }

      Object.keys(this.baselines).forEach(key => {
        this.filters[key] = this.baselines[key];
      });
    },

    calculateInsuranceAge(birthDateString) {
      const today = new Date();
      const birth = new Date(birthDateString);
      let ageYears = today.getFullYear() - birth.getFullYear();
      let ageMonths = today.getMonth() - birth.getMonth();
      let ageDays = today.getDate() - birth.getDate();

      if (ageDays < 0) { ageMonths -= 1; }
      if (ageMonths < 0) { ageYears -= 1; ageMonths += 12; }
      return (ageMonths >= 6) ? ageYears + 1 : ageYears;
    },

    // 픽셀(px) 대신 rem 연산으로 수정된 슬라이더 로직
    getSliderValueLeft(value, min, max, thumbWidthRem) {
      const p = ((value - min) / (max - min)) * 100;
      const h = thumbWidthRem / 2;
      return `calc(${p}% + ${h - p * (thumbWidthRem / 100)}rem)`;
    }
  },
};
</script>

<style scoped>
.search-view {
  width: 100%;
  height: 100%;
  min-width: 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
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
  gap: clamp(0.15rem, 0.35vw, 0.35rem);
}

.breadcrumb {
  font-size: clamp(0.53rem, 1.33vw, 0.83rem);
  color: #1F5BFF;
  font-weight: 600;
}

.section-title {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.filter-card {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(0.375rem, 1vw, 0.75rem);
  padding: clamp(1.3rem, 2.5vw, 2.5rem) clamp(2.5rem, 5vw, 5rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: clamp(1.7rem, 2.5vw, 2.5rem);
}

.filter-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(5.5rem, 3.2vw, 7rem);
}

.filter-item {
  display: grid;
  grid-template-columns: clamp(3.75rem, 15vw, 6.25rem) 1fr;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  align-items: center;
}

.filter-row {
  display: grid;
  grid-template-columns: clamp(3.75rem, 15vw, 6.25rem) 1fr;
  gap: clamp(1rem, 2vw, 1.5rem);
  align-items: center;
}

.filter-label {
  font-size: clamp(1rem, 1.3vw, 0.75rem);
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.8rem, 1.3vw, 2.8rem);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
  cursor: pointer;
}

.radio-input {
  width: clamp(0.875rem, 1.5vw, 1rem);
  height: clamp(0.875rem, 1.5vw, 1rem);
  cursor: pointer;
  accent-color: #0066ff;
}

.radio-text {
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  font-weight: 550;
  color: #555;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.date-input-wrapper {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.date-input {
  padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.4rem, 0.8vw, 0.8rem);
  border: 0.0625rem solid #ddd;
  border-radius: clamp(0.25rem, 0.8vw, 0.375rem);
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  font-family: inherit;
  color: #333;
  text-align: center;
  transition: all 0.2s ease;
}

.year-input {
  width: clamp(4.375rem, 9vw, 5.625rem);
}

.month-input, .day-input {
  width: clamp(3.125rem, 6vw, 4.375rem);
}

.date-input:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 0.125rem rgba(0, 102, 255, 0.1);
}

.date-input::-webkit-outer-spin-button,
.date-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.date-input[type=number] {
  -moz-appearance: textfield;
}

.date-unit {
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  font-weight: 600;
  color: #333;
}

.payout-section {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(0.375rem, 1vw, 0.75rem);
  padding: clamp(1.3rem, 2.5vw, 2.5rem) clamp(2.5rem, 5vw, 5rem);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.multi-slider-header {
  display: flex;
  flex-direction: column;
  gap: clamp(0.3rem, 0.6vw, 0.5rem);
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
  align-items: flex-start;
}

.multi-slider-title {
  font-size: clamp(1.07rem, 2.17vw, 1.27rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.multi-slider-subtitle {
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  font-weight: 600;
  color: #333;
  padding-top: clamp(0.55rem, 0.75vw, 0.75rem);
}

.multi-slider-group {
  background-color: white;
  margin-top: clamp(-1.4rem, -1.5vw, -0.85rem);
  padding: clamp(1.25rem, 1.95vw, 2.05rem) clamp(1.65rem, 2.35vw, 2.05rem);
  padding-top: clamp(1.85rem, 2.45vw, 2.65rem);
  border: 0.0625rem solid #eee;
  border-radius: clamp(0.25rem, 0.8vw, 0.375rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 2vw, 2.5rem);
}

.slider-row {
  display: grid;
  grid-template-columns: clamp(5rem, 15vw, 6.875rem) 1fr;
  row-gap: 0.5rem;
  column-gap: clamp(1rem, 2vw, 1.5rem);
  align-items: center;
}

.slider-label-left {
  grid-column: 1;
  grid-row: 1;
  font-size: clamp(0.95rem, 1vw, 1rem);
  font-weight: 700;
  color: #333;
  text-align: left;
  white-space: nowrap;
}

.slider-container {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: clamp(0.7rem, 1vw, 1rem);
}

.slider-track-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
}

.range-slider {
  width: 100%;
  height: 0.375rem;
  border-radius: 0.1875rem;
  background: linear-gradient(
      to right,
      #5c5c5c 0%,
      #5c5c5c calc(var(--slider-value) * 100%),
      #ddd calc(var(--slider-value) * 100%),
      #ddd 100%
  );
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  z-index: 5;
}

/* Chrome, Safari, Edge 브라우저용 */
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: #5c5c5c;
  border: 0.125rem solid #5c5c5c;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

/* Firefox 브라우저용 */
.range-slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: #5c5c5c;
  border: 0.125rem solid #5c5c5c;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

.slider-value-text {
  position: absolute;
  top: -2.125rem;
  transform: translateX(-50%);
  color: #5c5c5c;
  padding: 0.25rem 0.625rem;
  font-size: 0.85rem;
  font-weight: 750;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

.slider-range-min,
.slider-range-max {
  font-size: clamp(0.7rem, 1.1vw, 0.85rem);
  color: #9f9f9f;
  font-weight: 650;
  flex-shrink: 0;
}

.diff-indicator {
  grid-column: 2;
  grid-row: 2;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* ↳ 기호의 높이만 따로 조절 */
.diff-arrow-icon {
  position: relative;
  top: -0.1rem; /* 이 값을 음수(-)로 주면 위로 올라가고, 양수(+)로 주면 아래로 내려갑니다 */
  color: #474747;
}
.diff-same { color: #474747; padding-left: 0.25rem; }
.diff-up { color: #ef0007; padding-left: 0.25rem; }
.diff-down { color: #1F5BFF; padding-left: 0.25rem; }

.diff-base {
  color: #474747;
  font-weight: 600;
  font-size: 0.85rem;
  margin-left: 0.25rem;
}

.custom-conditions-section {
  margin-top: clamp(0.7rem, 1vw, 0.9rem);
  margin-bottom: clamp(0.85rem, 1vw, 0.95rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
}

.custom-conditions-title {
  font-size: clamp(1.13rem, 1.33vw, 1.43rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.custom-conditions-subtitle {
  font-size: clamp(0.65rem, 1vw, 0.85rem);
  font-weight: 550;
  color: #999;
  margin: 0;
  font-weight: 500;
  padding-top: clamp(-0.45rem, 0.5vw, -0.35rem);
}

.custom-conditions-input {
  width: 100%;
  padding: clamp(0.6rem, 1.2vw, 0.9rem);
  border: 0.0625rem solid #ddd;
  border-radius: clamp(0.25rem, 0.8vw, 0.375rem);
  font-size: clamp(0.7rem, 1.15vw, 0.85rem);
  font-family: inherit;
  font-weight: 450;
  color: #333;
  resize: vertical;
  transition: all 0.2s ease;
}

.custom-conditions-input:focus {
  outline: none;
  border-color: #168CFD;
  box-shadow: 0 0 0 0.125rem rgba(22, 140, 253, 0.1);
}

.search-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: clamp(0.48rem, 1.18vw, 0.68rem) clamp(0.6rem, 1.5vw, 1.5rem);
  margin: clamp(0.25rem, 0.9vw, 0.1rem) 0;
  border-radius: clamp(0.25rem, 0.8vw, 0.375rem);
  font-family: inherit;
  font-size: clamp(1rem, 1.7vw, 1.05rem);
  font-weight: 450;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: center;
  text-decoration: none;
}

.search-button:hover {
  background-color: #0052cc;
}
</style>