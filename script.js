// Elementos del DOM
const container = document.getElementById('image-container');
const spacer = document.getElementById('spacer');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const profileButton = document.getElementById('profile-button');
const homeButton = document.getElementById('home-button');
const gamesButton = document.getElementById('games-button');
const searchTopButton = document.getElementById('search-top-button');
const searchContainer = document.getElementById('search-container');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');
const searchBackButton = document.getElementById('search-back-button');
const likesContainer = document.getElementById('likes-container');
const likedImagesContainer = document.getElementById('liked-images');
const relatedImagesContainer = document.getElementById('relatedImagesContainer');
const gamesContainer = document.getElementById('games-container');
const gamesGrid = document.getElementById('games-grid');
const gameScreen = document.getElementById('game-screen');
const backButton = document.getElementById('back-button');
const gameIframeContainer = document.getElementById('game-iframe-container');
const searchCategories = document.querySelectorAll('.search-category');
const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
const darkModeToggle = document.getElementById('darkModeToggle');
const clearCache = document.getElementById('clearCache');

// Variables de estado
let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
let currentGame = null;
let isPreviewVisible = false;
let isContentLoaded = false;
let currentModalImageUrl = ''; // Variable para la imagen actual en el modal
let currentImageId = null; // Variable para el ID de la imagen actual

// Modo oscuro
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
if (darkModeEnabled) {
  document.body.classList.add('dark-mode');
}

// Datos de imágenes y juegos
const images = [
  { url: 'https://i.pinimg.com/736x/ac/5c/02/ac5c02400375cfbb49c2951890e07c6b.jpg', keywords: [], id: 'img41' },
  { url: 'https://i.pinimg.com/736x/86/6a/16/866a16233beaf09d361f3fccee558c29.jpg', keywords: [], id: 'img42' },
  { url: 'https://i.pinimg.com/736x/9f/d5/c1/9fd5c1b1f3e50aeb930ebc644744d91a.jpg', keywords: ['pájaro', 'animal', 'love'], id: 'img10' },
];

const games = [
  { 
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe', 
    icon: 'https://i.pinimg.com/736x/eb/59/27/eb5927af40fb5834da139984c9cd50ae.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/4f91e253d743a18b4f40307e393d65d8/raw/3e176cdcbf0b0c0a31dfd0445fdec14b6b0b19e3/Index.html'
  },
  { 
    id: 'anime',
    name: 'ADIVINA EL ANIME', 
    icon: 'https://i.pinimg.com/736x/57/39/02/5739029d9b062ab60b1728e3d257b69e.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/b01516ad3824cb30c72dd98a9450c15c/raw/73196f57b23713d3c1747909c8417d21d71960ea/index.html'
  },
  { 
    id: 'memory',
    name: 'CARTAS', 
    icon: 'https://i.pinimg.com/736x/9c/2c/01/9c2c010114adf18e23d7006b4aed3dcf.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/890610f9c2dd2ad3bff561001834dadf/raw/bcafa79bb1c9449f02b7187bae0a9eadc785f305/Mi%2520c%25C3%25B3digo.html'
  },
  { 
    id: 'memorama',
    name: 'Memorama', 
    icon: 'https://i.pinimg.com/736x/cd/4d/70/cd4d70b4a3f3e692691408b7cc2a8c4a.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/77ba9de790f7639fe66ac3153e3ae214/raw/114fc1fe25e6f9c8f0dfaadd731fa131d11048cd/Memorama%2520index.html'
  },
  { 
    id: 'ping-pong',
    name: 'ping-pong', 
    icon: 'https://i.pinimg.com/736x/08/2e/56/082e56a5316bb69e1da04f2278b42806.jpg',
    url: ' https://gist.githubusercontent.com/yeang34gsd/1d337fe0ba116127eba90ed304fa2a68/raw/a0b46330bab1fa99d56128dbd37854f0c8292ba2/Ping-pong%2520index.html'
  },
  { 
    id: 'snake',
    name: 'snake', 
    icon: 'https://i.pinimg.com/736x/4d/25/fe/4d25fee11314496780182c9f9a438bf8.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/2bfeba5f56a7610eeab72dfcaeb2630a/raw/799762067ba0b8a3ea97a071f43ab7b7ad98a707/%25F0%259F%2590%258D%2520index.html'
  },
  { 
    id: 'Neon Evasion',
    name: 'Neon Evasion', 
    icon: 'https://i.pinimg.com/736x/af/72/ec/af72ecb4f337cebe20c29e7dcfa17e29.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/b635008040954b286ab54b3bc7cc1e67/raw/53c22ad63f6908aeb2ecbb1affe79d09090f3e3b/Esquivar%2520index.html'
  },
  { 
    id: 'Neon Evasion',
    name: 'PUZZLES', 
    icon: 'https://i.pinimg.com/736x/73/6f/7c/736f7cf65c583cfe97cd21974c236714.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/3dfdee6e5fb9176199e4a9490dab836d/raw/3511e50e64504630bec6e8c82e518078c6cdb166/Ball%2520Sort%2520Puzzle%2520index.html'
  },
  { 
    id: '🌸 Jardín Flotante ',
    name: '🌸 Jardín Flotante', 
    icon: 'https://i.pinimg.com/736x/ba/5f/90/ba5f90d4376a3705218940aeab6671aa.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/ceacdbc206e7e7bdaf1fa67a9f4caffd/raw/91025f1b162c9ac3b3626d8a5b3bebf3340d3a31/%25F0%259F%258C%25B8%2520Jard%25C3%25ADn%2520Flotante%2520index.html'
  }
];

