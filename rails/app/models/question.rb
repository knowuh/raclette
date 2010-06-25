class Question < ActiveRecord::Base
  belongs_to :activity
  
  def to_json
    {
      :prompt => prompt,
      :guid => id
    }.to_json
  end
end
