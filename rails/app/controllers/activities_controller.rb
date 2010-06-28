class ActivitiesController < ApplicationController
  # GET /activities
  # GET /activities.xml
  def index
    @activities = Activity.all
    
#    respond_to do |format|
#      format.html # index.html.erb
#      format.xml  { render :xml => @activities }
#      format.json do
#        render :json => {
#          :content => @activities.to_json( :methods => :guid,
#          :only => [
#              :guid,
#              :title
#          ],
#          :include => {
#              :questions => {
#                  :methods => :guid,
#                  :only => :guid 
#            } 
#          }) 
#        }
#      end
#    end
    respond_to do |format|
      activities = @activities.map {|activity| json_for_activity(activity) }
      format.json { render :json => { :content => activities } }
      format.html
      format.xml  { render :xml => @activities }      
    end
  end
  
  # GET /activities/1
  # GET /activities/1.xml
  def show
    @activity = Activity.find(params[:id])
    
    respond_to do |format|
      #      format.json { 
      #        render :json => @activity.to_json(:methods => :guid, :only => [:guid, :title], :include => { 
      #          :questions => { 
      #            :methods => :guid, :only => :guid 
      #          } 
      #        }) 
      #      }
      format.html # show.html.erb
      format.xml  { render :xml => @activity }
      format.json do
        render :json => {
          :content => json_for_activity(@activity),
          :location => activity_path(@activity)
        }
      end
    end
  end
  
  # GET /activities/new
  # GET /activities/new.xml
  def new
    @activity = Activity.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @activity }
    end
  end
  
  # GET /activities/1/edit
  def edit
    @activity = Activity.find(params[:id])
  end
  
  # POST /activities
  # POST /activities.xml
  def create
    @activity = Activity.new(params[:activity])
    
    respond_to do |format|
      if @activity.save
        format.html { redirect_to(@activity, :notice => 'Activity was successfully created.') }
        format.xml  { render :xml => @activity, :status => :created, :location => @activity }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @activity.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # PUT /activities/1
  # PUT /activities/1.xml
  def update
    @activity = Activity.find(params[:id])
    
    respond_to do |format|
      if @activity.update_attributes(params[:activity])
        format.html { redirect_to(@activity, :notice => 'Activity was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @activity.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # DELETE /activities/1
  # DELETE /activities/1.xml
  def destroy
    @activity = Activity.find(params[:id])
    @activity.destroy
    
    respond_to do |format|
      format.html { redirect_to(activities_url) }
      format.xml  { head :ok }
    end
  end

  #Adjust JSON communication
  #Sproutcore uses the field guid for objects ids, but Rails calls this field id.
  #You have two options on how to convert between these naming conventions:
  #Option 1: Adjust Rails JSON output
  #To customize the JSON output of an object, write a json_for_activity protected method in TasksController (app/controllers/activities_controller.rb): 
  protected
  def json_for_activity(activity)
    { :guid => activity_path(activity, :format => :json ),
      :title => activity.title,
      :questions => activity.questions.map { |q| question_path(q, :format => :json ) }
    }
  end

end