// Funciones principales
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function toggleLike(event, imageId, imageUrl) {
  event.stopPropagation();
  const imageContainer = event.target.closest('.image-container');
  
  const isLiked = likedImages.some(item => item.id === imageId);
  if (isLiked) {
    likedImages = likedImages.filter(item => item.id !== imageId);
    imageContainer.classList.remove('liked');
  } else {
    likedImages.push({ id: imageId, url: imageUrl });
    imageContainer.classList.add('liked');
  }
  localStorage.setItem('likedImages', JSON.stringify(likedImages));
  updateLikedImagesDisplay();
}

function generateImage(imageData, targetContainer = container) {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  const img = document.createElement('img');
  img.src = imageData.url;
  img.alt = "Imagen";
  img.classList.add('image');
  img.addEventListener('click', () => openModal(imageData));
  imageContainer.appendChild(img);
  const likeButton = document.createElement('div');
  likeButton.classList.add('like-icon');
  likeButton.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    `;
  likeButton.addEventListener('click', (event) => toggleLike(event, imageData.id, imageData.url));
  imageContainer.appendChild(likeButton);
  if (likedImages.some(item => item.id === imageData.id)) {
    imageContainer.classList.add('liked');
  }
  targetContainer.appendChild(imageContainer);
}

function generateGame(gameData) {
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  gameContainer.id = gameData.id;
  const img = document.createElement('img');
  img.src = gameData.icon;
  img.alt = gameData.name;
  img.classList.add('game-image');
  gameContainer.appendChild(img);
  const gameName = document.createElement('div');
  gameName.textContent = gameData.name;
  gameName.classList.add('game-title');
  gameContainer.appendChild(gameName);
  gameContainer.addEventListener('click', () => launchGame(gameData));
  return gameContainer;
}

function showLoadingState() {
  gameIframeContainer.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-family: Arial, sans-serif;
      color: #555;
    ">
      <div class="spinner" style="
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #4285F4;
        animation: spin 1s linear infinite;
        margin-right: 10px;
      "></div>
      <div>Cargando juego...</div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
}

function loadGameFromURL(url) {
  showLoadingState();
  fetch(url)
    .then(response => response.text())
    .then(data => {
      gameIframeContainer.innerHTML = `
        <iframe 
          srcdoc="${data.replace(/"/g, '&quot;')}" 
          style="width:100%; height:100%; border:none;"
        ></iframe>
      `;
    })
    .catch(error => {
      console.error('Error al cargar el juego:', error);
      gameIframeContainer.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-family: Arial, sans-serif;
          color: #EA4335;
        ">
          <div>Error al cargar el juego. Intenta nuevamente.</div>
        </div>
      `;
    });
}

function launchGame(gameData) {
  currentGame = gameData;
  
  // Ocultar otros contenedores
  container.style.display = 'none';
  spacer.style.display = 'none';
  likesContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  gamesContainer.style.display = 'none';
  gameScreen.style.display = 'block';
  document.body.classList.add('game-active');
  
  // Cargar el juego desde la URL
  loadGameFromURL(gameData.url);
}

function exitGame() {
  gameScreen.style.display = 'none';
  document.body.classList.remove('game-active');
  
  if (gamesContainer.style.display === 'none') {
    showGames();
  } else {
    showGallery();
  }
}

function updateLikedImagesDisplay() {
  likedImagesContainer.innerHTML = '';
  likedImages.forEach(likedImage => {
    const imageData = images.find(img => img.id === likedImage.id);
    if (imageData) {
      generateImage(imageData, likedImagesContainer);
    }
  });
}

