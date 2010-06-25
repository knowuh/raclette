class Activity < ActiveRecord::Base
  has_many :questions
  
  def guid
    id
  end
end
