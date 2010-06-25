class Activity < ActiveRecord::Base
  has_many :questions
  
  def to_json
    {
      :title => title,
      :question => questions.map{ |q| q.to_json }
    }.to_json
  end
end
