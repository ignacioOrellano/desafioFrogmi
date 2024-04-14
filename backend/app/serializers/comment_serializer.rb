class CommentSerializer < ActiveModel::Serializer
  attributes :id, :feature_id, :body
  attribute :created_at, key: :date
end
