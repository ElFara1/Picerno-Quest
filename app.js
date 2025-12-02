function normalizeAnswer(s) {
  return (
    (s ?? "")
      .trim()
      .toLowerCase()
      // togli accenti (es. "città" -> "citta")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // collassa spazi multipli
      .replace(/\s+/g, " ")
  );
}

function initRiddlePage() {
  const cfgEl = document.getElementById("riddle-config");
  if (!cfgEl) return;

  const cfg = JSON.parse(cfgEl.textContent);

  const titleEl = document.getElementById("riddle-title");
  const textEl = document.getElementById("riddle-text");
  const inputEl = document.getElementById("answer");
  const btnEl = document.getElementById("check");
  const msgEl = document.getElementById("msg");
  const nextWrap = document.getElementById("next");
  const mapLink = document.getElementById("maplink");

  titleEl.textContent = cfg.title;
  textEl.textContent = cfg.text;
  mapLink.href = cfg.nextMapUrl;

  const accepted = (cfg.acceptedAnswers || []).map(normalizeAnswer);

  function showOk() {
    msgEl.className = "msg ok";
    msgEl.textContent = "✅ Esatto! Vai alla prossima posizione.";
    nextWrap.style.display = "flex";
  }

  function showBad() {
    msgEl.className = "msg bad";
    msgEl.textContent = "❌ Risposta errata. Riprova!";
    nextWrap.style.display = "none";
  }

  function check() {
    const user = normalizeAnswer(inputEl.value);
    if (!user) return showBad();

    if (accepted.includes(user)) showOk();
    else showBad();
  }

  btnEl.addEventListener("click", check);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
  });
}

document.addEventListener("DOMContentLoaded", initRiddlePage);
