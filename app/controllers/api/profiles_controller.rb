class Api::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Profile.all
  end

  def my_friends
    render json: Profile.added(current_user.friends)
  end

  def update
    current_user.friends << params[:id].to_i
    current_user.save
  end
end
