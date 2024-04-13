class Api::FeatureController < ApplicationController
    def index
        @features = Feature.all

        render json: {
            data: ActiveModelSerializers::SerializableResource.new(@features, each_serializer: FeatureSerializer),
        }
    end
end
