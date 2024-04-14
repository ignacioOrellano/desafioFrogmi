class Api::CommentController < ApplicationController
    before_action :set_feature

    # POST api/features/:id/comments
    def create
        @comment = Comment.new(feature_id: @feature.id, body: params[:body])

        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # GET api/features/:id/comments
    def show_by_feature
        @comments = Comment.find_by_feature_id @feature.id

        render json: @comments
    end

    private
        def set_feature
            @feature = Feature.find(params[:id])
        end
end
