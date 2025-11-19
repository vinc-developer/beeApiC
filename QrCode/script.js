
// Stockage des QR codes créés
let qrCodes = [];
let currentQRCode = null;
let currentLogoImage = null;

// Charger les QR codes depuis le localStorage au démarrage
window.addEventListener('DOMContentLoaded', () => {
  loadQRCodesFromStorage();
  displaySavedQRCodes();
  initializeColorInputs();
  initializeSliders();
  initializeToggleOptions();
});

// Éléments du DOM
const urlInput = document.getElementById('urlInput');
const logoInput = document.getElementById('logoInput');
const qrNameInput = document.getElementById('qrName');
const generateBtn = document.getElementById('generateBtn');
const previewBtn = document.getElementById('previewBtn');
const downloadBtn = document.getElementById('downloadBtn');
const downloadSvgBtn = document.getElementById('downloadSvgBtn');
const qrCanvas = document.getElementById('qrCanvas');
const savedQRList = document.getElementById('savedQRList');

// Éléments de style
const dotsTypeInput = document.getElementById('dotsType');
const cornersSquareTypeInput = document.getElementById('cornersSquareType');
const cornersDotTypeInput = document.getElementById('cornersDotType');
const colorDarkInput = document.getElementById('colorDark');
const colorDarkText = document.getElementById('colorDarkText');
const colorLightInput = document.getElementById('colorLight');
const colorLightText = document.getElementById('colorLightText');
const cornersSquareColorInput = document.getElementById('cornersSquareColor');
const cornersSquareColorText = document.getElementById('cornersSquareColorText');
const cornersDotColorInput = document.getElementById('cornersDotColor');
const cornersDotColorText = document.getElementById('cornersDotColorText');
const useGradientInput = document.getElementById('useGradient');
const gradientOptions = document.getElementById('gradientOptions');
const gradientTypeInput = document.getElementById('gradientType');
const gradientColor2Input = document.getElementById('gradientColor2');
const gradientColor2Text = document.getElementById('gradientColor2Text');
const qrSizeInput = document.getElementById('qrSize');
const sizeValue = document.getElementById('sizeValue');
const qrMarginInput = document.getElementById('qrMargin');
const marginValue = document.getElementById('marginValue');

// Bordure QR Code
const qrBorderEnabled = document.getElementById('qrBorderEnabled');
const qrBorderOptions = document.getElementById('qrBorderOptions');
const qrBorderWidth = document.getElementById('qrBorderWidth');
const qrBorderWidthValue = document.getElementById('qrBorderWidthValue');
const qrBorderStyle = document.getElementById('qrBorderStyle');
const qrBorderColor = document.getElementById('qrBorderColor');
const qrBorderColorText = document.getElementById('qrBorderColorText');
const qrBorderRadius = document.getElementById('qrBorderRadius');
const qrBorderRadiusValue = document.getElementById('qrBorderRadiusValue');

// Logo
const logoSizeInput = document.getElementById('logoSize');
const logoSizeValue = document.getElementById('logoSizeValue');
const logoMarginInput = document.getElementById('logoMargin');
const logoMarginValue = document.getElementById('logoMarginValue');

// Bordure Logo
const logoBorderEnabled = document.getElementById('logoBorderEnabled');
const logoBorderOptions = document.getElementById('logoBorderOptions');
const logoBorderWidth = document.getElementById('logoBorderWidth');
const logoBorderWidthValue = document.getElementById('logoBorderWidthValue');
const logoBorderStyle = document.getElementById('logoBorderStyle');
const logoBorderColor = document.getElementById('logoBorderColor');
const logoBorderColorText = document.getElementById('logoBorderColorText');
const logoBorderRadius = document.getElementById('logoBorderRadius');
const logoBorderRadiusValue = document.getElementById('logoBorderRadiusValue');
const logoBackgroundColor = document.getElementById('logoBackgroundColor');
const logoBackgroundColorText = document.getElementById('logoBackgroundColorText');

