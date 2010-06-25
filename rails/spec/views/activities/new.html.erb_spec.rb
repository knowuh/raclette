require 'spec_helper'

describe "/activities/new.html.erb" do
  include ActivitiesHelper

  before(:each) do
    assigns[:activity] = stub_model(Activity,
      :new_record? => true,
      :title => "value for title"
    )
  end

  it "renders new activity form" do
    render

    response.should have_tag("form[action=?][method=post]", activities_path) do
      with_tag("input#activity_title[name=?]", "activity[title]")
    end
  end
end
