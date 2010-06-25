
# \n \r and \013 and \015 dont seem to work
# for crarriage return wuen stuffing commands.
RETURN="
"
RAILS_PORT="3001"

# create detached screen session:
screen -d -m -c ./.screenrc -S raclette

# add some windows:
screen -X -S raclette screen -t rails_server 1
screen -X -S raclette screen -t sproutcore 2

screen -X -S raclette -p 1 stuff "cd rails; ./script/server -p $RAILS_PORT $RETURN"

screen -X -S raclette -p 2 stuff "cd sproutcore; sc-server $RETURN"

sleep 1

# open browsers
open "http://localhost:3001/" &
open "http://localhost:4020/" &

# open screen, with selection window
screen -x raclette -p =