function loadGames() {
  gamesGrid.innerHTML = '';
  games.forEach(game => {
    gamesGrid.appendChild(generateGame(game));
  });
}

// Funciones de navegación
function showGallery() {
  container.style.display = 'grid';
  spacer.style.display = 'block';
  likesContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  gamesContainer.style.display = 'none';
  gameScreen.style.display = 'none';
  settingsMenu.classList.remove('show');
  document.body.classList.remove('search-active');
  document.body.classList.remove('games-active');
  document.body.classList.remove('game-active');
  
  homeButton.classList.add('active');
  profileButton.classList.remove('active');
  gamesButton.classList.remove('active');
}

function showLikes() {
  container.style.display = 'none';
  spacer.style.display = 'none';
  likesContainer.style.display = 'block';
  searchContainer.style.display = 'none';
  gamesContainer.style.display = 'none';
  gameScreen.style.display = 'none';
  settingsMenu.classList.remove('show');
  document.body.classList.remove('search-active');
  document.body.classList.remove('games-active');
  document.body.classList.remove('game-active');
  
  profileButton.classList.add('active');
  homeButton.classList.remove('active');
  gamesButton.classList.remove('active');
}

function showGames() {
  container.style.display = 'none';
  spacer.style.display = 'none';
  likesContainer.style.display = 'none';
  searchContainer.style.display = 'none';
  gamesContainer.style.display = 'block';
  gameScreen.style.display = 'none';
  settingsMenu.classList.remove('show');
  document.body.classList.remove('search-active');
  document.body.classList.add('games-active');
  document.body.classList.remove('game-active');
  
  gamesButton.classList.add('active');
  homeButton.classList.remove('active');
  profileButton.classList.remove('active');
  
  loadGames();
}

function showSearch() {
  container.style.display = 'none';
  spacer.style.display = 'none';
  likesContainer.style.display = 'none';
  searchContainer.style.display = 'block';
  gamesContainer.style.display = 'none';
  gameScreen.style.display = 'none';
  settingsMenu.classList.remove('show');
  document.body.classList.add('search-active');
  document.body.classList.remove('games-active');
  document.body.classList.remove('game-active');
  
  homeButton.classList.remove('active');
  profileButton.classList.remove('active');
  gamesButton.classList.remove('active');
  
  searchBox.focus();
  showRecommendedImages();
}

function showRecommendedImages() {
  searchResults.innerHTML = '';
  searchResults.style.display = 'grid';
  const recommended = shuffleArray([...images]).slice(0, 6);
  recommended.forEach(img => {
    generateImage(img, searchResults);
  });
}

function showRelatedImages(currentImage) {
  relatedImagesContainer.innerHTML = '';
  const related = images.filter(img => 
    img.id !== currentImage.id && 
    currentImage.keywords.some(keyword => img.keywords.includes(keyword))
  );
  
  related.forEach(img => {
    const container = document.createElement('div');
    container.classList.add('related-image-container');
    
    const relatedImg = document.createElement('img');
    relatedImg.src = img.url;
    relatedImg.alt = "Imagen relacionada";
    relatedImg.classList.add('related-image');
    relatedImg.addEventListener('click', () => {
      openModal(img);
    });
    
    container.appendChild(relatedImg);
    relatedImagesContainer.appendChild(container);
  });
}

function performSearch() {
  const query = searchBox.value.toLowerCase();
  searchResults.innerHTML = '';
  
  if (query.trim() === '') {
    showRecommendedImages();
    return;
  }
  
  const results = images.filter(img => 
    img.keywords.some(keyword => keyword.toLowerCase().includes(query))
  );
  
  searchResults.style.display = 'grid';
  results.forEach(img => {
    generateImage(img, searchResults);
  });
}

// Funciones para CommentBox
function initializeCommentBox(imageId) {
  const commentBoxContainer = document.getElementById('commentBoxContainer');
  
  // Limpiar el contenedor
  commentBoxContainer.innerHTML = '';
  
  // Crear un nuevo div para CommentBox con un ID único
  const commentBoxDiv = document.createElement('div');
  commentBoxDiv.className = 'commentbox';
  commentBoxDiv.id = `commentbox-${imageId}`;
  commentBoxContainer.appendChild(commentBoxDiv);
  
  // Inicializar CommentBox con el project ID
  commentBox('5667233363656704-proj');
}

