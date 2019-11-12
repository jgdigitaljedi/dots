# dots

## Overview

I was asked to do this a s challenge. I got the bulk of the logic done on the first day and further expanded the functionality while cleaning things up a little on the second day. Canvas and classes were the obvious picks here. I would have chosen to do TypeScript classes, but the rules said not to use any libraries so I figured that meant this was a test to see my raw JavaScript knowledge. For this GitHub repo, I did use some npm dependencies only for a development process. The actual game does not use any libs.

For more canvas games by me (this is something I've tinkered with in the past), check out my OLD repo [https://github.com/jgdigitaljedi/simpleGames](https://github.com/jgdigitaljedi/simpleGames). It's not all complete, but pong and breakout work and the breakout project shows the various stages of feature adds I went through which, at the time I thought was cool, but is kind of silly in retrospect. The breakout game also needs to have the small margins removed from the bricks as I figured it this causes occasional weird collision detection behavior.

## To run

```
git clone https://github.com/jgdigitaljedi/dots.git
cd dots
npm i
```

#### dev process

```
npm run dev
```

I didn't spend much time on the dev process as it was somewhat pointless. I just wanted something to watch and compile on change. That said, `npm run dev` runs the dev process with watchers and compiling. I realized that it doesn't comile the scss initially until a change is made. Also, it doesn't refresh the browser so you have to do that. Still, after the initall scss change was made, I just accepted that I would be refreshing the browser and moved on in the interest of getting this knocked out quickly.

#### regular process

```
npm start
```

## The Game

- use the start button to start and pause the game
- click the dots to get points
  - the faster the speed, the higher the points
  - the smaller the dot, the higher the points
- dots are color coded by their size which also means by their point value

While far from perfection, I tried to rpesent something that is responsive, has a decent theme/color palette, and meets the requirements and I wanted it to be done as quickly as possible because Ive got a busy week ahead of me!

I thought about adding another slider to change the delay between dot creation. The idea was to allow the player to make them not only drop more quickly but in fast succession and I would have made that increased the score even more. The logic would have been quite simple. The html and styling would have been a slight pain wwith the responsiveness.
