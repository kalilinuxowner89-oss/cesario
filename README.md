# 🤖 Cesario - WhatsApp Bot Public

**Bot WhatsApp avancé avec l'API WhatsApp Business, système de bannissement et capacités spéciales**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![Status](https://img.shields.io/badge/status-Active-success)

---

## ✨ Fonctionnalités Principales

### 🔐 Système de Bannissement Avancé
- Bannir/débannir des numéros WhatsApp en temps réel
- Stockage persistant dans MongoDB
- Gestion des raisons et dates de bannissement
- Commandes faciles via WhatsApp
- API REST pour intégrations externes

### 🎛️ Gestion Multi-Bots
- Créer et gérer plusieurs bots
- Configuration individuelle par bot
- Activation/désactivation facile
- Statut en temps réel

### 📊 Dashboard Complet
- Interface web intuitive
- Vue d'ensemble avec statistiques
- Gestion des bots et bans
- Système de paramètres
- Design responsive

### 🔌 Système de Plugins
- Echo - Répète les messages
- Info - Information du bot
- Ban - Gestion des bannissements
- Download - Télécharger depuis des liens
- Sticker - Créer des stickers

### 🔒 Sécurité
- Authentification JWT
- Hashage des mots de passe (bcrypt)
- Variables d'environnement sécurisées
- Protection CORS
- Headers de sécurité (Helmet)
- Validation des entrées

### 📱 API REST Complète
- Endpoints authentifiés
- Documentation complète
- Gestion des erreurs
- Réponses JSON structurées

---

## 🚀 Installation Rapide

### Prérequis
- **Node.js** >= 16
- **MongoDB** >= 4.0
- **Compte WhatsApp Business**
- **npm** ou **yarn**

### Étapes d'Installation

1. **Cloner le repository**
```bash
git clone https://github.com/kalilinuxowner89-oss/cesario.git
cd cesario
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env .env
# Éditer .env avec vos configurations
```

4. **Lancer le serveur**
```bash
# Développement (avec hot reload)
npm run dev

# Production
npm start
```

5. **Accéder à l'application**
- 🏠 Accueil: http://localhost:3000
- 📊 Dashboard: http://localhost:3000/dashboard
- ✅ Santé: http://localhost:3000/health

---

## 📋 Configuration

### Variables d'Environnement Essentielles

```env
# Serveur
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

# Base de données
MONGODB_URI=mongodb://localhost:27017/cesario

# WhatsApp Business API
WHATSAPP_API_KEY=your_api_key
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_VERIFY_TOKEN=your_verify_token

# Authentification
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_PHONE=+33612345678

# Fonctionnalités
ENABLE_BAN_SYSTEM=true
ENABLE_PLUGINS=true
```

Voir `.env` pour la liste complète des variables.

---

## 💬 Commandes WhatsApp

### Commandes de Base

| Commande | Description | Exemple |
|----------|-------------|----------|
| `/ban` | Bannir un numéro | `/ban +33612345678` |
| `/unban` | Débannir un numéro | `/unban +33612345678` |
| `/banlist` | Voir les numéros bannis | `/banlist` |
| `/help` | Afficher l'aide | `/help` |
| `/info` | Info du bot | `/info` |
| `/echo` | Répéter le message | `/echo Hello` |

### Commandes Admin

```
⚠️ Seuls les numéros autorisés (ADMIN_PHONE) peuvent exécuter:
- /ban - Bannir un numéro
- /unban - Débannir un numéro
- /banlist - Voir tous les bannis
```

---

## 🌐 API REST

### Exemples de Requêtes

#### Authentification
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Réponse
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Bannir un Numéro
```bash
curl -X POST http://localhost:3000/api/bans/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"number": "+33612345678", "reason": "Spam"}'

# Réponse
{
  "success": true,
  "ban": {
    "_id": "507f1f77bcf86cd799439011",
    "number": "+33612345678",
    "reason": "Spam",
    "bannedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Lister les Bannis
```bash
curl -X GET http://localhost:3000/api/bans \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Pour plus d'exemples, voir [API.md](API.md)

---

## 🐳 Déploiement

### Docker
```bash
# Build l'image
docker build -t cesario:latest ./deploy

# Lancer le conteneur
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongo:27017/cesario \
  -e WHATSAPP_API_KEY=your_key \
  --name cesario-bot \
  cesario:latest
```