// Initialiser les options de toggle
function initializeToggleOptions() {
  useGradientInput.addEventListener('change', (e) => {
    gradientOptions.style.display = e.target.checked ? 'block' : 'none';
  });

  qrBorderEnabled.addEventListener('change', (e) => {
    qrBorderOptions.style.display = e.target.checked ? 'block' : 'none';
  });

  logoBorderEnabled.addEventListener('change', (e) => {
    logoBorderOptions.style.display = e.target.checked ? 'block' : 'none';
  });
}

// Initialiser la synchronisation des couleurs
function initializeColorInputs() {
  syncColorInputs(colorDarkInput, colorDarkText);
  syncColorInputs(colorLightInput, colorLightText);
  syncColorInputs(cornersSquareColorInput, cornersSquareColorText);
  syncColorInputs(cornersDotColorInput, cornersDotColorText);
  syncColorInputs(gradientColor2Input, gradientColor2Text);
  syncColorInputs(qrBorderColor, qrBorderColorText);
  syncColorInputs(logoBorderColor, logoBorderColorText);
  syncColorInputs(logoBackgroundColor, logoBackgroundColorText);
}

function syncColorInputs(colorInput, textInput) {
  colorInput.addEventListener('input', (e) => {
    textInput.value = e.target.value;
  });
  textInput.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      colorInput.value = e.target.value;
    }
  });
}

// Initialiser les sliders
function initializeSliders() {
  qrSizeInput.addEventListener('input', (e) => {
    sizeValue.textContent = e.target.value + 'px';
  });

  qrMarginInput.addEventListener('input', (e) => {
    marginValue.textContent = e.target.value + 'px';
  });

  logoSizeInput.addEventListener('input', (e) => {
    logoSizeValue.textContent = e.target.value;
  });

  logoMarginInput.addEventListener('input', (e) => {
    logoMarginValue.textContent = e.target.value + 'px';
  });

  qrBorderWidth.addEventListener('input', (e) => {
    qrBorderWidthValue.textContent = e.target.value + 'px';
  });

  qrBorderRadius.addEventListener('input', (e) => {
    qrBorderRadiusValue.textContent = e.target.value + 'px';
  });

  logoBorderWidth.addEventListener('input', (e) => {
    logoBorderWidthValue.textContent = e.target.value + 'px';
  });

  logoBorderRadius.addEventListener('input', (e) => {
    logoBorderRadiusValue.textContent = e.target.value + '%';
  });
}

// Gestion du logo uploadé
logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentLogoImage = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Créer un logo avec bordure et fond personnalisés
async function createCustomLogo() {
  if (!currentLogoImage) return null;

  // Si pas de bordure activée, retourner l'image originale
  if (!logoBorderEnabled.checked) {
    return currentLogoImage;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const borderWidth = parseInt(logoBorderWidth.value);
      const borderRadius = parseInt(logoBorderRadius.value);
      const bgColor = logoBackgroundColor.value;
      const borderColor = logoBorderColor.value;

      // Créer un canvas pour le logo personnalisé
      const canvas = document.createElement('canvas');
      const size = 400; // Taille de base
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Calculer les dimensions
      const padding = 20; // Espace pour le fond
      const totalBorder = borderWidth + padding;
      const imgSize = size - (totalBorder * 2);
      const imgX = totalBorder;
      const imgY = totalBorder;

      // Dessiner la bordure
      if (borderWidth > 0) {
        ctx.fillStyle = borderColor;
        if (borderRadius > 0) {
          drawRoundedRect(ctx, padding, padding, size - (padding * 2), size - (padding * 2), (borderRadius * size) / 100);
        } else {
          ctx.fillRect(padding, padding, size - (padding * 2), size - (padding * 2));
        }
      }

      // Dessiner le fond
      ctx.fillStyle = bgColor;
      const bgPadding = padding + borderWidth;
      const bgSize = size - (bgPadding * 2);
      if (borderRadius > 0) {
        drawRoundedRect(ctx, bgPadding, bgPadding, bgSize, bgSize, Math.max(0, (borderRadius * size) / 100 - borderWidth));
      } else {
        ctx.fillRect(bgPadding, bgPadding, bgSize, bgSize);
      }

      // Dessiner l'image du logo avec clip pour respecter le border radius
      ctx.save();
      if (borderRadius > 0) {
        ctx.beginPath();
        const clipRadius = Math.max(0, (borderRadius * size) / 100 - borderWidth);
        drawRoundedPath(ctx, bgPadding, bgPadding, bgSize, bgSize, clipRadius);
        ctx.clip();
      }
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };
    img.src = currentLogoImage;
  });
}

