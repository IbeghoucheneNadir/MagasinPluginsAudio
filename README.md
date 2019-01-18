# MagasinPluginsAudio


Fonctionnnalité réalisé :

1. Afficher un catalogue contenant les plugins disponbles
2. Si en clique  sur la zone détails on va vers la page de détails de plugin 
3. Si en clique sur le bouton GO TO PLUGIN SHOP on va vers la page contenant tout les plugins
4. Si en clique sur plugin, on se verra rediriger vers la page de détail de ce dernier
5. Pagination
6. Recherche de plugin par nom (zone de recherche) 

Remarque :

J'ai pas afficher touttes les infroamtions sur les plugins dans la page de détail 




Installation est test de projet :

1. Back end  NosQL (mongodb)
2. J'ai téléchargé le fichier contenant tout les plugins sur le lien https://api.moddevices.com/v2/lv2/plugins et je l'est importé dans ma base de données test (collection) 
3. Le serveur : pour le serveur je me suis inspiré de ce qu'on a fait dans les tps, je l'ai nommé CRUD_NodeJS_Mongo (dossier)
4. Le client  : J'ai utilisé le framwork React 


Pour tester :
Lancer le server:

1. importer déja le fichier contenant tout les plugins dans votre base test       
2. téléchérger CRUD_NodeJS_Mongo puis cd dedans. 
3. taper node serverCrudWithMongo  
      --> le server sera lancé sur le port 8080

Lancer le client  :
1. télécharger le dossier react_cli
2. cd dedans  "MagasinPluginsAudio/react_cli/plugin/"
3. npm install
4. npm start   -->  le client se lance sur http://localhost:3000/


# travail réalisé par IBEGHOUCHENE Nadir  