### Render.com (Recommandé)
1. Push le code sur GitHub
2. Connectez Render à votre repo
3. Configurez les variables d'environnement
4. Déploiez !

Voir [DEPLOYMENT.md](deploy/DEPLOYMENT.md) pour les détails complets.

### Heroku
```bash
heroku create cesario-bot
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set WHATSAPP_API_KEY=your_key
git push heroku main
```

---

## 📊 Structure du Projet

```
cesario/
├── server.js                 # Serveur principal Express
├── package.json             # Dépendances
├── .env                     # Variables d'environnement
├── .gitignore              # Fichiers ignorés
├── routes/
│   ├── api.js              # Endpoints API bans
│   ├── auth.js             # Authentification
│   └── bots.js             # Gestion des bots
├── services/
│   ├── logger.js           # Logging (Winston)
│   ├── database.js         # Connexion MongoDB
│   ├── botManager.js       # Gestion des bots
│   └── banManager.js       # Système de ban
├── plugins/
│   ├── echo.js             # Plugin Echo
│   ├── info.js             # Plugin Info
│   ├── ban.js              # Plugin Ban
│   ├── download.js         # Plugin Téléchargement
│   └── sticker.js          # Plugin Stickers
├── public/
│   ├── index.html          # Page d'accueil
│   ├── dashboard.html      # Tableau de bord
│   ├── css/style.css       # Styles
│   └── js/
│       ├── app.js          # App frontend
│       └── chat.js         # Interface chat
├── deploy/
│   ├── Dockerfile          # Image Docker
│   └── DEPLOYMENT.md       # Guide déploiement
├── API.md                  # Documentation API
├── CONTRIBUTING.md         # Guide contribution
├── CHANGELOG.md            # Historique des versions
└── LICENSE.md              # Licence MIT
```

---

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Avec couverture
npm test -- --coverage

# Mode watch
npm test -- --watch
```

---

## 🔧 Développement

### Stack Technologique
- **Backend**: Node.js, Express.js
- **Base de données**: MongoDB, Mongoose
- **Authentification**: JWT, bcrypt
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Sécurité**: Helmet, CORS
- **Logging**: Winston
- **Déploiement**: Docker, Render, Heroku

### Développement Local
```bash
# Cloner et installer
git clone https://github.com/kalilinuxowner89-oss/cesario.git
cd cesario
npm install

# Copier .env
cp .env .env

# Lancer en développement
npm run dev

# Linter
npm run lint
```

---

## 📚 Documentation

- 📖 [README.md](README.md) - Ce fichier
- 🔌 [API.md](API.md) - Documentation API complète
- 🚀 [DEPLOYMENT.md](deploy/DEPLOYMENT.md) - Guides de déploiement
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution
- 📋 [CHANGELOG.md](CHANGELOG.md) - Historique des versions

---

## 🤝 Contribution

Les contributions sont bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez (`git commit -m 'Add AmazingFeature'`)
4. Pushez (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 🐛 Bug Reports & Features

- 🐛 [Signaler un bug](https://github.com/kalilinuxowner89-oss/cesario/issues/new?template=bug_report.md)
- ✨ [Demander une feature](https://github.com/kalilinuxowner89-oss/cesario/issues/new?template=feature_request.md)

---

## 📜 License

Ce projet est sous license **MIT** - voir [LICENSE.md](LICENSE.md)

---

## 👨‍💻 Auteur

**kalilinuxowner89-oss**

- 🐙 GitHub: [@kalilinuxowner89-oss](https://github.com/kalilinuxowner89-oss)
- 📧 Email: kalilinuxowner89@gmail.com

---

## 🙏 Remerciements

- WhatsApp Business API
- Express.js Community
- MongoDB
- Open Source Community

---

## 📞 Support

Nous vous aidons ! Contactez-nous via:
- 💬 [GitHub Issues](https://github.com/kalilinuxowner89-oss/cesario/issues)
- 📧 Email support
- 🌐 [Documentation](API.md)

---

<div align="center">

**Cesario - Votre Bot WhatsApp Intelligent** 🤖

⭐ N'oubliez pas de mettre une star si vous aimez ce projet!

[⬆ Retour en haut](#-cesario---whatsapp-bot-public)

</div>