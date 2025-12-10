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

  
  { url: 'https://i.pinimg.com/736x/d3/b5/b0/d3b5b0fb8aa60e60301e3a091d19346f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img1' },
  { url: 'https://i.pinimg.com/736x/00/40/e7/0040e70eab7c49e400eac38efc1d7fe4.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img2' },
  { url: 'https://i.pinimg.com/736x/7f/1d/7d/7f1d7d7a9c96e949674c4e931887b72b.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img3' },
  { url: 'https://i.pinimg.com/736x/33/cf/ef/33cfefeaf1504005f96350d7848124dc.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img4' },
  { url: 'https://i.pinimg.com/736x/0c/32/be/0c32be4c0835dc1bca7d1a6aceb3214b.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img5' },
  { url: 'https://i.pinimg.com/736x/25/24/10/252410e67ea7d03ca7841f3edd80bc23.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img6' },
  { url: 'https://i.pinimg.com/736x/89/cf/00/89cf00f5f1b641f715957e9a1b66779e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img7' },
  { url: 'https://i.pinimg.com/736x/46/e4/00/46e40091bdf3d3dc045e29fbb863a55f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img8' },
  { url: 'https://i.pinimg.com/736x/39/6c/13/396c135e7cb1ff2c32f620911d0b0481.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img9' },
  { url: 'https://i.pinimg.com/736x/7c/f0/e0/7cf0e01e2a9749b8a72472753767e0d0.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img10' },
  { url: 'https://i.pinimg.com/736x/36/9b/1c/369b1c37da93e914e4badef9f15050f9.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img11' },
  { url: 'https://i.pinimg.com/736x/84/11/42/841142b1cbf5c00f2bed8f2318d00726.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Pink'], id: 'img12' },
  { url: 'https://i.pinimg.com/736x/4a/8f/65/4a8f65b963375dd52d4a424e1806367c.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Pink'], id: 'img13' },
  { url: 'https://i.pinimg.com/736x/3d/a4/ca/3da4ca24f5f8883f31ec2e5d17b240fa.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Pink'], id: 'img14' },
  { url: 'https://i.pinimg.com/736x/9f/0b/26/9f0b2618d4ac9a016c9864532803cdb3.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img15' },
  { url: 'https://i.pinimg.com/736x/c1/d5/90/c1d5909d2d5203a3d100a97e2693c4d7.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img16' },
  { url: 'https://i.pinimg.com/736x/28/08/c5/2808c589245cdda006f6f31c42ab6b0b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img17' },
  { url: 'https://i.pinimg.com/736x/fb/be/b8/fbbeb8c86e9821d4421c8fcd618f1435.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img18' },
  { url: 'https://i.pinimg.com/736x/00/11/5c/00115cac39334ff7c2f794e18010a832.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img19' },
  { url: 'https://i.pinimg.com/736x/24/88/c9/2488c992aa366b97c20ca4082f18e543.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img20' },
  { url: 'https://i.pinimg.com/736x/86/fe/ff/86feff8108386742ea0b8d52ed51e112.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img21' },
  { url: 'https://i.pinimg.com/736x/b4/f8/05/b4f805915f4e565dd4223f0c976707d9.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img22' },
  { url: 'https://i.pinimg.com/736x/d0/58/e1/d058e1c3aaef55a41ad64e51cb52e9b4.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img23' },
  { url: 'https://i.pinimg.com/736x/d8/44/38/d84438a89b9774daebfbebfa6317b9b9.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img24' },
  { url: 'https://i.pinimg.com/736x/a8/23/60/a823607a1bc907419e502e7b6000b1a4.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img25' },
  { url: 'https://i.pinimg.com/736x/ea/fc/80/eafc80b084e45691acd6f076d2d1b569.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img26' },
  { url: 'https://i.pinimg.com/736x/b9/64/27/b96427ab975948845f403b718414522d.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img27' },
  { url: 'https://i.pinimg.com/736x/04/e7/b3/04e7b3da12294df3ff5a5f4dcc68aa33.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img28' },
  { url: 'https://i.pinimg.com/736x/a9/b2/e2/a9b2e2322cb7cad44fed3d558001c944.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img29' },
  { url: 'https://i.pinimg.com/736x/f7/33/ed/f733ed27725e082d71c3c34dc13a45b7.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img30' },
  { url: 'https://i.pinimg.com/736x/d9/7a/3f/d97a3f24cab2a88d05a49c3fcce8b5e2.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img31' },
  { url: 'https://i.pinimg.com/736x/03/05/db/0305dbd2b732be5c4d8e72bc4bb871ac.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img32' },
  { url: 'https://i.pinimg.com/736x/56/52/92/5652926d617b042dab4c9b7276388f5c.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img33' },
  { url: 'https://i.pinimg.com/736x/ea/c6/d4/eac6d4793fa7fb746b9ddd3861a1f695.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img34' },
  { url: 'https://i.pinimg.com/736x/e3/33/c7/e333c74b5b7bbb965db1d98e7cfb62c7.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img35' },
  { url: 'https://i.pinimg.com/736x/ca/66/c5/ca66c5e1f22f731e330524021cec4cd9.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img36' },
  { url: 'https://i.pinimg.com/736x/a4/4d/85/a44d85a1c5a7d202b708489031ec3786.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img37' },
  { url: 'https://i.pinimg.com/736x/75/96/44/759644516ccb180bccbbcce7e12741b1.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img38' },
  { url: 'https://i.pinimg.com/736x/ac/5c/02/ac5c02400375cfbb49c2951890e07c6b.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img39' },
  { url: 'https://i.pinimg.com/736x/86/6a/16/866a16233beaf09d361f3fccee558c29.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img40' },
  
  // Imágenes adicionales de tus mensajes anteriores - continuando desde img41
  { url: 'https://i.pinimg.com/736x/6f/97/9f/6f979f997b34276e0c95f05c5c188f28.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img41' },
  { url: 'https://i.pinimg.com/736x/65/ba/c3/65bac342f5242415b5fc448bce2db624.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img42' },
  { url: 'https://i.pinimg.com/736x/e1/24/28/e1242842bce20c40646880d821e29a8f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img43' },
  { url: 'https://i.pinimg.com/736x/1d/fd/67/1dfd67db94f8ff546f3432e1134500ef.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img44' },
  { url: 'https://i.pinimg.com/736x/ab/80/65/ab8065a60a9f8b58db01e32f9d191e7e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img45' },
  { url: 'https://i.pinimg.com/736x/4e/f6/88/4ef688d64bc6670d7159d01eacd0aca3.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img46' },
  { url: 'https://i.pinimg.com/736x/0f/a5/bf/0fa5bfdb0dfd5c501bf473538d9a685a.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img47' },
  { url: 'https://i.pinimg.com/736x/9b/bf/ea/9bbfeaab5bef842054ce290dd6f39747.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img48' },
  { url: 'https://i.pinimg.com/736x/ad/5b/12/ad5b123809ba64a969b85dc43bb86fbf.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img49' },
  { url: 'https://i.pinimg.com/736x/a9/82/03/a982031099d930b76ce91736e7af9d48.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img50' },
  { url: 'https://i.pinimg.com/736x/d1/62/91/d16291d8ee02b818ff954fc68f12b069.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img51' },
  { url: 'https://i.pinimg.com/736x/80/d7/9f/80d79f71823c8a8a43a23bd068861f14.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img52' },
  { url: 'https://i.pinimg.com/736x/23/09/4e/23094ed88af4a202c80a967cbef4f1d8.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img53' },
  { url: 'https://i.pinimg.com/736x/b3/b9/73/b3b973afd5eb39781f06b6859696db24.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img54' },
  { url: 'https://i.pinimg.com/736x/73/a3/6e/73a36e3ecf3bc71794591cdafa474b01.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img55' },
  { url: 'https://i.pinimg.com/736x/f6/15/a1/f615a1ca189cbb74be5ba8bb73926478.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img56' },
  { url: 'https://i.pinimg.com/736x/18/01/c2/1801c2232d40559d9054374879cf0ac5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img57' },
  { url: 'https://i.pinimg.com/736x/a4/eb/bf/a4ebbfa436cf5452ccbed0f4291684d2.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img58' },
  { url: 'https://i.pinimg.com/736x/2e/70/2e/2e702e681a6ba82ca91c28ecffc387b8.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img59' },
  { url: 'https://i.pinimg.com/736x/24/59/d6/2459d64ac729d24db820dfd3642c935a.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img60' },
  { url: 'https://i.pinimg.com/736x/31/f0/b0/31f0b0c453972949a3a54ac1f24e5aa5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img61' },
  { url: 'https://i.pinimg.com/736x/2b/15/74/2b15747f476b4459c2770883fc519a04.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img62' },
  { url: 'https://i.pinimg.com/736x/70/15/e5/7015e525288f75d2e7d044189ba52d25.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img63' },
  { url: 'https://i.pinimg.com/736x/1c/60/21/1c6021a3feef5d8b3246d0a70a2fb966.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img64' },
  { url: 'https://i.pinimg.com/736x/ec/42/97/ec429733701420a4e79714a5225d8972.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img65' },
  { url: 'https://i.pinimg.com/736x/f2/bb/b4/f2bbb4a36f0ed6392a5b1b3d8522ffe1.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img66' },
  { url: 'https://i.pinimg.com/736x/af/e9/fa/afe9fa5fce56d4009792c9baf60b27a5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img67' },
  { url: 'https://i.pinimg.com/736x/41/eb/68/41eb6854f7fcbc825a6e317d1619d125.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img68' },
  { url: 'https://i.pinimg.com/736x/6f/8b/1f/6f8b1f84e504e48875e1afbbf2c1523c.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img69' },
  { url: 'https://i.pinimg.com/736x/9e/50/0b/9e500b0c7a577fe0ed94574ceb6e663f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img70' },
  { url: 'https://i.pinimg.com/736x/5b/23/d5/5b23d552a91c41e9ce152ee2da7c5e9e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img71' },
  { url: 'https://i.pinimg.com/736x/f2/67/0c/f2670cb49326c3042c75b76133fe8294.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img72' },
  { url: 'https://i.pinimg.com/736x/d5/6b/04/d56b0461c5b50df9319531f8e0088934.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img73' },
  { url: 'https://i.pinimg.com/736x/63/a7/da/63a7dac0f8d7804846e69e43b0fb9878.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img74' },
  { url: 'https://i.pinimg.com/736x/21/b6/08/21b608e5e4c21dea65bdcc21f9115eef.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img75' },
  { url: 'https://i.pinimg.com/736x/a6/b5/a4/a6b5a4145dfd4959e3dc305e0b26af28.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img76' },
  { url: 'https://i.pinimg.com/736x/83/bd/56/83bd5682c38ae20c91f7bb0fc1a411ff.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img77' },
  { url: 'https://i.pinimg.com/736x/fa/9d/7d/fa9d7dad4a9d7127b9164b0805ae0a93.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img78' },
  { url: 'https://i.pinimg.com/736x/10/9d/df/109ddfdbc89e66eb478096aca9854c8b.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img79' },
  { url: 'https://i.pinimg.com/736x/58/2e/5b/582e5b4dd7614b68524259924b3ff3be.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img80' },
  { url: 'https://i.pinimg.com/736x/c2/f8/e7/c2f8e7e028994210b93a5252eddf3983.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img81' },
  { url: 'https://i.pinimg.com/736x/f5/0c/60/f50c60282250437dd33be4e71836f86a.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img82' },
  { url: 'https://i.pinimg.com/736x/41/3a/54/413a541390ade09d9d23cf74717adc03.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img83' },
  { url: 'https://i.pinimg.com/736x/13/22/d0/1322d08b90a16b748278e12380491550.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img84' },
  { url: 'https://i.pinimg.com/736x/5c/ea/a9/5ceaa9bb712560cec24bb66111427d3f.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img85' },
  { url: 'https://i.pinimg.com/736x/27/fb/80/27fb805edfe2f1c0baf07008dfed2ff8.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img86' },
  { url: 'https://i.pinimg.com/736x/da/89/da/da89da5615bc4475f2f9a9b639fe4809.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img87' },
  { url: 'https://i.pinimg.com/736x/ff/0a/68/ff0a68419b7da3ad2ea88d443b151791.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img88' },
  { url: 'https://i.pinimg.com/736x/07/32/59/0732591bbc6089de1d797cab85d8b684.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img89' },
  { url: 'https://i.pinimg.com/736x/1e/75/74/1e757439cd5f434d166e8b0eb56b5325.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img90' },
  { url: 'https://i.pinimg.com/736x/2e/7f/d4/2e7fd4085268bb358a994e6c53241e2d.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img91' },
  { url: 'https://i.pinimg.com/736x/ea/b6/a3/eab6a3fdfd40d36dc73b954c77b96cc6.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img92' },
  { url: 'https://i.pinimg.com/736x/90/10/f2/9010f2bf0bdb37132a987dcd383c7108.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img93' },
  { url: 'https://i.pinimg.com/736x/6e/fa/e2/6efae219a3c42f25451a9a36836a4caf.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img94' },
  { url: 'https://i.pinimg.com/736x/d6/fd/5c/d6fd5c73c942d5b974ae65d449cc0d34.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img95' },
  { url: 'https://i.pinimg.com/736x/80/2c/cc/802ccc8ff87ba34b3df70697e0dc045b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img96' },
  { url: 'https://i.pinimg.com/736x/b6/21/3b/b6213b032ff7863b62b3d3120df72eb1.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img97' },
  { url: 'https://i.pinimg.com/736x/42/7d/21/427d218f3048138058c813dbaf47ce68.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img98' },
  { url: 'https://i.pinimg.com/736x/12/84/65/128465a93dc58d56447cb3904b8fc981.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img99' },
  { url: 'https://i.pinimg.com/736x/8c/54/d3/8c54d3a4a9f0f644ed2b222be4894f6b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img100' },
  { url: 'https://i.pinimg.com/736x/c8/49/2f/c8492f5467ed0340ea2e48d580e41e0b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img101' },
  { url: 'https://i.pinimg.com/736x/da/39/b3/da39b3b8948a5f7ba11628e063ccd4c6.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img102' },
  { url: 'https://i.pinimg.com/736x/53/e0/59/53e059e9e669b4a04d3c253b1508cc1b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img103' },
  { url: 'https://i.pinimg.com/736x/3d/ea/90/3dea90e2c83154caf92fb12de3db95be.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img104' },
  { url: 'https://i.pinimg.com/736x/c3/06/52/c30652dae29eb3bc5c64ac6b6859e9df.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img105' },
  { url: 'https://i.pinimg.com/736x/1c/42/1c/1c421c1808179154a17450ca4ee067ac.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img106' },
  { url: 'https://i.pinimg.com/736x/97/7e/b8/977eb8502ea5d3bb4d42d50f3cf9601e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img107' },
  { url: 'https://i.pinimg.com/736x/93/2c/cd/932ccd87251e399791154330b416fcb9.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img108' },
  { url: 'https://i.pinimg.com/736x/c2/14/59/c21459658846eba706f4c84e5d95b06c.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img109' },
  { url: 'https://i.pinimg.com/736x/5f/ff/fd/5ffffd5346f4192681f87f337e9e682a.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img110' },
  { url: 'https://i.pinimg.com/736x/10/c1/71/10c171c53feedfce24212d720ec47dd2.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img111' },
  { url: 'https://i.pinimg.com/736x/04/4e/b8/044eb8af687517677fce38c772b9d52d.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img112' },
  { url: 'https://i.pinimg.com/736x/7e/58/1d/7e581df1c5d76980037fbd6e56d49b90.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img113' },
  { url: 'https://i.pinimg.com/736x/f2/34/30/f234303f5a756d569e1502f13e13608c.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img114' },
  { url: 'https://i.pinimg.com/736x/68/71/5f/68715fe3bea6aa970e0fb8269859acc6.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img115' },
  { url: 'https://i.pinimg.com/736x/cb/2d/7b/cb2d7be36979ebad31c5b1a136cc73bb.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img116' },
  { url: 'https://i.pinimg.com/736x/e9/d6/08/e9d608e4542b5ba75151b042b2a10c60.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img117' },
  { url: 'https://i.pinimg.com/736x/3b/d6/b9/3bd6b905eb45f50be39574bf9cfe1510.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img118' },
  { url: 'https://i.pinimg.com/736x/34/df/0c/34df0c31ab6423c82658456c89ec2036.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img119' },
  { url: 'https://i.pinimg.com/736x/8b/00/09/8b0009b3e2651f2d7c103d87f8bea55a.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img120' },
  { url: 'https://i.pinimg.com/736x/d1/72/5a/d1725a01a27728f9bc3f29d903d94d60.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img121' },
  { url: 'https://i.pinimg.com/736x/93/03/9e/93039ed546945d76025824bf3b620ca1.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img122' },
  { url: 'https://i.pinimg.com/736x/c8/7c/aa/c87caa9d18bbed1e63b952713d5fccb5.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img123' },
  { url: 'https://i.pinimg.com/736x/1b/30/14/1b3014fa1d39183dad23a82357370c77.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img124' },
  { url: 'https://i.pinimg.com/736x/db/8e/b0/db8eb0e94cc71cadba9a18efb1c1f67c.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img125' },
  { url: 'https://i.pinimg.com/736x/14/5f/c5/145fc58a150bf3ff81d80586c53205d0.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img126' },
  { url: 'https://i.pinimg.com/736x/6f/61/95/6f61950c2b2bf0d108d525cb1996b609.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img127' },
  { url: 'https://i.pinimg.com/736x/67/11/d7/6711d799bd49f9580225ea893d738aec.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img128' },
  { url: 'https://i.pinimg.com/736x/05/a1/70/05a1705a4181ed892302cc4e391a1b28.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img129' },
  { url: 'https://i.pinimg.com/736x/91/7d/c0/917dc08d37a5c4b945ed857137965dfc.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img130' },
  { url: 'https://i.pinimg.com/736x/97/4a/4d/974a4d0ca40b980daf569f9a9069eec0.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img131' },
  { url: 'https://i.pinimg.com/736x/08/b9/5b/08b95bd84c8698501fe569ff1f273a57.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img132' },
  { url: 'https://i.pinimg.com/736x/aa/01/c7/aa01c7d750bcd03fefd6628278322fa5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img133' },
  { url: 'https://i.pinimg.com/736x/8c/fc/e0/8cfce0cd2550912e329c3b26a0742ada.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img134' },
  { url: 'https://i.pinimg.com/736x/6e/e6/7a/6ee67a5eb4581f008c13328617939e92.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img135' },
  { url: 'https://i.pinimg.com/736x/23/32/8c/23328cb5fc00d2df1402c605243d4858.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img136' },
  { url: 'https://i.pinimg.com/736x/88/7e/e4/887ee45575f81f2730730d5b37d7d605.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img137' },
  { url: 'https://i.pinimg.com/736x/c4/68/08/c46808bcadee2d7556feb2d94a93e5ce.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img138' },
  { url: 'https://i.pinimg.com/736x/c2/2b/dc/c22bdc8f297d2f03da416a78f00dba6f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img139' },
  { url: 'https://i.pinimg.com/736x/cc/fd/9d/ccfd9dc9cc9dc2f90a65d095c1fc5391.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img140' },
  { url: 'https://i.pinimg.com/736x/40/4b/f2/404bf26205704b85eef64d752a49a56b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img141' },
  { url: 'https://i.pinimg.com/736x/93/6e/b7/936eb778ef097433b8add41e9522b52d.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img142' },
  { url: 'https://i.pinimg.com/736x/2e/5b/af/2e5bafeef81c70802c263eb3a8bf90c1.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img143' },
  { url: 'https://i.pinimg.com/736x/b7/32/ea/b732eab8b3c3d493a1ff21e611f3f31e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img144' },
  { url: 'https://i.pinimg.com/736x/2c/67/42/2c6742afbdeaab45fe3b4c824096e6a0.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img145' },
  { url: 'https://i.pinimg.com/736x/96/0f/0e/960f0e8f19169b7ed813a7f8cdbe3fa2.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img146' },
  { url: 'https://i.pinimg.com/736x/3c/7d/11/3c7d11a14eecc942cf2cec977992382f.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img147' },
  { url: 'https://i.pinimg.com/736x/f6/8b/29/f68b29c52b756ee4a7e51da30af51a4b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img148' },
  { url: 'https://i.pinimg.com/736x/2b/23/76/2b237642db96a7ef2664d96068d692ad.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img149' },
  { url: 'https://i.pinimg.com/736x/cd/dc/59/cddc599afa2317e22854d0fa2ad27e48.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img150' },
  { url: 'https://i.pinimg.com/736x/e6/e1/45/e6e1457b6a612d2ce9f890991c3923f2.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img151' },
  { url: 'https://i.pinimg.com/736x/b3/40/fe/b340fe95657fe1ddbe21ef65c5d3b55c.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img152' },
  { url: 'https://i.pinimg.com/736x/77/bb/f5/77bbf595ce13365acc2ab1fd24da198e.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img153' },
  { url: 'https://i.pinimg.com/736x/5f/4e/80/5f4e80a079b3b1d9ce4f59a030f6147c.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img154' },
  { url: 'https://i.pinimg.com/736x/d4/e4/80/d4e4809f7b1cd6e461a533379f6921b6.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img155' },
  { url: 'https://i.pinimg.com/736x/99/28/3c/99283c3a415739f39fcf31bcff84c489.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img156' },
  { url: 'https://i.pinimg.com/736x/2e/87/7b/2e877bf168da902661af568d05953dcf.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img157' },
  { url: 'https://i.pinimg.com/736x/39/5e/ed/395eedf4f4cae876fb2248febf908615.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img158' },
  { url: 'https://i.pinimg.com/736x/58/48/da/5848da2adabeec52d54a5861af983dd5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img159' },
  { url: 'https://i.pinimg.com/736x/6c/cb/86/6ccb864c26bdfe70da54781e02c21625.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img160' },
  { url: 'https://i.pinimg.com/736x/df/61/70/df6170b31099173afd479d2003a28ddb.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img161' },
  { url: 'https://i.pinimg.com/736x/ac/6a/27/ac6a27eaf61368fcccdf423f5975e71d.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img162' },
  { url: 'https://i.pinimg.com/736x/9b/7a/01/9b7a0177b6153d6138ddad3ef0d2106d.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img163' },
  { url: 'https://i.pinimg.com/736x/79/a7/38/79a738c8f600f7e235e23074d73eb9a5.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img164' },
  { url: 'https://i.pinimg.com/736x/f5/85/0e/f5850e1775a08581b37fa663ad057a78.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img165' },
  { url: 'https://i.pinimg.com/736x/92/3f/09/923f099bd7474d7d46010d7777022437.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img166' },
  { url: 'https://i.pinimg.com/736x/73/c9/1c/73c91ca12eb8707fd7e76a5acd36af7b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img167' },
  { url: 'https://i.pinimg.com/736x/2e/43/73/2e437358d37ae17ea3310dceaf0d7109.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img168' },
  { url: 'https://i.pinimg.com/736x/82/79/9b/82799be1bc930ba0781dd8cfee03d28b.jpg', keywords: ['Anime', 'Cute', 'Love', 'Pink'], id: 'img169' },
  { url: 'https://i.pinimg.com/736x/8e/d5/63/8ed5633a7885b77389b64d2f04b77b60.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img170' },
  { url: 'https://i.pinimg.com/736x/6f/62/ea/6f62ea06ac1c13ea2f576349784cb191.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img171' },
  { url: 'https://i.pinimg.com/736x/4f/01/70/4f017026ca437ff151d310819133e7eb.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img172' },
  { url: 'https://i.pinimg.com/736x/02/a5/ef/02a5ef09b2f9e5c595ec940417f17c54.jpg', keywords: ['Anime', 'Cute', 'Love', 'Magic Fluids'], id: 'img173' },
  { url: 'https://i.pinimg.com/736x/ca/e6/18/cae618739f4839bffc426b0e5dd7ea03.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img174' },
  { url: 'https://i.pinimg.com/736x/26/a5/cd/26a5cd4a90d7122b743ba6cc216a7460.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img175' },
  { url: 'https://i.pinimg.com/736x/b5/b9/98/b5b998f523136c4b65759a12bed98e75.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img176' },
  { url: 'https://i.pinimg.com/736x/a7/24/ea/a724ea9b32637485bb02e7391949da7a.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Pink'], id: 'img177' },
  { url: 'https://i.pinimg.com/736x/72/6d/6d/726d6d6171c71cf441fb9f342aa180e2.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img178' },
  { url: 'https://i.pinimg.com/736x/15/73/4b/15734b96cafd0d382541c42d3feda8b8.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img179' },
  { url: 'https://i.pinimg.com/736x/52/70/a5/5270a5326e16e5092000a7dc8754dd31.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img180' },
  { url: 'https://i.pinimg.com/736x/80/48/7a/80487a75efc4a5d7778b987c42c1eb61.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img181' },
  { url: 'https://i.pinimg.com/736x/93/e8/05/93e805198ff59d158a3f203d1e0e0685.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img182' },
  { url: 'https://i.pinimg.com/736x/c9/33/e4/c933e4650766cb0a4e602d45d467f102.jpg', keywords: ['Anime', 'Cute', 'Magic Fluids', 'Love'], id: 'img183' },
  
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
