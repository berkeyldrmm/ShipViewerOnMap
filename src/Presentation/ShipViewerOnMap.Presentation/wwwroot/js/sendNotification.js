function sendNotification(type, text) {
    let notificationBox = document.querySelector(".notification-box");
    const alerts = {
        info: {
            icon: `<svg class="me-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
            color: "primary"
        },
        error: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>`,
            color: "danger"
        },
        warning: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>`,
            color: "warning"
        },
        success: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
            color: "success"
        }
    };
    let component = document.createElement("div");
    component.className = `position-relative d-flex align-items-center text-white fs-6 fw-bold px-4 py-3 rounded mb-1 bg-${alerts[type].color}`;
    component.innerHTML = `${alerts[type].icon}<div class="d-flex justify-content-center align-items-center">${text}</div>`;
    notificationBox.appendChild(component);
    setTimeout(() => {
        component.classList.remove("opacity-0");
        component.classList.add("opacity-1");
    }, 1);
    setTimeout(() => {
        component.classList.remove("opacity-1");
        component.classList.add("opacity-0");
        component.style.margin = 0;
        component.style.padding = 0;
    }, 4000);
    setTimeout(() => {
        component.style.setProperty("height", "0", "important");
    }, 4100);
    setTimeout(() => {
        notificationBox.removeChild(component);
    }, 4700);
}