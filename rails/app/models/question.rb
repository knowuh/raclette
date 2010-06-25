class Question < ActiveRecord::Base
  belongs_to :activity
  
  def guid
    id
  end
end
