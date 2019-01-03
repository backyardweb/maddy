---
layout: post
title: TF2 Stadium Tech Stack
date: 2017-02-27T00:00:00.000Z
categories:
  - software
comments: false
---

I originally wrote this post for an open source project I worked on called **TF2 Stadium**. The post was originally available at <http://blog.tf2stadium.com>. I am re posting it now since the blog has been shut down. It is mostly semi technical information that was released as teaser/promotional content in the early stages of development. TF2Stadium is a Team Fortress 2 _lobby_ website where competitive players are matched with other players for practice matches.

Original post date: 03 SEP 2015

* * *

Hello, and welcome to the first actual entry of the TF2Stadium developer blog. In this entry, we will summarize some of the technology that our site uses, as well as some of our design goals.

The programming of TF2Stadium--as well as most other sites--is split into two major groups: "frontend" and "backend".

<!-- more -->

# The Frontend

Frontend is everything from the way the page looks to the experience of using the site. The frontend is made up of HTML, CSS, and Javascript, which together form the page that a user sees.

TF2Stadium is a Single Page Application, which means the entire site and most of its assets are loaded during the initial load of the page. After that, navigation does not require page loads, which in turn make the site much more responsive. This isn't free of downsides however, such as a longer initial loading time and the necessity of using Javascript.

We are using AngularJS as a web framework. Web frameworks are used to remove or lessen the need for small and repetitive operations when writing code. It is a Javascript framework developed in-house by Google to produce dynamic web applications. Using AngularJS will result in cleaner and easier to maintain code. This is so we can focus on programming what we want our site to be without needing to create a coding structure first. AngularJS gives us that engine we can write on top of.

We decided before development began to follow the principles set out by Material Design. In short, Material Design is a "Visual Language" which takes advantage of a bold and clean feel, while not sacrificing usability. The Material design spec was also developed by Google and can be seen in a lot of their products. The Angular-Material library allows our developers to create Material interfaces using the aforementioned AngularJS.

For styling, we use an extension called "Sass" for CSS3 (also known as SCSS). Sass is the clear choice for the project due to its relatively simple nature, and its superb maintainability. It also removes the need to repeat CSS statements throughout the stylesheets, which eliminates needless code.

The backend of TF2Stadium refers to everything that goes on server-side. The backend is written in the Go Programming Language. Go is developed and maintained by Google and the open source community. Recently it has seen increased adoption in the cloud with companies like Facebook, Dropbox, and Google using it in a variety of in-house projects. Go implements powerful facilities and an extensive standard library which provides a wide range of functionality.

## For anyone interested, our Go stack uses:

-   Gorilla Web Toolkit - URL routing and session cookies
-   ORM interface to PostgreSQL - database related operations
-   go-socket.io - communication with the frontend
-   SimpleJSON - Go library to interact with arbitrary JSON
-   op-logging - logging framework
-   james4k's rcon Go library - sending and receiving messages over the RCON protocol
-   testify - testing suite (including assertions) for unit tests

Our interactions with TF2 are managed by two programs written by our backend team: Pauling and Helen. Helen is responsible for maintaining the database and keeping track of active lobbies and stats. It is also responsible for communicating with the frontend. Pauling handles everything related to the game servers. It connects to the game servers via RCON, then exposes an API to Helen. The API is then used to allow Helen to make Pauling send RCON commands for configuring servers, verifying connections to check if the server is still up, and executing a league config and whitelist for each server. It also listens to the server logs and notifies Helen about events like the match ending, and players connecting and disconnecting from the server.

We have also written two Go libraries: PlayerStatsScraper and TF2RconWrapper. Pauling uses TF2RconWrapper, a library written by one of our team members which wraps around james4k's rcon for TF2-specific operations and commands. Player stats (hours played, name, and country) are retrieved using PlayerStatsScraper.

# The Link

Both parts communicate with each other through a protocol called WebSocket. This allows for a two-way conversation between the Frontend and the Backend, meaning both of them can send requests to each other which are rapidly processed without the need of a refresh in the page.

For example, Helen can tell the Frontend that a new lobby was created only once, and the latter doesn't have to periodically ask "which lobbies are open". It just has to react to the messages it has received. Likewise, the Frontend can notify Helen who will send a message to every user online saying "There's a new message. Here it is."

For more specific information, see <https://github.com/TF2Stadium/Specifications/blob/master/Communication.md>

# Final Thoughts

More detailed information about the site and its features will come in our later blog entries. Until then, stay tuned on Twitter and the Steam group.

Want us to write a blog post about a specific topic? Tweet us, or send us suggestions on Steam or TFTV. We want to write about what the community is interested in! d in!
