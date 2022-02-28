SHOW DATABASES;

CREATE DATABASE disneyMoviesVillains; 

USE disneyMoviesVillains; 
SHOW TABLES; 

USE disneyMoviesVillains; 
CREATE TABLE villainsINMovies (
id INT auto_increment,
name VARCHAR (225),
movie VARCHAR (225), 
slug VARCHAR (225),
createdAt DATETIME DEFAULT NOW(),
updatedAT DATETIME DEFAULT NOW(),
deletedAT DATETIME, 
PRIMARY KEY (id)
);

USE disneyMoviesVillains;
INSERT INTO villainsINMovies (name,movie,slug) VALUES ( 'Captain Hook','Peter Pan','captain-hook') , ('Cruella de Vil','One Hundred and One Dalmatians','cruella-de-vil') , ('Gaston','Beauty and the Beast','gaston') , ('Hades','Hercules','hades') , ('Horned King','The Black Cauldron','horned-king') , 
('Jafar','Aladdin','jafar'), ('Lady Tremaine', 'Cinderella','lady-tremaine') , ('Madame Medusa','The Rescuers','madame-medusa'),( 'Madam Mim', 'The Sword in the Stone','madam-mim'),
('Maleficent','Sleeping Beauty','maleficent'), ('Prince John','Robin Hood','sir-hiss') , ('Queen Grimhilde', 'Snow White and the Seven Dwarfs','queen-grimhilde'), ( 'Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'), ('Scar', 'The Lion King','scar'),
( 'Shan Yu', 'Mulan', 'shan-yu'), ('Shere Khan','The Jungle Book','shere-khan'), ('Ursula','The Little Mermaid','ursula');

USE disneyMoviesVillains;
SELECT * FROM disneyMoviesVillains.villainsINMovies;

