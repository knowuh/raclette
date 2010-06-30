# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)

Activity.delete_all
Question.delete_all

activities = Activity.create([
  { :title => 'Rounds of Cheese' }, 
  { :title => 'Squares of Cheese' }
])

Question.create([
  { :prompt => 'What color is the sky?',        :activity => activities[0] }, 
  { :prompt => 'Why is the ocean blue?',        :activity => activities[0] },
  { :prompt => 'What is the color of money?',   :activity => activities[1] }, 
  { :prompt => 'What is the meaning of life?',  :activity => activities[1] },
])
