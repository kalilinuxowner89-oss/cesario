# 🚀 Guide Complet de Déploiement sur Heroku

## Étape 1 : Préparation

### 1.1 Créer un compte Heroku
1. Allez sur https://www.heroku.com
2. Cliquez sur "Sign Up"
3. Remplissez le formulaire avec vos informations
4. Vérifiez votre email
5. Créez un mot de passe fort

### 1.2 Installer Heroku CLI

**Windows :**
```bash
# Télécharger l'installateur
https://cli-assets.heroku.com/heroku-x64.exe

# Ou avec Chocolatey
choco install heroku-cli
```

**Mac :**
```bash
brew tap heroku/brew && brew install heroku
```

**Linux :**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### 1.3 Vérifier l'installation
```bash
heroku --version
```

---

## Étape 2 : Préparation du Projet

### 2.1 Ajouter les fichiers nécessaires

#### A) Créer `Procfile`
Ce fichier dit à Heroku comment lancer votre application.

```bash
echo "web: npm start" > Procfile
```

#### B) Vérifier `package.json`
Assurez-vous d'avoir les bonnes scripts :

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### C) Créer `.env.example` (si pas déjà fait)
```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cesario
JWT_SECRET=your_jwt_secret_key
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_verify_token
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
ADMIN_PHONE=+33612345678
```

### 2.2 Vérifier .gitignore
Assurez-vous que `.env` n'est PAS en repo :

```bash
# Voir le contenu
cat .gitignore

# Doit contenir
.env
.env.local
node_modules/
```

### 2.3 Commit les changements
```bash
git add .
git commit -m "Prepare for Heroku deployment"
```

---

## Étape 3 : Configuration de MongoDB

### 3.1 Créer une base MongoDB Atlas (Gratuite)

1. Allez sur https://www.mongodb.com/cloud/atlas
2. Cliquez sur "Try Free"
3. Créez un compte (ou connectez-vous)
4. Créez une organisation et un projet
5. Créez un cluster :
   - Choisissez "M0 Sandbox" (Gratuit)
   - Sélectionnez la région (eu-west-1 pour Europe)
   - Cliquez sur "Create Cluster"
6. Attendez 5-10 minutes que le cluster soit créé

### 3.2 Créer un utilisateur de base de données

1. Dans MongoDB Atlas, allez à "Database Access"
2. Cliquez "Add New Database User"
3. Remplissez :
   - Username: `cesario`
   - Password: Générez un mot de passe complexe (copier-le !)
   - Database User Privileges: "Read and write to any database"
4. Cliquez "Add User"

### 3.3 Ajouter votre IP

1. Allez à "Network Access"
2. Cliquez "Add IP Address"
3. Sélectionnez "Allow Access from Anywhere" (pour Heroku)
4. Confirmez

### 3.4 Obtenir la chaîne de connexion

1. Allez au cluster, cliquez "Connect"
2. Choisissez "Connect your application"
3. Sélectionnez "Node.js" comme driver
4. Copiez la chaîne de connexion :

```
mongodb+srv://cesario:PASSWORD@cluster.mongodb.net/cesario?retryWrites=true&w=majority
```

⚠️ **Remplacez `PASSWORD` par le mot de passe que vous avez créé**

---

## Étape 4 : Créer l'Application Heroku

### 4.1 Se connecter à Heroku

```bash
heroku login
```

Cela ouvrira un navigateur. Connectez-vous avec votre compte.

### 4.2 Créer l'application

```bash
heroku create cesario-bot
```

⚠️ Le nom doit être unique. Si `cesario-bot` est pris, essayez :
- `cesario-bot-2024`
- `cesario-whatsapp`
- `mon-cesario`

Votre URL sera : `https://cesario-bot.herokuapp.com`

### 4.3 Vérifier le remote

```bash
git remote -v
```

Vous devez voir :
```
heroku  https://git.heroku.com/cesario-bot.git (fetch)
heroku  https://git.heroku.com/cesario-bot.git (push)
```

---

## Étape 5 : Configurer les Variables d'Environnement

### 5.1 Via Heroku CLI

```bash
# Variable par variable
heroku config:set NODE_ENV=production -a cesario-bot
heroku config:set MONGODB_URI="mongodb+srv://cesario:PASSWORD@cluster.mongodb.net/cesario" -a cesario-bot
heroku config:set JWT_SECRET="your_very_secret_key_12345" -a cesario-bot
heroku config:set WHATSAPP_API_KEY="your_api_key" -a cesario-bot
heroku config:set WHATSAPP_BUSINESS_ACCOUNT_ID="your_account_id" -a cesario-bot
heroku config:set WHATSAPP_PHONE_NUMBER_ID="your_phone_id" -a cesario-bot
heroku config:set WHATSAPP_VERIFY_TOKEN="cesario_verify_token_123" -a cesario-bot
heroku config:set ADMIN_USERNAME="admin" -a cesario-bot
heroku config:set ADMIN_PASSWORD="your_admin_password" -a cesario-bot
heroku config:set ADMIN_PHONE="+33612345678" -a cesario-bot
```

### 5.2 Vérifier les variables

```bash
heroku config -a cesario-bot
```

Vous devez voir toutes les variables configurées.

### 5.3 Alternative : Via le Dashboard Heroku

1. Allez sur https://dashboard.heroku.com/apps
2. Cliquez sur votre app `cesario-bot`
3. Allez à "Settings"
4. Cliquez "Reveal Config Vars"
5. Ajoutez chaque variable

---

