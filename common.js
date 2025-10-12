const API_BASE = "https://script.google.com/macros/s/AKfycbxZbE14zh_cRNABaQK48LxJ7WCOd97b0S6vIoXttIVI_bpI1SG2UDpQUNs2KnMIsdtb/exec";

async function apiFetch(payload) {
  // payload is an object with at least `action` property
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    return { success: false, message: "Network / fetch error: " + err.message };
  }
}

function requireRole(role) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || user.role !== role) {
    // Not authorized — redirect to login
    alert("You must login as " + role + " to access this page.");
    window.location.href = "login.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
