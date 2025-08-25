// Inisialisasi Supabase
const SUPABASE_URL = "https://xkgituotnpcaxfmypqyb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ2l0dW90bnBjYXhmbXlwcXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTIwOTYsImV4cCI6MjA3MTY4ODA5Nn0.iW-MJ8q30LPwxXPkclZT0eNH9yntdbsSEmzKTkpGrZo";
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

async function loadProfile() {
  const { data, error } = await supabase
    .from('profiles')  // pastikan table di Supabase namanya 'profiles'
    .select('*')
    .limit(1)
    .single(); // ambil 1 profil saja

  if (error) {
    console.error('Error fetching profile:', error);
    return;
  }

  // Update banner
  document.getElementById('banner').src = data.banner_url || 'assets/img/default-banner.jpg';

  // Update avatar
  document.getElementById('avatar').src = data.avatar_url || 'assets/img/default-avatar.jpg';

  // Update name
  document.getElementById('name').textContent = data.name || 'No Name';

  // Tampilkan verified jika ada
  if (data.verified) {
    document.getElementById('verified').style.display = 'inline';
  }

  // Social icons
  const socialContainer = document.getElementById('social-icons');
  socialContainer.innerHTML = ''; 
  if (data.social) {
    for (const [platform, url] of Object.entries(data.social)) {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.textContent = platform; // bisa diganti icon kalau mau
      socialContainer.appendChild(a);
    }
  }

  // Bio
  document.getElementById('bio').textContent = data.bio || '';
}

// Load profile saat halaman dibuka
window.addEventListener('DOMContentLoaded', loadProfile);
