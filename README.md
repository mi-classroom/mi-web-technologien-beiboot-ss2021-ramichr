# Web Technologien // begleitendes Projekt Sommersemester 2021

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.

<br>
<br>

# Installation and Setup

## _Without Docker container:_

1. Clone the repository to your computer:

```
git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2021-ramichr.git

cd  mi-web-technologien-beiboot-ss2021-ramichr
```

2. Install a node dependency called **concurrently** for running multiple scripts in `package.json` :

```
npm install -g concurrently
```

3. Setting up both client and server:

```
npm run setup
```

4. Running the beiboot project:

```
npm run beiboot
```

Navigate on http://localhost:3000/

<br>
<br>

## _With Docker container:_

1. Clone the repository to your computer:

```
git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2021-ramichr.git

cd  mi-web-technologien-beiboot-ss2021-ramichr
```

2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) on your laptop.

3. Build client and server images.

```
docker-compose up -d --build
```

Navigate the project on http://localhost:3000/
