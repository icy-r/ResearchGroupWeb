"use strict";

(() => {
  const content = window.SITE_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${escapeHTML(name)}"/></svg>`;
  // Editable links must remain ordinary local paths or safe external URLs.
  const safeLink = value => {
    if (!value || /^[\s/\\]*\/\//.test(value)) return null;
    try {
      const url = new URL(value, location.href);
      return ["http:", "https:", "file:"].includes(url.protocol) ? escapeHTML(value) : null;
    } catch { return null; }
  };
  const emailLink = email => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email || "") ? `mailto:${encodeURIComponent(email)}` : null;

  $("#component-grid").innerHTML = content.components.map(component => `<article class="component-card">
    <div class="component-top"><span class="component-icon ${escapeHTML(component.color)}">${icon(component.icon)}</span><span class="component-num">/${escapeHTML(component.number)}</span></div>
    <div class="component-category">${escapeHTML(component.category)}</div><h3>${escapeHTML(component.title)}</h3><p>${escapeHTML(component.description)}</p>
    <div class="component-tags">${component.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
    <button type="button" data-component="${escapeHTML(component.id)}" aria-haspopup="dialog" aria-label="Explore ${escapeHTML(component.title)}">Explore component ${icon("up-right")}</button></article>`).join("");

  const componentDialog = $("#component-dialog");
  $$("[data-component]").forEach(button => button.addEventListener("click", () => {
    const component = content.components.find(item => item.id === button.dataset.component);
    const file = safeLink(component.file);
    $("#dialog-content").innerHTML = `<span class="component-icon ${escapeHTML(component.color)}">${icon(component.icon)}</span>
      <div class="eyebrow dialog-eyebrow">COMPONENT ${escapeHTML(component.number)} / ${escapeHTML(component.category)}</div><h2 class="dialog-title" id="dialog-title">${escapeHTML(component.fullTitle)}</h2>
      <p>${escapeHTML(component.detail)}</p><ol>${component.steps.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
      <div class="dialog-owner">Researcher: ${escapeHTML(component.owner)}</div><div class="dialog-tools">${escapeHTML(component.tools)}</div>
      ${file ? `<a class="dialog-proposal" href="${file}" target="_blank" rel="noopener">Read the individual proposal ${icon("up-right")}</a>` : ""}`;
    componentDialog.showModal();
    document.body.classList.add("modal-open");
  }));
  $$("dialog").forEach(dialog => {
    $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });

  $("#research-panels").innerHTML = Object.entries(content.research).map(([key, panel], index) => `<section class="research-panel" id="panel-${key}" role="tabpanel" aria-labelledby="tab-${key}" tabindex="0" ${index ? "hidden" : ""}>
    <div class="eyebrow">${escapeHTML(panel.kicker)}</div><h3>${escapeHTML(panel.title)}</h3><p>${escapeHTML(panel.intro)}</p>
    ${panel.items ? `<div class="research-items">${panel.items.map(item => `<article class="research-item"><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.text)}</p>${safeLink(item.file) ? `<a href="${safeLink(item.file)}" target="_blank" rel="noopener">Read proposal ${icon("up-right")}</a>` : ""}</article>`).join("")}</div>` : ""}
    ${panel.groups ? `<div class="technology-groups">${panel.groups.map(group => `<div class="technology-group"><h4>${escapeHTML(group.title)}</h4><div class="technology-tags">${group.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div></div>`).join("")}</div>` : ""}</section>`).join("");
  const researchTabs = $$("[data-research]");
  const chooseResearch = button => {
    researchTabs.forEach(tab => {
      const selected = tab === button;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $(`#panel-${tab.dataset.research}`).hidden = !selected;
    });
  };
  researchTabs.forEach((button, index) => {
    button.addEventListener("click", () => chooseResearch(button));
    button.addEventListener("keydown", event => {
      let target;
      if (["ArrowDown", "ArrowRight"].includes(event.key)) target = researchTabs[(index + 1) % researchTabs.length];
      if (["ArrowUp", "ArrowLeft"].includes(event.key)) target = researchTabs[(index - 1 + researchTabs.length) % researchTabs.length];
      if (event.key === "Home") target = researchTabs[0];
      if (event.key === "End") target = researchTabs.at(-1);
      if (target) {
        event.preventDefault();
        chooseResearch(target);
        target.focus({ preventScroll: true });
        if (matchMedia("(max-width: 640px)").matches) target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
      }
    });
  });
  const narrowScreen = matchMedia("(max-width: 640px)");
  const setTabOrientation = () => $(".research-tabs").setAttribute("aria-orientation", narrowScreen.matches ? "horizontal" : "vertical");
  setTabOrientation();
  narrowScreen.addEventListener("change", setTabOrientation);

  // Compare ISO calendar dates in Sri Lanka, including both ends of an assessment window.
  const colomboToday = () => {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const part = type => parts.find(value => value.type === type).value;
    return `${part("year")}-${part("month")}-${part("day")}`;
  };
  const deadlineState = (item, today) => {
    if (item.endDate < today) return { key: "earlier", label: "Earlier deadline" };
    if (item.startDate <= today && item.endDate >= today) return { key: "current", label: item.startDate === item.endDate ? "Due today" : "Assessment window open" };
    return { key: "upcoming", label: "Upcoming" };
  };
  $("#milestone-filter").insertAdjacentHTML("beforeend", `<optgroup label="Individual assessments">${content.milestones.map(item => `<option value="${escapeHTML(item.id)}">${escapeHTML(item.title)}</option>`).join("")}</optgroup>`);
  const renderMilestones = () => {
    const selected = $("#milestone-filter").value;
    const today = colomboToday();
    const visible = content.milestones.filter(item => selected === "all" || (selected === "upcoming" && item.endDate >= today) || (selected === "earlier" && item.endDate < today) || item.id === selected);
    let currentGroup = "";
    $("#milestone-list").innerHTML = visible.map(item => {
      const state = deadlineState(item, today);
      const group = currentGroup !== item.group ? `<div class="timeline-month">${escapeHTML(item.group)} <span>2026</span></div>` : "";
      currentGroup = item.group;
      const file = safeLink(item.file);
      return `${group}<article class="milestone ${state.key}"><span class="milestone-marker" aria-hidden="true"></span><div class="milestone-card">
        <div class="milestone-date"><span>${escapeHTML(item.date)}</span><span class="milestone-status">${state.label}</span></div><h3>${escapeHTML(item.title)}</h3>
        <details ${!["all", "upcoming", "earlier"].includes(selected) ? "open" : ""}><summary>Assessment details</summary><p>${escapeHTML(item.description)}</p><div class="milestone-detail-footer"><span>Marks: ${escapeHTML(item.marks ?? "To be confirmed")}</span>${file ? `<a href="${file}" ${item.file.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${escapeHTML(item.linkLabel || "View material")} ↗</a>` : ""}</div></details></div></article>`;
    }).join("") || '<p class="empty-state">No deadlines in this view.</p>';
    $("#timeline-count").textContent = `${visible.length} of ${content.milestones.length} scheduled milestones`;
    const next = content.milestones.filter(item => item.endDate >= today);
    const closest = next[0];
    const relevant = closest ? next.filter(item => item.startDate === closest.startDate) : [];
    $("#next-deadline").innerHTML = closest ? `<span class="next-deadline-label">${closest.startDate <= today ? "ON THE SCHEDULE TODAY" : "NEXT ON THE SCHEDULE"}</span><strong>${escapeHTML(closest.date)}</strong><p>${relevant.map(item => escapeHTML(item.title)).join("<br>")}</p>` : '<span class="next-deadline-label">2026 RESEARCH JOURNEY</span><strong>Schedule complete</strong><p>All scheduled dates have passed. Explore the timeline and project materials.</p>';
  };
  renderMilestones();
  $("#milestone-filter").addEventListener("change", renderMilestones);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) renderMilestones(); });

  let documentFilter = "all";
  const renderDocuments = () => {
    const search = $("#document-search").value.trim().toLocaleLowerCase();
    const documents = content.documents.filter(item => {
      const available = Boolean(safeLink(item.file));
      const matchesFilter = documentFilter === "all" || (documentFilter === "available" ? available : !available);
      return matchesFilter && `${item.title} ${item.subtitle} ${item.author || ""} ${item.category}`.toLocaleLowerCase().includes(search);
    });
    $("#document-count").textContent = `${documents.length} document${documents.length !== 1 ? "s" : ""} · ${documents.filter(item => safeLink(item.file)).length} available`;
    $("#empty-documents").hidden = documents.length !== 0;
    $("#document-grid").innerHTML = documents.map(item => {
      const file = safeLink(item.file);
      return `<article class="document-card ${file ? "" : "pending"}"><div class="document-card-top"><span class="file-icon">${icon("file")}</span><span class="document-category">${escapeHTML(item.category)}</span></div><div class="document-card-body"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.subtitle)}</p>${item.author ? `<div class="document-author">${escapeHTML(item.author)}</div>` : ""}</div><div class="document-card-bottom"><span>${escapeHTML(item.date || "To be added")}</span>${file ? `<a href="${file}" target="_blank" rel="noopener" aria-label="View ${escapeHTML(item.title)} PDF (opens in a new tab)">View PDF ${icon("up-right")}</a>` : '<span class="coming-soon">Coming soon</span>'}</div></article>`;
    }).join("");
  };
  renderDocuments();
  $("#document-search").addEventListener("input", renderDocuments);
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
    documentFilter = button.dataset.filter;
    $$("[data-filter]").forEach(item => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderDocuments();
  }));
  $("#presentation-grid").innerHTML = content.presentations.map((item, index) => {
    const file = safeLink(item.file);
    return `<article class="presentation-card ${file ? "" : "pending"}"><div class="presentation-cover" aria-hidden="true"><small>R26-SE-026 / RESEARCH SERIES ${String(index + 1).padStart(2, "0")}</small><strong>kaduna<span>.lk</span></strong><span class="slide-type">${escapeHTML(item.title)}</span>${item.slides ? `<span class="slide-count">${item.slides} SLIDES</span>` : ""}</div><div class="presentation-info"><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.subtitle)}</p><div class="document-card-bottom"><span>${escapeHTML(item.date || "To be added")}</span>${file ? `<a href="${file}" target="_blank" rel="noopener" aria-label="View ${escapeHTML(item.title)} slides">View slides ${icon("up-right")}</a>` : '<span class="coming-soon">Coming soon</span>'}</div></div></article>`;
  }).join("");

  $("#team-grid").innerHTML = content.team.map(person => `<article class="team-card"><div class="team-photo"><img src="${safeLink(person.photo)}" alt="${escapeHTML(person.name)}" loading="lazy" width="460" height="550"><span>RESEARCHER / ${escapeHTML(person.number)}</span></div><h3>${escapeHTML(person.name)}</h3><div class="team-id">${escapeHTML(person.id)}</div><p>${escapeHTML(person.component)}</p>${emailLink(person.email) ? `<a class="team-contact" href="${emailLink(person.email)}">${escapeHTML(person.email)} ↗</a>` : '<span class="team-contact">Contact details coming soon</span>'}</article>`).join("");

  const menuToggle = $(".menu-toggle");
  const navigation = $("#main-nav");
  const closeNavigation = () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };
  menuToggle.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $$("a", navigation).forEach(link => link.addEventListener("click", closeNavigation));
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) closeNavigation();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      closeNavigation();
      menuToggle.focus();
    }
  });
  matchMedia("(min-width: 961px)").addEventListener("change", closeNavigation);
  const navLinks = $$(".nav-link");
  const navSections = navLinks.map(link => $(link.getAttribute("href")));
  let scrollQueued = false;
  const updateActiveSection = () => {
    let activeId = "home";
    navSections.forEach(section => { if (section.getBoundingClientRect().top <= 160) activeId = section.id; });
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollQueued = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateActiveSection); }
  }, { passive: true });
  updateActiveSection();

  const contactLink = emailLink(content.contactEmail);
  if (contactLink) {
    $("#contact-email-label").innerHTML = `<a href="${contactLink}">${escapeHTML(content.contactEmail)}</a>`;
    $("#contact-email-note").textContent = "For research enquiries and collaboration.";
    $("#contact-action-label").textContent = "Open email draft";
    $("#form-note").textContent = "Opens a draft in your email app. You review and send it yourself. This website does not store your information.";
  }
  if (content.web3formsKey) {
    $("#contact-action-label").textContent = "Send message";
    $("#form-note").textContent = "Your message is emailed directly to the Kaduna.lk research team.";
  }
  $("#contact-form").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const subject = `Kaduna.lk research enquiry: ${values.get("interest")}`;
    const body = `Hello Kaduna.lk research team,\n\n${String(values.get("message")).trim()}\n\nName: ${String(values.get("name")).trim()}\nEmail: ${String(values.get("email")).trim()}\nArea of interest: ${values.get("interest")}\n\nProject: R26-SE-026`;
    if (content.web3formsKey) {
      const button = $("button[type=submit]", form);
      button.disabled = true;
      $("#form-feedback").textContent = "Sending…";
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: content.web3formsKey, subject, from_name: "Kaduna.lk website", name: values.get("name"), email: values.get("email"), replyto: values.get("email"), interest: values.get("interest"), message: values.get("message"), botcheck: values.get("botcheck") ? true : "" })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        form.reset();
        $("#form-feedback").textContent = "Thank you. Your message has been sent to the Kaduna.lk team.";
        return;
      } catch {
        $("#form-feedback").textContent = contactLink ? "The message could not be sent. Opening an email draft instead." : "The message could not be sent. Please try again later.";
        if (!contactLink) return;
      } finally {
        button.disabled = false;
      }
    }
    if (contactLink) {
      location.href = `${contactLink}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $("#form-feedback").textContent = "An email draft has been requested in your email app. Review it before sending.";
      return;
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      $("#form-feedback").textContent = "Enquiry copied. You can paste it into an email or message when the team’s contact details are available. Nothing has been sent.";
    } catch {
      $("#enquiry-text").value = `Subject: ${subject}\n\n${body}`;
      $("#enquiry-dialog").showModal();
      document.body.classList.add("modal-open");
      $("#enquiry-text").focus();
      $("#enquiry-text").select();
      $("#form-feedback").textContent = "Your enquiry is ready to copy. Nothing has been sent.";
    }
  });
})();
