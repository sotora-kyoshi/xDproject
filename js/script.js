// Supabase Project Connection
const SUPABASE_URL = "https://xkgituotnpcaxfmypqyb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ2l0dW90bnBjYXhmbXlwcXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTIwOTYsImV4cCI6MjA3MTY4ODA5Nn0.iW-MJ8q30LPwxXPkclZT0eNH9yntdbsSEmzKTkpGrZo";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadProfile() {
  const errorAlert = document.getElementById("error_alert");
  errorAlert.style.display = "none";

  const { data, error } = await client
    .from("site_profile")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    errorAlert.style.display = "block";
    return;
  }

  document.getElementById("display_name").textContent = data.display_name;
  document.getElementById("bio").textContent = data.bio;

  if (data.avatar_url) {
    document.getElementById("avatar").src = data.avatar_url;
  }

  const linksContainer = document.getElementById("links");
  linksContainer.innerHTML = "";
  data.links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.style.color = "#ffcccb";
    linksContainer.appendChild(a);
    linksContainer.appendChild(document.createElement("br"));
  });
}

document.addEventListener("DOMContentLoaded", loadProfile);
document.getElementById("refresh").addEventListener("click", loadProfile);
