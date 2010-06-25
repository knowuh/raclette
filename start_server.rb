#!/usr/bin/ruby

require 'rubygems'
require 'appscript'
include Appscript

this_dir = File.expand_path(File.dirname(__FILE__))
require "#{this_dir}/scripts/tab_windows.rb"


tab_commands = [
  [this_dir, 'git status'],
  [this_dir,'cd rails; script/server -p 3001'], 
  [this_dir, 'cd sproutcore; sc-server']
]

TabWindows.make('raclette', tab_commands)

puts "sleeping 5s before opening browser windows ..."
sleep(5)

browser_urls = %w{
  http://0.0.0.0:4020/raclette
  http://0.0.0.0:4020/static/raclette/en/current/tests.html
}

puts "opening Safari tabs"
SafariTabs.make(browser_urls)

puts "opening FireFox windows"
BrowserTabs.make('FireFox', browser_urls)
