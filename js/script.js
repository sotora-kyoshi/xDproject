// -------------------------------
// Inisialisasi Supabase
// -------------------------------
const supabaseUrl = 'https://xkgituotnpcaxfmypqyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ2l0dW90bnBjYXhmbXlwcXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTIwOTYsImV4cCI6MjA3MTY4ODA5Nn0.iW-MJ8q30LPwxXPkclZT0eNH9yntdbsSEmzKTkpGrZo';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -------------------------------
// Fungsi load profile
// -------------------------------
async function loadProfile() {
  try {
    const { data, error } = await supabase
      .from('profiles')  // pastikan table di Supabase namanya 'profiles'
      .select('*')
      .limit(1)
      .single(); // ambil 1 profil saja

    if (error) throw error;

    // -------------------------------
    // Update banner
    // -------------------------------
    const bannerEl = document.getElementById('banner');
    if (bannerEl) bannerEl.src = data.banner_url || 'assets/img/default-banner.jpg';

    // -------------------------------
    // Update avatar
    // -------------------------------
    const avatarEl = document.getElementById('avatar');
    if (avatarEl) avatarEl.src = data.avatar_url || 'assets/img/default-avatar.jpg';

    // -------------------------------
    // Update name
    // -------------------------------
    const nameEl = document.getElementById('name');
    if (nameEl) nameEl.textContent = data.name || 'No Name';

    // -------------------------------
    // Tampilkan verified jika ada
    // -------------------------------
    const verifiedEl = document.getElementById('verified');
    if (verifiedEl) verifiedEl.style.display = data.verified ? 'inline' : 'none';

    // -------------------------------
    // Update social icons
    // -------------------------------
    const socialContainer = document.getElementById('social-icons');
    if (socialContainer) {
      socialContainer.innerHTML = ''; // bersihin dulu
      if (data.social) {
        for (const [platform, url] of Object.entries(data.social)) {
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = platform; // bisa diganti icon kalau mau
          a.style.marginRight = '8px';
          socialContainer.appendChild(a);
        }
      }
    }

    // -------------------------------
    // Update bio
    // -------------------------------
    const bioEl = document.getElementById('bio');
    if (bioEl) bioEl.textContent = data.bio || '';

  } catch (err) {
    console.error('Error fetching profile:', err.message);
    // Tampilkan placeholder/default message
    const nameEl = document.getElementById('name');
    if(nameEl) nameEl.textContent = 'Profile not found';
  }
}

// -------------------------------
// Load profile saat halaman dibuka
// -------------------------------
window.addEventListener('DOMContentLoaded', loadProfile);
