class Api::FeatureController < ApplicationController
    def index
        @features = Feature.all

        render json: @features
    end
end
