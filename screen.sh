
# Screen documentation used to create this:
# http://blog.lathi.net/articles/2008/09/13/scripting-screen
# http://www.debian-administration.org/articles/560
# http://www.gnu.org/software/screen/manual/screen.html

# \n, \r, \015 &etc. dont send <cr> to screen "stuff" cmd.
RETURN="
"
RAILS_PORT="3001"
SC_PORT="4020"

# create detached screen session:
screen -d -m -c ./.screenrc -S raclette

# add some windows:
screen -X -S raclette screen -t rails_server 1
screen -X -S raclette screen -t sproutcore 2

screen -X -S raclette -p 1 stuff "cd rails; ./script/server -p $RAILS_PORT $RETURN"

screen -X -S raclette -p 2 stuff "cd sproutcore; sc-server $RETURN"

sleep 1

# open browsers
open "http://localhost:${RAILS_PORT}/" &
open "http://localhost:${SC_PORT}/" &

# open screen, with selection window
screen -x raclette -p =