// Fonction helper pour dessiner un chemin arrondi (pour clip)
function drawRoundedPath(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Fonction helper pour dessiner un rectangle arrondi
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  drawRoundedPath(ctx, x, y, width, height, radius);
  ctx.fill();
}

// Obtenir la configuration actuelle
async function getCurrentConfig() {
  const config = {
    width: parseInt(qrSizeInput.value),
    height: parseInt(qrSizeInput.value),
    margin: parseInt(qrMarginInput.value),
    data: urlInput.value.trim() || 'https://example.com',
    dotsOptions: {
      type: dotsTypeInput.value
    },
    cornersSquareOptions: {
      type: cornersSquareTypeInput.value,
      color: cornersSquareColorInput.value
    },
    cornersDotOptions: {
      type: cornersDotTypeInput.value,
      color: cornersDotColorInput.value
    },
    backgroundOptions: {
      color: colorLightInput.value
    }
  };

  // Gestion des couleurs (dégradé ou couleur unie)
  if (useGradientInput.checked) {
    config.dotsOptions.gradient = {
      type: gradientTypeInput.value,
      rotation: 0,
      colorStops: [
        { offset: 0, color: colorDarkInput.value },
        { offset: 1, color: gradientColor2Input.value }
      ]
    };
  } else {
    config.dotsOptions.color = colorDarkInput.value;
  }

  // Ajouter le logo si disponible
  if (currentLogoImage) {
    const customLogo = await createCustomLogo();
    config.image = customLogo || currentLogoImage;
    config.imageOptions = {
      hideBackgroundDots: true,
      imageSize: parseFloat(logoSizeInput.value),
      margin: logoBorderEnabled.checked ? 0 : parseInt(logoMarginInput.value)
    };
  }

  return config;
}

// Appliquer les styles de bordure du QR Code
function applyBorderStyles() {
  const canvas = qrCanvas.querySelector('canvas');
  if (!canvas) return;

  // Bordure du QR Code
  if (qrBorderEnabled.checked) {
    canvas.style.border = `${qrBorderWidth.value}px ${qrBorderStyle.value} ${qrBorderColor.value}`;
    canvas.style.borderRadius = `${qrBorderRadius.value}px`;
    canvas.style.padding = '10px';
    canvas.style.backgroundColor = colorLightInput.value;
    canvas.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    canvas.style.border = '3px solid #667eea';
    canvas.style.borderRadius = '10px';
    canvas.style.padding = '0';
    canvas.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  }
}

// Aperçu en temps réel
previewBtn.addEventListener('click', async () => {
  await generatePreview();
});

async function generatePreview() {
  qrCanvas.innerHTML = '';

  const config = await getCurrentConfig();
  currentQRCode = new QRCodeStyling(config);
  currentQRCode.append(qrCanvas);

  // Appliquer les styles de bordure après un court délai
  setTimeout(() => {
    applyBorderStyles();
  }, 100);

  downloadBtn.style.display = 'inline-block';
  downloadSvgBtn.style.display = 'inline-block';
}

