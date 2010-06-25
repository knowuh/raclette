require 'spec_helper'

describe Question do
  before(:each) do
    @valid_attributes = {
      :prompt => "value for prompt",
      :activity_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    Question.create!(@valid_attributes)
  end
end