## Étape 6 : Déployer sur Heroku

### 6.1 Push le code

```bash
git push heroku main
```

⚠️ Si votre branche s'appelle `master` :
```bash
git push heroku master
```

### 6.2 Attendre le déploiement

Vous verrez :
```
remote: -----> Building source
remote: -----> Installing dependencies with npm
remote: -----> Build succeeded!
remote: -----> Deploying...
```

Attendez 2-3 minutes que le déploiement se termine.

### 6.3 Vérifier l'application

```bash
heroku open -a cesario-bot
```

Ou allez sur : `https://cesario-bot.herokuapp.com`

Vous devez voir la page d'accueil de Cesario ! ✅

---

## Étape 7 : Voir les Logs

### 7.1 Logs en temps réel

```bash
heroku logs --tail -a cesario-bot
```

### 7.2 Derniers logs

```bash
heroku logs -a cesario-bot
```

### 7.3 Chercher une erreur

```bash
heroku logs -a cesario-bot | grep "error"
```

---

## Étape 8 : Configurer le Webhook WhatsApp

### 8.1 Aller à WhatsApp Business API Console

1. Allez sur https://developers.facebook.com
2. Sélectionnez votre app
3. Allez à "Webhooks"

### 8.2 Configurer le Callback URL

1. Entrez l'URL :
```
https://cesario-bot.herokuapp.com/webhook/whatsapp
```

2. Entrez le Verify Token :
```
cesario_verify_token_123
```

3. Sélectionnez les événements :
   - ✅ messages
   - ✅ message_template_status_update

4. Cliquez "Verify and Save"

### 8.3 Tester le webhook

```bash
curl -X GET "https://cesario-bot.herokuapp.com/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=cesario_verify_token_123&hub.challenge=CHALLENGE_ACCEPTED" 
```

Vous devez recevoir `CHALLENGE_ACCEPTED` en réponse.

---

## Étape 9 : Accéder à Votre Application

### 📱 **Frontend**
- Accueil: https://cesario-bot.herokuapp.com
- Dashboard: https://cesario-bot.herokuapp.com/dashboard
- Santé: https://cesario-bot.herokuapp.com/health

### 🔌 **API**
- Login: `POST https://cesario-bot.herokuapp.com/api/auth/login`
- Lister les bans: `GET https://cesario-bot.herokuapp.com/api/bans`
- Bannir un numéro: `POST https://cesario-bot.herokuapp.com/api/bans/add`

---

## 🔧 Maintenance et Mises à Jour

### Redéployer après changements

```bash
git add .
git commit -m "Update cesario bot"
git push heroku main
```

### Relancer l'application

```bash
heroku restart -a cesario-bot
```

### Voir l'état des dynos

```bash
heroku ps -a cesario-bot
```

### Voir l'utilisation des ressources

```bash
heroku logs --tail -a cesario-bot
```

---

## ⚠️ Dépannage

### Erreur : "Application error"

1. Vérifiez les logs :
```bash
heroku logs --tail -a cesario-bot
```

2. Vérifiez les variables d'environnement :
```bash
heroku config -a cesario-bot
```

3. Redémarrez l'app :
```bash
heroku restart -a cesario-bot
```

### Erreur : "Cannot find module"

```bash
heroku run npm install -a cesario-bot
```

### Erreur : "MongoDB connection failed"

1. Vérifiez la chaîne MONGODB_URI
2. Vérifiez que votre IP est autorisée dans MongoDB Atlas
3. Vérifiez le mot de passe de la base de données

```bash
heroku config:set MONGODB_URI="mongodb+srv://cesario:NEW_PASSWORD@cluster.mongodb.net/cesario" -a cesario-bot
```

### Erreur : "Webhook verification failed"

1. Vérifiez que le token correspond
2. Vérifiez que l'URL est correcte
3. Testez le webhook :
```bash
curl -X GET "https://cesario-bot.herokuapp.com/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=cesario_verify_token_123&hub.challenge=test"
```

---

## 📊 Monitoring

### Vérifier l'état du bot

```bash
curl https://cesario-bot.herokuapp.com/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Dashboard Heroku

Allez sur https://dashboard.heroku.com/apps/cesario-bot pour voir :
- Utilisation des dynos
- Logs de l'application
- Addons (MongoDB, etc.)
- Équipe et permissions

---

## 💰 Coûts

### Plan gratuit
- ✅ Gratuit jusqu'à 550 heures/mois
- ✅ 1 dyno de 512 MB
- ⚠️ L'app s'endort après 30 min d'inactivité
- ⚠️ Restart quotidien requis

### Plan Eco ($5/mois)
- ✅ 1000 heures/mois
- ✅ Pas de sleep
- ✅ Idéal pour les petits bots

### Plan Professional ($50+/mois)
- ✅ Dyno dédié
- ✅ Meilleure performance
- ✅ Support prioritaire

---

## 🎉 Résumé

✅ Votre bot Cesario est maintenant en direct sur Heroku !

**URL**: https://cesario-bot.herokuapp.com
**Dashboard**: https://cesario-bot.herokuapp.com/dashboard
**Webhook**: https://cesario-bot.herokuapp.com/webhook/whatsapp

---

## ❓ Questions ?

Pour plus d'aide :
- 📖 [Documentation Heroku](https://devcenter.heroku.com)
- 🔗 [Forum Heroku](https://stackoverflow.com/questions/tagged/heroku)
- 💬 [GitHub Issues](https://github.com/kalilinuxowner89-oss/cesario/issues)

**Bon déploiement ! 🚀**