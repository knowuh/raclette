require 'spec_helper'

describe "/activities/index.html.erb" do
  include ActivitiesHelper

  before(:each) do
    assigns[:activities] = [
      stub_model(Activity,
        :title => "value for title"
      ),
      stub_model(Activity,
        :title => "value for title"
      )
    ]
  end

  it "renders a list of activities" do
    render
    response.should have_tag("tr>td", "value for title".to_s, 2)
  end
end