function openModal(imageData) {
  modal.style.display = 'flex';
  modalImage.src = imageData.url;
  currentModalImageUrl = imageData.url;
  currentImageId = imageData.id; // Guardar el ID de la imagen actual
  document.body.classList.add('modal-open');
  showRelatedImages(imageData);
  settingsMenu.classList.remove('show');
  
  // Inicializar CommentBox para esta imagen
  initializeCommentBox(imageData.id);
}

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  
  // Limpiar CommentBox
  const commentBoxContainer = document.getElementById('commentBoxContainer');
  commentBoxContainer.innerHTML = '';
  currentImageId = null;
}

// Funciones para los nuevos botones
function downloadImage() {
  if (!currentModalImageUrl) {
    console.error('No hay imagen para descargar');
    return;
  }
  
  try {
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = currentModalImageUrl;
    
    // Obtener el nombre del archivo de la URL o generar uno
    const fileName = currentModalImageUrl.split('/').pop() || 'imagen-descargada';
    link.download = fileName;
    
    // Simular clic en el enlace
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Descargando imagen:', fileName);
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
    alert('Error al descargar la imagen. Intenta nuevamente.');
  }
}

function searchWithGoogleLens() {
  if (!currentModalImageUrl) {
    console.error('No hay imagen para buscar');
    return;
  }
  
  try {
    // Crear URL de Google Lens con la imagen
    const googleLensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(currentModalImageUrl)}`;
    
    // Abrir en una nueva pestaña
    window.open(googleLensUrl, '_blank');
    
    console.log('Buscando con Google Lens:', currentModalImageUrl);
  } catch (error) {
    console.error('Error al abrir Google Lens:', error);
    alert('Error al abrir Google Lens. Intenta nuevamente.');
  }
}

// Configuración
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Si hay una imagen abierta, reinicializar CommentBox con los nuevos colores
  if (currentImageId) {
    initializeCommentBox(currentImageId);
  }
  
  // Forzar repintado para asegurar la transición
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
}

function clearFavorites() {
  likedImages = [];
  localStorage.setItem('likedImages', JSON.stringify(likedImages));
  updateLikedImagesDisplay();
  settingsMenu.classList.remove('show');
  alert('Favoritos limpiados correctamente');
}

// Event listeners
settingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsMenu.classList.toggle('show');
});

darkModeToggle.addEventListener('click', toggleDarkMode);

clearCache.addEventListener('click', clearFavorites);

document.addEventListener('click', (e) => {
  if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
    settingsMenu.classList.remove('show');
  }
});

searchTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  showSearch();
});

profileButton.addEventListener('click', (e) => {
  e.preventDefault();
  showLikes();
});

gamesButton.addEventListener('click', (e) => {
  e.preventDefault();
  showGames();
});

homeButton.addEventListener('click', (e) => {
  e.preventDefault();
  showGallery();
});

searchBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  showGallery();
});

backButton.addEventListener('click', (e) => {
  e.preventDefault();
  exitGame();
});

searchBox.addEventListener('input', performSearch);

searchCategories.forEach(category => {
  category.addEventListener('click', (e) => {
    searchBox.value = e.target.textContent;
    performSearch();
  });
});

// Inicialización
shuffleArray(images);
images.forEach(image => generateImage(image));

function checkIfSpacerVisible() {
  const spacerPosition = spacer.getBoundingClientRect();
  if (spacerPosition.top <= window.innerHeight) {
    shuffleArray(images);
    images.forEach(image => generateImage(image));
  }
}

window.addEventListener('scroll', checkIfSpacerVisible);
checkIfSpacerVisible();
updateLikedImagesDisplay();
showRecommendedImages();
loadGames();

// Aplicar efectos de brillo
function applyGlowEffects() {
  document.querySelectorAll('.custom-icon, .settings-option-icon, .top-bar-icon, .cancel-icon, .close-icon').forEach(icon => {
    icon.style.filter = 'var(--icon-glow)';
  });
  
  document.querySelectorAll('button, .nav-icon, .settings-option, .search-category').forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.filter = 'var(--icon-glow) brightness(1.2)';
    });
    element.addEventListener('mouseleave', () => {
      element.style.filter = element.classList.contains('active') ? 'var(--icon-glow)' : 'none';
    });
  });
}

window.addEventListener('DOMContentLoaded', applyGlowEffects);











// Variables para fondos animados
let backgroundModal;
let currentAnimation = null;
let currentAnimationType = localStorage.getItem('animationType') || 'none';
let animationIntensity = parseInt(localStorage.getItem('animationIntensity')) || 200;
let animationSpeed = parseInt(localStorage.getItem('animationSpeed')) || 5;

// Inicializar fondos animados al cargar
function initializeBackgroundAnimation() {
  backgroundModal = document.getElementById('background-modal');
  applyAnimation(currentAnimationType, animationIntensity, animationSpeed);
}

// Funciones para fondos animados
function createRain(intensity = 200, speed = 5) {
  const rainContainer = document.createElement('div');
  rainContainer.className = 'background-animation rain-background';
  document.body.appendChild(rainContainer);
  
  for (let i = 0; i < intensity; i++) {
    createRainDrop(rainContainer, speed);
  }
  
  return rainContainer;
}

function createRainDrop(container, speed) {
  const drop = document.createElement('div');
  drop.className = 'drop';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 0.5 + Math.random() * (2 / speed);
  const height = 10 + Math.random() * 20;
  const opacity = 0.1 + Math.random() * 0.9;
  
  drop.style.left = `${left}%`;
  drop.style.top = `${-20}px`;
  drop.style.animationDelay = `${delay}s`;
  drop.style.animationDuration = `${duration}s`;
  drop.style.height = `${height}px`;
  drop.style.opacity = opacity;
  
  container.appendChild(drop);
  
  drop.addEventListener('animationiteration', () => {
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.top = `${-20}px`;
    drop.style.opacity = 0.1 + Math.random() * 0.9;
  });
}

function createSnow(intensity = 200, speed = 5) {
  const snowContainer = document.createElement('div');
  snowContainer.className = 'background-animation snow-background';
  document.body.appendChild(snowContainer);
  
  for (let i = 0; i < intensity; i++) {
    createSnowflake(snowContainer, speed);
  }
  
  return snowContainer;
}

function createSnowflake(container, speed) {
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 2 + Math.random() * (8 / speed);
  const size = 2 + Math.random() * 4;
  
  flake.style.left = `${left}%`;
  flake.style.top = `${-20}px`;
  flake.style.animationDelay = `${delay}s`;
  flake.style.animationDuration = `${duration}s`;
  flake.style.width = `${size}px`;
  flake.style.height = `${size}px`;
  
  container.appendChild(flake);
  
  flake.addEventListener('animationiteration', () => {
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.top = `${-20}px`;
  });
}

function createStars(intensity = 200) {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'background-animation stars-background';
  document.body.appendChild(starsContainer);
  
  for (let i = 0; i < intensity; i++) {
    createStar(starsContainer);
  }
  
  return starsContainer;
}

function createStar(container) {
  const star = document.createElement('div');
  star.className = 'star';
  
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 3;
  const size = 1 + Math.random();
  
  star.style.left = `${left}%`;
  star.style.top = `${top}%`;
  star.style.animationDelay = `${delay}s`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  container.appendChild(star);
}

function createBubbles(intensity = 200, speed = 5) {
  const bubblesContainer = document.createElement('div');
  bubblesContainer.className = 'background-animation bubbles-background';
  document.body.appendChild(bubblesContainer);
  
  for (let i = 0; i < intensity; i++) {
    createBubble(bubblesContainer, speed);
  }
  
  return bubblesContainer;
}

function createBubble(container, speed) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 5 + Math.random() * (15 / speed);
  const size = 5 + Math.random() * 15;
  
  bubble.style.left = `${left}%`;
  bubble.style.top = `100vh`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  container.appendChild(bubble);
  
  bubble.addEventListener('animationiteration', () => {
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `100vh`;
  });
}

function createLeaves(intensity = 200, speed = 5) {
  const leavesContainer = document.createElement('div');
  leavesContainer.className = 'background-animation leaves-background';
  document.body.appendChild(leavesContainer);
  
  for (let i = 0; i < intensity; i++) {
    createLeaf(leavesContainer, speed);
  }
  
  return leavesContainer;
}

function createLeaf(container, speed) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 3 + Math.random() * (10 / speed);
  const size = 10 + Math.random() * 10;
  
  leaf.style.left = `${left}%`;
  leaf.style.top = `${-20}px`;
  leaf.style.animationDelay = `${delay}s`;
  leaf.style.animationDuration = `${duration}s`;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size}px`;
  
  container.appendChild(leaf);
  
  leaf.addEventListener('animationiteration', () => {
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.top = `${-20}px`;
  });
}

