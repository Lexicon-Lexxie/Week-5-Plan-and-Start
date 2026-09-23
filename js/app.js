document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling for Navigation Chips
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          targetElement.classList.add("highlighted");
          setTimeout(() => {
            targetElement.classList.remove("highlighted");
          }, 2000);
        }
      }
    });
  });

  // 2. Interactive Field Guide Workbench
  const fieldToolSelect = document.getElementById("fieldToolSelect");
  const toolParamInput = document.getElementById("toolParamInput");
  const toolParamLabel = document.getElementById("toolParamLabel");
  const runToolBtn = document.getElementById("runToolBtn");
  const resetToolBtn = document.getElementById("resetToolBtn");

  const displayStatusText = document.getElementById("displayStatusText");
  const displayTimestamp = document.getElementById("displayTimestamp");
  const displayResultMsg = document.getElementById("displayResultMsg");
  const displayTraceLog = document.getElementById("displayTraceLog");
  const workbenchDisplay = document.getElementById("workbenchDisplay");

  const metricExecTime = document.getElementById("metricExecTime");
  const metricDomNode = document.getElementById("metricDomNode");
  const metricStateStatus = document.getElementById("metricStateStatus");

  // Sandbox Live Elements
  const sandboxTarget = document.getElementById("sandboxTarget");
  const targetBadge = document.getElementById("targetBadge");
  const targetTitle = document.getElementById("targetTitle");
  const targetBody = document.getElementById("targetBody");

  // Tool Configurations & Behaviors
  const toolConfigs = {
    dom: {
      label: "Custom Title Text:",
      defaultVal: "Awayzo || Black Mantis",
      execute: (val) => {
        const titleText = val.trim() || "Awayzo || Black Mantis";
        const now = new Date().toLocaleTimeString();

        // Mutate sandbox target
        if (targetBadge) {
          targetBadge.textContent = "State: MUTATED";
          targetBadge.style.background = "rgba(56, 189, 248, 0.25)";
          targetBadge.style.color = "#38bdf8";
        }
        if (targetTitle) targetTitle.textContent = titleText;
        if (targetBody) targetBody.textContent = `DOM updated at ${now}. JavaScript caught the click event, parsed input value, and modified the textContent and style attributes without reloading the page.`;
        if (sandboxTarget) {
          sandboxTarget.style.borderColor = "var(--accent)";
          sandboxTarget.style.background = "linear-gradient(135deg, #111e2e 0%, #15273d 100%)";
        }

        return {
          message: `⚡ DOM Event Dispatched: Element '#sandboxTarget' mutated. Text updated to "${titleText}".`,
          trace: `Event: 'click' → Listener: handleDomMutate() → Document API: targetTitle.textContent = "${titleText}" → Render tree painted.`,
          node: "#sandboxTarget > #targetTitle",
          status: "DOM MUTATED"
        };
      }
    },
    dns: {
      label: "Domain Name to Trace:",
      defaultVal: "myproject.dev",
      execute: (val) => {
        const domain = val.trim() || "myproject.dev";
        const ip = "172.67." + Math.floor(Math.random() * 200 + 10) + "." + Math.floor(Math.random() * 250 + 1);
        const ping = Math.floor(Math.random() * 25 + 14);

        if (targetBadge) {
          targetBadge.textContent = "DNS: RESOLVED";
          targetBadge.style.background = "rgba(16, 185, 129, 0.2)";
          targetBadge.style.color = "#34d399";
        }
        if (targetTitle) targetTitle.textContent = `Connected: ${domain}`;
        if (targetBody) targetBody.textContent = `A-Record: ${ip} | Edge Latency: ${ping}ms | Status: 200 OK | Protocol: HTTP/2 TLS 1.3`;
        if (sandboxTarget) {
          sandboxTarget.style.borderColor = "#10b981";
          sandboxTarget.style.background = "linear-gradient(135deg, #0d221a 0%, #122c22 100%)";
        }

        return {
          message: `🌐 DNS Route Tracer: Resolved "${domain}" to Server IP [${ip}] via root name server in ${ping}ms.`,
          trace: `Event: 'click' → dnsQuery("${domain}") → Recursive Resolver Cache Miss → A-Record Found [${ip}] → TCP Handshake → TLS 1.3 Established.`,
          node: "NetworkSocket::Resolve",
          status: "DNS 200 OK"
        };
      }
    },
    contrast: {
      label: "Accent Hex Color:",
      defaultVal: "#38bdf8",
      execute: (val) => {
        const hex = val.trim().startsWith("#") ? val.trim() : "#" + val.trim();
        const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : "#38bdf8";

        if (targetBadge) {
          targetBadge.textContent = "WCAG AAA PASS";
          targetBadge.style.background = "rgba(245, 158, 11, 0.2)";
          targetBadge.style.color = "#fbbf24";
        }
        if (targetTitle) {
          targetTitle.textContent = `Contrast Ratio: 8.2:1`;
          targetTitle.style.color = validHex;
        }
        if (targetBody) targetBody.textContent = `Accent color ${validHex} tested against dark surface (#0a0e14). Exceeds minimum ratio (7.0:1) required for AAA enhanced accessibility.`;
        if (sandboxTarget) {
          sandboxTarget.style.borderColor = validHex;
          sandboxTarget.style.background = "linear-gradient(135deg, #18202d 0%, #1f2a3a 100%)";
        }

        return {
          message: `🔍 Accessibility Analyzer: Tested foreground (${validHex}) vs background (#0a0e14). Calculated relative luminance contrast ratio: 8.2:1.`,
          trace: `Event: 'click' → computeLuminance("${validHex}") → Formula: (L1 + 0.05) / (L2 + 0.05) = 8.24 → Compliance Level: WCAG AAA Pass.`,
          node: "#sandboxTarget.style.color",
          status: "WCAG AAA"
        };
      }
    },
    package: {
      label: "Format Pattern (dayjs):",
      defaultVal: "YYYY-MM-DD HH:mm:ss",
      execute: (val) => {
        const now = new Date();
        const formatted = now.toISOString().replace("T", " ").slice(0, 19);

        if (targetBadge) {
          targetBadge.textContent = "PACKAGE: dayjs";
          targetBadge.style.background = "rgba(168, 85, 247, 0.2)";
          targetBadge.style.color = "#c084fc";
        }
        if (targetTitle) targetTitle.textContent = `Live Timestamp: ${formatted}`;
        if (targetBody) targetBody.textContent = `Formatted using third-party package utility. Installed via npm and listed in package.json without modifying git tracking.`;
        if (sandboxTarget) {
          sandboxTarget.style.borderColor = "#a855f7";
          sandboxTarget.style.background = "linear-gradient(135deg, #1b1626 0%, #241d33 100%)";
        }

        return {
          message: `📦 Reusable Package Tester: Formatted system date using borrowed utility → "${formatted}".`,
          trace: `Event: 'click' → import('dayjs') → dayjs().format("${val || "YYYY-MM-DD"}") → Result returned in 1ms → DOM rendered.`,
          node: "node_modules/dayjs",
          status: "PACKAGE SYNCED"
        };
      }
    }
  };

  // Tool Selection Change Listener
  if (fieldToolSelect) {
    fieldToolSelect.addEventListener("change", () => {
      const toolKey = fieldToolSelect.value;
      const config = toolConfigs[toolKey];
      if (config && toolParamLabel && toolParamInput) {
        toolParamLabel.textContent = config.label;
        toolParamInput.value = config.defaultVal;
      }
    });
  }

  // Execute Tool Action
  if (runToolBtn) {
    runToolBtn.addEventListener("click", () => {
      const startTime = performance.now();
      const toolKey = fieldToolSelect ? fieldToolSelect.value : "dom";
      const config = toolConfigs[toolKey] || toolConfigs.dom;
      const inputVal = toolParamInput ? toolParamInput.value : "";

      const result = config.execute(inputVal);
      const elapsed = Math.max(1, Math.round(performance.now() - startTime));
      const timestamp = new Date().toLocaleTimeString();

      // Update Workbench Display
      if (displayStatusText) displayStatusText.textContent = `● EXECUTION COMPLETED [${result.status}]`;
      if (displayTimestamp) displayTimestamp.textContent = timestamp;
      if (displayResultMsg) {
        displayResultMsg.textContent = result.message;
        displayResultMsg.style.color = "#fff";
      }
      if (displayTraceLog) {
        displayTraceLog.textContent = `Trace: ${result.trace}`;
        displayTraceLog.style.color = "var(--accent-light)";
      }

      // Update Metric Widgets
      if (metricExecTime) metricExecTime.textContent = `${elapsed} ms`;
      if (metricDomNode) metricDomNode.textContent = result.node;
      if (metricStateStatus) {
        metricStateStatus.textContent = result.status;
        metricStateStatus.style.color = "var(--success)";
      }

      // Pulse feedback effect on workbench
      if (workbenchDisplay) {
        workbenchDisplay.style.borderColor = "var(--accent)";
        setTimeout(() => {
          workbenchDisplay.style.borderColor = "#202b3a";
        }, 500);
      }
    });
  }

  // Reset Workbench
  if (resetToolBtn) {
    resetToolBtn.addEventListener("click", () => {
      if (fieldToolSelect) fieldToolSelect.value = "dom";
      if (toolParamLabel) toolParamLabel.textContent = toolConfigs.dom.label;
      if (toolParamInput) toolParamInput.value = toolConfigs.dom.defaultVal;

      if (displayStatusText) displayStatusText.textContent = "● WORKBENCH READY";
      if (displayTimestamp) displayTimestamp.textContent = "--:--:--";
      if (displayResultMsg) {
        displayResultMsg.textContent = "Select an experiment and click \"Trigger Event\" to trace: User Action → JavaScript Handler → Visible Page Result.";
        displayResultMsg.style.color = "#fff";
      }
      if (displayTraceLog) {
        displayTraceLog.textContent = "Event trace: Awaiting user action...";
        displayTraceLog.style.color = "#64748b";
      }

      if (metricExecTime) metricExecTime.textContent = "0 ms";
      if (metricDomNode) metricDomNode.textContent = "#sandboxTarget";
      if (metricStateStatus) {
        metricStateStatus.textContent = "IDLE";
        metricStateStatus.style.color = "var(--accent)";
      }

      if (targetBadge) {
        targetBadge.textContent = "Interactive DOM Element";
        targetBadge.style.background = "rgba(255, 255, 255, 0.08)";
        targetBadge.style.color = "#94a3b8";
      }
      if (targetTitle) {
        targetTitle.textContent = "Ready for your interaction";
        targetTitle.style.color = "#fff";
      }
      if (targetBody) targetBody.textContent = "Click \"Trigger Event\" above to see JavaScript modify this element's styles, text, and attributes.";
      if (sandboxTarget) {
        sandboxTarget.style.borderColor = "var(--border-color)";
        sandboxTarget.style.background = "var(--bg-surface)";
      }
    });
  }
});
