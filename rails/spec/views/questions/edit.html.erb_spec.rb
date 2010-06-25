require 'spec_helper'

describe "/questions/edit.html.erb" do
  include QuestionsHelper

  before(:each) do
    assigns[:question] = @question = stub_model(Question,
      :new_record? => false,
      :prompt => "value for prompt",
      :activity_id => 1
    )
  end

  it "renders the edit question form" do
    render

    response.should have_tag("form[action=#{question_path(@question)}][method=post]") do
      with_tag('textarea#question_prompt[name=?]', "question[prompt]")
      with_tag('input#question_activity_id[name=?]', "question[activity_id]")
    end
  end
end
