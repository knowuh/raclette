#!/usr/bin/ruby
#
# An Ruby-Applescript library for setting up sets of tabbed windows
# using the Terminal program that comes with MacOS 10.5
#
# Here's one way to use it to setup four windows for a Ruby on Rails 
# application:
#
# Put both tab_windows.rb and rails.rb in the same directory:
#
# file: rails.rb
#
#   require 'appscript'
#   include Appscript
#   require "#{File.expand_path(File.dirname(__FILE__))}/tab_windows.rb"
#   
#   dir = '~/path/to/rails/app'
#   tab_commands = [
#     [dir, 'svn status'], 
#     [dir, 'script/server'], 
#     [dir, 'script/console'], 
#     [dir, 'rake log:clear; tail -f log/development.log']
#   ]
#   
#   TabWindows.make('sds', tab_commands)
#

require 'rubygems'
require 'appscript'
include Appscript

class TabWindows
  def self.make (name, tab_commands)
    term = app('Terminal')
    term.do_script("")
    current_window = app('Terminal').windows[1].get
    current_tab = current_window.selected_tab.get
    # current_tab.custom_title(name)
    term.do_script("cd #{tab_commands[0][0]}", :in => current_window.selected_tab.get)
    term.do_script("#{tab_commands[0][1]}", :in => current_window.selected_tab.get)
    tab_commands.delete_at(0)
    tab_commands.each do |tc|
      app("System Events").application_processes["Terminal.app"].keystroke("t", :using => :command_down)
      current_tab = current_window.selected_tab.get
      # current_tab.custom_title(name)
      term.do_script("cd #{tc[0]}", :in => current_window.selected_tab.get)
      term.do_script("#{tc[1]}", :in => current_window.selected_tab.get)
      sleep 0.2
    end
    app("System Events").application_processes["Terminal.app"].keystroke("}", :using => :command_down)
  end
end
