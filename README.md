# rps-multiplayer
Rock Paper Scissor Multiplayer Game


Code is Buggy.  I have run out of time.  Below is the list of things
that need to be fixed.  If I had one more day I could've fixed these
bugs, but I have to work on my project because my team is behind!


1) Win or Lose message only shows up for the last person to enter their
selection

2) Chat box doesn't show for the opposite player until they also enter a
chat and the chats are not always coming out in the right order, even
though I sorted them on timestamp.

3) if player 1 exits the game, the new player that takes their spot does
not get the correct player number assigned to them.  If player 2 exits,
the new player does get the correct player number assigned to them.  In
other words, the third player always gets assigned player number 2,
regardless of if player 1 dropped out or player 2 dropped out.

4) clean up is needed; to make code neater and to organize functions,
etc, and to reduce the number of global variables.


Also, I want to give credit to James Martineau.  He shared his code with
me on tracking which screen belonged to which player.  I was trying to
tie it to the /connections, and I could not figure out a way to do that.
So I used James' design and went from there.  And looking at his code
helped me to undestand better how to access firebase databases.


