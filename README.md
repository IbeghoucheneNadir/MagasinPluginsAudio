# MagasinPluginsAudio


Fonctionnnalit� r�alis� :

1. Afficher un catalogue contenant les plugins disponbles
2. Si en clique  sur la zone d�tails on va vers la page de d�tails de plugin 
3. Si en clique sur le bouton GO TO PLUGIN SHOP on va vers la page contenant tout les plugins
4. Si en clique sur plugin, on se verra rediriger vers la page de d�tail de ce dernier
5. Pagination
6. Recherche de plugin par nom (zone de recherche) 

Remarque :

J'ai pas afficher touttes les infroamtions sur les plugins dans la page de d�tail 




Installation est test de projet :

1. Back end  NosQL (mongodb)
2. J'ai t�l�charg� le fichier contenant tout les plugins sur le lien https://api.moddevices.com/v2/lv2/plugins et je l'est import� dans ma base de donn�es test (collection) 
3. Le serveur : pour le serveur je me suis inspir� de ce qu'on a fait dans les tps, je l'ai nomm� CRUD_NodeJS_Mongo (dossier)
4. Le client  : J'ai utilis� le framwork React 


Pour tester :
Lancer le server:

1. importer d�ja le fichier contenant tout les plugins dans votre base test       
2. t�l�ch�rger CRUD_NodeJS_Mongo puis cd dedans. 
3. taper node serverCrudWithMongo  
      --> le server sera lanc� sur le port 8080

Lancer le client  :
1. t�l�charger le dossier react_cli
2. cd dedans  "MagasinPluginsAudio/react_cli/plugin/"
3. npm install
4. npm start   -->  le client se lance sur http://localhost:3000/


# travail r�alis� par IBEGHOUCHENE Nadir  