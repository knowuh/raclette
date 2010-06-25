require 'spec_helper'

describe "/activities/edit.html.erb" do
  include ActivitiesHelper

  before(:each) do
    assigns[:activity] = @activity = stub_model(Activity,
      :new_record? => false,
      :title => "value for title"
    )
  end

  it "renders the edit activity form" do
    render

    response.should have_tag("form[action=#{activity_path(@activity)}][method=post]") do
      with_tag('input#activity_title[name=?]', "activity[title]")
    end
  end
end
