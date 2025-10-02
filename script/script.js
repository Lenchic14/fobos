// Фиксация меню при скролле
window.addEventListener("scroll", function () {
  const menu = document.querySelector(".menu");
  const header = document.querySelector(".header_info");
  if (!menu || !header) return;

  const headerHeight = header.offsetHeight;
  if (window.scrollY > headerHeight) {
    menu.classList.add("fixed");
  } else {
    menu.classList.remove("fixed");
  }
});

// Делегирование клика по подменю
document.addEventListener("click", function (event) {
  const item = event.target.closest(".submenu_item");
  if (item && item.hasAttribute("data-url")) {
    window.location.href = item.getAttribute("data-url");
  }
});

// Подгрузка include (header/footer)
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Ошибка загрузки: ${file}`);
      const html = await res.text();
      el.innerHTML = html;

      console.log("Загружен include:", file);

      // Инициализация бургер-меню после подгрузки
      initBurgerMenu(el);

    } catch (err) {
      el.innerHTML = `<div style="color: red;">${err.message}</div>`;
    }
  });

  // На случай, если хедер уже есть в DOM без include
  initBurgerMenu(document);
});

// Функция инициализации бургер-меню
function initBurgerMenu(container) {
  const burger = container.querySelector(".burger");
  const menuList = container.querySelector(".menu_burger_list");
  const menuClose = container.querySelector(".menu_burger_close");

  if (!burger || !menuList) return;

  // Клик по бургеру
  burger.addEventListener("click", () => {
    menuList.classList.toggle("active");
    document.body.classList.toggle("no-scroll", menuList.classList.contains("active"));
  });

  // Клик по кнопке закрытия
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      menuList.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  }

  // Клик вне меню
  document.addEventListener("click", (e) => {
    if (
      menuList.classList.contains("active") &&
      !menuList.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      menuList.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
}





document.querySelectorAll('.cars').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.querySelector('a'); 
    if (link) {
      window.location.href = link.href;
    }
  });
});