class Comment < ApplicationRecord
  belongs_to :feature

  validates :body, presence: true

  def self.find_by_feature_id(feature_id)
    where(feature_id: feature_id)
  end
end