function createFire(intensity = 200, speed = 5) {
  const fireContainer = document.createElement('div');
  fireContainer.className = 'background-animation fire-background';
  document.body.appendChild(fireContainer);
  
  for (let i = 0; i < intensity; i++) {
    createSpark(fireContainer, speed);
  }
  
  return fireContainer;
}

function createSpark(container, speed) {
  const spark = document.createElement('div');
  spark.className = 'spark';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 1 + Math.random() * (3 / speed);
  const size = 2 + Math.random() * 3;
  
  spark.style.left = `${left}%`;
  spark.style.top = `100vh`;
  spark.style.animationDelay = `${delay}s`;
  spark.style.animationDuration = `${duration}s`;
  spark.style.width = `${size}px`;
  spark.style.height = `${size}px`;
  
  container.appendChild(spark);
  
  spark.addEventListener('animationiteration', () => {
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `100vh`;
  });
}

function applyAnimation(animationType, intensity, speed) {
  // Eliminar animación actual
  if (currentAnimation) {
    currentAnimation.remove();
    currentAnimation = null;
  }
  
  // Aplicar nueva animación
  switch(animationType) {
    case 'rain':
      currentAnimation = createRain(intensity, speed);
      break;
    case 'snow':
      currentAnimation = createSnow(intensity, speed);
      break;
    case 'stars':
      currentAnimation = createStars(intensity);
      break;
    case 'bubbles':
      currentAnimation = createBubbles(intensity, speed);
      break;
    case 'leaves':
      currentAnimation = createLeaves(intensity, speed);
      break;
    case 'fire':
      currentAnimation = createFire(intensity, speed);
      break;
    case 'hearts':
      currentAnimation = createHearts(intensity, speed);
      break;
    case 'confetti':
      currentAnimation = createConfetti(intensity, speed);
      break;
    case 'matrix':
      currentAnimation = createMatrix(intensity);
      break;
    case 'galaxy':
      currentAnimation = createGalaxy(intensity);
      break;
    case 'aurora':
      currentAnimation = createAurora();
      break;
    case 'ocean':
      currentAnimation = createOcean(intensity, speed);
      break;
    case 'particles':
      currentAnimation = createParticles(intensity, speed);
      
      break;
    case 'cyber':
      currentAnimation = createCyber(intensity, speed);
      break;
    default:
      // Ninguna animación
      break;
  }
  
  // Guardar configuración
  currentAnimationType = animationType;
  animationIntensity = intensity;
  animationSpeed = speed;
  
  localStorage.setItem('animationType', animationType);
  localStorage.setItem('animationIntensity', intensity);
  localStorage.setItem('animationSpeed', speed);
}

