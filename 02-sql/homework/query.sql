1. __Birthyear__

Buscá todas las películas filmadas en el año que naciste.
 SELECT * FROM movies
 WHERE year = 1977;

 2. __1982__

Cuantas películas hay en la DB que sean del año 1982?

SELECT COUNT(*) AS total
FROM movies
WHERE year =1982;

3. __Stacktors__

Buscá actores que tengan el substring `stack` en su apellido.

SELECT * FROM actors
WHERE last_Name LIKE '%stack%';

4. __Fame Name Game__

Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?

SELECT first_name, last_Name, COUNT(*) AS total
FROM actors 
GROUP BY LOWER(first_name), LOWER(last_Name)
ORDER BY total DESC
LIMIT 10;

5. __Prolific__

Listá el top 100 de actores más activos junto con el número de roles que haya realizado.

SELECT a.first_name, a.last_Name, COUNT(*) AS total_roles
FROM actors AS a
JOIN roles AS r ON a.id = r.actor_id
GROUD BY a.id
ORDER BY total_roles DESC
LIMIT 20;
