# Web Technologies // accompanying project summer semester 2021

There is an accompanying project for the Web Technologies module. As part of this project, we will successively develop a project from event to event and look at the progress, do code reviews and present and discuss development steps as part of the event.

We will use GitHub Classroom as the organizational framework for the project. In terms of content, we are looking at developing a small web application for editing images. The focus here is less on a professional conception, design and development process, but rather on successively developing an application, trying it out, comparing, refactoring and enjoying executable code.

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