// Génération et sauvegarde du QR Code
generateBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  const qrName = qrNameInput.value.trim() || 'QR Code sans nom';

  if (!url) {
    alert('Veuillez entrer une URL valide');
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    alert('L\'URL doit commencer par http:// ou https://');
    return;
  }

  // Générer l'aperçu
  await generatePreview();

  // Attendre un peu pour que le canvas soit rendu
  await new Promise(resolve => setTimeout(resolve, 300));

  // Sauvegarder le QR code
  const canvas = qrCanvas.querySelector('canvas');
  if (canvas) {
    const qrCodeData = {
      id: Date.now(),
      name: qrName,
      url: url,
      image: canvas.toDataURL('image/png'),
      date: new Date().toLocaleString('fr-FR'),
      config: await getCurrentConfig(),
      borderSettings: {
        qrBorder: {
          enabled: qrBorderEnabled.checked,
          width: qrBorderWidth.value,
          style: qrBorderStyle.value,
          color: qrBorderColor.value,
          radius: qrBorderRadius.value
        },
        logoBorder: {
          enabled: logoBorderEnabled.checked,
          width: logoBorderWidth.value,
          style: logoBorderStyle.value,
          color: logoBorderColor.value,
          radius: logoBorderRadius.value,
          background: logoBackgroundColor.value
        }
      }
    };

    qrCodes.unshift(qrCodeData);
    saveQRCodesToStorage();
    displaySavedQRCodes();
  }
});

// Télécharger le QR Code en PNG
downloadBtn.addEventListener('click', () => {
  const canvas = qrCanvas.querySelector('canvas');
  if (canvas) {
    const link = document.createElement('a');
    const name = qrNameInput.value.trim() || 'qrcode';
    link.download = `${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
});

// Télécharger le QR Code en SVG
downloadSvgBtn.addEventListener('click', () => {
  if (currentQRCode) {
    const name = qrNameInput.value.trim() || 'qrcode';
    currentQRCode.download({
      name: name,
      extension: 'svg'
    });
  }
});

// Afficher les QR codes sauvegardés
function displaySavedQRCodes() {
  savedQRList.innerHTML = '';

  if (qrCodes.length === 0) {
    savedQRList.innerHTML = '<p style="text-align: center; color: #999;">Aucun QR code créé pour le moment</p>';
    return;
  }

  qrCodes.forEach(qr => {
    const qrItem = document.createElement('div');
    qrItem.className = 'qr-item';
    qrItem.innerHTML = `
            <h4>${qr.name}</h4>
            <p>${qr.url}</p>
            <img src="${qr.image}" alt="${qr.name}">
            <p style="font-size: 0.8em; color: #999;">Créé le ${qr.date}</p>
            <div class="qr-item-actions">
                <button class="btn-small btn-download-small" onclick="downloadQRCode(${qr.id}, 'png')">
                    PNG
                </button>
                <button class="btn-small btn-download-small" onclick="downloadQRCode(${qr.id}, 'svg')">
                    SVG
                </button>
                <button class="btn-small btn-delete" onclick="deleteQRCode(${qr.id})">
                    Supprimer
                </button>
            </div>
        `;
    savedQRList.appendChild(qrItem);
  });
}

// Télécharger un QR code spécifique
async function downloadQRCode(id, extension) {
  const qr = qrCodes.find(q => q.id === id);
  if (qr) {
    if (extension === 'png') {
      const link = document.createElement('a');
      link.download = `${qr.name}.png`;
      link.href = qr.image;
      link.click();
    } else if (extension === 'svg' && qr.config) {
      const tempDiv = document.createElement('div');
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);

      const tempQR = new QRCodeStyling(qr.config);
      tempQR.append(tempDiv);

      setTimeout(() => {
        tempQR.download({
          name: qr.name,
          extension: 'svg'
        });
        document.body.removeChild(tempDiv);
      }, 100);
    }
  }
}

// Supprimer un QR code
function deleteQRCode(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce QR code ?')) {
    qrCodes = qrCodes.filter(q => q.id !== id);
    saveQRCodesToStorage();
    displaySavedQRCodes();
  }
}

// Sauvegarder dans le localStorage
function saveQRCodesToStorage() {
  localStorage.setItem('qrCodes', JSON.stringify(qrCodes));
}

// Charger depuis le localStorage
function loadQRCodesFromStorage() {
  const saved = localStorage.getItem('qrCodes');
  if (saved) {
    qrCodes = JSON.parse(saved);
  }
}
