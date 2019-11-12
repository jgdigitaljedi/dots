# dots

## Overview

I was asked to do this a s challenge. I got the bulk of the logic done on the first day and further expanded the functionality while cleaning things up a little on the second day. Canvas and classes were the obvious picks here. I would have chosen to do TypeScript classes, but the rules said not to use any libraries. For this GitHub repo, I did use some npm dependencies only for a development process. The actuall game does not use any libs.

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

I have this set up where the faster the speed the greater the point value AND the smaller the the dot the greater the point value. In other words, small dots on fast speeds are worth quite a bit!
