nov 12, 2022

C:\dev\info-feed (new computer)

Derived from tutorial:
    Beginner Next.js Tutorial - Coding A News App With Next.js
    https://www.youtube.com/watch?v=xtItzwYG6oQ

    by PortEXE

This app retrieves news articles through NewsAPI 
based on either one or two interests chosen at 
random from a list of personal interests.

This list of personal interests is stored in a sanity.io 
database which can be updated by clicking 'Edit Terms' to go 
to an online interface that sanity.io makes available.

Going to the second page activates a news websites feed which
could be run on a second screen at which one might
glance from time to time.

In order for a deployed build to work, it is necessary 
to connect to NewsAPI from the server side, which is 
what this build does.

In a previous project, the api call to NewsAPI is from the 
client side, and therefore only works locally.

The previous project:
    https://github.com/jergra/NewsAPI-app
    C:\dev\news-api-app (old computer)


start:
    npm run dev

deployed:
    https://news-feed-react-sanity.vercel.app/

update:
    git add .
    git commit -m "message"
    git push


To remake the database, go into news-feed-database/schemas/ and change
the files there, then run 'sanity init', answer some questions,
then run 'sanity start', add some new content using the interface.
The projectId has now changed.  Put the new projectId into lib/client
in the root. A new API token is also needed, which will go in .env.
Therefore the environment variable at Vercel also needs to be updated.
Sanity Studio also needs to be redeployed. cd into the database folder (news-feed-database) 
and run 'sanity deploy'.
'sanity help' will bring up help.
Run 'npm run dev' in the root.

If we were making a new project starting from a clone of this project:
    npm install
    sanity init, answer questions
    at <database folder>/schemas copy over the two files from <old database folder>/schemas
    cd into the database folder
    sanity start
    put new projectId in lib/client in the root
    get an API token for this project from sanity.io, put in .env
    still in the database folder, type 'sanity deploy'
    delete the old database folder that came with the clone
    back in the root, type 'npm run dev'


