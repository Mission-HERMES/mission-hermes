async function register(username, password) {
    const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}
async function login(username, password) {
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}
async function getProfile(username) {
    const res = await fetch(`http://127.0.0.1:8000/auth/profile/${username}`);
    return res.json();
}
async function createProject(title, description, image, author) {
    const res = await fetch("http://127.0.0.1:8000/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image, author })
    });
    return res.json();
}
async function getAllProjects() {
    const res = await fetch("http://127.0.0.1:8000/projects/");
    return res.json();
}
async function sendMessage(sender, receiver, content) {
    const res = await fetch("http://127.0.0.1:8000/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, receiver, content })
    });
    return res.json();
}
async function getConversation(user1, user2) {
    const res = await fetch(`http://127.0.0.1:8000/messages/conversation/${user1}/${user2}`);
    return res.json();
}
async function getEnergy(username) {
    const res = await fetch(`http://127.0.0.1:8000/energy/${username}`);
    return res.json();
}
async function changeEnergy(username, delta) {
    const res = await fetch("http://127.0.0.1:8000/energy/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, delta })
    });
    return res.json();
}
async function createNotification(username, type, message) {
    const res = await fetch("http://127.0.0.1:8000/notifications/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, type, message })
    });
    return res.json();
}
async function getNotifications(username) {
    const res = await fetch(`http://127.0.0.1:8000/notifications/${username}`);
    return res.json();
}
async function addComment(project_id, author, content) {
    const res = await fetch("http://127.0.0.1:8000/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id, author, content })
    });
    return res.json();
}
async function getComments(project_id) {
    const res = await fetch(`http://127.0.0.1:8000/comments/${project_id}`);
    return res.json();
}
const res = await fetch(...);
if (!res.ok) {
    throw new Error("Erreur API");
}
