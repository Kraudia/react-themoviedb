Prosta aplikacja konsumująca [API The Movie DB](https://developers.themoviedb.org/), która spełnia następujące kryteria:
* można wyszukać dowolny film
* filmy pasujące do wyszukiwania widać na liście filmów
* na liście filmów widać następujące informacje o filmach:
    *  	okładka
    *  	tytuł
    *  	data publikacji
    *  	popularność
    *  	liczba głosów
    *  	średnia ocena z głosów
*   można zobaczyć szczegóły wybranego filmu:
    *	kategorię filmu (komedia, dramat, etc)
    *	link do IMDB
    *	opis filmu
    *	kraj produkcji
    *	firmy produkcyjne
*	można sortować listę filmów po tytule

### Wymagania

Potrzebujesz Node  w wersji 6.9.0 lub nowszej oraz NPM w wersji 3  lub nowszej.

### Instalacja

Najpierw sklonuj tej projekt oraz zainstaluj wszystkie paczki, korzystając z konsoli (wiersza poleceń).

```
npm install
```
A następnie uruchom projekt.

```
npm start
```

Projekt jest dostępny na `http://localhost:3000/`. Po każdej zmianie w kodzie aplikacja automatycznie się odswieża.

### Użyte technologie i narzędzia

* [React](https://reactjs.org/) - framework oparty wspomagający tworzenie i rozwój aplikacji internetowych
* [React Bootstrap with Material Design](https://www.npmjs.com/package/mdbreact) -  zestaw gotowych fragmentów kodu do tworzenia responsywnych stron internetowych
