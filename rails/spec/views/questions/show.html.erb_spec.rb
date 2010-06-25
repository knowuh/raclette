require 'spec_helper'

describe "/questions/show.html.erb" do
  include QuestionsHelper
  before(:each) do
    assigns[:question] = @question = stub_model(Question,
      :prompt => "value for prompt",
      :activity_id => 1
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ prompt/)
    response.should have_text(/1/)
  end
end
