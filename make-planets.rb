#!/usr/bin/env ruby

require 'fileutils'
require 'csv'
require 'cgi'
require 'json'

planet_file = File.join(File.dirname(__FILE__) , 'doc', 'exoplanet.eu_catalog-2013-05-28.csv')
output_dir = File.join(File.dirname(__FILE__), 'site', 'systems')
systems_file = File.join(File.dirname(__FILE__), 'site', 'systems.json')

stars = {}

CSV.foreach(planet_file, headers: true) do |row|
  # puts row
  
  star_name = row[15]
  star = stars[star_name]
  if not star
    star = {
      id: CGI.escape(star_name),
      name: star_name,
      distance: row[23],
      mass: row[25],
      radius: row[26],
      planets: []
    }
    stars[star_name] = star
  end
  planet = {
    name: row[0],
    mass: row[1],
    radius: row[2],
    orbit: row[4],
    period: row[3]
  }
  star[:planets] << planet
end

raise "Not enough systems" unless stars.size > 10

FileUtils::remove_entry_secure systems_file, true
FileUtils::remove_entry_secure output_dir, true
FileUtils::mkdir output_dir

stars.values.each do |star|
  File.open(File.join(output_dir, "#{star[:name]}.json"), 'w') do |f|
    # puts star.to_json
    f.write(star.to_json)
  end
end

File.open(systems_file, 'w') do |f|
  f.write(stars.values.to_json)
end
