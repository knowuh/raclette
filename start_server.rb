#!/usr/bin/ruby

require 'rubygems'
begin
  require 'appscript'
  include Appscript
rescue LoadError
  raise <<-HEREDOC


Please install the RubyGem: rb-appscript: "gem install rb-appscript"
more info on rb-appscript: http://appscript.sourceforge.net/rb-appscript/"

  HEREDOC
end

this_dir = File.expand_path(File.dirname(__FILE__))
require "#{this_dir}/scripts/tab_windows.rb"

tab_commands = [
  [this_dir, 'rvm use 1.9.1@raclette; git status'],
  [this_dir,'rvm use 1.9.1@raclette; cd rails; rake db:seed; script/server -p 3001'], 
  [this_dir, 'rvm use 1.9.1@raclette; cd sproutcore; sc-server']
]

TabWindows.make('raclette', tab_commands)

puts "sleeping 10s to let servers start up before opening browser windows ..."
sleep(10)

browser_urls = %w{
  http://0.0.0.0:4020/raclette
  http://0.0.0.0:4020/raclette/en/current/tests.html
  http://0.0.0.0:4020/raclette/en/current/tests/data_sources/rails_create.html
  http://localhost:3001/rails/activities
  http://localhost:3001/rails/questions
}

puts "opening Safari tabs"
SafariTabs.make(browser_urls)

puts "opening FireFox windows"
BrowserTabs.make('FireFox', browser_urls)