function showBackgroundModal() {
  backgroundModal.style.display = 'flex';
  settingsMenu.classList.remove('show');
  
  // Cargar configuración actual
  document.getElementById('intensity').value = animationIntensity;
  document.getElementById('speed').value = animationSpeed;
  document.getElementById('intensity-value').textContent = animationIntensity;
  document.getElementById('speed-value').textContent = animationSpeed;
  
  // Marcar botón activo
  document.querySelectorAll('.animation-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.animation === currentAnimationType) {
      btn.classList.add('active');
    }
  });
}

function closeBackgroundModal() {
  backgroundModal.style.display = 'none';
}

// Event listeners para fondos animados
document.getElementById('backgroundAnimationToggle').addEventListener('click', showBackgroundModal);

// Configurar controles de fondos animados
document.getElementById('intensity').addEventListener('input', function() {
  const value = this.value;
  document.getElementById('intensity-value').textContent = value;
  applyAnimation(currentAnimationType, value, animationSpeed);
});

document.getElementById('speed').addEventListener('input', function() {
  const value = this.value;
  document.getElementById('speed-value').textContent = value;
  applyAnimation(currentAnimationType, animationIntensity, value);
});

document.querySelectorAll('.animation-btn').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.animation-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    applyAnimation(this.dataset.animation, animationIntensity, animationSpeed);
  });
});

// Inicializar al cargar la página
initializeBackgroundAnimation();






// Nuevas funciones para fondos animados adicionales

function createHearts(intensity = 200, speed = 5) {
  const heartsContainer = document.createElement('div');
  heartsContainer.className = 'background-animation hearts-background';
  document.body.appendChild(heartsContainer);
  
  for (let i = 0; i < intensity; i++) {
    createHeart(heartsContainer, speed);
  }
  
  return heartsContainer;
}

