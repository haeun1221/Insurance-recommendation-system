<template>
  <div class="search-view">
    <div class="content-wrapper">
      <!-- 필터 섹션 -->
      <div class="section-header">
        <span class="breadcrumb">보험 둘러보기</span>
        <h2 class="section-title">필요한 정보를 입력하고<br>관련 보험을 둘러볼 수 있어요</h2>
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

        <!-- 필터 그룹 3: 생년월일 직접 입력 (년, 월, 일 분리) -->
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

      <!-- 세부 보장 선호도 섹션 -->
      <div class="payout-section" v-if="showPayoutSection">
        <h3 class="payout-title">목표 지급률</h3>

        <!-- 지급률 슬라이더 -->
        <div class="payout-group">
          <div class="payout-slider-container">
            <div class="slider-container">
              <span class="slider-value-left">0%</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.payoutType / 100) }">
                <input type="range" v-model.number="filters.payoutType" min="0" max="100" class="slider" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.payoutType, 0, 100, 18) }">{{ filters.payoutType }}%</div>
              </div>
              <span class="slider-value-right">100%</span>
            </div>
          </div>
        </div>

        <!-- 다중 슬라이더 그룹 -->
        <div class="multi-slider-header">
          <h4 class="multi-slider-title">세부 보장 중요도</h4>
          <p class="multi-slider-subtitle">총 10점을 5개 카테고리에 배분하세요 (최대 5점, 0.5점 단위)</p>
        </div>

        <div class="multi-slider-group">
          <div class="slider-row">
            <span class="slider-label-left">암</span>
            <div class="slider-container">
              <span class="slider-range-min">0</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.diagnosis / 5) }">
                <input type="range" :value="filters.diagnosis" min="0" max="5" step="0.5" class="range-slider" @input="updateSlider('diagnosis', $event)" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.diagnosis, 0, 5, 16) }">{{ filters.diagnosis }}</div>
              </div>
              <span class="slider-range-max">5</span>
            </div>
          </div>

          <div class="slider-row">
            <span class="slider-label-left">뇌 질환</span>
            <div class="slider-container">
              <span class="slider-range-min">0</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.treatment / 5) }">
                <input type="range" :value="filters.treatment" min="0" max="5" step="0.5" class="range-slider" @input="updateSlider('treatment', $event)" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.treatment, 0, 5, 16) }">{{ filters.treatment }}</div>
              </div>
              <span class="slider-range-max">5</span>
            </div>
          </div>

          <div class="slider-row">
            <span class="slider-label-left">심장 질환</span>
            <div class="slider-container">
              <span class="slider-range-min">0</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.surgery / 5) }">
                <input type="range" :value="filters.surgery" min="0" max="5" step="0.5" class="range-slider" @input="updateSlider('surgery', $event)" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.surgery, 0, 5, 16) }">{{ filters.surgery }}</div>
              </div>
              <span class="slider-range-max">5</span>
            </div>
          </div>

          <div class="slider-row">
            <span class="slider-label-left">상해</span>
            <div class="slider-container">
              <span class="slider-range-min">0</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.hospitalization / 5) }">
                <input type="range" :value="filters.hospitalization" min="0" max="5" step="0.5" class="range-slider" @input="updateSlider('hospitalization', $event)" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.hospitalization, 0, 5, 16) }">{{ filters.hospitalization }}</div>
              </div>
              <span class="slider-range-max">5</span>
            </div>
          </div>

          <div class="slider-row">
            <span class="slider-label-left">입원비 / 수술비</span>
            <div class="slider-container">
              <span class="slider-range-min">0</span>
              <div class="slider-track-wrapper" :style="{ '--slider-value': (filters.injury / 5) }">
                <input type="range" :value="filters.injury" min="0" max="5" step="0.5" class="range-slider" @input="updateSlider('injury', $event)" />
                <div class="slider-value-text" :style="{ left: getSliderValueLeft(filters.injury, 0, 5, 16) }">{{ filters.injury }}</div>
              </div>
              <span class="slider-range-max">5</span>
            </div>
          </div>
        </div>

        <!-- 개인 맞춤 조건 -->
        <div class="custom-conditions-section">
          <h4 class="custom-conditions-title">개인 맞춤 조건</h4>
          <p class="custom-conditions-subtitle">추가 기저질환 또는 피하고 싶은 약관 입력</p>
          <textarea
              v-model="filters.customConditions"
              class="custom-conditions-input"
              placeholder="예: 이륜차 운전중, 전이암 제외 약관 기피, 감액기간 최소화 희망 등"
              rows="3"
          ></textarea>
        </div>

        <!-- 검색 버튼 -->
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
        insuranceAge: 0, // 백엔드에 넘겨줄 보험 나이
        payoutType: 25,
        diagnosis: 2,
        treatment: 2,
        surgery: 2,
        hospitalization: 2,
        injury: 2,
        customConditions: '',
      },
      showPayoutSection: false,
    };
  },
  methods: {
    handleQuickSearch() {
      // 1. 년, 월, 일 모두 입력되었는지 확인
      if (!this.filters.birthYear || !this.filters.birthMonth || !this.filters.birthDay) {
        alert('생년월일을 모두 입력해주세요.');
        return;
      }

      // 2. 입력된 값들이 유효한 숫자인지 간단히 검증
      if (this.filters.birthMonth < 1 || this.filters.birthMonth > 12 || this.filters.birthDay < 1 || this.filters.birthDay > 31) {
        alert('올바른 생년월일을 입력해주세요.');
        return;
      }

      // 3. YYYY-MM-DD 형태의 문자열로 조립 (월, 일이 1자리일 경우 앞에 '0'을 붙임)
      const monthStr = String(this.filters.birthMonth).padStart(2, '0');
      const dayStr = String(this.filters.birthDay).padStart(2, '0');
      const birthDateString = `${this.filters.birthYear}-${monthStr}-${dayStr}`;

      // 4. 보험 나이 연산 함수에 전달
      this.filters.insuranceAge = this.calculateInsuranceAge(birthDateString);

      console.log('조립된 생년월일:', birthDateString);
      console.log('계산된 보험 나이(상령일 기준):', this.filters.insuranceAge);

      this.showPayoutSection = true;
      this.$nextTick(() => {
        const payoutSection = document.querySelector('.payout-section');
        if (payoutSection) {
          payoutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    // 보험 나이 계산 로직 (변경 없음)
    calculateInsuranceAge(birthDateString) {
      const today = new Date();
      const birth = new Date(birthDateString);

      let ageYears = today.getFullYear() - birth.getFullYear();
      let ageMonths = today.getMonth() - birth.getMonth();
      let ageDays = today.getDate() - birth.getDate();

      if (ageDays < 0) {
        ageMonths -= 1;
      }

      if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }

      if (ageMonths >= 6) {
        return ageYears + 1;
      }

      return ageYears;
    },

    getSliderValueLeft(value, min = 1, max = 10, thumbWidth = 16) {
      const p = ((value - min) / (max - min)) * 100;
      const h = thumbWidth / 2;
      return `calc(${p}% + ${h - p * (thumbWidth / 100)}px)`;
    },

    updateSlider(key, event) {
      const newValue = Number(event.target.value);
      const multiSliderKeys = ['diagnosis', 'treatment', 'surgery', 'hospitalization', 'injury'];

      const otherTotal = multiSliderKeys.reduce((sum, k) => {
        return k === key ? sum : sum + this.filters[k];
      }, 0);

      const maxAllowed = Math.min(5, 10 - otherTotal);

      if (newValue > maxAllowed) {
        this.filters[key] = maxAllowed;
        event.target.value = maxAllowed;
      } else {
        this.filters[key] = newValue;
      }
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
}

.filter-card {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(1.3rem, 2.5vw, 2.5rem) clamp(2.5rem, 5vw, 5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  grid-template-columns: clamp(60px, 15vw, 100px) 1fr;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  align-items: center;
}

/* 라벨과 입력 폼을 가로 중앙에 나란히 정렬 */
.filter-row {
  display: grid;
  grid-template-columns: clamp(60px, 15vw, 100px) 1fr;
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
  width: clamp(14px, 1.5vw, 16px);
  height: clamp(14px, 1.5vw, 16px);
  cursor: pointer;
  accent-color: #0066ff;
}

.radio-text {
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  font-weight: 550;
  color: #555;
}

/* === 날짜(생년월일) 다중 입력칸 CSS === */
.date-input-group {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1.5rem); /* 년, 월, 일 사이의 간격 */
}

.date-input-wrapper {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 0.5vw, 0.5rem); /* 인풋 박스와 텍스트('년', '월') 사이 간격 */
}

.date-input {
  padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.4rem, 0.8vw, 0.8rem);
  border: 1px solid #ddd;
  border-radius: clamp(4px, 0.8vw, 6px);
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  font-family: inherit;
  color: #333;
  text-align: center;
  transition: all 0.2s ease;
}

/* 각 인풋 박스의 너비 세부 조정 */
.year-input {
  width: clamp(70px, 9vw, 90px);
}

.month-input, .day-input {
  width: clamp(50px, 6vw, 70px);
}

.date-input:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

/* 크롬, 사파리 등에서 숫자 입력칸 옆에 생기는 화살표 숨기기 */
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
/* ======================== */

.slider-container {
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

.slider, .range-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
      to right,
      #0066ff 0%,
      #0066ff calc(var(--slider-value) * 100%),
      #ddd calc(var(--slider-value) * 100%),
      #ddd 100%
  );
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  z-index: 5;
}

.slider::-webkit-slider-thumb,
.slider::-moz-range-thumb,
.range-slider::-webkit-slider-thumb,
.range-slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #0066ff;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-value-left,
.slider-value-right {
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  color: #666;
  min-width: clamp(30px, 3vw, 40px);
  text-align: center;
  white-space: nowrap;
}

.slider-value-text {
  position: absolute;
  top: -34px;
  transform: translateX(-50%);
  color: #0066ff;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

.payout-section {
  width: 100%;
  min-width: 0;
  background-color: white;
  border-radius: clamp(6px, 1vw, 12px);
  padding: clamp(1.3rem, 2.5vw, 2.5rem) clamp(2.5rem, 5vw, 5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
}

.payout-title {
  text-align: center;
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-size: clamp(1.1rem, 2.2vw, 1.3rem);
  font-weight: 700;
  color: #333;
  margin: 0;
  padding-top: clamp(0.2rem, 0.4vw, 0.45rem);
  padding-bottom: clamp(1.2rem, 2.4vw, 1.4rem);
}

.payout-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vw, 0.75rem);
}

.payout-slider-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  align-items: center;
}

