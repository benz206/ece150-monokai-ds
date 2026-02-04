const lessonKeyPrefix = `lsn_${location.pathname}_`;

document.querySelectorAll("tr td:first-child").forEach((td, index) => {
  const rawLessonNumber = td.textContent.trim();

  if (/^\d+(\.\d+)*$/.test(rawLessonNumber)) {
    td.textContent = "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-cb");

    // for lessons
    const checkboxKey = `${lessonKeyPrefix}${index}`;

    const savedState = localStorage.getItem(checkboxKey);

    if (savedState === "checked") {
      checkbox.checked = true;
    }

    // on every change update
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        localStorage.setItem(checkboxKey, "checked");
      } else {
        localStorage.setItem(checkboxKey, "unchecked");
      }
    });

    const lessonText = document.createTextNode(rawLessonNumber);

    td.appendChild(checkbox);
    td.appendChild(lessonText);
  }
});

const accentOptions = [
  { id: "mauve", color: "#cba6f7" },
  { id: "blue", color: "#89b4fa" },
  { id: "teal", color: "#94e2d5" },
  { id: "green", color: "#a6e3a1" },
  { id: "peach", color: "#fab387" },
  { id: "red", color: "#f38ba8" },
  { id: "pink", color: "#f5c2e7" },
  { id: "lavender", color: "#b4befe" }
];

const savedAccent = localStorage.getItem("accent_color");
if (savedAccent) {
  document.documentElement.style.setProperty("--accent", savedAccent);
}

const fab = document.createElement("div");
fab.className = "accent-fab";

const toggle = document.createElement("button");
toggle.className = "accent-toggle";
toggle.type = "button";
toggle.setAttribute("aria-label", "Accent menu");
fab.appendChild(toggle);

const panel = document.createElement("div");
panel.className = "accent-panel";

const label = document.createElement("label");
label.textContent = "Accent";
panel.appendChild(label);

accentOptions.forEach((option) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", option.id);
  btn.style.setProperty("--accent-color", option.color);
  btn.setAttribute(
    "aria-pressed",
    savedAccent === option.color ? "true" : "false"
  );

  btn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--accent", option.color);
    localStorage.setItem("accent_color", option.color);
    panel.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    fab.classList.remove("open");
  });

  panel.appendChild(btn);
});

fab.appendChild(panel);
document.body.appendChild(fab);

const savedPos = localStorage.getItem("accent_fab_pos");
if (savedPos) {
  const pos = JSON.parse(savedPos);
  fab.style.left = `${pos.x}px`;
  fab.style.top = `${pos.y}px`;
  fab.style.right = "auto";
  fab.style.bottom = "auto";
}

let dragStartX = 0;
let dragStartY = 0;
let startLeft = 0;
let startTop = 0;
let dragging = false;

toggle.addEventListener("pointerdown", (event) => {
  toggle.setPointerCapture(event.pointerId);
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  const rect = fab.getBoundingClientRect();
  startLeft = rect.left;
  startTop = rect.top;
  dragging = false;
});

toggle.addEventListener("pointermove", (event) => {
  if (!toggle.hasPointerCapture(event.pointerId)) {
    return;
  }

  const dx = event.clientX - dragStartX;
  const dy = event.clientY - dragStartY;
  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
    dragging = true;
  }

  if (!dragging) {
    return;
  }

  const maxX = window.innerWidth - fab.offsetWidth - 12;
  const maxY = window.innerHeight - fab.offsetHeight - 12;
  const nextX = Math.min(Math.max(12, startLeft + dx), maxX);
  const nextY = Math.min(Math.max(12, startTop + dy), maxY);

  fab.style.left = `${nextX}px`;
  fab.style.top = `${nextY}px`;
  fab.style.right = "auto";
  fab.style.bottom = "auto";
});

toggle.addEventListener("pointerup", (event) => {
  if (!toggle.hasPointerCapture(event.pointerId)) {
    return;
  }

  toggle.releasePointerCapture(event.pointerId);

  if (!dragging) {
    fab.classList.toggle("open");
    return;
  }

  const rect = fab.getBoundingClientRect();
  const distances = [
    { edge: "left", value: rect.left },
    { edge: "right", value: window.innerWidth - rect.right },
    { edge: "top", value: rect.top },
    { edge: "bottom", value: window.innerHeight - rect.bottom }
  ];
  distances.sort((a, b) => a.value - b.value);

  const snap = distances[0].edge;
  const padding = 12;
  let x = rect.left;
  let y = rect.top;

  if (snap === "left") {
    x = padding;
  } else if (snap === "right") {
    x = window.innerWidth - rect.width - padding;
  } else if (snap === "top") {
    y = padding;
  } else {
    y = window.innerHeight - rect.height - padding;
  }

  fab.style.left = `${x}px`;
  fab.style.top = `${y}px`;
  fab.style.right = "auto";
  fab.style.bottom = "auto";

  localStorage.setItem("accent_fab_pos", JSON.stringify({ x, y }));
  fab.classList.remove("open");
});
