<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- 좌측: 로고 -->
      <div class="navbar-left">
        <router-link to="/" class="logo">Bo:On</router-link>
      </div>

      <!-- 중앙: 메뉴 -->
      <div class="navbar-center">
        <router-link to="/search" class="nav-link">보험 검색</router-link>
        <router-link to="/recent" class="nav-link">최근 조회 결과</router-link>
        <router-link to="/favorites" class="nav-link">즐겨찾기</router-link>
        <router-link to="/mypage" class="nav-link">마이페이지</router-link>
      </div>

      <!-- 우측: 버튼 -->
      <div class="navbar-right">
        <button class="logout-button">로그아웃</button>
        <button class="help-button">?</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: clamp(0.08rem, 0.15vw, 0.08rem);
  background: transparent;
  height: clamp(50px, 8vw, 70px);
  z-index: 100;
  width: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 clamp(0.5rem, 2vw, 2rem);
  gap: clamp(0.5rem, 1vw, 2rem);
  width: 100%;
}

/* 좌측: 로고 */
.navbar-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: clamp(0.5rem, 1vw, 2rem);
}

.logo {
  color: white;
  text-decoration: none;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

/* 중앙: 메뉴 */
.navbar-center {
  display: flex;
  gap: clamp(4.8rem, 7.3vw, 13rem);
  flex-grow: 1;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: clamp(0.45rem, 0.93vw, 1rem);
  font-weight: 450;
  padding: clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 1rem);
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  text-shadow: 0.15vw 0.15vw 0.15vw rgba(0, 0, 0, 0.37);
}

.nav-link:focus-visible {
  outline: none;
}

/* 우측: 버튼 */
.navbar-right {
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  align-items: center;
  flex-shrink: 0;
}

.logout-button{
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: clamp(0.25rem, 0.5vw, 0.35rem) clamp(0.5rem, 1vw, 1rem);
  border-radius: clamp(17px, 1.7vw, 19px);
  font-size: clamp(0.45rem, 0.9vw, 0.85rem);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  text-align: center;
}

.help-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: clamp(0.4rem, 0.55vw, 0.45rem) clamp(0.1rem, 0.15vw, 0.15rem);
  border-radius: clamp(20px, 1.9vw, 21px);
  font-size: clamp(0.45rem, 0.9vw, 0.85rem);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.logout-button:hover,
.help-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: white;
}

.logout-button {
  display: block;
}

.help-button {
  min-width: clamp(30px, 4vw, 40px);
}
</style>