.slider-range-min,
.slider-range-max {
  font-size: clamp(0.7rem, 1.1vw, 0.85rem);
  color: #999;
  font-weight: 600;
  flex-shrink: 0;
}

.custom-conditions-section {
  margin-top: clamp(1rem, 1.2vw, 1.1rem);
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
}

.custom-conditions-input {
  width: 100%;
  padding: clamp(0.6rem, 1.2vw, 0.9rem);
  border: 1px solid #ddd;
  border-radius: clamp(4px, 0.8vw, 6px);
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
  font-weight: 450;
  color: #333;
  resize: vertical;
  transition: all 0.2s ease;
}

.custom-conditions-input:focus {
  outline: none;
  border-color: #168CFD;
  box-shadow: 0 0 0 2px rgba(22, 140, 253, 0.1);
}

.multi-slider-header {
  margin-top: clamp(1rem, 1.2vw, 1.1rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.3rem, 0.6vw, 0.5rem);
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
}

.multi-slider-title {
  font-size: clamp(1.07rem, 2.17vw, 1.27rem);
  font-weight: 600;
  color: #333;
  margin: 0;
}

.multi-slider-subtitle {
  font-size: clamp(0.7rem, 1.1vw, 0.85rem);
  color: #999;
  margin-top: clamp(0.07rem, 0.4vw, 0.15rem);
  font-weight: 500;
}

.multi-slider-group {
  background-color: white;
  margin-top: clamp(-1.4rem, -1.5vw, -0.85rem);
  padding: clamp(1.25rem, 1.95vw, 2.05rem) clamp(1.65rem, 2.35vw, 2.05rem);
  padding-top: clamp(1.85rem, 2.45vw, 2.65rem);
  border: 1px solid #eee;
  border-radius: clamp(4px, 0.8vw, 6px);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1.3rem, 1.7vw, 2.2rem);
}

.slider-row {
  width: 100%;
  display: grid;
  grid-template-columns: clamp(60px, 15vw, 100px) 1fr;
  align-items: center;
  gap: clamp(2.23rem, 4.43vw, 3.53rem);
}

.slider-label-left {
  font-size: clamp(0.95rem, 1vw, 1rem);
  font-weight: 600;
  color: #333;
  text-align: left;
  white-space: nowrap;
}

.search-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: clamp(0.48rem, 1.18vw, 0.68rem) clamp(0.6rem, 1.5vw, 1.5rem);
  margin: clamp(0.25rem, 0.9vw, 0.1rem) 0;
  border-radius: clamp(4px, 0.8vw, 6px);
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

.search-button:active {
  background-color: #0043a3;
}
</style>