function createHeart(container, speed) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 3 + Math.random() * (7 / speed);
  const size = 8 + Math.random() * 12;
  const colors = ['#ff6b6b', '#ff8e8e', '#ff5252', '#ff4081', '#f48fb1'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  heart.style.left = `${left}%`;
  heart.style.top = `${-20}px`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.background = color;
  
  container.appendChild(heart);
  
  heart.addEventListener('animationiteration', () => {
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${-20}px`;
  });
}

function createConfetti(intensity = 200, speed = 5) {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'background-animation';
  confettiContainer.style.background = 'linear-gradient(to bottom, #667eea, #764ba2)';
  document.body.appendChild(confettiContainer);
  
  for (let i = 0; i < intensity; i++) {
    createConfettiPiece(confettiContainer, speed);
  }
  
  return confettiContainer;
}

function createConfettiPiece(container, speed) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 2 + Math.random() * (6 / speed);
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const shapes = ['square', 'circle', 'rectangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  confetti.style.left = `${left}%`;
  confetti.style.top = `${-20}px`;
  confetti.style.animationDelay = `${delay}s`;
  confetti.style.animationDuration = `${duration}s`;
  confetti.style.background = color;
  
  if (shape === 'circle') {
    confetti.style.borderRadius = '50%';
  } else if (shape === 'rectangle') {
    confetti.style.width = '4px';
    confetti.style.height = '12px';
  }
  
  container.appendChild(confetti);
  
  confetti.addEventListener('animationiteration', () => {
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-20}px`;
  });
}

function createMatrix(intensity = 900000) {
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'background-animation matrix-background';
  document.body.appendChild(matrixContainer);
  
  const chars = '01ア7シ∧Ωカ9レヲ01ミ中Λホ∂キ03ツΨネβフ01ソ〒ル々タ01ク冗9マØリ01セカµヌ∞メ01ワギΣユ5チØナ01ヒロΔケπモ01サΨレФト8ノ0101ΨケヌΛ3ヨタ∂ホ7ミΩル01カシ冗9モネ01ツΦマ∧レフ01ワクØセト01ラΨヒ6ユメ01チπノカΦソ01サリΩケム01';
  
  for (let i = 0; i < intensity; i++) {
    createMatrixChar(matrixContainer, chars);
  }
  
  return matrixContainer;
}

function createMatrixChar(container, chars) {
  const char = document.createElement('div');
  char.className = 'matrix-char';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 1 + Math.random() * 4;
  const charText = chars[Math.floor(Math.random() * chars.length)];
  
  char.textContent = charText;
  char.style.left = `${left}%`;
  char.style.top = `${-20}px`;
  char.style.animationDelay = `${delay}s`;
  char.style.animationDuration = `${duration}s`;
  char.style.opacity = Math.random() * 0.5 + 0.5;
  
  container.appendChild(char);
  
  char.addEventListener('animationiteration', () => {
    char.style.left = `${Math.random() * 100}%`;
    char.style.top = `${-20}px`;
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.opacity = Math.random() * 0.5 + 0.5;
  });
}

function createGalaxy(intensity = 200) {
  const galaxyContainer = document.createElement('div');
  galaxyContainer.className = 'background-animation galaxy-background';
  document.body.appendChild(galaxyContainer);
  
  // Estrellas normales
  for (let i = 0; i < intensity; i++) {
    createStarCluster(galaxyContainer);
  }
  
  // Estrellas fugaces
  for (let i = 0; i < intensity / 20; i++) {
    createShootingStar(galaxyContainer);
  }
  
  return galaxyContainer;
}

function createStarCluster(container) {
  const star = document.createElement('div');
  star.className = 'star-cluster';
  
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 2;
  const size = 1 + Math.random() * 2;
  
  star.style.left = `${left}%`;
  star.style.top = `${top}%`;
  star.style.animationDelay = `${delay}s`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  container.appendChild(star);
}

function createShootingStar(container) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = 1 + Math.random() * 2;
  
  star.style.left = `${left}%`;
  star.style.top = `${top}%`;
  star.style.animationDelay = `${delay}s`;
  star.style.animationDuration = `${duration}s`;
  
  container.appendChild(star);
  
  star.addEventListener('animationiteration', () => {
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
  });
}

function createAurora() {
  const auroraContainer = document.createElement('div');
  auroraContainer.className = 'background-animation aurora-background';
  document.body.appendChild(auroraContainer);
  
  // Crear varios haces de aurora
  for (let i = 0; i < 3; i++) {
    createAuroraBeam(auroraContainer, i);
  }
  
  return auroraContainer;
}

function createAuroraBeam(container, index) {
  const beam = document.createElement('div');
  beam.className = 'aurora-beam';
  
  const delay = index * 2;
  const height = 200 + Math.random() * 300;
  
  beam.style.animationDelay = `${delay}s`;
  beam.style.height = `${height}px`;
  beam.style.left = `${Math.random() * 100}%`;
  
  container.appendChild(beam);
}

