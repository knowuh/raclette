require 'spec_helper'

describe "/questions/index.html.erb" do
  include QuestionsHelper

  before(:each) do
    assigns[:questions] = [
      stub_model(Question,
        :prompt => "value for prompt",
        :activity_id => 1
      ),
      stub_model(Question,
        :prompt => "value for prompt",
        :activity_id => 1
      )
    ]
  end

  it "renders a list of questions" do
    render
    response.should have_tag("tr>td", "value for prompt".to_s, 2)
    response.should have_tag("tr>td", 1.to_s, 2)
  end
end
