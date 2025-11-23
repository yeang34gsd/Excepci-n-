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
    icon: 'https://i.pinimg.com/736x/cd/4d/70/cd4d70b4a3f3e692691408b7cc2a8c4a.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/2bfeba5f56a7610eeab72dfcaeb2630a/raw/799762067ba0b8a3ea97a071f43ab7b7ad98a707/%25F0%259F%2590%258D%2520index.html'
  },
  { 
    id: 'Neon Evasion',
    name: 'Neon Evasion', 
    icon: 'https://i.pinimg.com/736x/cd/4d/70/cd4d70b4a3f3e692691408b7cc2a8c4a.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/b635008040954b286ab54b3bc7cc1e67/raw/53c22ad63f6908aeb2ecbb1affe79d09090f3e3b/Esquivar%2520index.html'
  },
  { 
    id: 'Neon Evasion',
    name: 'Neon Evasion', 
    icon: 'https://i.pinimg.com/736x/cd/4d/70/cd4d70b4a3f3e692691408b7cc2a8c4a.jpg',
    url: 'https://gist.githubusercontent.com/yeang34gsd/3dfdee6e5fb9176199e4a9490dab836d/raw/3511e50e64504630bec6e8c82e518078c6cdb166/Ball%2520Sort%2520Puzzle%2520index.html'
  },
  { 
    id: '🌸 Jardín Flotante ',
    name: '🌸 Jardín Flotante', 
    icon: 'https://i.pinimg.com/736x/cd/4d/70/cd4d70b4a3f3e692691408b7cc2a8c4a.jpg',
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