function createOcean(intensity = 200, speed = 5) {
  const oceanContainer = document.createElement('div');
  oceanContainer.className = 'background-animation ocean-background';
  document.body.appendChild(oceanContainer);
  
  // Crear olas
  for (let i = 0; i < 3; i++) {
    createWave(oceanContainer, i, speed);
  }
  
  // Crear burbujas
  for (let i = 0; i < intensity; i++) {
    createOceanBubble(oceanContainer, speed);
  }
  
  return oceanContainer;
}

function createWave(container, index, speed) {
  const wave = document.createElement('div');
  wave.className = 'wave';
  
  const delay = index * 1;
  const duration = 3 + (index * 0.5);
  const height = 30 + (index * 10);
  
  wave.style.animationDelay = `${delay}s`;
  wave.style.animationDuration = `${duration / speed}s`;
  wave.style.height = `${height}px`;
  wave.style.bottom = `${index * 15}px`;
  wave.style.opacity = 0.3 + (index * 0.1);
  
  container.appendChild(wave);
}

function createOceanBubble(container, speed) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 2 + Math.random() * (8 / speed);
  const size = 2 + Math.random() * 8;
  
  bubble.style.left = `${left}%`;
  bubble.style.top = `100vh`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  container.appendChild(bubble);
  
  bubble.addEventListener('animationiteration', () => {
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `100vh`;
  });
}

function createParticles(intensity = 200, speed = 5) {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'background-animation particles-background';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < intensity; i++) {
    createParticle(particlesContainer, speed);
  }
  
  return particlesContainer;
}

function createParticle(container, speed) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 2 + Math.random() * (8 / speed);
  const size = 1 + Math.random() * 3;
  const colors = ['#fff', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particle.style.left = `${left}%`;
  particle.style.top = `100vh`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  
  container.appendChild(particle);
  
  particle.addEventListener('animationiteration', () => {
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `100vh`;
  });
}

function createNebula(intensity = 100) {
  const nebulaContainer = document.createElement('div');
  nebulaContainer.className = 'background-animation nebula-background';
  document.body.appendChild(nebulaContainer);
  
  for (let i = 0; i < intensity; i++) {
    createNebulaCloud(nebulaContainer);
  }
  
  return nebulaContainer;
}

function createNebulaCloud(container) {
  const cloud = document.createElement('div');
  cloud.className = 'nebula-cloud';
  
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 4;
  const size = 50 + Math.random() * 200;
  const colors = [
    'rgba(138, 43, 226, 0.6)',
    'rgba(75, 0, 130, 0.6)',
    'rgba(148, 0, 211, 0.6)',
    'rgba(123, 104, 238, 0.6)'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  cloud.style.left = `${left}%`;
  cloud.style.top = `${top}%`;
  cloud.style.animationDelay = `${delay}s`;
  cloud.style.width = `${size}px`;
  cloud.style.height = `${size}px`;
  cloud.style.background = color;
  
  container.appendChild(cloud);
}

function createCyber(intensity = 200, speed = 5) {
  const cyberContainer = document.createElement('div');
  cyberContainer.className = 'background-animation cyber-background';
  document.body.appendChild(cyberContainer);
  
  // Crear grid
  createCyberGrid(cyberContainer);
  
  // Crear nodos de datos
  for (let i = 0; i < intensity; i++) {
    createDataNode(cyberContainer, speed);
  }
  
  return cyberContainer;
}

function createCyberGrid(container) {
  // Líneas horizontales
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line';
    line.style.width = '100%';
    line.style.height = '1px';
    line.style.top = `${i * 5}%`;
    line.style.animationDelay = `${(i % 3) * 0.5}s`;
    container.appendChild(line);
  }
  
  // Líneas verticales
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line';
    line.style.height = '100%';
    line.style.width = '1px';
    line.style.left = `${i * 5}%`;
    line.style.animationDelay = `${(i % 3) * 0.5}s`;
    container.appendChild(line);
  }
}

function createDataNode(container, speed) {
  const node = document.createElement('div');
  node.className = 'data-node';
  
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 2 + Math.random() * (8 / speed);
  
  node.style.left = `${left}%`;
  node.style.top = `100vh`;
  node.style.animationDelay = `${delay}s`;
  node.style.animationDuration = `${duration}s`;
  
  container.appendChild(node);
  
  node.addEventListener('animationiteration', () => {
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `100vh`;
  });
}
