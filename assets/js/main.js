(function () {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-ba-slider]").forEach((root) => {
    const imgs = JSON.parse(root.getAttribute("data-images") || "[]");
    if (!imgs.length) return;
    let i = 0;
    const img = root.querySelector("img");
    const hint = root.querySelector(".hint");
    const labels = ["Öncesi", "Adım", "Sonrası"];
    function render() {
      img.src = imgs[i];
      if (hint) {
        const label = i === 0 ? labels[0] : i === imgs.length - 1 ? labels[2] : labels[1];
        hint.textContent = label + " · kaydır";
      }
    }
    let startX = 0;
    root.addEventListener(
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    root.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) < 40) return;
        i = dx < 0 ? Math.min(imgs.length - 1, i + 1) : Math.max(0, i - 1);
        render();
      },
      { passive: true }
    );
    root.addEventListener("click", () => {
      i = (i + 1) % imgs.length;
      render();
    });
    render();
  });
})();
