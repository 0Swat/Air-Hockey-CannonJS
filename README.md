
# Air hockey
![Air hockey ](https://imgur.com/Ccz4AeO.png)

## _Created by:_

- **Oskar Swat**   
- **Marcel Tracz**


*University of Lodz 2023*

# Project Development History

## Initial Game Concepts:

-   Air hockey table with paddles and puck
-   Working physics: accurate rebounds, puck slowing down, acceleration after rebounds
-   Paddle control initially sideways only, later expanded to half the table in all directions
-   Table in a dark room, overhead light - one lamp
-   Functioning scoreboard

## Libraries Used:

-   Physics: Cannon.js
-   Models (room): GLTFLoader
-   Models, lights, shadows, textures: Three.js
-   Local server for display: Parcel

# Initial Model Creation:

*Puck:*  
![Puck ](https://i.imgur.com/IVnpC4m.png)

*Paddles:*   
![Paddles](https://i.imgur.com/D7a18Bk.png)  
*Table:*    
![Table1](https://i.imgur.com/RilImji.png)
![Table2](https://i.imgur.com/Y4l8k0C.png)  
*Light DEMO Version:*  
![Light](https://i.imgur.com/fMYc1Xj.png)

# Initial Game Physics Implementation:

## Engine a :  
![Engine A](https://i.imgur.com/EDuf0gz.png)
 - Puck rebounding off walls   
 - Poor paddle control  
 -  Incorrect puck-paddle collision

## Engine b:  
![Engine B](https://i.imgur.com/pMuc1Qa.png)
 - Puck rebounding off walls   
 - **Correct** paddle control    
 - Incorrect puck-paddle collision

# Initial Implementation of cannon.js Engine:

*Creating puck and paddle objects in cannon.js:*  
![img1](https://i.imgur.com/4r4u7Fy.png)

*Testing cannon.js engine on test objects:*  
![img2](https://i.imgur.com/sqZ0ld9.png)

*Adding walls in cannon.js:*
*Adding paddle control:*  
![img3](https://i.imgur.com/JCdIVjL.png)

*Initiating puck movement"*
*Adding friction:*
*Removing air resistance:*
*Setting gravity correctly:*  
![img4](https://i.imgur.com/cYZxRC6.png)

***Later also creating goal holes and scoring mechanics***


# Initial Frontend Development

*Connecting ready-made models with cannon.js engine and minor adjustments :*  
![img5](https://i.imgur.com/s7q51Nz.png)

*Adding ready-made room model, field, and scoreboard:*   
![img6](https://i.imgur.com/0bygSWU.png)

*Adding lights and shadows:*  
![img7](https://i.imgur.com/FW5leeX.png)![img8](https://i.imgur.com/nZX0il5.png)


# Finalized Project  
![ready1](https://i.imgur.com/VoNeF4E.png)![ready2](https://i.imgur.com/yleJjCY.png)
![ready3](https://i.imgur.com/vIK3VBT.png)


# Instructions:

_Launching the game on a local server using the command:_

> parcel ./src/index.html.

-   Paddle control keys **WSAD** and **IKJL**.
-   Camera control using the mouse through Orbit Controls (dragging, scroll for zooming).
