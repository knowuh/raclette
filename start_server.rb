#!/usr/bin/ruby

require 'rubygems'
require 'appscript'
include Appscript
require "#{File.expand_path(File.dirname(__FILE__))}/scripts/tab_windows.rb"

dir = `pwd`

tab_commands = [
  [dir, 'git status'],
  [dir,'cd rails; script/server -p 3001'], 
  [dir, 'cd sproutcore; sc-server']
]

TabWindows.make('raclette', tab_commands)
