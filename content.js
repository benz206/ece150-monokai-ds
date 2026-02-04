document.querySelectorAll("tr td:first-child").forEach((td, index) => {
  let lessonNumber = parseInt(td.textContent, 10);

  if (!isNaN(lessonNumber)) {
    td.textContent = "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-cb");

    // for lessons
    const checkboxKey = `lsn_${index}`;

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

    const lessonText = document.createTextNode(lessonNumber);

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

const menu = document.createElement("div");
menu.className = "accent-menu";

const label = document.createElement("label");
label.textContent = "Accent";
menu.appendChild(label);

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
    menu.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
  });

  menu.appendChild(btn);
});

document.body.appendChild(menu);
