class Api::FeatureController < ApplicationController
    before_action :feature_params
    before_action :pagination

    # GET /api/features/
    def index
        total = 0
        if @params.include? :mag_type
            @features = Feature.filter_by_mag_type(@params[:mag_type])
            total = @features.count
            @features = @features.paginate({:page => @current_page, :per_page => @per_page})
        else
            @features = Feature.paginate({:page => @current_page, :per_page => @per_page})
            total = Feature.count
        end

        render json: {
            data: ActiveModelSerializers::SerializableResource.new(@features, each_serializer: FeatureSerializer),
            pagination: {
                current_page: @current_page,
                total: total,
                per_page: @per_page,
            }
        }
    end

    private
        def feature_params
            @params = request.params
        end

        def pagination
            @current_page = 1
            @per_page = 1000
        
            if @params.include? :page
                @current_page = Integer(@params[:page]) rescue 1
            end
        
            if @params.include? :per_page
                @per_page = Integer(@params[:per_page]) rescue 1000
                @per_page = 1000 if @per_page > 1000
            end
        end
end
