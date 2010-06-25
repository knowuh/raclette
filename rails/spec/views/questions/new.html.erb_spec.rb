require 'spec_helper'

describe "/questions/new.html.erb" do
  include QuestionsHelper

  before(:each) do
    assigns[:question] = stub_model(Question,
      :new_record? => true,
      :prompt => "value for prompt",
      :activity_id => 1
    )
  end

  it "renders new question form" do
    render

    response.should have_tag("form[action=?][method=post]", questions_path) do
      with_tag("textarea#question_prompt[name=?]", "question[prompt]")
      with_tag("input#question_activity_id[name=?]", "question[activity_id]")
    end
  end
end
